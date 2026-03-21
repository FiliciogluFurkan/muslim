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

import { getAllSurahs, type SurahInfo } from '../../lib/quranData';
import { getSurahNameTurkish } from '../../lib/surahNames';
import { useTheme } from '../../hooks/useTheme';

const surahs = getAllSurahs();

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

  const renderItem = useCallback(
    ({ item }: { item: SurahInfo }) => {
      const nameTr = getSurahNameTurkish(item.number);
      const rev = item.revelation_type === 'Meccan' ? 'Mekki' : 'Medeni';
      return (
        <Pressable
          style={({ pressed }) => [
            styles.row,
            { borderColor: palette.soft, opacity: pressed ? 0.6 : 1 },
          ]}
          onPress={() => router.push({ pathname: '/surah/[id]', params: { id: item.number } })}
        >
          <View style={styles.numBox}>
            <Text style={[styles.num, { color: palette.muted }]}>{item.number}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.nameTr, { color: palette.fg }]}>{nameTr}</Text>
            <Text style={[styles.meta, { color: palette.soft }]}>
              {rev} · {item.verse_count} ayet
            </Text>
          </View>
          <Text style={[styles.nameAr, { color: palette.muted }]}>{item.name_arabic}</Text>
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
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 24, gap: 12, paddingBottom: 12 },
  back: { alignSelf: 'flex-start' },
  backText: { fontSize: 14 },
  title: { fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' },
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
  numBox: { width: 32, alignItems: 'center' },
  num: { fontSize: 13 },
  info: { flex: 1, gap: 3 },
  nameTr: { fontSize: 16, fontWeight: '500' },
  meta: { fontSize: 12 },
  nameAr: { fontFamily: 'Amiri_400Regular', fontSize: 18 },
});