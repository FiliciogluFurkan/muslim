import { StyleSheet } from 'react-native';
import { FONT } from '../../lib/typography';
import { HERO } from '../../lib/heroTheme';

/**
 * Vakitler ekranı — ana ekranla aynı dili konuşur:
 * tema uyumlu yüzeyler + zümrüt hero. Renkler TSX'te paletten verilir;
 * burada yalnızca yerleşim ve tipografi durur.
 */
export const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20 },

  /* ─── Başlık ─────────────────────────────────── */
  header: { paddingTop: 6, marginBottom: 14 },
  headerTitle: { fontFamily: FONT.extrabold, fontSize: 25, letterSpacing: -0.6 },
  headerSub: { fontFamily: FONT.medium, fontSize: 13, lineHeight: 18, marginTop: 4 },

  /* ─── Zümrüt hero: dev geri sayım ─────────────── */
  hero: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: HERO.bg,
    overflow: 'hidden',
    marginBottom: 12,
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
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroLabelWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroLabelDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: HERO.mint },
  heroLabel: {
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
    borderRadius: 999,
  },
  cityPillText: { fontFamily: FONT.semibold, color: HERO.onDark, fontSize: 12, maxWidth: 120 },

  heroMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  heroName: {
    fontFamily: FONT.extrabold,
    color: HERO.onDark,
    fontSize: 27,
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  heroArabic: { fontFamily: FONT.arabic, color: HERO.mint, fontSize: 18, lineHeight: 28, marginTop: 2 },
  timePill: {
    backgroundColor: HERO.onDark,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 13,
  },
  timePillText: {
    fontFamily: FONT.extrabold,
    color: HERO.bgAlt,
    fontSize: 17,
    letterSpacing: 0.4,
    fontVariant: ['tabular-nums'],
  },

  heroDone: {
    fontFamily: FONT.medium,
    color: HERO.onDarkSoft,
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 4,
  },

  countdownRow: { flexDirection: 'row', alignItems: 'baseline', gap: 9, marginBottom: 14 },
  countdown: {
    fontFamily: FONT.extrabold,
    color: HERO.onDark,
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: 1,
    fontVariant: ['tabular-nums'],
  },
  countdownLabel: { fontFamily: FONT.semibold, color: HERO.onDarkSoft, fontSize: 13 },

  progressTrack: {
    height: 5,
    borderRadius: 999,
    backgroundColor: HERO.track,
    overflow: 'hidden',
  },
  progressFill: { height: 5, borderRadius: 999, backgroundColor: HERO.mint },

  /* ─── Kerahat uyarısı ─────────────────────────── */
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    padding: 13,
    marginBottom: 12,
  },
  alertDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  alertText: { fontFamily: FONT.medium, fontSize: 12.5, lineHeight: 18, flex: 1 },

  /* ─── Bölüm başlığı ───────────────────────────── */
  sectionLabel: {
    fontFamily: FONT.extrabold,
    fontSize: 11.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 10,
    paddingHorizontal: 2,
  },

  /* ─── Vakit zaman çizelgesi ───────────────────── */
  listCard: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingRight: 12,
  },
  railWrap: {
    width: 30,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  railTop: { position: 'absolute', top: 0, height: '50%', width: 2, borderRadius: 1 },
  railBottom: { position: 'absolute', bottom: 0, height: '50%', width: 2, borderRadius: 1 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotHollow: { width: 9, height: 9, borderRadius: 4.5, borderWidth: 1.5, backgroundColor: 'transparent' },
  nextDotWrap: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
  nextDotRing: { position: 'absolute', width: 22, height: 22, borderRadius: 11, borderWidth: 1.5 },
  nextDotCore: { width: 9, height: 9, borderRadius: 4.5 },

  rowInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginLeft: 4,
  },
  prayerName: { fontFamily: FONT.semibold, fontSize: 15 },
  prayerNameNext: { fontFamily: FONT.extrabold, fontSize: 15, letterSpacing: -0.2 },
  prayerArabic: { fontFamily: FONT.arabic, fontSize: 12.5, lineHeight: 18, marginTop: 1 },
  prayerRemain: { fontFamily: FONT.bold, fontSize: 11.5, marginTop: 3 },
  prayerTime: { fontFamily: FONT.bold, fontSize: 15.5, fontVariant: ['tabular-nums'] },

  /* ─── Kerahat listesi ─────────────────────────── */
  kerahatCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  kerahatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
  },
  kerahatRowBorder: { borderBottomWidth: StyleSheet.hairlineWidth },
  kerahatLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  kerahatDot: { width: 6, height: 6, borderRadius: 3 },
  kerahatName: { fontFamily: FONT.semibold, fontSize: 13.5 },
  kerahatRange: { fontFamily: FONT.semibold, fontSize: 12.5, fontVariant: ['tabular-nums'] },

  /* ─── Boş / yükleniyor durumları ──────────────── */
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    gap: 8,
  },
  emptyBadge: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emptyTitle: { fontFamily: FONT.extrabold, fontSize: 23, letterSpacing: -0.5 },
  emptyText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 14,
  },
  emptyPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 14,
    marginBottom: 2,
  },
  emptyPrimaryText: { fontFamily: FONT.bold, fontSize: 14.5 },
  emptyGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  emptyGhostText: { fontFamily: FONT.bold, fontSize: 14 },
  loadingText: { fontFamily: FONT.medium, fontSize: 13.5, marginTop: 12 },

  /* ─── Alt imza ────────────────────────────────── */
  footerMark: {
    alignItems: 'center',
    paddingTop: 22,
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
