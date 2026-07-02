import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { getNextPrayer, getCurrentKerahatStatus, formatTime } from '../../lib/prayerTimes';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { useTheme } from '../../hooks/useTheme';
import { tabScrollPadding } from '../../lib/layout';
import { HERO, KERAHAT } from '../../lib/heroTheme';
import { CityPicker } from '../../components/CityPicker';
import { PressableScale } from '../../components/PressableScale';
import { styles } from './PrayerTimesScreen.styles';

/* ─── Yardımcılar ─────────────────────────────────── */

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

function formatRemainShort(ms: number): string {
  if (ms <= 0) return 'şimdi';
  const totalMin = Math.ceil(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return h > 0 ? `${h} sa ${m} dk` : `${m} dk`;
}

/* ─── Küçük animasyonlu parçalar ──────────────────── */

/** Yumuşak dolan hero ilerleme çubuğu. */
function HeroProgress({ progress, color }: { progress: number; color: string }) {
  const [trackW, setTrackW] = useState(0);
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withTiming(progress, { duration: 800, easing: Easing.out(Easing.cubic) });
  }, [progress]);

  const fillStyle = useAnimatedStyle(() => ({ width: p.value * trackW }));

  return (
    <View style={styles.progressTrack} onLayout={(e) => setTrackW(e.nativeEvent.layout.width)}>
      <Animated.View style={[styles.progressFill, { backgroundColor: color }, fillStyle]} />
    </View>
  );
}

/** Sıradaki vaktin zaman çizelgesindeki nabız atan noktası. */
function NextPulseDot({ color }: { color: string }) {
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.out(Easing.ease) }), -1, false);
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.8 - p.value * 0.8,
    transform: [{ scale: 0.55 + p.value * 0.75 }],
  }));

  return (
    <View style={styles.nextDotWrap}>
      <Animated.View style={[styles.nextDotRing, { borderColor: color }, ringStyle]} />
      <View style={[styles.nextDotCore, { backgroundColor: color }]} />
    </View>
  );
}

/* ─── Ekran ───────────────────────────────────────── */

