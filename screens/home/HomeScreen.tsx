import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Share, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useTodayContent } from '../../hooks/useTodayContent';
import { useTheme } from '../../hooks/useTheme';
import { usePrayerTimes, type PrayerTimesState } from '../../hooks/usePrayerTimes';
import { useMushafStore } from '../../lib/store';
import { syncWidgetsAndStorage } from '../../lib/storage';
import { getSurahNameTurkish } from '../../lib/surahNames';
import { getTranslation } from '../../lib/quranData';
import { formatTime } from '../../lib/prayerTimes';
import { tabScrollPadding } from '../../lib/layout';
import { PressableScale } from '../../components/PressableScale';
import { CityPicker } from '../../components/CityPicker';
import { styles, HERO, TEAL } from './HomeScreen.styles';

/* ─── Yardımcılar ─────────────────────────────────── */

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

/** Saniyede bir güncellenen saat — geri sayım gösteren parçalar için. */
function useNowTicker(active: boolean): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [active]);

  return now;
}

/* ─── Başlık alt satırı: hicri tarih + canlı geri sayım ── */

function LiveHeaderSub({
  state,
  muted,
  accent,
  fadeStyle,
}: {
  state: PrayerTimesState;
  muted: string;
  accent: string;
  fadeStyle: object;
}) {
  const ready = state.status === 'ready' && !!state.next;
  const now = useNowTicker(ready);
  const hijri = state.hijriDate;

  if (!hijri && !ready) return null;

  return (
    <Animated.Text
      style={[styles.greetingSub, { color: muted }, fadeStyle]}
      numberOfLines={1}
      onPress={() => router.push('/prayer-times')}
      suppressHighlighting
    >
      {hijri ?? ''}
      {hijri && ready ? '   ·   ' : ''}
      {ready && state.next ? (
        <>
          {state.next.name} vaktine{' '}
          <Text style={[styles.subCountdown, { color: accent }]}>
            {formatCountdown(state.next.time.getTime() - now)}
          </Text>
        </>
      ) : null}
    </Animated.Text>
  );
}

/* ─── Yapışkan bar: kaydırınca beliren canlı sayaç ── */

function StickyPrayerInfo({
  state,
  fg,
  accent,
}: {
  state: PrayerTimesState;
  fg: string;
  accent: string;
}) {
  const ready = state.status === 'ready' && !!state.next;
  const now = useNowTicker(ready);

  if (!ready || !state.next) {
    return <Text style={[styles.stickyTitle, { color: fg }]}>Furkan</Text>;
  }

  return (
    <View style={styles.stickyInfo}>
      <Text style={[styles.stickyTitle, { color: fg }]}>{state.next.name} vaktine</Text>
      <Text style={[styles.stickyTime, { color: accent }]}>
        {formatCountdown(state.next.time.getTime() - now)}
      </Text>
    </View>
  );
}

/* ─── Namaz hero kartı ────────────────────────────── */

