import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { getAllSurahs, type SurahInfo } from '../../lib/quranData';
import { getSurahNameTurkish } from '../../lib/surahNames';
import { useTheme } from '../../hooks/useTheme';
import { tabScrollPadding } from '../../lib/layout';
import { FONT } from '../../lib/typography';
import { PressableScale } from '../../components/PressableScale';

const surahs = getAllSurahs();
const SURAHS_WITH_VIDEO = [1];

export default function SurahListScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surahs;
    return surahs.filter((s) => {
      const tr = getSurahNameTurkish(s.number).toLowerCase();
      const en = s.name_english.toLowerCase();
      const num = String(s.number);
      return tr.includes(q) || en.includes(q) || num.includes(q);
    });
  }, [query]);

  const handleSurahPress = useCallback((surahNumber: number) => {
    if (SURAHS_WITH_VIDEO.includes(surahNumber)) {
      router.push('/video-player');
    } else {
      router.push({ pathname: '/surah/[id]', params: { id: surahNumber } });
    }
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: SurahInfo; index: number }) => {
      const nameTr = getSurahNameTurkish(item.number);
      const rev = item.revelation_type === 'Meccan' ? 'Mekki' : 'Medeni';
      const hasVideo = SURAHS_WITH_VIDEO.includes(item.number);

      return (
        <Animated.View entering={FadeInDown.duration(360).delay(Math.min(index, 10) * 20)}>
          <PressableScale
            scaleTo={0.98}
            style={[styles.row, { backgroundColor: palette.card, borderColor: palette.border }]}
            onPress={() => handleSurahPress(item.number)}
          >
            <View style={[styles.numWrap, { backgroundColor: palette.accentSoft }]}>
              <Text style={[styles.num, { color: palette.accent }]}>{item.number}</Text>
            </View>

            <View style={styles.nameBlock}>
              <View style={styles.nameLine}>
                <Text style={[styles.nameTr, { color: palette.fg }]} numberOfLines={1}>
                  {nameTr}
                </Text>
                {hasVideo && (
                  <View style={[styles.videoBadge, { backgroundColor: palette.accent }]}>
                    <Ionicons name="play" size={8} color="#FFFFFF" />
                  </View>
                )}
              </View>
              <Text style={[styles.meta, { color: palette.muted }]}>
                {rev} · {item.verse_count} ayet
              </Text>
            </View>

            <Text style={[styles.nameAr, { color: palette.fg }]} numberOfLines={1}>
              {item.name_arabic}
            </Text>
          </PressableScale>
        </Animated.View>
      );
    },
    [palette, handleSurahPress],
  );

  return (
    <View style={[styles.root, { backgroundColor: palette.bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Animated.View
        entering={FadeInDown.duration(450)}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <Text style={[styles.kicker, { color: palette.accent }]}>Kur'an-ı Kerîm</Text>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: palette.fg }]}>Sureler</Text>
          <View style={[styles.countPill, { backgroundColor: palette.accentSoft }]}>
            <Text style={[styles.countText, { color: palette.accent }]}>
              {filtered.length}/114
            </Text>
          </View>
        </View>

        <View style={[styles.searchWrap, { backgroundColor: palette.input }]}>
          <Ionicons name="search-outline" size={17} color={palette.muted} style={styles.searchIcon} />
          <TextInput
            style={[styles.search, { color: palette.fg }]}
            placeholder="Sure ara..."
            placeholderTextColor={palette.soft}
            value={query}
            onChangeText={setQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </Animated.View>

      <FlatList
        data={filtered}
        keyExtractor={(s) => String(s.number)}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: tabScrollPadding(insets.bottom),
          paddingHorizontal: 16,
          gap: 8,
        }}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 20, gap: 12, paddingBottom: 16 },
  kicker: {
    fontFamily: FONT.extrabold,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONT.extrabold,
    fontSize: 28,
    letterSpacing: -0.6,
  },
  countPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  countText: {
    fontFamily: FONT.bold,
    fontSize: 12.5,
    fontVariant: ['tabular-nums'],
  },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  searchIcon: { marginRight: 8 },
  search: {
    flex: 1,
    fontFamily: FONT.medium,
    paddingVertical: 12,
    fontSize: 15,
  },

  /* ─── Sure satırı ─────────────────────────────── */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  numWrap: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: {
    fontFamily: FONT.extrabold,
    fontSize: 14,
    fontVariant: ['tabular-nums'],
  },
  nameBlock: { flex: 1, gap: 2 },
  nameLine: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  nameTr: { fontFamily: FONT.bold, fontSize: 15.5, letterSpacing: -0.2, flexShrink: 1 },
  meta: { fontFamily: FONT.medium, fontSize: 11.5 },
  videoBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 1,
  },
  nameAr: {
    fontFamily: FONT.arabic,
    fontSize: 20,
    lineHeight: 34,
    textAlign: 'right',
    maxWidth: 130,
  },
});
