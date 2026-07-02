import { StyleSheet } from 'react-native';
import { FONT } from '../../lib/typography';
import { HERO } from '../../lib/heroTheme';

// İmza renkleri artık lib/heroTheme'de — Vakitler ekranıyla paylaşılır.
export { HERO, TEAL } from '../../lib/heroTheme';

const RADIUS = {
  card: 20,
  control: 13,
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
  stickyInfo: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  stickyTime: {
    fontFamily: FONT.extrabold,
    fontSize: 15.5,
    letterSpacing: 0.3,
    fontVariant: ['tabular-nums'],
  },
  stickyIconBtn: { padding: 4 },

  /* ─── Başlık ─────────────────────────────────── */
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 6,
    paddingBottom: 18,
  },
  titleBlock: { flex: 1 },
  greetingEyebrow: {
    fontFamily: FONT.bold,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  greetingTitle: { fontFamily: FONT.extrabold, fontSize: 23, letterSpacing: -0.5 },
  greetingSub: { fontFamily: FONT.medium, fontSize: 13, lineHeight: 18, marginTop: 5 },
  subCountdownLine: {
    fontFamily: FONT.semibold,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  subCountdown: { fontFamily: FONT.extrabold, fontVariant: ['tabular-nums'], letterSpacing: 0.2 },

  settingsBtn: { padding: 4 },

  /* ─── Bölüm başlığı ───────────────────────────── */
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    padding: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  featureHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureKickerWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureKickerDot: { width: 6, height: 6, borderRadius: 3 },
  featureKicker: {
    fontFamily: FONT.extrabold,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  arabic: { fontFamily: FONT.arabic, fontSize: 23, lineHeight: 44, textAlign: 'right' },

  accentRule: {
    width: 32,
    height: 2.5,
    borderRadius: 2,
    marginVertical: 12,
  },

  turkish: { fontFamily: FONT.regular, fontSize: 14.5, lineHeight: 23 },

  featureFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  featureRef: { fontFamily: FONT.bold, fontSize: 12.5, letterSpacing: 0.2, flexShrink: 1 },

  footerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  textBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: RADIUS.control,
  },
  textBtnLabel: { fontFamily: FONT.bold, fontSize: 13 },

  /* ─── Hadis (sol altın çizgili alıntı) ────────── */
  quoteRow: { flexDirection: 'row', gap: 14 },
  quoteBar: { width: 3, borderRadius: 2, alignSelf: 'stretch' },
  hadith: { flex: 1, fontFamily: FONT.italic, fontSize: 15, lineHeight: 24 },

  /* ─── Namaz hero (zümrüt) ─────────────────────── */
  prayerHero: {
    borderRadius: RADIUS.card,
    padding: 18,
    marginBottom: 8,
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
    marginBottom: 14,
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
    marginBottom: 12,
  },
  prayerHeroName: {
    fontFamily: FONT.extrabold,
    color: HERO.onDark,
    fontSize: 27,
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  prayerHeroArabic: { fontFamily: FONT.arabic, color: HERO.mint, fontSize: 18, lineHeight: 28, marginTop: 7 },
  timePill: {
    backgroundColor: HERO.onDark,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: RADIUS.control,
  },
  timePillText: {
    fontFamily: FONT.extrabold,
    color: HERO.bgAlt,
    fontSize: 17,
    letterSpacing: 0.4,
    fontVariant: ['tabular-nums'],
  },
  countdownRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 10 },
  prayerHeroCountdown: {
    fontFamily: FONT.extrabold,
    color: HERO.onDark,
    fontSize: 28,
    letterSpacing: 0.8,
    fontVariant: ['tabular-nums'],
  },
  prayerHeroCountLabel: { fontFamily: FONT.semibold, color: HERO.onDarkSoft, fontSize: 12.5 },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: HERO.track, overflow: 'hidden' },
  progressFill: { height: 4, borderRadius: 2, backgroundColor: HERO.mint },
  heroMuted: { fontFamily: FONT.medium, color: HERO.onDarkSoft, fontSize: 13.5, lineHeight: 20, marginTop: 4 },
  heroActions: { flexDirection: 'row', gap: 10, marginTop: 14 },
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
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 6,
    marginBottom: 22,
  },
  stripContent: { paddingHorizontal: 8, gap: 4 },
  stripItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 13,
    minWidth: 58,
  },
  stripName: { fontFamily: FONT.semibold, fontSize: 10.5, marginBottom: 4, letterSpacing: 0.3 },
  stripTime: { fontFamily: FONT.bold, fontSize: 13.5, fontVariant: ['tabular-nums'] },
  stripNextDot: { width: 4, height: 4, borderRadius: 2, marginTop: 5 },
  stripTrack: {
    height: 3,
    borderRadius: 999,
    marginHorizontal: 14,
    marginTop: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  stripFill: { height: 3, borderRadius: 999 },

  /* ─── Hızlı erişim ────────────────────────────── */
  navGrid: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  navCard: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    minHeight: 112,
    justifyContent: 'space-between',
  },
  navCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  navCardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navCardLabel: { fontFamily: FONT.bold, fontSize: 14.5, marginTop: 12, letterSpacing: -0.2 },
  navCardTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: RADIUS.pill,
    marginTop: 6,
  },
  navCardTagText: { fontFamily: FONT.bold, fontSize: 10.5, letterSpacing: 0.1 },

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