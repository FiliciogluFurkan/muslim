import { useColorScheme } from 'react-native';
import { useMushafStore } from '../lib/store';

export type Palette = {
  bg: string;
  fg: string;
  muted: string;
  soft: string;
  card: string;
  input: string;
  accent: string;
};
const lightPalette = {
  bg: '#EEF3EF',     // soft yeşilimsi açık arka plan (beyaz değil!)
  fg: '#1E2420',
  muted: '#7A847C',
  soft: '#D6DED6',
  card: '#FFFFFF',
  input: '#F4F7F4',
  accent: '#6F8F7A',
};

const darkPalette = {
  bg: '#1B1F1C',     // siyah değil, koyu yeşilimsi gri
  fg: '#E8EEE9',
  muted: '#9AA49C',
  soft: '#2F3631',
  card: '#242A25',
  input: '#2B322C',
  accent: '#7FAF95',
};

export function useTheme(): { isDark: boolean; palette: Palette } {
  const systemScheme = useColorScheme();
  const themeMode = useMushafStore((s) => s.themeMode);

  let isDark: boolean;
  if (themeMode === 'system') {
    isDark = systemScheme === 'dark' || systemScheme == null;
  } else {
    isDark = themeMode === 'dark';
  }

  return { isDark, palette: isDark ? darkPalette : lightPalette };
}