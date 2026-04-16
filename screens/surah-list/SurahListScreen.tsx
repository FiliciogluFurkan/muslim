import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { getAllSurahs, type SurahInfo } from '../../lib/quranData';
import { getSurahNameTurkish } from '../../lib/surahNames';
import { useTheme } from '../../hooks/useTheme';

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
    ({ item }: { item: SurahInfo }) => {
      const nameTr = getSurahNameTurkish(item.number);
      const rev = item.revelation_type === 'Meccan' ? 'Mekki' : 'Medeni';
      const hasVideo = SURAHS_WITH_VIDEO.includes(item.number);

      return (
        <Pressable
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: palette.card,
              borderColor: palette.soft,
              width: CARD_SIZE,
              height: CARD_SIZE,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={() => handleSurahPress(item.number)}
        >
          {/* Sure numarası — sol üst */}
          <View style={[styles.numBadge, { backgroundColor: palette.input }]}>
            <Text style={[styles.num, { color: palette.muted }]}>{item.number}</Text>
          </View>

          {/* Video rozeti — sağ üst */}
          {hasVideo && (
            <View style={[styles.videoBadge, { backgroundColor: palette.accent }]}>
              <Text style={styles.videoBadgeText}>▶</Text>
            </View>
          )}

          {/* Orta: Arapça isim */}
          <Text style={[styles.nameAr, { color: palette.fg }]}>{item.name_arabic}</Text>

          {/* Alt: Türkçe isim + meta */}
          <View style={styles.bottom}>
            <Text style={[styles.nameTr, { color: palette.fg }]} numberOfLines={1}>
              {nameTr}
            </Text>
            <Text style={[styles.meta, { color: palette.soft }]}>
              {rev} · {item.verse_count} ayet
            </Text>
          </View>
        </Pressable>
      );
    },
    [palette, handleSurahPress],
  );

  return (
    <View style={[styles.root, { backgroundColor: palette.bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={[styles.title, { color: palette.muted }]}>Sureler</Text>
        <TextInput
          style={[styles.search, { backgroundColor: palette.input, color: palette.fg }]}
          placeholder="Sure ara..."
          placeholderTextColor={palette.soft}
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(s) => String(s.number)}
        renderItem={renderItem}
        numColumns={2}                      
        columnWrapperStyle={styles.row}         
        contentContainerStyle={{
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 16,
          gap: 10,
        }}
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 24, gap: 12, paddingBottom: 16 },
  title: { fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' },
  search: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },

  row: {
    gap: 10,                                    // kartlar arası yatay boşluk
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    justifyContent: 'space-between',           // numBadge üstte, bottom altta
    alignItems: 'center',
    overflow: 'hidden',
  },

  numBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  num: { fontSize: 12, fontWeight: '600' },

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
    fontSize: 28,
    textAlign: 'center',
    marginTop: 4,
  },

  bottom: { width: '100%', gap: 2, alignItems: 'center' },
  nameTr: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  meta: { fontSize: 11, textAlign: 'center' },
});