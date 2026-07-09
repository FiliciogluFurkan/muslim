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
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useAudioPlayer } from 'expo-audio';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VIDEO_ASSETS, getVideosForSurah, type VideoKey } from '../../lib/videoAssets';
import { getSurahData, getAudioUrl, type SurahVideoData } from '../../lib/videoSurahData';
import { styles } from './VideoPlayerScreen.styles';

const LOG = __DEV__
  ? (tag: string, msg: string, data?: any) =>
      console.log(`[VP][${tag}]`, msg, data ?? '')
  : () => {};

interface VideoPlayerScreenProps {
  surahNumber?: number;
}

// Ayet uzunluğuna göre uygun font boyutunu döndürür.
// Kendi tasarımına göre eşik/değerleri styles.verseText'in
// temel fontSize'ına göre ayarlayabilirsin.
// baseSize = 42, baseLineHeight = 64 (bkz. styles.verseText)
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
  // Oran korunarak lineHeight de küçültülüyor (42/64 ≈ 1.524)
  return Math.round((baseLineHeight / baseSize) * fontSize);
}

// baseSize = 15 (bkz. styles.translationText)
function getAdaptiveTranslationSize(text: string | undefined, baseSize: number) {
  const len = text?.length ?? 0;
  if (len > 260) return Math.max(baseSize - 2, 13);
  if (len > 160) return Math.max(baseSize - 1, 14);
  return baseSize;
}

