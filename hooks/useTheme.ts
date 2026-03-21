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

const darkPalette: Palette = {
  bg: '#0d0d0f',
  fg: '#f2f2f0',
  muted: '#9a9a9a',
  soft: '#6b6b6b',
  card: '#141416',
  input: '#1a1a1c',
  accent: '#c9a84c',
};

const lightPalette: Palette = {
  bg: '#fafafa',
  fg: '#111111',
  muted: '#6b6b6b',
  soft: '#9a9a9a',
  card: '#f0f0f0',
  input: '#e8e8e8',
  accent: '#8b6914',
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
