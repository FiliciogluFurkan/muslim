// Uygulama tipografisi — Plus Jakarta Sans (Türkçe destekli, modern UI fontu).
// Ağırlıkları isimle uyguluyoruz; fontWeight yerine doğru aileyi seçmek gerekir
// (aksi halde sistem fontu "faux-bold" yapar ve kötü görünür).

export const FONT = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
  italic: 'PlusJakartaSans_500Medium_Italic',
  // Arapça
  arabic: 'Amiri_400Regular',
  arabicBold: 'Amiri_700Bold',
} as const;
