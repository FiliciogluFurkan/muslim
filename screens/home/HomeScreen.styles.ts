import { StyleSheet } from 'react-native';
import { FONT } from '../../lib/typography';

/**
 * İmza renkleri — temadan bağımsız zümrüt hero.
 * Derin zümrüt + nane vurgusu; tüm yüzeyler bu iki değerin
 * opaklık varyasyonlarından türetilir ki kart tek parça dursun.
 */
export const HERO = {
  bg: '#0E3D2E',
  bgAlt: '#0A2F23',
  mint: '#7CE3B8',
  onDark: '#FFFFFF',
  onDarkSoft: 'rgba(255,255,255,0.68)',
  onDarkFaint: 'rgba(255,255,255,0.42)',
  track: 'rgba(255,255,255,0.14)',
  pill: 'rgba(255,255,255,0.10)',
  pillBorder: 'rgba(255,255,255,0.14)',
};

// Üçüncü aksan (hızlı erişim çeşitliliği için)
export const TEAL = '#2F8F8F';

const RADIUS = {
  card: 24,
  control: 14,
  pill: 999,
};

export const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20 },

  /* ─── Sabit üst bar (kaydırınca beliren) ──────── */
  stickyBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  stickyTitle: { fontFamily: FONT.extrabold, fontSize: 16, letterSpacing: -0.3 },
  stickyIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ─── Başlık ─────────────────────────────────── */
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 6,
    paddingBottom: 22,
  },
  titleBlock: { flex: 1 },
  greetingEyebrow: {
    fontFamily: FONT.bold,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  greetingTitle: { fontFamily: FONT.extrabold, fontSize: 26, letterSpacing: -0.7 },
  greetingSub: { fontFamily: FONT.medium, fontSize: 13, lineHeight: 18, marginTop: 4 },

  settingsBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ─── Bölüm başlığı ───────────────────────────── */
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  sectionLabel: {
    fontFamily: FONT.extrabold,
    fontSize: 11.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sectionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  sectionLinkText: { fontFamily: FONT.bold, fontSize: 12.5 },

  /* ─── Ortak kart ──────────────────────────────── */
  cardShadow: {
    shadowColor: '#0C1F17',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },

  /* ─── Öne çıkan kart (ayet / hadis) ───────────── */
  featureCard: {
    borderRadius: RADIUS.card,
    borderWidth: 1,
    padding: 20,
    marginBottom: 14,
    overflow: 'hidden',
  },
  featureHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureKickerWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureKickerDot: { width: 6, height: 6, borderRadius: 3 },
  featureKicker: {
    fontFamily: FONT.extrabold,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  featureBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
  },
  featureBadgeText: { fontFamily: FONT.bold, fontSize: 11.5 },

  arabic: { fontFamily: FONT.arabic, fontSize: 26, lineHeight: 50, textAlign: 'right' },

  accentRule: {
    width: 32,
    height: 2.5,
    borderRadius: 2,
    marginVertical: 16,
  },

  turkish: { fontFamily: FONT.regular, fontSize: 15, lineHeight: 25.5 },

  featureFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },
  featureRef: { fontFamily: FONT.bold, fontSize: 12.5, letterSpacing: 0.2, flexShrink: 1 },

  footerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  textBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.control,
  },
  textBtnLabel: { fontFamily: FONT.bold, fontSize: 13 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.control,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  /* ─── Hadis (sol altın çizgili alıntı) ────────── */
  quoteRow: { flexDirection: 'row', gap: 14 },
  quoteBar: { width: 3, borderRadius: 2, alignSelf: 'stretch' },
  hadith: { flex: 1, fontFamily: FONT.italic, fontSize: 15.5, lineHeight: 26 },

  /* ─── Namaz hero (zümrüt) ─────────────────────── */
  prayerHero: {
    borderRadius: RADIUS.card,
    padding: 20,
    marginBottom: 10,
    backgroundColor: HERO.bg,
    overflow: 'hidden',
    shadowColor: '#08251A',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    elevation: 8,
  },
  heroGlowTop: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    top: -110,
    right: -70,
    backgroundColor: 'rgba(124,227,184,0.10)',
  },
  heroGlowBottom: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    bottom: -170,
    left: -110,
    backgroundColor: 'rgba(10,47,35,0.9)',
  },
  prayerHeroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  heroLabelWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroLabelDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: HERO.mint },
  prayerHeroLabel: {
    fontFamily: FONT.extrabold,
    color: HERO.mint,
    fontSize: 10.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: HERO.pill,
    borderWidth: 1,
    borderColor: HERO.pillBorder,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  cityPillText: { fontFamily: FONT.semibold, color: HERO.onDark, fontSize: 12, maxWidth: 120 },
  prayerHeroMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  prayerHeroName: {
    fontFamily: FONT.extrabold,
    color: HERO.onDark,
    fontSize: 30,
    lineHeight: 33,
    letterSpacing: -0.6,
  },
  prayerHeroArabic: { fontFamily: FONT.arabic, color: HERO.mint, fontSize: 19, lineHeight: 30, marginTop: 2 },
  timePill: {
    backgroundColor: HERO.onDark,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.control,
  },
  timePillText: {
    fontFamily: FONT.extrabold,
    color: HERO.bgAlt,
    fontSize: 18,
    letterSpacing: 0.4,
    fontVariant: ['tabular-nums'],
  },
  countdownRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 12 },
  prayerHeroCountdown: {
    fontFamily: FONT.extrabold,
    color: HERO.onDark,
    fontSize: 30,
    letterSpacing: 0.8,
    fontVariant: ['tabular-nums'],
  },
  prayerHeroCountLabel: { fontFamily: FONT.semibold, color: HERO.onDarkSoft, fontSize: 12.5 },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: HERO.track, overflow: 'hidden' },
  progressFill: { height: 4, borderRadius: 2, backgroundColor: HERO.mint },
  heroMuted: { fontFamily: FONT.medium, color: HERO.onDarkSoft, fontSize: 13.5, lineHeight: 20, marginTop: 4 },
  heroActions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: HERO.onDark,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: RADIUS.control,
  },
  heroCtaText: { fontFamily: FONT.bold, color: HERO.bgAlt, fontSize: 13 },
  heroCtaGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: RADIUS.control,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.26)',
  },
  heroCtaGhostText: { fontFamily: FONT.bold, color: HERO.onDark, fontSize: 13 },

  /* ─── Vakit şeridi ────────────────────────────── */
  stripCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 8,
    marginBottom: 28,
  },
  stripContent: { paddingHorizontal: 8, gap: 4 },
  stripItem: {
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 14,
    minWidth: 60,
  },
  stripName: { fontFamily: FONT.semibold, fontSize: 10.5, marginBottom: 4, letterSpacing: 0.3 },
  stripTime: { fontFamily: FONT.bold, fontSize: 13.5, fontVariant: ['tabular-nums'] },
  stripNextDot: { width: 4, height: 4, borderRadius: 2, marginTop: 5 },

  /* ─── Hızlı erişim ────────────────────────────── */
  navGrid: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  navCard: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 14,
    minHeight: 104,
    justifyContent: 'space-between',
  },
  navCardIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  navCardLabel: { fontFamily: FONT.bold, fontSize: 14.5, marginBottom: 2, letterSpacing: -0.2 },
  navCardDesc: { fontFamily: FONT.medium, fontSize: 11, lineHeight: 14 },

  /* ─── Alt imza ────────────────────────────────── */
  footerMark: {
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 10,
    gap: 8,
  },
  footerLine: { width: 36, height: StyleSheet.hairlineWidth },
  footerText: {
    fontFamily: FONT.bold,
    fontSize: 10,
    letterSpacing: 4,
    textTransform: 'uppercase',
    opacity: 0.35,
  },
});