function PrayerHeroCard({
  state,
  onPickCity,
  onEnableLocation,
}: {
  state: PrayerTimesState;
  onPickCity: () => void;
  onEnableLocation: () => void;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (state.status !== 'ready' || !state.next) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [state.status, state.next]);

  const HeroLabel = ({ text }: { text: string }) => (
    <View style={styles.heroLabelWrap}>
      <View style={styles.heroLabelDot} />
      <Text style={styles.prayerHeroLabel}>{text}</Text>
    </View>
  );

  const CityPill = state.city ? (
    <PressableScale style={styles.cityPill} onPress={onPickCity}>
      <Ionicons name="location-sharp" size={11} color={HERO.mint} />
      <Text style={styles.cityPillText} numberOfLines={1}>
        {state.city}
      </Text>
      <Ionicons name="chevron-down" size={11} color={HERO.onDarkSoft} />
    </PressableScale>
  ) : null;

  if (state.status === 'loading') {
    return (
      <View style={styles.prayerHero}>
        <View style={styles.heroGlowBottom} pointerEvents="none" />
        <View style={styles.heroGlowTop} pointerEvents="none" />
        <HeroLabel text="Sıradaki Vakit" />
        <Text style={styles.heroMuted}>Namaz vakitleri hazırlanıyor…</Text>
      </View>
    );
  }

  if (state.status === 'needsLocation' || state.status === 'error') {
    return (
      <View style={styles.prayerHero}>
        <View style={styles.heroGlowBottom} pointerEvents="none" />
        <View style={styles.heroGlowTop} pointerEvents="none" />
        <HeroLabel text="Namaz Vakitleri" />
        <Text style={[styles.prayerHeroName, { fontSize: 22, marginTop: 10 }]}>Konum gerekli</Text>
        <Text style={styles.heroMuted}>
          Bir şehir seç ya da konumunu kullan; vakitleri anında görelim.
        </Text>
        <View style={styles.heroActions}>
          <PressableScale style={styles.heroCta} onPress={onPickCity}>
            <Ionicons name="search-outline" size={14} color={HERO.bgAlt} />
            <Text style={styles.heroCtaText}>Şehir Seç</Text>
          </PressableScale>
          <PressableScale style={styles.heroCtaGhost} onPress={onEnableLocation}>
            <Ionicons name="navigate-outline" size={14} color={HERO.onDark} />
            <Text style={styles.heroCtaGhostText}>Konumu Kullan</Text>
          </PressableScale>
        </View>
      </View>
    );
  }

  if (!state.next) {
    return (
      <View style={styles.prayerHero}>
        <View style={styles.heroGlowBottom} pointerEvents="none" />
        <View style={styles.heroGlowTop} pointerEvents="none" />
        <View style={styles.prayerHeroTopRow}>
          <HeroLabel text="Bugünün Vakitleri" />
          {CityPill}
        </View>
        <Text style={[styles.prayerHeroName, { fontSize: 22 }]}>Vakitler tamamlandı</Text>
        <Text style={styles.heroMuted}>Hayırlı geceler. Yarın imsakta görüşmek üzere.</Text>
      </View>
    );
  }

  const next = state.next;
  const nextIdx = state.slots.findIndex((s) => s.name === next.name);
  const startOfDay = new Date(next.time);
  startOfDay.setHours(0, 0, 0, 0);
  const prevMs = nextIdx > 0 ? state.slots[nextIdx - 1].time.getTime() : startOfDay.getTime();
  const nextMs = next.time.getTime();
  const progress =
    nextMs > prevMs ? Math.min(1, Math.max(0, (now - prevMs) / (nextMs - prevMs))) : 0;
  const remaining = formatCountdown(next.time.getTime() - now);

  return (
    <Pressable
      onPress={() => router.push('/prayer-times')}
      style={({ pressed }) => [styles.prayerHero, { opacity: pressed ? 0.94 : 1 }]}
    >
      <View style={styles.heroGlowBottom} pointerEvents="none" />
      <View style={styles.heroGlowTop} pointerEvents="none" />
      <View style={styles.prayerHeroTopRow}>
        <HeroLabel text="Sıradaki Vakit" />
        {CityPill}
      </View>

      <View style={styles.prayerHeroMain}>
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.prayerHeroName}>{next.name}</Text>
          <Text style={styles.prayerHeroArabic}>{next.arabic}</Text>
        </View>
        <View style={styles.timePill}>
          <Text style={styles.timePillText}>{formatTime(next.time)}</Text>
        </View>
      </View>

      <View style={styles.countdownRow}>
        <Text style={styles.prayerHeroCountdown}>{remaining}</Text>
        <Text style={styles.prayerHeroCountLabel}>vakte kalan</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
      </View>
    </Pressable>
  );
}

/* ─── Günün vakit şeridi ──────────────────────────── */

