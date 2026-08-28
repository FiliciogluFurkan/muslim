import { useMemo } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { tabScrollPadding } from '../../lib/layout';
import { FONT } from '../../lib/typography';
import { useMushafStore, PRAYER_NAMES, type PrayerName, type DayKey } from '../../lib/store';

// Bugünden geriye 28 gün (4 hafta)
function getLast28Days(): DayKey[] {
  const days: DayKey[] = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

function todayKey(): DayKey {
  return new Date().toISOString().split('T')[0];
}

function dayLabel(key: DayKey): string {
  const d = new Date(key);
  return ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'][d.getDay()];
}

function shortDate(key: DayKey): string {
  const d = new Date(key);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function countPrayers(record: Partial<Record<PrayerName, boolean>>): number {
  return PRAYER_NAMES.filter(p => record[p]).length;
}

// GitHub benzeri ısı haritası rengi
function heatColor(count: number, accent: string): string {
  if (count === 0) return 'transparent';
  if (count === 1) return `${accent}30`;
  if (count === 2) return `${accent}55`;
  if (count === 3) return `${accent}80`;
  if (count === 4) return `${accent}BB`;
  return accent; // 5
}

const PRAYER_ICONS: Record<PrayerName, string> = {
  Sabah: '🌅',
  Öğle: '🌞',
  İkindi: '🌤️',
  Akşam: '🌆',
  Yatsı: '🌃',
};

export default function NamazTakipScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();
  const { prayerLog, togglePrayer } = useMushafStore();

  const today = todayKey();
  const days = useMemo(() => getLast28Days(), []);
  const todayRecord = prayerLog[today] ?? {};
  const todayCount = countPrayers(todayRecord);

  // 4 satır × 7 sütun grid (GitHub gibi)
  const weeks = useMemo(() => {
    const result: DayKey[][] = [];
    for (let i = 0; i < 4; i++) {
      result.push(days.slice(i * 7, i * 7 + 7));
    }
    return result;
  }, [days]);

  // Toplam istatistik
  const stats = useMemo(() => {
    let total = 0;
    let perfect = 0;
    days.forEach(d => {
      const c = countPrayers(prayerLog[d] ?? {});
      total += c;
      if (c === 5) perfect++;
    });
    return { total, perfect, avg: (total / 28).toFixed(1) };
  }, [days, prayerLog]);

  return (
    <View style={[s.root, { backgroundColor: palette.bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={[
          s.scroll,
          { paddingTop: insets.top + 16, paddingBottom: tabScrollPadding(insets.bottom) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} style={s.header}>
          <Text style={[s.eyebrow, { color: palette.accent }]}>Furkan</Text>
          <Text style={[s.title, { color: palette.fg }]}>Namaz Takibi</Text>
          <Text style={[s.subtitle, { color: palette.muted }]}>
            Son 4 haftanın özeti
          </Text>
        </Animated.View>

        {/* Stat kartları */}
        <Animated.View entering={FadeInDown.duration(420).delay(60)} style={s.statRow}>
          {[
            { label: 'Toplam', value: String(stats.total), unit: 'vakit' },
            { label: 'Tam Gün', value: String(stats.perfect), unit: 'gün' },
            { label: 'Günlük Ort.', value: stats.avg, unit: 'vakit' },
          ].map((stat) => (
            <View
              key={stat.label}
              style={[s.statCard, { backgroundColor: palette.card, borderColor: palette.border }]}
            >
              <Text style={[s.statValue, { color: palette.fg }]}>{stat.value}</Text>
              <Text style={[s.statUnit, { color: palette.accent }]}>{stat.unit}</Text>
              <Text style={[s.statLabel, { color: palette.muted }]}>{stat.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Isı haritası */}
        <Animated.View entering={FadeInDown.duration(440).delay(100)}>
          <View style={[s.heatCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <View style={s.heatHeader}>
              <Text style={[s.sectionTitle, { color: palette.fg }]}>4 Haftalık Görünüm</Text>
              <View style={s.legend}>
                {[0, 1, 2, 3, 4, 5].map(n => (
                  <View
                    key={n}
                    style={[
                      s.legendDot,
                      {
                        backgroundColor: n === 0
                          ? palette.border
                          : heatColor(n, palette.accent),
                        borderWidth: n === 0 ? 1 : 0,
                        borderColor: palette.border,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Gün isimleri */}
            <View style={s.dayLabels}>
              {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
                <Text key={d} style={[s.dayLabelText, { color: palette.muted }]}>{d}</Text>
              ))}
            </View>

            {/* 4 satır grid */}
            <View style={s.heatGrid}>
              {weeks.map((week, wi) => (
                <View key={wi} style={s.heatRow}>
                  {week.map((dayKey) => {
                    const count = countPrayers(prayerLog[dayKey] ?? {});
                    const isToday = dayKey === today;
                    const isFuture = dayKey > today;
                    return (
                      <View key={dayKey} style={s.heatCellWrap}>
                        <View
                          style={[
                            s.heatCell,
                            {
                              backgroundColor: isFuture
                                ? 'transparent'
                                : count === 0
                                ? palette.input
                                : heatColor(count, palette.accent),
                              borderWidth: isToday ? 2 : 0,
                              borderColor: isToday ? palette.accent : 'transparent',
                            },
                          ]}
                        />
                        {isToday && (
                          <Text style={[s.todayDot, { color: palette.accent }]}>▾</Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>

            {/* Tarih etiketleri alt */}
            <View style={s.dateLabels}>
              {weeks.map((week, wi) => (
                <Text key={wi} style={[s.dateLabelText, { color: palette.muted }]}>
                  {shortDate(week[0])}
                </Text>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Bugünkü namazlar */}
        <Animated.View entering={FadeInDown.duration(460).delay(140)}>
          <View style={s.sectionRow}>
            <Text style={[s.sectionTitle, { color: palette.fg }]}>Bugün</Text>
            <Text style={[s.todayCount, { color: palette.accent }]}>
              {todayCount}/5 vakit
            </Text>
          </View>

          <View style={[s.todayCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            {/* Progress bar */}
            <View style={[s.progressTrack, { backgroundColor: palette.input }]}>
              <Animated.View
                style={[
                  s.progressFill,
                  {
                    backgroundColor: palette.accent,
                    width: `${(todayCount / 5) * 100}%` as any,
                  },
                ]}
              />
            </View>

            {/* Vakit satırları */}
            {PRAYER_NAMES.map((prayer, i) => {
              const done = !!todayRecord[prayer];
              return (
                <Animated.View
                  key={prayer}
                  entering={FadeInDown.duration(360).delay(160 + i * 40)}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => togglePrayer(today, prayer)}
                    style={[
                      s.prayerRow,
                      {
                        backgroundColor: done ? `${palette.accent}12` : 'transparent',
                        borderBottomColor: palette.border,
                        borderBottomWidth: i < 4 ? StyleSheet.hairlineWidth : 0,
                      },
                    ]}
                  >
                    <Text style={s.prayerIcon}>{PRAYER_ICONS[prayer]}</Text>
                    <Text style={[s.prayerName, { color: done ? palette.accent : palette.fg }]}>
                      {prayer}
                    </Text>
                    <View
                      style={[
                        s.checkbox,
                        {
                          backgroundColor: done ? palette.accent : 'transparent',
                          borderColor: done ? palette.accent : palette.border,
                        },
                      ]}
                    >
                      {done && <Text style={s.checkmark}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>

        {/* Bu haftanın detayı */}
        <Animated.View entering={FadeInDown.duration(480).delay(180)}>
          <Text style={[s.sectionTitle, { color: palette.fg, marginTop: 24, marginBottom: 12 }]}>
            Bu Hafta
          </Text>
          <View style={[s.weekCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            {days.slice(21).map((dayKey, i) => {
              const record = prayerLog[dayKey] ?? {};
              const count = countPrayers(record);
              const isToday = dayKey === today;
              const isFuture = dayKey > today;
              const d = new Date(dayKey);
              const dayName = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][d.getDay()];
              return (
                <View
                  key={dayKey}
                  style={[
                    s.weekRow,
                    {
                      borderBottomColor: palette.border,
                      borderBottomWidth: i < 6 ? StyleSheet.hairlineWidth : 0,
                    },
                  ]}
                >
                  <View style={s.weekLeft}>
                    <Text style={[s.weekDay, { color: isToday ? palette.accent : palette.fg }]}>
                      {isToday ? 'Bugün' : dayName}
                    </Text>
                    <Text style={[s.weekDate, { color: palette.muted }]}>
                      {shortDate(dayKey)}
                    </Text>
                  </View>
                  {isFuture ? (
                    <Text style={[s.weekFuture, { color: palette.soft }]}>—</Text>
                  ) : (
                    <View style={s.weekDots}>
                      {PRAYER_NAMES.map((p) => (
                        <View
                          key={p}
                          style={[
                            s.weekDot,
                            {
                              backgroundColor: record[p]
                                ? palette.accent
                                : palette.input,
                            },
                          ]}
                        />
                      ))}
                      <Text style={[s.weekCount, { color: count === 5 ? palette.accent : palette.muted }]}>
                        {count}/5
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20 },
  header: { marginBottom: 20, gap: 4 },
  eyebrow: {
    fontFamily: FONT.extrabold,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  title: { fontFamily: FONT.extrabold, fontSize: 28, letterSpacing: -0.6 },
  subtitle: { fontFamily: FONT.medium, fontSize: 14 },

  // Stat kartları
  statRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    gap: 2,
  },
  statValue: { fontFamily: FONT.extrabold, fontSize: 22, letterSpacing: -0.5 },
  statUnit: { fontFamily: FONT.semibold, fontSize: 11 },
  statLabel: { fontFamily: FONT.medium, fontSize: 11 },

  // Isı haritası
  heatCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
    gap: 12,
  },
  heatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  legend: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  legendDot: { width: 12, height: 12, borderRadius: 3 },
  dayLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 2,
  },
  dayLabelText: { fontFamily: FONT.medium, fontSize: 10, width: 28, textAlign: 'center' },
  heatGrid: { gap: 5 },
  heatRow: { flexDirection: 'row', justifyContent: 'space-around' },
  heatCellWrap: { alignItems: 'center', gap: 2 },
  heatCell: { width: 28, height: 28, borderRadius: 7 },
  todayDot: { fontSize: 8, lineHeight: 8 },
  dateLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 2,
  },
  dateLabelText: { fontFamily: FONT.medium, fontSize: 10, width: 28, textAlign: 'center' },

  // Bölüm başlığı
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: { fontFamily: FONT.extrabold, fontSize: 17, letterSpacing: -0.3 },
  todayCount: { fontFamily: FONT.bold, fontSize: 14 },

  // Bugün kartı
  todayCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressTrack: { height: 3 },
  progressFill: { height: 3, borderRadius: 2 },
  prayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 14,
  },
  prayerIcon: { fontSize: 20 },
  prayerName: { flex: 1, fontFamily: FONT.semibold, fontSize: 16 },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },

  // Bu hafta
  weekCard: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', marginBottom: 8 },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  weekLeft: { gap: 2 },
  weekDay: { fontFamily: FONT.semibold, fontSize: 15 },
  weekDate: { fontFamily: FONT.medium, fontSize: 12 },
  weekDots: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  weekDot: { width: 10, height: 10, borderRadius: 5 },
  weekCount: { fontFamily: FONT.bold, fontSize: 13, marginLeft: 4 },
  weekFuture: { fontFamily: FONT.medium, fontSize: 14 },
});
