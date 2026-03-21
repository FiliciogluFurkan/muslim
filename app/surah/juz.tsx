import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { getAllJuzs, type JuzInfo } from '../../lib/quranData';
import { getSurahNameTurkish } from '../../lib/surahNames';
import { useTheme } from '../../hooks/useTheme';

const juzs = getAllJuzs();

export default function JuzListScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();

  const renderItem = useCallback(
    ({ item }: { item: JuzInfo }) => {
      const startName = getSurahNameTurkish(item.start_surah);
      const endName = getSurahNameTurkish(item.end_surah);
      return (
        <Pressable
          style={({ pressed }) => [
            styles.row,
            { borderColor: palette.soft, opacity: pressed ? 0.6 : 1 },
          ]}
          onPress={() =>
            router.push({
              pathname: '/surah/[id]',
              params: { id: `juz_${item.juz_number}` },
            })
          }
        >
          <View style={styles.numBox}>
            <Text style={[styles.num, { color: palette.muted }]}>{item.juz_number}</Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.title, { color: palette.fg }]}>Cüz {item.juz_number}</Text>
            <Text style={[styles.meta, { color: palette.soft }]}>
              {startName} {item.start_surah}:{item.start_verse} → {endName} {item.end_surah}:{item.end_verse}
            </Text>
            <Text style={[styles.meta, { color: palette.soft }]}>{item.verse_count} ayet</Text>
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
        <Text style={[styles.headerTitle, { color: palette.muted }]}>Cüzler</Text>
      </View>
      <FlatList
        data={juzs}
        keyExtractor={(j) => String(j.juz_number)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
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
  title: { fontSize: 16, fontWeight: '500' },
  meta: { fontSize: 12 },
});
