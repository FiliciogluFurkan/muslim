import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TranslationId = 'diyanet' | 'elmali';
export type ThemeMode = 'system' | 'dark' | 'light';

export type ManualLocation = {
  latitude: number;
  longitude: number;
  city: string;
} | null;

export type PrayerName = 'Sabah' | 'Öğle' | 'İkindi' | 'Akşam' | 'Yatsı';
export const PRAYER_NAMES: PrayerName[] = ['Sabah', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];

export type DayKey = string; // YYYY-MM-DD
export type DayRecord = Partial<Record<PrayerName, boolean>>;
export type PrayerLog = Record<DayKey, DayRecord>;

type MushafState = {
  lastSyncedDateSeed: number | null;
  setLastSyncedDateSeed: (seed: number) => void;

  manualLocation: ManualLocation;
  setManualLocation: (loc: ManualLocation) => void;

  selectedTranslation: TranslationId;
  setSelectedTranslation: (id: TranslationId) => void;

  fontSize: number;
  setFontSize: (size: number) => void;

  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  showTranslation: boolean;
  setShowTranslation: (show: boolean) => void;

  prayerLog: PrayerLog;
  togglePrayer: (day: DayKey, prayer: PrayerName) => void;
  getPrayerDay: (day: DayKey) => DayRecord;
};

export const useMushafStore = create<MushafState>()(
  persist(
    (set, get) => ({
      lastSyncedDateSeed: null,
      setLastSyncedDateSeed: (seed) => set({ lastSyncedDateSeed: seed }),

      manualLocation: null,
      setManualLocation: (loc) => set({ manualLocation: loc }),

      selectedTranslation: 'diyanet',
      setSelectedTranslation: (id) => set({ selectedTranslation: id }),

      fontSize: 28,
      setFontSize: (size) => set({ fontSize: size }),

      themeMode: 'light',
      setThemeMode: (mode) => set({ themeMode: mode }),

      showTranslation: true,
      setShowTranslation: (show) => set({ showTranslation: show }),

      prayerLog: {},
      togglePrayer: (day, prayer) =>
        set((state) => {
          const dayRecord = state.prayerLog[day] ?? {};
          return {
            prayerLog: {
              ...state.prayerLog,
              [day]: { ...dayRecord, [prayer]: !dayRecord[prayer] },
            },
          };
        }),
      getPrayerDay: (day) => get().prayerLog[day] ?? {},
    }),
    {
      name: 'mushaf-settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedTranslation: state.selectedTranslation,
        fontSize: state.fontSize,
        themeMode: state.themeMode,
        showTranslation: state.showTranslation,
        manualLocation: state.manualLocation,
        prayerLog: state.prayerLog,
      }),
    },
  ),
);
