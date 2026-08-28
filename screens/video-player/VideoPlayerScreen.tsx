import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  PanResponder,
  Animated,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  InteractionManager,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useAudioPlayer } from 'expo-audio';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VIDEO_ASSETS, getVideosForSurah, type VideoKey } from '../../lib/videoAssets';
import { getSurahData, getAudioUrl, type SurahVideoData } from '../../lib/videoSurahData';
import { styles } from './VideoPlayerScreen.styles';

interface VideoPlayerScreenProps {
  surahNumber?: number;
}

// ============================================================
// LOG SİSTEMİ — geçici teşhis amaçlı, __DEV__ gate'i YOK,
// test bitince kaldırılacak / azaltılacak.
// ============================================================
const MOUNT_TS = Date.now();
const ts = () => `${((Date.now() - MOUNT_TS) / 1000).toFixed(2)}s`;
const LOG = (tag: string, msg: string, data?: any) => {
  console.log(`[VP ${ts()}][${tag}] ${msg}`, data !== undefined ? data : '');
};

// Ayet uzunluğuna göre uygun font boyutunu döndürür.
function getAdaptiveFontSize(text: string | undefined, baseSize: number) {
  const len = text?.length ?? 0;
  if (len > 320) return Math.max(baseSize - 20, 22);
  if (len > 240) return Math.max(baseSize - 16, 24);
  if (len > 170) return Math.max(baseSize - 12, 26);
  if (len > 100) return Math.max(baseSize - 8, 28);
  if (len > 60) return Math.max(baseSize - 4, 30);
  return baseSize;
}

function getAdaptiveLineHeight(fontSize: number, baseSize: number, baseLineHeight: number) {
  return Math.round((baseLineHeight / baseSize) * fontSize);
}

function getAdaptiveTranslationSize(text: string | undefined, baseSize: number) {
  const len = text?.length ?? 0;
  if (len > 260) return Math.max(baseSize - 2, 13);
  if (len > 160) return Math.max(baseSize - 1, 14);
  return baseSize;
}