function PrayerStrip({
  state,
  cardBg,
  border,
  muted,
  fg,
  accent,
}: {
  state: PrayerTimesState;
  cardBg: string;
  border: string;
  muted: string;
  fg: string;
  accent: string;
}) {
  if (state.status !== 'ready' || state.slots.length === 0) return null;
  const nowMs = Date.now();

  return (
    <View style={[styles.stripCard, { backgroundColor: cardBg, borderColor: border }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stripContent}
      >
        {state.slots.map((slot) => {
          const isNext = state.next?.name === slot.name;
          const isPassed = slot.time.getTime() < nowMs && !isNext;
          return (
            <View
              key={slot.name}
              style={[styles.stripItem, isNext && { backgroundColor: `${accent}17` }]}
            >
              <Text
                style={[
                  styles.stripName,
                  { color: isNext ? accent : muted, opacity: isPassed ? 0.45 : 1 },
                ]}
              >
                {slot.name}
              </Text>
              <Text
                style={[
                  styles.stripTime,
                  { color: isNext ? accent : fg, opacity: isPassed ? 0.45 : 1 },
                ]}
              >
                {formatTime(slot.time)}
              </Text>
              <View
                style={[
                  styles.stripNextDot,
                  { backgroundColor: isNext ? accent : 'transparent' },
                ]}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* ─── Ana ekran ───────────────────────────────────── */

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();
  const content = useTodayContent();
  const prayer = usePrayerTimes();
  const [cityPickerOpen, setCityPickerOpen] = useState(false);

  const surahName = getSurahNameTurkish(content.verse.surah_number);
  const setLastSynced = useMushafStore((s) => s.setLastSyncedDateSeed);
  const selectedTranslation = useMushafStore((s) => s.selectedTranslation);

  const verseTranslation = getTranslation(
    content.verse.surah_number,
    content.verse.verse_number,
    selectedTranslation,
  );

  useEffect(() => {
    syncWidgetsAndStorage()
      .then(() => setLastSynced(content.dateSeed))
      .catch(() => {});
  }, [content.dateSeed, setLastSynced]);

  // Kaydırma animasyonları
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });
  const headerShift = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scrollY.value, [0, 120], [0, -10], Extrapolation.CLAMP) }],
  }));
  const subFade = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [12, 68], [1, 0], Extrapolation.CLAMP),
  }));
  const stickyStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [80, 140], [0, 1], Extrapolation.CLAMP),
    transform: [{ translateY: interpolate(scrollY.value, [80, 140], [-10, 0], Extrapolation.CLAMP) }],
  }));

  const dateStr = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const openSurah = () =>
    router.push({ pathname: '/surah/[id]', params: { id: content.verse.surah_number } });

  const shareVerse = () => {
    Share.share({
      message:
        `${content.verse.arabic}\n\n${verseTranslation}\n\n` +
        `${surahName} Sûresi ${content.verse.surah_number}:${content.verse.verse_number}\n\n` +
        `Furkan — Kur'an-ı Kerim`,
    }).catch(() => {});
  };

  const shareHadith = () => {
    Share.share({
      message:
        `${content.hadith.text_turkish}\n\n${content.hadith.source}` +
        `${content.hadith.narrator ? ' · ' + content.hadith.narrator : ''}\n\n` +
        `Furkan — Günün Hadisi`,
    }).catch(() => {});
  };

  const navItems = [
    {
      label: 'Sureler',
      desc: '114 sure',
      icon: 'book-outline' as const,
      route: '/surah/index' as const,
      tint: palette.accent,
    },
    {
      label: 'Cüzler',
      desc: '30 cüz',
      icon: 'albums-outline' as const,
      route: '/surah/juz' as const,
      tint: palette.gold,
    },
    {
      label: 'Sayfalar',
      desc: '604 sayfa',
      icon: 'document-text-outline' as const,
      route: '/surah/page' as const,
      tint: TEAL,
    },
  ];

  return (
    <View style={[styles.root, { backgroundColor: palette.bg, paddingTop: insets.top + 8 }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Kaydırınca beliren kompakt üst bar */}
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.stickyBar,
          {
            paddingTop: insets.top + 6,
            height: insets.top + 54,
            backgroundColor: palette.card,
            borderBottomColor: palette.border,
          },
          stickyStyle,
        ]}
      >
        <StickyPrayerInfo state={prayer} fg={palette.fg} accent={palette.accent} />
        <PressableScale
          onPress={() => router.push('/settings')}
          style={[styles.stickyIconBtn, { borderColor: palette.soft, backgroundColor: palette.input }]}
        >
          <Ionicons name="settings-outline" size={16} color={palette.fg} />
        </PressableScale>
      </Animated.View>

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scroll, { paddingBottom: tabScrollPadding(insets.bottom, 24) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Başlık */}
        <Animated.View entering={FadeInDown.duration(500)}>
          <Animated.View style={[styles.titleRow, headerShift]}>
            <View style={styles.titleBlock}>
              <Text style={[styles.greetingEyebrow, { color: palette.accent }]}>Selamün Aleyküm</Text>
              <Text style={[styles.greetingTitle, { color: palette.fg }]}>{dateStr}</Text>
              <LiveHeaderSub
                state={prayer}
                muted={palette.muted}
                accent={palette.accent}
                fadeStyle={subFade}
              />
            </View>
            <PressableScale
              onPress={() => router.push('/settings')}
              style={[styles.settingsBtn, { borderColor: palette.soft, backgroundColor: palette.card }]}
            >
              <Ionicons name="settings-outline" size={18} color={palette.fg} />
            </PressableScale>
          </Animated.View>
        </Animated.View>

        {/* ── Günün Ayeti ── */}
        <Animated.View entering={FadeInDown.duration(520).delay(80)}>
          <View
            style={[
              styles.featureCard,
              styles.cardShadow,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <View style={styles.featureHeaderRow}>
              <View style={styles.featureKickerWrap}>
                <View style={[styles.featureKickerDot, { backgroundColor: palette.accent }]} />
                <Text style={[styles.featureKicker, { color: palette.accent }]}>Günün Ayeti</Text>
              </View>
              <View style={[styles.featureBadge, { backgroundColor: palette.accentSoft }]}>
                <Text style={[styles.featureBadgeText, { color: palette.accent }]}>{surahName}</Text>
              </View>
            </View>

            <Text style={[styles.arabic, { color: palette.fg }]}>{content.verse.arabic}</Text>

            <View style={[styles.accentRule, { backgroundColor: palette.accent }]} />

            <Text style={[styles.turkish, { color: palette.muted }]}>{verseTranslation}</Text>

            <View style={styles.featureFooterRow}>
              <Text style={[styles.featureRef, { color: palette.accent }]} numberOfLines={1}>
                {surahName} · {content.verse.surah_number}:{content.verse.verse_number}
              </Text>
              <View style={styles.footerActions}>
                <PressableScale
                  style={[styles.textBtn, { backgroundColor: palette.input }]}
                  onPress={shareVerse}
                >
                  <Text style={[styles.textBtnLabel, { color: palette.muted }]}>Paylaş</Text>
                </PressableScale>
                <PressableScale
                  style={[styles.textBtn, { backgroundColor: palette.accentSoft }]}
                  onPress={openSurah}
                >
                  <Text style={[styles.textBtnLabel, { color: palette.accent }]}>Sûreyi Oku</Text>
                </PressableScale>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* ── Günün Hadisi (altın) ── */}
        <Animated.View entering={FadeInDown.duration(520).delay(150)}>
          <View
            style={[
              styles.featureCard,
              styles.cardShadow,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <View style={styles.featureHeaderRow}>
              <View style={styles.featureKickerWrap}>
                <View style={[styles.featureKickerDot, { backgroundColor: palette.gold }]} />
                <Text style={[styles.featureKicker, { color: palette.gold }]}>Günün Hadisi</Text>
              </View>
            </View>

            <View style={styles.quoteRow}>
              <View style={[styles.quoteBar, { backgroundColor: `${palette.gold}66` }]} />
              <Text style={[styles.hadith, { color: palette.fg }]}>{content.hadith.text_turkish}</Text>
            </View>

            <View style={styles.featureFooterRow}>
              <Text style={[styles.featureRef, { color: palette.gold }]} numberOfLines={1}>
                {content.hadith.source}
                {content.hadith.narrator ? ` · ${content.hadith.narrator}` : ''}
              </Text>
              <View style={styles.footerActions}>
                <PressableScale
                  style={[styles.textBtn, { backgroundColor: palette.goldSoft }]}
                  onPress={shareHadith}
                >
                  <Text style={[styles.textBtnLabel, { color: palette.gold }]}>Paylaş</Text>
                </PressableScale>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* ── Namaz Vakti ── */}
        <Animated.View entering={FadeInDown.duration(520).delay(220)}>
          <View style={styles.sectionRow}>
            <Text style={[styles.sectionLabel, { color: palette.muted }]}>Namaz Vakti</Text>
            <Pressable onPress={() => router.push('/prayer-times')} hitSlop={8} style={styles.sectionLink}>
              <Text style={[styles.sectionLinkText, { color: palette.accent }]}>Tümü</Text>
              <Ionicons name="chevron-forward" size={13} color={palette.accent} />
            </Pressable>
          </View>

          <View>
            <PrayerHeroCard
              state={prayer}
              onPickCity={() => setCityPickerOpen(true)}
              onEnableLocation={prayer.retry}
            />
            <PrayerStrip
              state={prayer}
              cardBg={palette.card}
              border={palette.border}
              muted={palette.muted}
              fg={palette.fg}
              accent={palette.accent}
            />
          </View>
        </Animated.View>

        {/* ── Kur'an'a Eriş ── */}
        <Animated.View entering={FadeInDown.duration(520).delay(290)}>
          <View style={styles.sectionRow}>
            <Text style={[styles.sectionLabel, { color: palette.muted }]}>Kur'an'a Eriş</Text>
          </View>

          <View style={styles.navGrid}>
            {navItems.map((item) => (
              <PressableScale
                key={item.label}
                onPress={() => router.push(item.route)}
                style={[
                  styles.navCard,
                  styles.cardShadow,
                  { backgroundColor: palette.card, borderColor: palette.border },
                ]}
              >
                <View style={[styles.navCardIconWrap, { backgroundColor: `${item.tint}17` }]}>
                  <Ionicons name={item.icon} size={17} color={item.tint} />
                </View>
                <View>
                  <Text style={[styles.navCardLabel, { color: palette.fg }]}>{item.label}</Text>
                  <Text style={[styles.navCardDesc, { color: palette.muted }]}>{item.desc}</Text>
                </View>
              </PressableScale>
            ))}
          </View>
        </Animated.View>

        {/* Alt imza */}
        <View style={styles.footerMark}>
          <View style={[styles.footerLine, { backgroundColor: palette.border }]} />
          <Text style={[styles.footerText, { color: palette.muted }]}>Furkan</Text>
        </View>
      </Animated.ScrollView>

      <CityPicker
        visible={cityPickerOpen}
        onClose={() => setCityPickerOpen(false)}
        onAuto={prayer.retry}
      />
    </View>
  );
}