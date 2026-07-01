import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { getAllSurahs, type SurahInfo } from '../../lib/quranData';
import { getSurahNameTurkish } from '../../lib/surahNames';
import { useTheme } from '../../hooks/useTheme';
import { tabScrollPadding } from '../../lib/layout';
import { FONT } from '../../lib/typography';
import { PressableScale } from '../../components/PressableScale';

const surahs = getAllSurahs();
const SURAHS_WITH_VIDEO = [1];
const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 16 * 2 - 10) / 2; // 2 kolon, padding + gap

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
        <Animated.View entering={FadeInDown.duration(380).delay(Math.min(index, 12) * 22)}>
          <PressableScale
            style={[
              styles.card,
              {
                backgroundColor: palette.card,
                borderColor: palette.soft,
                width: CARD_SIZE,
                height: CARD_SIZE,
              },
            ]}
            onPress={() => handleSurahPress(item.number)}
          >
            <View style={[styles.numBadge, { backgroundColor: palette.input }]}>
              <Text style={[styles.num, { color: palette.muted }]}>{item.number}</Text>
            </View>

            {hasVideo && (
              <View style={[styles.videoBadge, { backgroundColor: palette.accent }]}>
                <Text style={styles.videoBadgeText}>▶</Text>
              </View>
            )}

            <Text style={[styles.nameAr, { color: palette.fg }]}>{item.name_arabic}</Text>

            <View style={styles.bottom}>
              <Text style={[styles.nameTr, { color: palette.fg }]} numberOfLines={1}>
                {nameTr}
              </Text>
              <Text style={[styles.meta, { color: palette.soft }]}>
                {rev} · {item.verse_count} ayet
              </Text>
            </View>
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
          <View style={[styles.countPill, { backgroundColor: `${palette.accent}18` }]}>
            <Text style={[styles.countText, { color: palette.accent }]}>
              {filtered.length}/114
            </Text>
          </View>
        </View>

        <View style={[styles.searchWrap, { backgroundColor: palette.input }]}>
          <Text style={[styles.searchIcon, { color: palette.muted }]}>⌕</Text>
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
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{
          paddingBottom: tabScrollPadding(insets.bottom),
          paddingHorizontal: 16,
          gap: 10,
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
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
    fontWeight: '700',
  },
  search: {
    flex: 1,
    fontFamily: FONT.medium,
    paddingVertical: 12,
    fontSize: 15,
  },

  row: { gap: 10 },

  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  numBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  num: { fontFamily: FONT.bold, fontSize: 12 },

  videoBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoBadgeText: { color: '#fff', fontSize: 9 },

  nameAr: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 4,
  },

  bottom: { width: '100%', gap: 2, alignItems: 'center' },
  nameTr: { fontFamily: FONT.bold, fontSize: 14, textAlign: 'center' },
  meta: { fontFamily: FONT.medium, fontSize: 11, textAlign: 'center' },
});