export default function VideoPlayerScreen({ surahNumber = 1 }: VideoPlayerScreenProps) {
  const insets = useSafeAreaInsets();

  const validSurahNumber = Math.max(1, Math.min(Math.floor(surahNumber), 114));

  const surahData: SurahVideoData = useMemo(
  () => getSurahData(validSurahNumber),
  [validSurahNumber]
);
const videoKeys = useMemo(
  () => getVideosForSurah(surahData.surahNumber),
  [surahData.surahNumber]
);

  LOG('MOUNT', `Sure ${surahData.surahNumber} yükleniyor, ${surahData.verses.length} ayet, videoKeys=`, videoKeys);

  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [activeSlot, setActiveSlot] = useState(0);
  const [canScrollVerse, setCanScrollVerse] = useState(false);

  const currentVerseIndexRef = useRef(-1);
  const currentVideoKeyRef = useRef<VideoKey | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeSlotRef = useRef(0);
  const swipeAnim = useRef(new Animated.Value(0)).current;

  // Hızlı ardışık swipe'larda video değişimini geciktirmek için (debounce)
  const pendingVerseRef = useRef<number | null>(null);
  const switchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Debounce beklerken (kullanıcı hâlâ swipe yapıyor / gerçek seekTo henüz çağrılmadı)
  // tracking loop'un eski/stale currentTime'a göre index'i geri döndürmesini engeller.
  const pendingSeekRef = useRef(false);

  // Manuel seek sonrası tracking loop'un index'i geri çevirip çevirmediğini
  // tespit etmek için (RACE CONDITION teşhisi)
  const lastManualSeekRef = useRef<{ verse: number; ts: number; targetTime: number } | null>(null);

  const scrollHintAnim = useRef(new Animated.Value(0)).current;
  const verseScrollRef = useRef<ScrollView>(null);
  const verseViewportHeight = useRef(0);
  const verseContentHeight = useRef(0);

  const slotOpacities = useRef([
    new Animated.Value(1),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const audioUrl = getAudioUrl(surahData.surahNumber);
  LOG('AUDIO', `Audio URL yükleniyor`, audioUrl);
  const audioPlayer = useAudioPlayer(audioUrl);

  const playerA = useVideoPlayer(VIDEO_ASSETS[videoKeys[0]], p => {
    p.loop = true;
    p.muted = true;
    const t0 = Date.now();
    p.play();
    LOG('PLAYER_A', `play() çağrıldı (init)`, `${Date.now() - t0}ms sürdü`);
  });
  const playerB = useVideoPlayer(VIDEO_ASSETS[videoKeys[1]], p => {
    p.loop = true;
    p.muted = true;
  });
  const playerC = useVideoPlayer(VIDEO_ASSETS[videoKeys[2]], p => {
    p.loop = true;
    p.muted = true;
  });
  const players = useMemo(() => [playerA, playerB, playerC], [playerA, playerB, playerC]);

  const slotVideoRef = useRef<[VideoKey, VideoKey, VideoKey]>([
    videoKeys[0],
    videoKeys[1],
    videoKeys[2],
  ]);

  useEffect(() => {
    LOG('PLAYER_BC', 'InteractionManager bekleniyor (playerB/C gecikmeli başlatma)...');
    const t0 = Date.now();
    const task = InteractionManager.runAfterInteractions(() => {
      LOG('PLAYER_BC', `Etkileşimler bitti, playerB/C play() çağrılıyor`, `${Date.now() - t0}ms sonra`);
      playerB.play();
      playerC.play();
    });
    return () => task.cancel();
  }, [playerB, playerC]);

  useEffect(() => {
    return () => {
      LOG('UNMOUNT', 'Ekran kapanıyor, interval/timeout temizleniyor');
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (switchDebounceRef.current) clearTimeout(switchDebounceRef.current);
    };
  }, []);

  const switchVideo = useCallback(
    (newKey: VideoKey, nextKey: VideoKey | null, reason: string) => {
      const callTs = ts();
      if (newKey === currentVideoKeyRef.current) {
        LOG('SWITCH', `[${callTs}] SKIP — zaten aktif video: ${newKey} (reason=${reason})`);
        return;
      }
      LOG('SWITCH', `[${callTs}] BAŞLADI reason="${reason}" newKey=${newKey} nextKey=${nextKey}`);
      currentVideoKeyRef.current = newKey;
      const currentSlot = activeSlotRef.current;
      const slots = slotVideoRef.current;
      const foundSlot = slots.indexOf(newKey);
      let targetSlot: 0 | 1 | 2;

      if (foundSlot !== -1) {
        targetSlot = foundSlot as 0 | 1 | 2;
        LOG('SWITCH', `  → slot${targetSlot} zaten ${newKey} içeriyor, replaceAsync GEREKMİYOR (hızlı geçiş)`);
      } else {
        targetSlot = ([0, 1, 2] as const).find(s => s !== currentSlot) ?? 1;
        slots[targetSlot] = newKey;
        LOG('SWITCH', `  → slot${targetSlot} için replaceAsync(${newKey}) BAŞLIYOR`);
        const t0 = Date.now();
        players[targetSlot]
          .replaceAsync(VIDEO_ASSETS[newKey])
          .then(() => LOG('REPLACE', `slot${targetSlot} replaceAsync(${newKey}) TAMAMLANDI`, `${Date.now() - t0}ms sürdü`))
          .catch((e: any) => LOG('REPLACE', `slot${targetSlot} replaceAsync(${newKey}) HATA`, e));
        players[targetSlot].play();
      }

      activeSlotRef.current = targetSlot;
      setActiveSlot(targetSlot);
      LOG('SWITCH', `  → activeSlot=${targetSlot} olarak ayarlandı (${newKey})`);

      if (nextKey) {
        const freeSlot =
          ([0, 1, 2] as const).find(s => s !== targetSlot && slots[s] !== newKey) ?? 2;
        if (slots[freeSlot] !== nextKey) {
          slots[freeSlot] = nextKey;
          LOG('SWITCH', `  → preload: slot${freeSlot} için replaceAsync(${nextKey}) BAŞLIYOR`);
          const t1 = Date.now();
          players[freeSlot]
            .replaceAsync(VIDEO_ASSETS[nextKey])
            .then(() => LOG('REPLACE', `slot${freeSlot} preload replaceAsync(${nextKey}) TAMAMLANDI`, `${Date.now() - t1}ms sürdü`))
            .catch((e: any) => LOG('REPLACE', `slot${freeSlot} preload replaceAsync(${nextKey}) HATA`, e));
          players[freeSlot].play();
        }
      }
    },
    [players]
  );

  useEffect(() => {
    const animations = slotOpacities.map((opacity, idx) =>
      Animated.timing(opacity, {
        toValue: idx === activeSlot ? 1 : 0,
        duration: 350,
        useNativeDriver: true,
      })
    );
    Animated.parallel(animations).start(() => {
      LOG('CROSSFADE', `activeSlot=${activeSlot} crossfade animasyonu bitti`);
    });
  }, [activeSlot, slotOpacities]);

  const seekToVerse = useCallback(
    (verseIndex: number) => {
      const callTs = ts();
      const clamped = Math.max(0, Math.min(verseIndex, surahData.verses.length - 1));

      LOG('SEEK', `[${callTs}] seekToVerse çağrıldı → istenen=${verseIndex} clamped=${clamped}`);

      // UI (ayet metni, swipe hesaplaması için ref) ANINDA güncellenir — hızlı hissettirir.
      // Ama audioPlayer.seekTo() burada ÇAĞRILMAZ — o sadece debounce sonunda, TEK SEFER yapılır.
      currentVerseIndexRef.current = clamped;
      setCurrentVerseIndex(clamped);

       pendingVerseRef.current = clamped;
      pendingSeekRef.current = true;
      if (switchDebounceRef.current) {
        LOG('DEBOUNCE', `  önceki debounce iptal edildi (yeni swipe geldi)`);
        clearTimeout(switchDebounceRef.current);
      }
      LOG('DEBOUNCE', `  180ms debounce zamanlayıcı kuruldu, pendingVerse=${clamped}`);
      switchDebounceRef.current = setTimeout(() => {
        const finalVerse = pendingVerseRef.current;
        if (finalVerse === null) return;
        const targetTime = surahData.verses[finalVerse].start;

        LOG(
          'DEBOUNCE',
          `[${ts()}] debounce TETİKLENDİ → finalVerse=${finalVerse}, audioPlayer.seekTo(${targetTime}) ÇAĞRILIYOR (tek sefer)`
        );

        // Ses SADECE burada seek ediliyor — kaydırma serisi bittikten sonra tek çağrı.
                audioPlayer.seekTo(targetTime);
        lastManualSeekRef.current = { verse: finalVerse, ts: Date.now(), targetTime };
        // ÖNEMLİ: pendingSeekRef'i BURADA kapatmıyoruz. seekTo() JS'te anında dönse de
        // native tarafta pozisyon değişimi birkaç yüz ms sürüyor (bkz. SEEK_VERIFY logları).
        // Flag'i erken kapatırsak tracking loop hâlâ eski currentTime'ı okuyup index'i
        // geri sarabilir (RACE). Bu yüzden native'in gerçekten yetiştiğinden emin olana
        // kadar tracking loop'u kapalı tutuyoruz.

        setTimeout(() => {
          const reached = Math.abs((audioPlayer.currentTime ?? 0) - targetTime) < 0.3;
          LOG(
            'SEEK_VERIFY',
            `+150ms → audioPlayer.currentTime=${audioPlayer.currentTime?.toFixed(2)} (hedef=${targetTime}) playing=${audioPlayer.playing} reached=${reached}`
          );
          // 150ms sonra hedefe ulaşılmışsa tracking loop'u tekrar aç.
          // Ulaşılmamışsa (nadir, yavaş cihaz) bir 150ms daha bekleyip zorla aç —
          // sonsuza kadar kilitli kalmasın.
          if (reached) {
            pendingSeekRef.current = false;
          } else {
            setTimeout(() => {
              pendingSeekRef.current = false;
            }, 150);
          }
        }, 150);

        const fk = videoKeys[finalVerse % videoKeys.length];
        const fnk = videoKeys[(finalVerse + 1) % videoKeys.length];
        switchVideo(fk, fnk, `Seek→Ayet${finalVerse + 1}`);
      }, 180);
    },
    [audioPlayer, surahData.verses, videoKeys, switchVideo]
  );
  const triggerSwipeAnim = (direction: 'left' | 'right') => {
    const toValue = direction === 'left' ? -26 : 26;
    Animated.sequence([
      Animated.timing(swipeAnim, { toValue, duration: 80, useNativeDriver: true }),
      Animated.spring(swipeAnim, { toValue: 0, useNativeDriver: true }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.5 && Math.abs(gesture.dx) > 12,
      onPanResponderRelease: (_, gesture) => {
        LOG('SWIPE', `onPanResponderRelease dx=${gesture.dx.toFixed(1)} dy=${gesture.dy.toFixed(1)} vx=${gesture.vx.toFixed(2)}`);
        if (Math.abs(gesture.dx) < 50) {
          LOG('SWIPE', `  → yoksayıldı (dx çok küçük)`);
          return;
        }
        if (gesture.dx < 0) {
          LOG('SWIPE', `  → SOLA kaydırma, sonraki ayete geçiliyor (${currentVerseIndexRef.current} → ${currentVerseIndexRef.current + 1})`);
          triggerSwipeAnim('left');
          seekToVerse(currentVerseIndexRef.current + 1);
        } else {
          LOG('SWIPE', `  → SAĞA kaydırma, önceki ayete geçiliyor (${currentVerseIndexRef.current} → ${currentVerseIndexRef.current - 1})`);
          triggerSwipeAnim('right');
          seekToVerse(currentVerseIndexRef.current - 1);
        }
      },
    })
  ).current;

  const startTracking = useCallback(() => {
    LOG('TRACK', 'startTracking başladı, 100ms interval kuruluyor');
    if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
      if (pendingSeekRef.current) {
        // Kullanıcı az önce swipe yaptı, debounce hâlâ bekliyor / audioPlayer henüz
        // yeni pozisyona seek edilmedi. Bu ara safhada currentTime eski değeri taşıyor,
        // ona göre index hesaplarsak ayet numarasını yanlışlıkla geri düşürürüz. Atla.
        return;
      }
      const currentTime = audioPlayer.currentTime ?? 0;
      let newVerseIndex = 0;

      for (let i = surahData.verses.length - 1; i >= 0; i--) {
        if (currentTime >= surahData.verses[i].start) {
          newVerseIndex = i;
          break;
        }
      }

      if (newVerseIndex !== currentVerseIndexRef.current) {
        const prevIndex = currentVerseIndexRef.current;

        // --- RACE CONDITION TEŞHİSİ ---
        // Yakın zamanda manuel bir seek yapıldıysa ve tracking loop
        // farklı/beklenmedik bir index'e geçiyorsa, bu muhtemelen
        // audioPlayer.currentTime henüz seekTo'yu yansıtmadığı için
        // tracking loop'un eski pozisyona göre index hesaplayıp
        // manuel seek'i EZMESİ durumudur — "ayet sesi gelmiyor" şikayetinin
        // muhtemel kaynağı burasıdır.
        const lastSeek = lastManualSeekRef.current;
        if (lastSeek && Date.now() - lastSeek.ts < 500 && newVerseIndex !== lastSeek.verse) {
          LOG(
            'RACE',
            `⚠️ ÇAKIŞMA ŞÜPHESİ: ${Date.now() - lastSeek.ts}ms önce ayet${lastSeek.verse + 1}'e (t=${lastSeek.targetTime}s) manuel seek yapılmıştı, ` +
              `ama tracking loop şimdi currentTime=${currentTime.toFixed(2)} okuyup ayet${newVerseIndex + 1}'e geçiriyor. ` +
              `Bu, manuel seek'i EZİYOR OLABİLİR.`
          );
        }

        LOG(
          'TRACK',
          `[${ts()}] Ayet değişti: ${prevIndex + 1} → ${newVerseIndex + 1} (currentTime=${currentTime.toFixed(2)}s, verseStart=${surahData.verses[newVerseIndex]?.start}s)`
        );

        currentVerseIndexRef.current = newVerseIndex;
        setCurrentVerseIndex(newVerseIndex);

        const newVideoKey = videoKeys[newVerseIndex % videoKeys.length];
        const nextVideoKey = videoKeys[(newVerseIndex + 1) % videoKeys.length];
        switchVideo(newVideoKey, nextVideoKey, `Ayet${newVerseIndex + 1}`);

        const lookaheadKey = videoKeys[(newVerseIndex + 2) % videoKeys.length];
        const slots = slotVideoRef.current;
        const busy = new Set([activeSlotRef.current]);
        const freeSlot = ([0, 1, 2] as const).find(
          s => !busy.has(s) && slots[s] !== lookaheadKey && slots[s] !== nextVideoKey
        );
        if (freeSlot !== undefined && slots[freeSlot] !== lookaheadKey) {
          slots[freeSlot] = lookaheadKey;
          LOG('LOOKAHEAD', `slot${freeSlot} için lookahead replaceAsync(${lookaheadKey}) BAŞLIYOR`);
          const t0 = Date.now();
          players[freeSlot]
            .replaceAsync(VIDEO_ASSETS[lookaheadKey])
            .then(() => LOG('REPLACE', `slot${freeSlot} lookahead replaceAsync(${lookaheadKey}) TAMAMLANDI`, `${Date.now() - t0}ms sürdü`))
            .catch((e: any) => LOG('REPLACE', `slot${freeSlot} lookahead replaceAsync(${lookaheadKey}) HATA`, e));
          players[freeSlot].play();
        }
      }

      if (audioPlayer.playing === false && currentTime > 5) {
        LOG('TRACK', `audio durdu (playing=false, currentTime=${currentTime.toFixed(2)}), interval durduruluyor`);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 100);
  }, [audioPlayer, surahData.verses, videoKeys, switchVideo]);

  useEffect(() => {
    if (currentVerseIndexRef.current === -1) {
      currentVerseIndexRef.current = 0;
      setCurrentVerseIndex(0);
      LOG('INIT', 'İlk başlatma: ayet 0, video başlatılıyor');
      switchVideo(videoKeys[0], videoKeys[1], 'İlk başlatma');
    }

    LOG('INIT', 'audioPlayer.play() çağrılıyor');
    audioPlayer.play();
    startTracking();

    return () => {
      try {
        if (audioPlayer && audioPlayer.playing) {
          LOG('CLEANUP', 'audioPlayer.pause() çağrılıyor');
          audioPlayer.pause();
        }
      } catch (e) {
        LOG('CLEANUP', 'audioPlayer pause hata (muhtemelen zaten temizlenmiş)', e);
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [audioPlayer, videoKeys, switchVideo, startTracking]);

  const currentVerse = surahData.verses[currentVerseIndex];
  const progress =
    surahData.verses.length > 1 ? currentVerseIndex / (surahData.verses.length - 1) : 0;

  useEffect(() => {
    verseScrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [currentVerseIndex]);

  useEffect(() => {
    if (!canScrollVerse) {
      scrollHintAnim.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollHintAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(scrollHintAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [canScrollVerse, scrollHintAnim]);

  const checkVerseOverflow = useCallback(() => {
    const overflowing = verseContentHeight.current > verseViewportHeight.current + 4;
    setCanScrollVerse(overflowing);
  }, []);

  const baseVerseFontSize = (styles.verseText as any)?.fontSize ?? 42;
  const baseVerseLineHeight = (styles.verseText as any)?.lineHeight ?? 64;
  const baseTranslationFontSize = (styles.translationText as any)?.fontSize ?? 15;

  const adaptiveVerseSize = useMemo(
    () => getAdaptiveFontSize(currentVerse?.text, baseVerseFontSize),
    [currentVerse?.text, baseVerseFontSize]
  );
  const adaptiveVerseLineHeight = useMemo(
    () => getAdaptiveLineHeight(adaptiveVerseSize, baseVerseFontSize, baseVerseLineHeight),
    [adaptiveVerseSize, baseVerseFontSize, baseVerseLineHeight]
  );
  const adaptiveTranslationSize = useMemo(
    () => getAdaptiveTranslationSize(currentVerse?.translation, baseTranslationFontSize),
    [currentVerse?.translation, baseTranslationFontSize]
  );

  const hintTranslateY = scrollHintAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6],
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {players.map((player, idx) => (
        <Animated.View
          key={idx}
          style={[styles.video, localStyles.videoFill, { opacity: slotOpacities[idx] }]}
        >
          <VideoView
            player={player}
            style={localStyles.videoFill}
            contentFit="cover"
            nativeControls={false}
          />
        </Animated.View>
      ))}

      <View style={styles.overlay}>
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerLabel}>OKUNUYOR</Text>
            <Text style={styles.surahTitle}>{surahData.surahName}</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <Animated.View
          style={[
            styles.verseContainer,
            localStyles.verseContainerFlex,
            { transform: [{ translateX: swipeAnim }] },
          ]}
        >
          <ScrollView
            ref={verseScrollRef}
            style={localStyles.verseScroll}
            contentContainerStyle={localStyles.verseScrollContent}
            showsVerticalScrollIndicator={false}
            onLayout={e => {
              verseViewportHeight.current = e.nativeEvent.layout.height;
              checkVerseOverflow();
            }}
            onContentSizeChange={(_w, h) => {
              verseContentHeight.current = h;
              checkVerseOverflow();
            }}
            onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
              const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
              const nearBottom =
                contentOffset.y + layoutMeasurement.height >= contentSize.height - 4;
              if (nearBottom && canScrollVerse) {
                // dipteyken ipucunu gizlemeye gerek yok, animasyon zaten görünmez olacak
              }
            }}
            scrollEventThrottle={32}
          >
            <Text
              style={[
                styles.verseText,
                { fontSize: adaptiveVerseSize, lineHeight: adaptiveVerseLineHeight },
              ]}
            >
              {currentVerse?.text}
            </Text>
            <Text style={[styles.translationText, { fontSize: adaptiveTranslationSize }]}>
              {currentVerse?.translation}
            </Text>
          </ScrollView>

          {canScrollVerse && (
            <Animated.View
              pointerEvents="none"
              style={[localStyles.scrollHint, { transform: [{ translateY: hintTranslateY }] }]}
            >
              <Text style={localStyles.scrollHintText}>▾</Text>
            </Animated.View>
          )}
        </Animated.View>

        <View style={[styles.bottomMeta, { paddingBottom: insets.bottom + 18 }]}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.max(progress * 100, 4)}%` }]} />
          </View>
          <Text style={styles.verseNumber}>
            Ayet {currentVerse?.verseNumber} / {surahData.verses.length}
          </Text>
          <Text style={styles.swipeHint}>
            {canScrollVerse ? 'Metni kaydır · sağa/sola kaydır' : 'Sağa veya sola kaydır'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  videoFill: {
    ...StyleSheet.absoluteFillObject,
  },
  verseContainerFlex: {
    maxHeight: '42%',
  },
  verseScroll: {
    flexGrow: 0,
  },
  verseScrollContent: {
    paddingBottom: 4,
  },
  scrollHint: {
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
  },
  scrollHintText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 18,
    fontWeight: '600',
  },
});