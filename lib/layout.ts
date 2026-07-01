// Ortak yerleşim sabitleri.
// Tab bar "position: absolute" ile yüzdüğü için, sekme ekranlarının kaydırma
// içeriği bu yükseklik kadar alttan boşluk bırakmalı (aksi halde son öğe barın
// altında kalır).

/** Güvenli alan hariç tab bar gövde yüksekliği (app/(tabs)/_layout.tsx ile eşleşir). */
export const TAB_BAR_HEIGHT = 62;

/** Sekme ekranları için önerilen alt kaydırma boşluğu. */
export function tabScrollPadding(insetBottom: number, extra = 24): number {
  return insetBottom + TAB_BAR_HEIGHT + extra;
}
