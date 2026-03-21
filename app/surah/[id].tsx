import { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import {
  getVersesForSurah,
  getVersesForJuz,
  getVersesForPage,
  getTranslation,
  getAvailableTranslations,
  getAllSurahs,
  type QuranVerse,
} from '../../lib/quranData';
import { getSurahNameTurkish } from '../../lib/surahNames';
import { useTheme } from '../../hooks/useTheme';
import { useMushafStore } from '../../lib/store';

type ReaderMode = 'surah' | 'juz' | 'page';

function parseId(raw: string | string[] | undefined): { mode: ReaderMode; num: number } {
  const s = Array.isArray(raw) ? raw[0] : (raw ?? '1');
  if (s.startsWith('juz_')) return { mode: 'juz', num: Number(s.slice(4)) };
  if (s.startsWith('page_')) return { mode: 'page', num: Number(s.slice(5)) };
  return { mode: 'surah', num: Number(s) || 1 };
}

const allSurahs = getAllSurahs();

export default function SurahReaderScreen() {
  const { id } = useLocalSearchParams();
  const { mode, num } = parseId(id);
  const insets = useSafeAreaInsets();
  const { isDark, palette } = useTheme();
  const listRef = useRef<FlatList>(null);
  const [showMealPicker, setShowMealPicker] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);

  // Store
  const fontSize = useMushafStore((s) => s.fontSize);
  const setFontSize = useMushafStore((s) => s.setFontSize);
  const showTranslation = useMushafStore((s) => s.showTranslation);
  const setShowTranslation = useMushafStore((s) => s.setShowTranslation);
  const selectedTranslation = useMushafStore((s) => s.selectedTranslation);
  const setSelectedTranslation = useMushafStore((s) => s.setSelectedTranslation);

  // Verses
  const verses = useMemo(() => {
    if (mode === 'juz') return getVersesForJuz(num);
    if (mode === 'page') return getVersesForPage(num);
    return getVersesForSurah(num);
  }, [mode, num]);

  // Title
  const title = useMemo(() => {
    if (mode === 'juz') return `Cüz ${num}`;
    if (mode === 'page') return `Sayfa ${num}`;
    return getSurahNameTurkish(num);
  }, [mode, num]);

  const subtitle = `${verses.length} ayet`;
  const translations = getAvailableTranslations();
  const currentTransName = translations.find((t) => t.id === selectedTranslation)?.name ?? '';

  // Font size helpers
  const FONT_MIN = 18;
  const FONT_MAX = 44;
  const changeFontSize = (delta: number) => {
    setFontSize(Math.max(FONT_MIN, Math.min(FONT_MAX, fontSize + delta)));
  };

  // Navigation helpers
  const canGoPrev = mode === 'surah' ? num > 1 : mode === 'juz' ? num > 1 : num > 1;
  const canGoNext = mode === 'surah' ? num < 114 : mode === 'juz' ? num < 30 : num < 604;

  const goTo = (n: number) => {
    const prefix = mode === 'juz' ? 'juz_' : mode === 'page' ? 'page_' : '';
    router.replace({ pathname: '/surah/[id]', params: { id: `${prefix}${n}` } });
  };

  // Show besmele for surah mode (except surah 1 and 9)
  const showBesmele = mode === 'surah' && num !== 1 && num !== 9;

  const renderItem = useCallback(
    ({ item }: { item: QuranVerse }) => {
      const trans = getTranslation(
        item.surah_number,
        item.verse_number,
        selectedTranslation,
      );
      const showSurahLabel = mode !== 'surah' && item.verse_number === 1;

      return (
        <View style={[styles.verseCard, { borderColor: palette.soft }]}>
          {showSurahLabel && (
            <Text style={[styles.surahLabel, { color: palette.accent }]}>
              {getSurahNameTurkish(item.surah_number)}
            </Text>
          )}
          <View style={styles.verseNumRow}>
            <Text style={[styles.verseNum, { color: palette.soft }]}>
              {mode === 'surah'
                ? item.verse_number
                : `${item.surah_number}:${item.verse_number}`}
            </Text>
            <Text style={[styles.juzTag, { color: palette.soft }]}>
              Cüz {item.juz_number} · Sayfa {item.page_number}
            </Text>
          </View>
          <Text
            style={[
              styles.arabic,
              { color: palette.fg, fontSize, lineHeight: fontSize * 1.9 },
            ]}
          >
            {item.arabic}
          </Text>
          {showTranslation && trans ? (
            <Text style={[styles.turkish, { color: palette.muted }]}>{trans}</Text>
          ) : null}
        </View>
      );
    },
    [palette, fontSize, showTranslation, selectedTranslation, mode],
  );

  return (
    <View style={[styles.root, { backgroundColor: palette.bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12, borderColor: palette.soft }]}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={[styles.backText, { color: palette.muted }]}>← Geri</Text>
        </Pressable>

        {/* Tappable title → opens surah picker (surah mode only) */}
        <Pressable
          onPress={mode === 'surah' ? () => setShowSurahPicker(true) : undefined}
          style={styles.headerCenter}
        >
          <Text style={[styles.surahName, { color: palette.fg }]}>
            {title} {mode === 'surah' ? '▼' : ''}
          </Text>
          <Text style={[styles.verseCount, { color: palette.soft }]}>{subtitle}</Text>
        </Pressable>

        <View style={styles.headerActions}>
          <Pressable
            onPress={() => setShowTranslation(!showTranslation)}
            style={[
              styles.actionBtn,
              {
                backgroundColor: showTranslation ? palette.accent : 'transparent',
                borderColor: palette.soft,
              },
            ]}
          >
            <Text
              style={[
                styles.actionText,
                { color: showTranslation ? '#fff' : palette.muted },
              ]}
            >
              Meal
            </Text>
          </Pressable>
          <Pressable
            onPress={() => changeFontSize(-2)}
            style={[styles.actionBtn, { borderColor: palette.soft }]}
          >
            <Text style={[styles.actionText, { color: palette.muted }]}>A-</Text>
          </Pressable>
          <Pressable
            onPress={() => changeFontSize(2)}
            style={[styles.actionBtn, { borderColor: palette.soft }]}
          >
            <Text style={[styles.actionText, { color: palette.muted }]}>A+</Text>
          </Pressable>
        </View>
      </View>

      {/* Meal seçici bar */}
      <Pressable
        onPress={() => setShowMealPicker(true)}
        style={[styles.mealBar, { backgroundColor: palette.card, borderColor: palette.soft }]}
      >
        <Text style={[styles.mealBarLabel, { color: palette.muted }]}>Meal:</Text>
        <Text style={[styles.mealBarValue, { color: palette.fg }]}>{currentTransName}</Text>
        <Text style={[styles.mealBarArrow, { color: palette.soft }]}>▼</Text>
      </Pressable>

      {/* Besmele */}
      {showBesmele && (
        <Text style={[styles.basmala, { color: palette.muted, fontSize: fontSize * 0.9 }]}>
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </Text>
      )}

      <FlatList
        ref={listRef}
        data={verses}
        keyExtractor={(v) => `${v.surah_number}_${v.verse_number}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={7}
      />

      {/* Bottom navigation bar — prev / next */}
      <View
        style={[
          styles.bottomNav,
          {
            backgroundColor: palette.card,
            borderColor: palette.soft,
            paddingBottom: insets.bottom + 8,
          },
        ]}
      >
        <Pressable
          disabled={!canGoPrev}
          onPress={() => goTo(num - 1)}
          style={({ pressed }) => [
            styles.navArrow,
            { opacity: !canGoPrev ? 0.25 : pressed ? 0.5 : 1 },
          ]}
        >
          <Text style={[styles.navArrowText, { color: palette.fg }]}>
            ← {mode === 'surah' ? getSurahNameTurkish(num - 1) : `${num - 1}`}
          </Text>
        </Pressable>
        <Pressable
          disabled={!canGoNext}
          onPress={() => goTo(num + 1)}
          style={({ pressed }) => [
            styles.navArrow,
            { opacity: !canGoNext ? 0.25 : pressed ? 0.5 : 1 },
          ]}
        >
          <Text style={[styles.navArrowText, { color: palette.fg }]}>
            {mode === 'surah' ? getSurahNameTurkish(num + 1) : `${num + 1}`} →
          </Text>
        </Pressable>
      </View>

      {/* Meal picker modal */}
      <Modal
        visible={showMealPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMealPicker(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowMealPicker(false)}>
          <View style={[styles.modalContent, { backgroundColor: palette.card }]}>
            <Text style={[styles.modalTitle, { color: palette.fg }]}>Meal Seçin</Text>
            {translations.map((t) => (
              <Pressable
                key={t.id}
                onPress={() => {
                  setSelectedTranslation(t.id);
                  setShowMealPicker(false);
                }}
                style={[styles.modalOption, { borderColor: palette.soft }]}
              >
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: palette.accent,
                      backgroundColor:
                        selectedTranslation === t.id ? palette.accent : 'transparent',
                    },
                  ]}
                />
                <Text style={[styles.modalOptionText, { color: palette.fg }]}>{t.name}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Surah picker modal */}
      <Modal
        visible={showSurahPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSurahPicker(false)}
      >
        <View style={[styles.surahPickerOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View
            style={[
              styles.surahPickerContent,
              { backgroundColor: palette.bg, paddingBottom: insets.bottom },
            ]}
          >
            <View style={styles.surahPickerHeader}>
              <Text style={[styles.modalTitle, { color: palette.fg }]}>Sure Seçin</Text>
              <Pressable onPress={() => setShowSurahPicker(false)}>
                <Text style={[styles.closeBtn, { color: palette.muted }]}>✕</Text>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {allSurahs.map((s) => (
                <Pressable
                  key={s.number}
                  onPress={() => {
                    setShowSurahPicker(false);
                    router.replace({
                      pathname: '/surah/[id]',
                      params: { id: String(s.number) },
                    });
                  }}
                  style={({ pressed }) => [
                    styles.surahPickerRow,
                    {
                      borderColor: palette.soft,
                      opacity: pressed ? 0.5 : 1,
                      backgroundColor: s.number === num ? palette.card : 'transparent',
                    },
                  ]}
                >
                  <Text style={[styles.surahPickerNum, { color: palette.soft }]}>
                    {s.number}
                  </Text>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={[styles.surahPickerName, { color: palette.fg }]}>
                      {getSurahNameTurkish(s.number)}
                    </Text>
                    <Text style={[styles.surahPickerMeta, { color: palette.soft }]}>
                      {s.verse_count} ayet
                    </Text>
                  </View>
                  <Text style={[styles.surahPickerAr, { color: palette.muted }]}>
                    {s.name_arabic}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  back: { minWidth: 48 },
  backText: { fontSize: 14 },
  headerCenter: { flex: 1, alignItems: 'center', gap: 2 },
  surahName: { fontSize: 16, fontWeight: '500' },
  verseCount: { fontSize: 12 },
  headerActions: { flexDirection: 'row', gap: 6 },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
  },
  actionText: { fontSize: 12 },

  /* Meal bar */
  mealBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  mealBarLabel: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  mealBarValue: { flex: 1, fontSize: 14 },
  mealBarArrow: { fontSize: 10 },

  /* Besmele */
  basmala: {
    fontFamily: 'Amiri_400Regular',
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    lineHeight: 48,
  },

  /* Verse card */
  verseCard: {
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  surahLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  verseNumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verseNum: { fontSize: 12 },
  juzTag: { fontSize: 11 },
  arabic: {
    fontFamily: 'Amiri_400Regular',
    textAlign: 'right',
  },
  turkish: {
    fontSize: 15,
    lineHeight: 24,
  },

  /* Bottom nav */
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  navArrow: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  navArrowText: {
    fontSize: 14,
    fontWeight: '500',
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: '600' },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  modalOptionText: { fontSize: 16 },

  /* Surah picker */
  surahPickerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  surahPickerContent: {
    maxHeight: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
  },
  surahPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  closeBtn: { fontSize: 20, paddingHorizontal: 8 },
  surahPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  surahPickerNum: { width: 28, fontSize: 13, textAlign: 'center' },
  surahPickerName: { fontSize: 15, fontWeight: '500' },
  surahPickerMeta: { fontSize: 11 },
  surahPickerAr: { fontFamily: 'Amiri_400Regular', fontSize: 16 },
});