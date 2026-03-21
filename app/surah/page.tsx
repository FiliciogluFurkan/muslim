import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { getTotalPages, getVersesForPage } from '../../lib/quranData';
import { getSurahNameTurkish } from '../../lib/surahNames';
import { useTheme } from '../../hooks/useTheme';

const totalPages = getTotalPages();
const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

export default function PageListScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return pages;
    return pages.filter((p) => String(p).includes(q));
  }, [query]);

  const renderItem = useCallback(
    ({ item: pageNum }: { item: number }) => {
      const versesOnPage = getVersesForPage(pageNum);
      const firstVerse = versesOnPage[0];
      const lastVerse = versesOnPage[versesOnPage.length - 1];
      const surahName = firstVerse ? getSurahNameTurkish(firstVerse.surah_number) : '';
      const juz = firstVerse?.juz_number ?? 0;

      return (
        <Pressable
          style={({ pressed }) => [
            styles.row,
            { borderColor: palette.soft, opacity: pressed ? 0.6 : 1 },
          ]}
          onPress={() =>
            router.push({
              pathname: '/surah/[id]',
              params: { id: `page_${pageNum}` },
            })
          }
        >
          <View style={styles.numBox}>
            <Text style={[styles.num, { color: palette.muted }]}>{pageNum}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.nameTr, { color: palette.fg }]}>{surahName}</Text>
            <Text style={[styles.meta, { color: palette.soft }]}>
              Cüz {juz} · {versesOnPage.length} ayet
            </Text>
          </View>
        </Pressable>
      );
    },
    [palette],
  );

  return (
    <View style={[styles.root, { backgroundColor: palette.bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={[styles.backText, { color: palette.muted }]}>← Geri</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: palette.muted }]}>Sayfalar</Text>
        <TextInput
          style={[styles.search, { backgroundColor: palette.input, color: palette.fg }]}
          placeholder="Sayfa ara..."
          placeholderTextColor={palette.soft}
          value={query}
          onChangeText={setQuery}
          keyboardType="number-pad"
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(p) => String(p)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        keyboardDismissMode="on-drag"
        initialNumToRender={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 24, gap: 12, paddingBottom: 12 },
  back: { alignSelf: 'flex-start' },
  backText: { fontSize: 14 },
  headerTitle: { fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' },
  search: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  numBox: { width: 40, alignItems: 'center' },
  num: { fontSize: 13 },
  info: { flex: 1, gap: 3 },
  nameTr: { fontSize: 16, fontWeight: '500' },
  meta: { fontSize: 12 },
});
