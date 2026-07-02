import { useMushafStore } from '../lib/store';

export type Palette = {
  bg: string;
  fg: string;
  muted: string;
  soft: string;
  card: string;
  elevated: string;
  input: string;
  border: string;
  accent: string;
  accentSoft: string;
  gold: string;
  goldSoft: string;
};

// Açık tema — canlı zümrüt + sıcak altın, güçlü metin kontrastı.
const lightPalette: Palette = {
  bg: '#EAEFE9',        // sakin adaçayı arka plan
  fg: '#0E1A13',        // neredeyse siyah koyu yeşil (yüksek kontrast)
  muted: '#516155',     // koyulaştırılmış ikincil metin
  soft: '#D3DCD4',      // ayraç / kenarlık
  card: '#FFFFFF',
  elevated: '#FFFFFF',
  input: '#E7ECE7',
  border: '#DCE4DD',
  accent: '#0E7A57',    // canlı zümrüt
  accentSoft: 'rgba(14,122,87,0.12)',
  gold: '#B67C1E',      // derin altın (ikincil vurgu)
  goldSoft: 'rgba(182,124,30,0.14)',
};

// Koyu tema — derin yeşil-siyah, parlak nane-zümrüt + altın.
const darkPalette: Palette = {
  bg: '#0E1512',
  fg: '#E9F1EB',
  muted: '#8FA096',
  soft: '#28332C',
  card: '#161F1A',
  elevated: '#1C2721',
  input: '#1E2822',
  border: '#26322B',
  accent: '#37D9A0',    // parlak nane-zümrüt
  accentSoft: 'rgba(55,217,160,0.14)',
  gold: '#E6B860',      // sıcak altın
  goldSoft: 'rgba(230,184,96,0.15)',
};

export function useTheme(): { isDark: boolean; palette: Palette } {
  const themeMode = useMushafStore((s) => s.themeMode);
  // 'system' seçeneği ayarlardan kaldırıldı; eski kayıtlı değerler için
  // güvenli varsayılan olarak aydınlığa düşer.
  const isDark = themeMode === 'dark';

  return { isDark, palette: isDark ? darkPalette : lightPalette };
}