export default function VideoPlayerScreen({ surahNumber = 1 }: VideoPlayerScreenProps) {
  const insets = useSafeAreaInsets();

  // Validate surah number (1-114)
  const validSurahNumber = Math.max(1, Math.min(Math.floor(surahNumber), 114));

  const surahData: SurahVideoData = getSurahData(validSurahNumber);
  const videoKeys = getVideosForSurah(surahData.surahNumber);

  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [activeSlot, setActiveSlot] = useState(0);
  const [canScrollVerse, setCanScrollVerse] = useState(false);

  const currentVerseIndexRef = useRef(-1);
  const currentVideoKeyRef = useRef<VideoKey | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeSlotRef = useRef(0);
  const swipeAnim = useRef(new Animated.Value(0)).current;

  // Ayet gövdesi kaydırma ipucu için pulse animasyonu
  const scrollHintAnim = useRef(new Animated.Value(0)).current;
  const verseScrollRef = useRef<ScrollView>(null);
  const verseViewportHeight = useRef(0);
  const verseContentHeight = useRef(0);

  // Video slotları için yumuşak crossfade animasyonları
  const slotOpacities = useRef([
    new Animated.Value(1),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const audioPlayer = useAudioPlayer(getAudioUrl(surahData.surahNumber));

  const playerA = useVideoPlayer(VIDEO_ASSETS[videoKeys[0]], p => {
    p.loop = true;
    p.muted = true;
    p.play();
  });
  const playerB = useVideoPlayer(VIDEO_ASSETS[videoKeys[1]], p => {
    p.loop = true;
    p.muted = true;
    p.play();
  });
  const playerC = useVideoPlayer(VIDEO_ASSETS[videoKeys[2]], p => {
    p.loop = true;
    p.muted = true;
    p.play();
  });
  const players = [playerA, playerB, playerC];

  const slotVideoRef = useRef<[VideoKey, VideoKey, VideoKey]>([
    videoKeys[0],
    videoKeys[1],
    videoKeys[2],
  ]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const switchVideo = useCallback(
    (newKey: VideoKey, nextKey: VideoKey | null, reason: string) => {
      if (newKey === currentVideoKeyRef.current) return;
      currentVideoKeyRef.current = newKey;
      const currentSlot = activeSlotRef.current;
      const slots = slotVideoRef.current;
      const foundSlot = slots.indexOf(newKey);
      let targetSlot: 0 | 1 | 2;

      if (foundSlot !== -1) {
        targetSlot = foundSlot as 0 | 1 | 2;
      } else {
        targetSlot = ([0, 1, 2] as const).find(s => s !== currentSlot) ?? 1;
        slots[targetSlot] = newKey;
        players[targetSlot].replaceAsync(VIDEO_ASSETS[newKey]);
        players[targetSlot].play();
      }

      activeSlotRef.current = targetSlot;
      setActiveSlot(targetSlot);
      LOG('VIDEO', `🎬 ${reason} → slot${targetSlot} (${newKey})`);

      if (nextKey) {
        const freeSlot =
          ([0, 1, 2] as const).find(s => s !== targetSlot && slots[s] !== newKey) ?? 2;
        if (slots[freeSlot] !== nextKey) {
          slots[freeSlot] = nextKey;
          players[freeSlot].replaceAsync(VIDEO_ASSETS[nextKey]);
          players[freeSlot].play();
        }
      }
    },
    [players]
  );

  // activeSlot değiştiğinde tüm slotları yumuşakça crossfade yap
  useEffect(() => {
    const animations = slotOpacities.map((opacity, idx) =>
      Animated.timing(opacity, {
        toValue: idx === activeSlot ? 1 : 0,
        duration: 350,
        useNativeDriver: true,
      })
    );
    Animated.parallel(animations).start();
  }, [activeSlot, slotOpacities]);

  const seekToVerse = useCallback(
    (verseIndex: number) => {
      const clamped = Math.max(0, Math.min(verseIndex, surahData.verses.length - 1));
      const targetTime = surahData.verses[clamped].start;
      audioPlayer.seekTo(targetTime);
      currentVerseIndexRef.current = clamped - 1;
      setCurrentVerseIndex(clamped);
      const newKey = videoKeys[clamped % videoKeys.length];
      const nextKey = videoKeys[(clamped + 1) % videoKeys.length];
      switchVideo(newKey, nextKey, `Seek→Ayet${clamped + 1}`);
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
      // Dikey kaydırmalarda (uzun ayet scroll'unda) yatay swipe'ı tetikleme
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.5 && Math.abs(gesture.dx) > 12,
      onPanResponderRelease: (_, gesture) => {
        if (Math.abs(gesture.dx) < 50) return;
        if (gesture.dx < 0) {
          triggerSwipeAnim('left');
          seekToVerse(currentVerseIndexRef.current + 1);
        } else {
          triggerSwipeAnim('right');
          seekToVerse(currentVerseIndexRef.current - 1);
        }
      },
    })
  ).current;

  const startTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const currentTime = audioPlayer.currentTime ?? 0;
      let newVerseIndex = 0;

      for (let i = surahData.verses.length - 1; i >= 0; i--) {
        if (currentTime >= surahData.verses[i].start) {
          newVerseIndex = i;
          break;
        }
      }

      const newVideoKey = videoKeys[newVerseIndex % videoKeys.length];
      const nextVideoKey = videoKeys[(newVerseIndex + 1) % videoKeys.length];

      if (newVerseIndex !== currentVerseIndexRef.current) {
        currentVerseIndexRef.current = newVerseIndex;
        setCurrentVerseIndex(newVerseIndex);
        switchVideo(newVideoKey, nextVideoKey, `Ayet${newVerseIndex + 1}`);
      }

      if (audioPlayer.playing === false && currentTime > 5) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 100);
  }, [audioPlayer, surahData.verses, videoKeys, switchVideo]);

  useEffect(() => {
    if (currentVerseIndexRef.current === -1) {
      currentVerseIndexRef.current = 0;
      setCurrentVerseIndex(0);
      switchVideo(videoKeys[0], videoKeys[1], 'İlk başlatma');
    }

    audioPlayer.play();
    startTracking();

    return () => {
      try {
        if (audioPlayer && audioPlayer.playing) {
          audioPlayer.pause();
        }
      } catch (e) {
        // Audio player zaten temizlenmiş olabilir
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [audioPlayer, videoKeys, switchVideo, startTracking]);

  const currentVerse = surahData.verses[currentVerseIndex];
  const progress =
    surahData.verses.length > 1 ? currentVerseIndex / (surahData.verses.length - 1) : 0;

  // Ayet değiştiğinde uzun metinleri en baştan göster
  useEffect(() => {
    verseScrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [currentVerseIndex]);

  // Kaydırılabilir ipucu için pulse animasyonu (sadece taşma varken)
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
    // verseContainer'ın marginVertical: 60 değeri header/bottomMeta'dan
    // pay çıkardığı için burada biraz daha muhafazakâr bir üst sınır
    // veriyoruz; uzun ayetlerde taşma yerine iç scroll devreye giriyor.
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