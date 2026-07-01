import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  getNextPrayer,
  getCurrentKerahatStatus,
  formatTime,
} from '../../lib/prayerTimes';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { tabScrollPadding } from '../../lib/layout';
import { CityPicker } from '../../components/CityPicker';
import { PressableScale } from '../../components/PressableScale';
import { styles, THEME } from './PrayerTimesScreen.styles';

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

const PRAYER_ICONS: Record<string, string> = {
  İmsak: '🌙',
  Sabah: '🌅',
  Güneş: '☀️',
  Öğle: '🌞',
  İkindi: '🌤️',
  Akşam: '🌆',
  Yatsı: '🌃',
};

export default function PrayerTimesScreen() {
  const insets = useSafeAreaInsets();
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
    year: 'numeric',
  });

  const CityButton = (
    <PressableScale style={styles.cityBtn} onPress={() => setCityOpen(true)}>
      <Text style={styles.cityBtnIcon}>📍</Text>
      <Text style={styles.cityBtnText} numberOfLines={1}>
        {p.city || (p.source === 'gps' ? 'Konum' : 'Şehir Seç')}
      </Text>
      <Text style={styles.cityBtnCaret}>▼</Text>
    </PressableScale>
  );

  // Konum yok / hata → nazik yönlendirme (ısrarlı izin isteği yok)
  if (p.status === 'needsLocation' || p.status === 'error') {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 12 }]}>
        <StatusBar style="light" />
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyEmoji}>🕌</Text>
          <Text style={styles.emptyTitle}>Namaz Vakitleri</Text>
          <Text style={styles.emptyText}>
            Vakitleri gösterebilmek için bir şehir seç ya da cihaz konumunu kullan.
          </Text>
          <PressableScale style={styles.emptyPrimary} onPress={() => setCityOpen(true)}>
            <Text style={styles.emptyPrimaryText}>Şehir Seç</Text>
          </PressableScale>
          <PressableScale style={styles.emptyGhost} onPress={p.retry}>
            <Text style={styles.emptyGhostText}>Konumu Kullan</Text>
          </PressableScale>
        </View>
        <CityPicker visible={cityOpen} onClose={() => setCityOpen(false)} onAuto={p.retry} />
      </View>
    );
  }

  if (p.status === 'loading' || !p.times) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 12, justifyContent: 'center', alignItems: 'center' }]}>
        <StatusBar style="light" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  const times = p.times;
  const nextPrayer = getNextPrayer(times);
  const kerahat = getCurrentKerahatStatus(times);
  const msLeft = nextPrayer ? nextPrayer.time.getTime() - now.getTime() : 0;
  const countdown = formatCountdown(msLeft);

  const counterColor = kerahat.isKerahat
    ? THEME.danger
    : kerahat.isWarning
    ? THEME.warning
    : THEME.accent;

  const nowMs = now.getTime();

  const prayerList = [
    { name: 'İmsak', time: times.prayers.imsak, arabic: 'الإمساك' },
    { name: 'Sabah', time: times.prayers.fajr, arabic: 'الفجر' },
    { name: 'Güneş', time: times.prayers.sunrise, arabic: 'الشروق' },
    { name: 'Öğle', time: times.prayers.dhuhr, arabic: 'الظهر' },
    { name: 'İkindi', time: times.prayers.asr, arabic: 'العصر' },
    { name: 'Akşam', time: times.prayers.maghrib, arabic: 'المغرب' },
    { name: 'Yatsı', time: times.prayers.isha, arabic: 'العشاء' },
  ];

  const nextIdx = prayerList.findIndex((pr) => pr.time.getTime() > nowMs);
  const prevMs = nextIdx > 0 ? prayerList[nextIdx - 1].time.getTime() : nowMs;
  const nextMs = nextPrayer?.time.getTime() ?? nowMs;
  const progress = nextMs > prevMs ? Math.min(1, (nowMs - prevMs) / (nextMs - prevMs)) : 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 12 }]}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: tabScrollPadding(insets.bottom) }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.headerEyebrow}>Namaz Vakitleri</Text>
            {CityButton}
          </View>
          <Text style={styles.headerTitle}>Bugün</Text>
          <Text style={styles.headerDate}>{dateStr}</Text>
        </View>

        {nextPrayer && (
          <View style={styles.heroCard}>
            <View style={styles.heroHeaderRow}>
              <Text style={styles.heroLabel}>Sıradaki Vakit</Text>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>AKTİF TAKİP</Text>
              </View>
            </View>

            <View style={styles.heroPrayerRow}>
              <View>
                <Text style={styles.heroPrayerName}>{nextPrayer.name}</Text>
                <Text style={styles.heroPrayerArabic}>{nextPrayer.arabicName}</Text>
              </View>
              <View style={styles.heroTimePill}>
                <Text style={styles.heroTimePillText}>{formatTime(nextPrayer.time)}</Text>
              </View>
            </View>

            <Text style={[styles.heroCountdown, { color: counterColor }]}>{countdown}</Text>
            <Text style={styles.heroSub}>vakte kalan süre</Text>

            <View style={styles.heroProgressTrack}>
              <View
                style={[
                  styles.heroProgressFill,
                  { width: `${Math.round(progress * 100)}%`, backgroundColor: counterColor },
                ]}
              />
            </View>
          </View>
        )}

        {(kerahat.isKerahat || kerahat.isWarning) && (
          <View style={[styles.alertCard, kerahat.isKerahat ? styles.alertCardDanger : styles.alertCardWarn]}>
            <View style={[styles.alertDot, { backgroundColor: kerahat.isKerahat ? THEME.danger : THEME.warning }]} />
            <Text style={[styles.alertText, { color: kerahat.isKerahat ? '#FFD6D0' : '#F7D9A7' }]}>
              {kerahat.isKerahat
                ? `Kerahat vakti — ${formatTime(kerahat.period!.end)} kadar nafile namaz mekruhtur.`
                : `Kerahat vaktine ${kerahat.minutesUntil} dakika kaldı — nafile namazı tamamla.`}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Tüm Vakitler</Text>
        <View style={styles.listCard}>
          {prayerList.map((prayer, idx) => {
            const isNext = nextPrayer?.name === prayer.name;
            const isPassed = prayer.time.getTime() < nowMs && !isNext;
            const isLast = idx === prayerList.length - 1;
            return (
              <View key={prayer.name} style={[styles.prayerRow, !isLast && styles.prayerRowBorder]}>
                <View style={styles.prayerLeft}>
                  <View style={[styles.prayerIconWrap, isNext && styles.prayerIconWrapActive]}>
                    <Text style={styles.prayerIcon}>{PRAYER_ICONS[prayer.name] ?? '🕌'}</Text>
                  </View>
                  <View>
                    <Text style={[styles.prayerName, isNext && styles.prayerNameActive, isPassed && styles.prayerNamePassed]}>
                      {prayer.name}
                    </Text>
                    <Text style={styles.prayerArabic}>{prayer.arabic}</Text>
                  </View>
                </View>
                <View style={styles.prayerRight}>
                  {isNext && (
                    <View style={styles.inlineBadge}>
                      <Text style={styles.inlineBadgeText}>SIRADA</Text>
                    </View>
                  )}
                  <Text style={[styles.prayerTime, isNext && styles.prayerTimeActive, isPassed && styles.prayerTimePassed]}>
                    {formatTime(prayer.time)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Kerahat Vakitleri</Text>
        <View style={styles.kerahatCard}>
          {times.kerahatPeriods.map((period, i) => {
            const isLast = i === times.kerahatPeriods.length - 1;
            return (
              <View key={i} style={[styles.kerahatRow, !isLast && styles.kerahatRowBorder]}>
                <View style={styles.kerahatLeft}>
                  <View style={styles.kerahatDot} />
                  <Text style={styles.kerahatName}>{period.name}</Text>
                </View>
                <Text style={styles.kerahatRange}>
                  {formatTime(period.start)} – {formatTime(period.end)}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.ornament}>✦ ✦ ✦</Text>
      </ScrollView>

      <CityPicker visible={cityOpen} onClose={() => setCityOpen(false)} onAuto={p.retry} />
    </View>
  );
}
