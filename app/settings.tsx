import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '../hooks/useTheme';
import { useMushafStore, type ThemeMode, type TranslationId } from '../lib/store';

const FONT_SIZES = [20, 24, 28, 32, 36, 40];

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'Sistem' },
  { value: 'dark', label: 'Karanlık' },
  { value: 'light', label: 'Aydınlık' },
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
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]}>
        {/* Header */}
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={[styles.backText, { color: palette.muted }]}>← Geri</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: palette.muted }]}>Ayarlar</Text>

        {/* Tema */}
        <View style={[styles.section, { borderColor: palette.soft }]}>
          <Text style={[styles.sectionTitle, { color: palette.muted }]}>Tema</Text>
          <View style={styles.optionRow}>
            {THEME_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => setThemeMode(opt.value)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: themeMode === opt.value ? palette.accent : 'transparent',
                    borderColor: palette.soft,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: themeMode === opt.value ? '#fff' : palette.muted },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Meal Seçimi */}
        <View style={[styles.section, { borderColor: palette.soft }]}>
          <Text style={[styles.sectionTitle, { color: palette.muted }]}>Meal</Text>
          {TRANSLATION_OPTIONS.map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => setSelectedTranslation(opt.value)}
              style={[styles.radioRow, { borderColor: palette.soft }]}
            >
              <View
                style={[
                  styles.radio,
                  {
                    borderColor: palette.accent,
                    backgroundColor:
                      selectedTranslation === opt.value ? palette.accent : 'transparent',
                  },
                ]}
              />
              <Text style={[styles.radioLabel, { color: palette.fg }]}>{opt.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Font Boyutu */}
        <View style={[styles.section, { borderColor: palette.soft }]}>
          <Text style={[styles.sectionTitle, { color: palette.muted }]}>
            Arapça Font Boyutu: {fontSize}
          </Text>
          <View style={styles.optionRow}>
            {FONT_SIZES.map((size) => (
              <Pressable
                key={size}
                onPress={() => setFontSize(size)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: fontSize === size ? palette.accent : 'transparent',
                    borderColor: palette.soft,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: fontSize === size ? '#fff' : palette.muted },
                  ]}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>
          {/* Preview */}
          <Text
            style={{
              fontFamily: 'Amiri_400Regular',
              fontSize,
              lineHeight: fontSize * 1.9,
              color: palette.fg,
              textAlign: 'right',
              marginTop: 12,
            }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 24, gap: 24 },
  back: { alignSelf: 'flex-start' },
  backText: { fontSize: 14 },
  pageTitle: { fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' },
  section: { gap: 12, paddingVertical: 16, borderTopWidth: StyleSheet.hairlineWidth },
  sectionTitle: { fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  chipText: { fontSize: 14 },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
  radioLabel: { fontSize: 15 },
});
