import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TranslationId = 'diyanet' | 'elmali';
export type ThemeMode = 'system' | 'dark' | 'light';

type MushafState = {
  /* widget sync */
  lastSyncedDateSeed: number | null;
  setLastSyncedDateSeed: (seed: number) => void;

  /* meal seçimi */
  selectedTranslation: TranslationId;
  setSelectedTranslation: (id: TranslationId) => void;

  /* font boyutu (Arapça) */
  fontSize: number;
  setFontSize: (size: number) => void;

  /* tema */
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  /* meal görüntüleme */
  showTranslation: boolean;
  setShowTranslation: (show: boolean) => void;
};

export const useMushafStore = create<MushafState>()(
  persist(
    (set) => ({
      lastSyncedDateSeed: null,
      setLastSyncedDateSeed: (seed) => set({ lastSyncedDateSeed: seed }),

      selectedTranslation: 'diyanet',
      setSelectedTranslation: (id) => set({ selectedTranslation: id }),

      fontSize: 28,
      setFontSize: (size) => set({ fontSize: size }),

      themeMode: 'system',
      setThemeMode: (mode) => set({ themeMode: mode }),

      showTranslation: true,
      setShowTranslation: (show) => set({ showTranslation: show }),
    }),
    {
      name: 'mushaf-settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedTranslation: state.selectedTranslation,
        fontSize: state.fontSize,
        themeMode: state.themeMode,
        showTranslation: state.showTranslation,
      }),
    },
  ),
);