export default function PrayerTimesScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();
  const p = usePrayerTimes();
  const [now, setNow] = useState(new Date());
  const [cityOpen, setCityOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = now.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const subLine = p.hijriDate ? `${dateStr}  ·  ${p.hijriDate}` : dateStr;

  const Header = (
    <Animated.View entering={FadeInDown.duration(480)} style={styles.header}>
      <Text style={[styles.headerTitle, { color: palette.fg }]}>Namaz Vakitleri</Text>
      <Text style={[styles.headerSub, { color: palette.muted }]}>{subLine}</Text>
    </Animated.View>
  );

  /* Konum yok / hata → nazik yönlendirme (ısrarlı izin isteği yok) */
  if (p.status === 'needsLocation' || p.status === 'error') {
    return (
      <View style={[styles.root, { backgroundColor: palette.bg, paddingTop: insets.top + 8 }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <View style={styles.scroll}>{Header}</View>
        <Animated.View entering={FadeInDown.duration(480).delay(60)} style={styles.centerWrap}>
          <View style={[styles.emptyBadge, { backgroundColor: palette.accentSoft }]}>
            <Ionicons name="navigate-outline" size={30} color={palette.accent} />
          </View>
          <Text style={[styles.emptyTitle, { color: palette.fg }]}>Konumunu seçelim</Text>
          <Text style={[styles.emptyText, { color: palette.muted }]}>
            Vakitleri gösterebilmek için bir şehir seç ya da cihaz konumunu kullan.
          </Text>
          <PressableScale
            style={[styles.emptyPrimary, { backgroundColor: palette.accent }]}
            onPress={() => setCityOpen(true)}
          >
            <Ionicons name="search-outline" size={15} color={isDark ? '#062A1D' : '#FFFFFF'} />
            <Text style={[styles.emptyPrimaryText, { color: isDark ? '#062A1D' : '#FFFFFF' }]}>
              Şehir Seç
            </Text>
          </PressableScale>
          <PressableScale style={styles.emptyGhost} onPress={p.retry}>
            <Ionicons name="locate-outline" size={15} color={palette.accent} />
            <Text style={[styles.emptyGhostText, { color: palette.accent }]}>Konumu Kullan</Text>
          </PressableScale>
        </Animated.View>
        <CityPicker visible={cityOpen} onClose={() => setCityOpen(false)} onAuto={p.retry} />
      </View>
    );
  }

  if (p.status === 'loading' || !p.times) {
    return (
      <View style={[styles.root, { backgroundColor: palette.bg, paddingTop: insets.top + 8 }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <View style={styles.scroll}>{Header}</View>
        <View style={styles.centerWrap}>
          <ActivityIndicator color={palette.accent} />
          <Text style={[styles.loadingText, { color: palette.muted }]}>Vakitler hazırlanıyor…</Text>
        </View>
      </View>
    );
  }

  const times = p.times;
  const nextPrayer = getNextPrayer(times);
  const kerahat = getCurrentKerahatStatus(times);
  const nowMs = now.getTime();
  const msLeft = nextPrayer ? nextPrayer.time.getTime() - nowMs : 0;

  const prayerList = [
    { name: 'İmsak', time: times.prayers.imsak, arabic: 'الإمساك' },
    { name: 'Sabah', time: times.prayers.fajr, arabic: 'الفجر' },
    { name: 'Güneş', time: times.prayers.sunrise, arabic: 'الشروق' },
    { name: 'Öğle', time: times.prayers.dhuhr, arabic: 'الظهر' },
    { name: 'İkindi', time: times.prayers.asr, arabic: 'العصر' },
    { name: 'Akşam', time: times.prayers.maghrib, arabic: 'المغرب' },
    { name: 'Yatsı', time: times.prayers.isha, arabic: 'العشاء' },
  ];

  // -1 → günün tüm vakitleri geçti
  const nextIdx = prayerList.findIndex((pr) => pr.time.getTime() > nowMs);
  const prevMs =
    nextIdx > 0
      ? prayerList[nextIdx - 1].time.getTime()
      : new Date(now).setHours(0, 0, 0, 0);
  const nextMs = nextPrayer?.time.getTime() ?? nowMs;
  const progress = nextMs > prevMs ? Math.min(1, Math.max(0, (nowMs - prevMs) / (nextMs - prevMs))) : 0;

  // Kerahat yaklaşırken / içindeyken sayaç ve çubuk renk değiştirir
  const counterColor = kerahat.isKerahat
    ? KERAHAT.dangerOnHero
    : kerahat.isWarning
    ? KERAHAT.warningOnHero
    : HERO.onDark;
  const barColor = kerahat.isKerahat
    ? KERAHAT.dangerOnHero
    : kerahat.isWarning
    ? KERAHAT.warningOnHero
    : HERO.mint;

  const alertColor = kerahat.isKerahat ? KERAHAT.danger : KERAHAT.warning;

  return (
    <View style={[styles.root, { backgroundColor: palette.bg, paddingTop: insets.top + 8 }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: tabScrollPadding(insets.bottom) }]}
        showsVerticalScrollIndicator={false}
      >
        {Header}

        {/* ── Gün tamamlandıysa sakin kapanış kartı ── */}
        {!nextPrayer && (
          <Animated.View entering={FadeInDown.duration(500).delay(50)}>
            <View style={styles.hero}>
              <View style={styles.heroGlowBottom} pointerEvents="none" />
              <View style={styles.heroGlowTop} pointerEvents="none" />
              <View style={styles.heroTopRow}>
                <View style={styles.heroLabelWrap}>
                  <View style={styles.heroLabelDot} />
                  <Text style={styles.heroLabel}>Bugünün Vakitleri</Text>
                </View>
                <PressableScale style={styles.cityPill} onPress={() => setCityOpen(true)}>
                  <Ionicons name="location-sharp" size={11} color={HERO.mint} />
                  <Text style={styles.cityPillText} numberOfLines={1}>
                    {p.city ?? 'Şehir Seç'}
                  </Text>
                  <Ionicons name="chevron-down" size={11} color={HERO.onDarkSoft} />
                </PressableScale>
              </View>
              <Text style={[styles.heroName, { fontSize: 22 }]}>Vakitler tamamlandı</Text>
              <Text style={styles.heroDone}>Hayırlı geceler. Yarın imsakta görüşmek üzere.</Text>
            </View>
          </Animated.View>
        )}

        {/* ── Dev geri sayımlı zümrüt hero ── */}
        {nextPrayer && (
          <Animated.View entering={FadeInDown.duration(500).delay(50)}>
            <View style={styles.hero}>
              <View style={styles.heroGlowBottom} pointerEvents="none" />
              <View style={styles.heroGlowTop} pointerEvents="none" />

              <View style={styles.heroTopRow}>
                <View style={styles.heroLabelWrap}>
                  <View style={styles.heroLabelDot} />
                  <Text style={styles.heroLabel}>Sıradaki Vakit</Text>
                </View>
                <PressableScale style={styles.cityPill} onPress={() => setCityOpen(true)}>
                  <Ionicons name="location-sharp" size={11} color={HERO.mint} />
                  <Text style={styles.cityPillText} numberOfLines={1}>
                    {p.city ?? 'Şehir Seç'}
                  </Text>
                  <Ionicons name="chevron-down" size={11} color={HERO.onDarkSoft} />
                </PressableScale>
              </View>

              <View style={styles.heroMain}>
                <View style={{ flexShrink: 1 }}>
                  <Text style={styles.heroName}>{nextPrayer.name}</Text>
                  <Text style={styles.heroArabic}>{nextPrayer.arabicName}</Text>
                </View>
                <View style={styles.timePill}>
                  <Text style={styles.timePillText}>{formatTime(nextPrayer.time)}</Text>
                </View>
              </View>

              <View style={styles.countdownRow}>
                <Text style={[styles.countdown, { color: counterColor }]}>
                  {formatCountdown(msLeft)}
                </Text>
                <Text style={styles.countdownLabel}>kaldı</Text>
              </View>

              <HeroProgress progress={progress} color={barColor} />
            </View>
          </Animated.View>
        )}

        {/* ── Kerahat uyarısı ── */}
        {(kerahat.isKerahat || kerahat.isWarning) && (
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <View
              style={[
                styles.alertCard,
                { backgroundColor: `${alertColor}16`, borderColor: `${alertColor}3D` },
              ]}
            >
              <View style={[styles.alertDot, { backgroundColor: alertColor }]} />
              <Text style={[styles.alertText, { color: palette.fg }]}>
                {kerahat.isKerahat
                  ? `Kerahat vakti — ${formatTime(kerahat.period!.end)} kadar nafile namaz mekruhtur.`
                  : `Kerahat vaktine ${kerahat.minutesUntil} dakika kaldı — nafile namazı tamamla.`}
              </Text>
            </View>
          </Animated.View>
        )}

        {/* ── Günün zaman çizelgesi ── */}
        <Animated.View entering={FadeInDown.duration(500).delay(150)}>
          <Text style={[styles.sectionLabel, { color: palette.muted }]}>Bugünün Vakitleri</Text>
          <View style={[styles.listCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            {prayerList.map((prayer, idx) => {
              const allPassed = nextIdx === -1;
              const isNext = idx === nextIdx;
              const isPassed = allPassed || idx < nextIdx;
              const railDone = `${palette.accent}55`;
              const topDone = allPassed || idx <= nextIdx;
              const bottomDone = allPassed || idx < nextIdx;

              return (
                <View
                  key={prayer.name}
                  style={[styles.timelineRow, isNext && { backgroundColor: palette.accentSoft }]}
                >
                  <View style={styles.railWrap}>
                    {idx > 0 && (
                      <View
                        style={[styles.railTop, { backgroundColor: topDone ? railDone : palette.soft }]}
                      />
                    )}
                    {idx < prayerList.length - 1 && (
                      <View
                        style={[styles.railBottom, { backgroundColor: bottomDone ? railDone : palette.soft }]}
                      />
                    )}
                    {isNext ? (
                      <NextPulseDot color={palette.accent} />
                    ) : isPassed ? (
                      <View style={[styles.dot, { backgroundColor: palette.accent, opacity: 0.55 }]} />
                    ) : (
                      <View style={[styles.dotHollow, { borderColor: palette.soft }]} />
                    )}
                  </View>

                  <View style={styles.rowInner}>
                    <View>
                      <Text
                        style={
                          isNext
                            ? [styles.prayerNameNext, { color: palette.accent }]
                            : [styles.prayerName, { color: isPassed ? palette.muted : palette.fg }]
                        }
                      >
                        {prayer.name}
                      </Text>
                      {isNext ? (
                        <Text style={[styles.prayerRemain, { color: palette.accent }]}>
                          {formatRemainShort(prayer.time.getTime() - nowMs)} kaldı
                        </Text>
                      ) : (
                        <Text style={[styles.prayerArabic, { color: palette.muted }]}>
                          {prayer.arabic}
                        </Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.prayerTime,
                        {
                          color: isNext ? palette.accent : isPassed ? palette.muted : palette.fg,
                          opacity: isPassed ? 0.7 : 1,
                        },
                      ]}
                    >
                      {formatTime(prayer.time)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* ── Kerahat vakitleri ── */}
        <Animated.View entering={FadeInDown.duration(500).delay(210)}>
          <Text style={[styles.sectionLabel, { color: palette.muted }]}>Kerahat Vakitleri</Text>
          <View style={[styles.kerahatCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            {times.kerahatPeriods.map((period, i) => {
              const isLast = i === times.kerahatPeriods.length - 1;
              const dotColor = period.type === 'noon' ? KERAHAT.danger : KERAHAT.warning;
              return (
                <View
                  key={i}
                  style={[styles.kerahatRow, !isLast && [styles.kerahatRowBorder, { borderBottomColor: palette.border }]]}
                >
                  <View style={styles.kerahatLeft}>
                    <View style={[styles.kerahatDot, { backgroundColor: dotColor }]} />
                    <Text style={[styles.kerahatName, { color: palette.fg }]}>{period.name}</Text>
                  </View>
                  <Text style={[styles.kerahatRange, { color: palette.muted }]}>
                    {formatTime(period.start)} – {formatTime(period.end)}
                  </Text>
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* Alt imza */}
        <View style={styles.footerMark}>
          <View style={[styles.footerLine, { backgroundColor: palette.border }]} />
          <Text style={[styles.footerText, { color: palette.muted }]}>Furkan</Text>
        </View>
      </ScrollView>

      <CityPicker visible={cityOpen} onClose={() => setCityOpen(false)} onAuto={p.retry} />
    </View>
  );
}
