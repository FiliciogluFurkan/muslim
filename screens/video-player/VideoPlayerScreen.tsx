import { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, Pressable, PanResponder, Animated } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useAudioPlayer } from 'expo-audio';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VIDEO_ASSETS, getVideosForSurah, type VideoKey } from '../../lib/videoAssets';
import { testSurahData, getAudioUrl, type SurahVideoData } from '../../lib/videoSurahData';
import { styles } from './VideoPlayerScreen.styles';

const LOG = __DEV__
  ? (tag: string, msg: string, data?: any) =>
      console.log(`[VP][${tag}]`, msg, data ?? '')
  : () => {};

export default function VideoPlayerScreen() {
  const insets    = useSafeAreaInsets();
  const surahData: SurahVideoData = testSurahData;
  const videoKeys = getVideosForSurah(surahData.surahNumber);

  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isPlaying, setIsPlaying]                 = useState(false);
  const [activeSlot, setActiveSlot]               = useState(0);

  const currentVerseIndexRef = useRef(-1);
  const currentVideoKeyRef   = useRef<VideoKey | null>(null);
  const intervalRef          = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeSlotRef        = useRef(0);
  const swipeAnim            = useRef(new Animated.Value(0)).current;

  const audioPlayer = useAudioPlayer(getAudioUrl(surahData.surahNumber));

  const playerA = useVideoPlayer(VIDEO_ASSETS[videoKeys[0]], p => { p.loop = true; p.muted = true; p.play(); });
  const playerB = useVideoPlayer(VIDEO_ASSETS[videoKeys[1]], p => { p.loop = true; p.muted = true; p.play(); });
  const playerC = useVideoPlayer(VIDEO_ASSETS[videoKeys[2]], p => { p.loop = true; p.muted = true; p.play(); });
  const players  = [playerA, playerB, playerC];

  const slotVideoRef = useRef<[VideoKey, VideoKey, VideoKey]>([
    videoKeys[0], videoKeys[1], videoKeys[2],
  ]);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const switchVideo = useCallback((newKey: VideoKey, nextKey: VideoKey | null, reason: string) => {
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
      const freeSlot = ([0, 1, 2] as const).find(s => s !== targetSlot && slots[s] !== newKey) ?? 2;
      if (slots[freeSlot] !== nextKey) {
        slots[freeSlot] = nextKey;
        players[freeSlot].replaceAsync(VIDEO_ASSETS[nextKey]);
        players[freeSlot].play();
      }
    }
  }, [players]);

  const seekToVerse = useCallback((verseIndex: number) => {
    const clamped = Math.max(0, Math.min(verseIndex, surahData.verses.length - 1));
    const targetTime = surahData.verses[clamped].start;
    audioPlayer.seekTo(targetTime);
    currentVerseIndexRef.current = clamped - 1;
    setCurrentVerseIndex(clamped);
    const newKey  = videoKeys[clamped % videoKeys.length];
    const nextKey = videoKeys[(clamped + 1) % videoKeys.length];
    switchVideo(newKey, nextKey, `Seek→Ayet${clamped + 1}`);
  }, [audioPlayer, surahData.verses, videoKeys, switchVideo]);

  // Swipe feedback animasyonu
  const triggerSwipeAnim = (direction: 'left' | 'right') => {
    const toValue = direction === 'left' ? -30 : 30;
    Animated.sequence([
      Animated.timing(swipeAnim, { toValue, duration: 80, useNativeDriver: true }),
      Animated.spring(swipeAnim, { toValue: 0, useNativeDriver: true }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
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
        if (currentTime >= surahData.verses[i].start) { newVerseIndex = i; break; }
      }
      const newVideoKey  = videoKeys[newVerseIndex % videoKeys.length];
      const nextVideoKey = videoKeys[(newVerseIndex + 1) % videoKeys.length];
      if (newVerseIndex !== currentVerseIndexRef.current) {
        currentVerseIndexRef.current = newVerseIndex;
        setCurrentVerseIndex(newVerseIndex);
        switchVideo(newVideoKey, nextVideoKey, `Ayet${newVerseIndex + 1}`);
      }
      if (audioPlayer.playing === false && currentTime > 5) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
      }
    }, 100);
  }, [audioPlayer, surahData.verses, videoKeys, switchVideo]);

  const handlePlayPause = useCallback(async () => {
    if (isPlaying) {
      audioPlayer.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      if (currentVerseIndexRef.current === -1) {
        currentVerseIndexRef.current = 0;
        setCurrentVerseIndex(0);
        switchVideo(videoKeys[0], videoKeys[1], 'İlk başlatma');
      }
      audioPlayer.play();
      startTracking();
      setIsPlaying(true);
    }
  }, [isPlaying, audioPlayer, videoKeys, switchVideo, startTracking]);

  const currentVerse = surahData.verses[currentVerseIndex];

  return (
    <View style={styles.container} {...panResponder.panHandlers}>

      {players.map((player, idx) => (
        <VideoView
          key={idx}
          player={player}
          style={[styles.video, { opacity: idx === activeSlot ? 1 : 0 }]}
          contentFit="cover"
          nativeControls={false}
        />
      ))}

      <View style={styles.overlay}>

        {/* Header */}
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

        {/* Ayet */}
        <Animated.View style={[styles.verseContainer, { transform: [{ translateX: swipeAnim }] }]}>
          <Text style={styles.verseText}>{currentVerse?.text}</Text>
          <Text style={styles.translationText}>{currentVerse?.translation}</Text>
          <View style={styles.verseDots}>
            {surahData.verses.map((_, i) => (
              <View key={i} style={[styles.dot, i === currentVerseIndex && styles.dotActive]} />
            ))}
          </View>
        </Animated.View>

        {/* Kontroller */}
        <View style={[styles.controls, { paddingBottom: insets.bottom + 32 }]}>
          <Text style={styles.verseNumber}>
            {currentVerse?.verseNumber} / {surahData.verses.length}
          </Text>

          <View style={styles.controlRow}>
            {/* Geri */}
            <Pressable
              style={styles.skipButton}
              onPress={() => seekToVerse(currentVerseIndexRef.current - 1)}
            >
              <Text style={styles.skipText}>⏮</Text>
            </Pressable>

            {/* Play/Pause */}
            <Pressable onPress={handlePlayPause} style={styles.playButton}>
              <Text style={styles.playButtonText}>{isPlaying ? '⏸' : '▶'}</Text>
            </Pressable>

            {/* İleri */}
            <Pressable
              style={styles.skipButton}
              onPress={() => seekToVerse(currentVerseIndexRef.current + 1)}
            >
              <Text style={styles.skipText}>⏭</Text>
            </Pressable>
          </View>
        </View>

      </View>
    </View>
  );
}