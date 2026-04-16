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
    { label: 'Sureler', desc: '114 sureyi keşfet', icon: '☽', route: '/surah/index' as const },
    { label: 'Cüzler', desc: '30 cüz arasında gez', icon: '✦', route: '/surah/juz' as const },
    { label: 'Sayfalar', desc: '604 sayfayı incele', icon: '❖', route: '/surah/page' as const },
  ];

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: palette.bg,
          paddingTop: insets.top + 10,
        },
      ]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 32 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Üst başlık */}
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={[styles.titleEyebrow, { color: palette.muted }]}>
              Selamün Aleyküm
            </Text>
            <Text style={[styles.title, { color: palette.fg }]}>
              Bugünün İçeriği
            </Text>
            <Text style={[styles.sub, { color: palette.soft }]}>
              Ayet, hadis ve mushaf erişimi
            </Text>
          </View>

          <Pressable
            onPress={() => router.push('/settings')}
            style={({ pressed }) => [
              styles.settingsBtn,
              {
                borderColor: palette.soft,
                backgroundColor: palette.card,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Text style={[styles.settingsBtnText, { color: palette.fg }]}>⚙</Text>
          </Pressable>
        </View>

        {/* Hero alanı */}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: palette.card,
              borderColor: palette.soft,
            },
          ]}
        >
          <View style={styles.heroTopRow}>
            <Text style={[styles.heroLabel, { color: palette.muted }]}>Bugün</Text>

            <View
              style={[
                styles.heroBadge,
                { backgroundColor: `${palette.accent}22` },
              ]}
            >
              <Text style={[styles.heroBadgeText, { color: palette.accent }]}>
                Oku
              </Text>
            </View>
          </View>

          <Text style={[styles.heroTitle, { color: palette.fg }]}>
            Kalbe dokunan günlük içerik
          </Text>
          <Text style={[styles.heroDesc, { color: palette.soft }]}>
            Her gün seçilmiş ayet ve hadis ile manevi bir başlangıç yap.
          </Text>
        </View>

        {/* Hızlı erişim */}
        <Text style={[styles.sectionLabel, { color: palette.muted }]}>
          Hızlı Erişim
        </Text>

        <View style={styles.navGrid}>
          {navItems.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => router.push(item.route)}
              style={({ pressed }) => [
                styles.navCard,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.soft,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View>
                <View
                  style={[
                    styles.navCardIconWrap,
                    { backgroundColor: `${palette.accent}18` },
                  ]}
                >
                  <Text style={[styles.navCardIcon, { color: palette.accent }]}>
                    {item.icon}
                  </Text>
                </View>

                <Text style={[styles.navCardLabel, { color: palette.fg }]}>
                  {item.label}
                </Text>
                <Text style={[styles.navCardDesc, { color: palette.soft }]}>
                  {item.desc}
                </Text>
              </View>

              <Text style={[styles.navCardArrow, { color: palette.soft }]}>→</Text>
            </Pressable>
          ))}
        </View>

        {/* Günün Ayeti */}
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/surah/[id]',
              params: { id: content.verse.surah_number },
            })
          }
          style={({ pressed }) => [
            styles.verseCard,
            {
              backgroundColor: palette.card,
              borderColor: palette.soft,
              opacity: pressed ? 0.88 : 1,
            },
          ]}
        >
          <View style={styles.verseHeader}>
            <Text style={[styles.verseHeaderLabel, { color: palette.muted }]}>
              Günün Ayeti
            </Text>
            <Text style={[styles.verseHeaderAction, { color: palette.accent }]}>
              Aç
            </Text>
          </View>

          <Text style={[styles.arabic, { color: palette.fg }]}>
            {content.verse.arabic}
          </Text>

          <View
            style={[styles.verseDivider, { backgroundColor: palette.soft }]}
          />

          <Text style={[styles.turkish, { color: palette.muted }]}>
            {verseTranslation}
          </Text>

          <Text style={[styles.ref, { color: palette.soft }]}>
            {surahName} · {content.verse.surah_number}:{content.verse.verse_number}
          </Text>
        </Pressable>

        {/* Günün Hadisi */}
        <View
          style={[
            styles.hadithCard,
            {
              backgroundColor: palette.card,
              borderColor: palette.soft,
            },
          ]}
        >
          <View style={styles.hadithTopRow}>
            <View
              style={[styles.hadithAccent, { backgroundColor: palette.accent }]}
            />
            <Text style={[styles.hadithLabel, { color: palette.muted }]}>
              Günün Hadisi
            </Text>
          </View>

          <Text style={[styles.hadith, { color: palette.fg }]}>
            {content.hadith.text_turkish}
          </Text>

          <Text style={[styles.ref, { color: palette.soft }]}>
            {content.hadith.source}
            {content.hadith.narrator ? ` · ${content.hadith.narrator}` : ''}
          </Text>
        </View>

        {/* Alt süsleme */}
        <Text style={[styles.ornament, { color: palette.muted }]}>✦ ✦ ✦</Text>
      </ScrollView>
    </View>
  );
}