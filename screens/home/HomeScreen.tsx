import { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useTodayContent } from '../../hooks/useTodayContent';
import { useTheme } from '../../hooks/useTheme';
import { useMushafStore } from '../../lib/store';
import { syncWidgetsAndStorage } from '../../lib/storage';
import { getSurahNameTurkish } from '../../lib/surahNames';
import { getTranslation } from '../../lib/quranData';
import { styles } from './HomeScreen.styles';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();
  const content = useTodayContent();
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

  const navItems = [
    { label: 'Sureler', route: '/surah/index' as const, desc: '114 sure' },
    { label: 'Cüzler', route: '/surah/juz' as const, desc: '30 cüz' },
    { label: 'Sayfalar', route: '/surah/page' as const, desc: '604 sayfa' },
  ];

  return (
    <View style={[styles.root, { backgroundColor: palette.bg, paddingTop: insets.top + 12 }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <View>
            <Text style={[styles.title, { color: palette.muted }]}>Furkan</Text>
            <Text style={[styles.sub, { color: palette.soft }]}>Bugün</Text>
          </View>
          <Pressable
            onPress={() => router.push('/settings')}
            style={[styles.settingsBtn, { borderColor: palette.soft }]}
          >
            <Text style={[styles.settingsBtnText, { color: palette.muted }]}>⚙</Text>
          </Pressable>
        </View>

        {navItems.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => router.push(item.route)}
            style={({ pressed }) => [
              styles.navBtn,
              { borderColor: palette.soft, opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <View>
              <Text style={[styles.navBtnText, { color: palette.fg }]}>{item.label}</Text>
              <Text style={[styles.navBtnDesc, { color: palette.soft }]}>{item.desc}</Text>
            </View>
            <Text style={[styles.navBtnArrow, { color: palette.soft }]}>→</Text>
          </Pressable>
        ))}

        <Pressable
          onPress={() =>
            router.push({
              pathname: '/surah/[id]',
              params: { id: content.verse.surah_number },
            })
          }
          style={({ pressed }) => [
            styles.section,
            { borderColor: palette.soft, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.label, { color: palette.muted }]}>Günün Ayeti</Text>
          <Text style={[styles.arabic, { color: palette.fg }]}>{content.verse.arabic}</Text>
          <Text style={[styles.turkish, { color: palette.muted }]}>
            {verseTranslation}
          </Text>
          <Text style={[styles.ref, { color: palette.soft }]}>
            {surahName} {content.verse.surah_number}:{content.verse.verse_number}
          </Text>
        </Pressable>

        <View style={[styles.section, { borderColor: palette.soft }]}>
          <Text style={[styles.label, { color: palette.muted }]}>Günün Hadisi</Text>
          <Text style={[styles.hadith, { color: palette.fg }]}>{content.hadith.text_turkish}</Text>
          <Text style={[styles.ref, { color: palette.soft }]}>
            {content.hadith.source}
            {content.hadith.narrator ? ` · ${content.hadith.narrator}` : ''}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
