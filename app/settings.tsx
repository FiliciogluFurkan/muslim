import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useTheme } from '../hooks/useTheme';
import { useMushafStore, type ThemeMode, type TranslationId } from '../lib/store';
import { FONT } from '../lib/typography';
import { PressableScale } from '../components/PressableScale';

const FONT_SIZES = [20, 24, 28, 32, 36, 40];

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Aydınlık' },
  { value: 'dark', label: 'Karanlık' },
];

const TRANSLATION_OPTIONS: { value: TranslationId; label: string }[] = [
  { value: 'diyanet', label: 'Diyanet İşleri' },
  { value: 'elmali', label: 'Elmalılı Hamdi Yazır' },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();

  const fontSize = useMushafStore((s) => s.fontSize);
  const setFontSize = useMushafStore((s) => s.setFontSize);
  const themeMode = useMushafStore((s) => s.themeMode);
  const setThemeMode = useMushafStore((s) => s.setThemeMode);
  const selectedTranslation = useMushafStore((s) => s.selectedTranslation);
  const setSelectedTranslation = useMushafStore((s) => s.setSelectedTranslation);

  return (
    <View style={[styles.root, { backgroundColor: palette.bg, paddingTop: insets.top + 12 }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(450)}>
          <PressableScale onPress={() => router.back()} style={styles.back}>
            <Text style={[styles.backText, { color: palette.accent }]}>← Geri</Text>
          </PressableScale>
          <Text style={[styles.kicker, { color: palette.accent }]}>Tercihler</Text>
          <Text style={[styles.pageTitle, { color: palette.fg }]}>Ayarlar</Text>
        </Animated.View>

        {/* Tema */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(80)}
          style={[styles.section, styles.cardShadow, { backgroundColor: palette.card, borderColor: palette.border }]}
        >
          <Text style={[styles.sectionTitle, { color: palette.muted }]}>Tema</Text>
          <View style={styles.optionRow}>
            {THEME_OPTIONS.map((opt) => {
              const active = themeMode === opt.value;
              return (
                <PressableScale
                  key={opt.value}
                  onPress={() => setThemeMode(opt.value)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: active ? palette.accent : palette.input,
                      borderColor: active ? palette.accent : palette.border,
                    },
                  ]}
                >
                  <Text style={[styles.chipText, { color: active ? '#fff' : palette.muted }]}>
                    {opt.label}
                  </Text>
                </PressableScale>
              );
            })}
          </View>
        </Animated.View>

        {/* Meal Seçimi */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(150)}
          style={[styles.section, styles.cardShadow, { backgroundColor: palette.card, borderColor: palette.border }]}
        >
          <Text style={[styles.sectionTitle, { color: palette.muted }]}>Meal</Text>
          {TRANSLATION_OPTIONS.map((opt) => {
            const active = selectedTranslation === opt.value;
            return (
              <PressableScale
                key={opt.value}
                onPress={() => setSelectedTranslation(opt.value)}
                style={styles.radioRow}
              >
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: active ? palette.accent : palette.soft,
                      backgroundColor: active ? palette.accent : 'transparent',
                    },
                  ]}
                />
                <Text style={[styles.radioLabel, { color: palette.fg }]}>{opt.label}</Text>
              </PressableScale>
            );
          })}
        </Animated.View>

        {/* Font Boyutu */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(220)}
          style={[styles.section, styles.cardShadow, { backgroundColor: palette.card, borderColor: palette.border }]}
        >
          <Text style={[styles.sectionTitle, { color: palette.muted }]}>
            Arapça Font Boyutu · {fontSize}
          </Text>
          <View style={styles.optionRow}>
            {FONT_SIZES.map((size) => {
              const active = fontSize === size;
              return (
                <PressableScale
                  key={size}
                  onPress={() => setFontSize(size)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: active ? palette.accent : palette.input,
                      borderColor: active ? palette.accent : palette.border,
                    },
                  ]}
                >
                  <Text style={[styles.chipText, { color: active ? '#fff' : palette.muted }]}>
                    {size}
                  </Text>
                </PressableScale>
              );
            })}
          </View>
          <Text
            style={{
              fontFamily: 'Amiri_400Regular',
              fontSize,
              lineHeight: fontSize * 1.9,
              color: palette.fg,
              textAlign: 'right',
              marginTop: 14,
            }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, gap: 16 },
  back: { alignSelf: 'flex-start', marginBottom: 14 },
  backText: { fontFamily: FONT.semibold, fontSize: 14 },
  kicker: {
    fontFamily: FONT.extrabold,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  pageTitle: {
    fontFamily: FONT.extrabold,
    fontSize: 30,
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  cardShadow: {
    shadowColor: '#0C1F17',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 3,
  },
  section: {
    gap: 14,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipText: { fontFamily: FONT.semibold, fontSize: 14 },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  radioLabel: { fontFamily: FONT.medium, fontSize: 15 },
});
