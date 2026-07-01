import { StyleSheet } from 'react-native';
import { FONT } from '../../lib/typography';

export const THEME = {
  bg: '#171412',
  surface: '#211D1A',
  surfaceSoft: '#2A2521',
  border: '#3A332D',
  text: '#F6ECDD',
  textSoft: '#DCC8A9',
  textMuted: '#A78F74',
  accent: '#E0B565',
  accentSoft: 'rgba(224,181,101,0.14)',
  warning: '#E7A24A',
  danger: '#D86455',
};

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.bg,
  },

  scroll: {
    paddingHorizontal: 20,
  },

  loadingText: {
    fontFamily: FONT.medium,
    color: THEME.textMuted,
    textAlign: 'center',
    marginTop: 80,
    fontSize: 14,
  },

  header: {
    paddingTop: 8,
    marginBottom: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cityBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: THEME.surface,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  cityBtnIcon: { fontSize: 12 },
  cityBtnText: { fontFamily: FONT.semibold, color: THEME.text, fontSize: 13, maxWidth: 140 },
  cityBtnCaret: { color: THEME.textMuted, fontSize: 9 },

  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    gap: 8,
  },
  emptyEmoji: { fontSize: 60, marginBottom: 12 },
  emptyTitle: { fontFamily: FONT.extrabold, color: THEME.text, fontSize: 26, letterSpacing: -0.5 },
  emptyText: {
    fontFamily: FONT.medium,
    color: THEME.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyPrimary: {
    backgroundColor: THEME.accent,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 4,
  },
  emptyPrimaryText: { fontFamily: FONT.bold, color: '#20160A', fontSize: 15 },
  emptyGhost: { paddingHorizontal: 24, paddingVertical: 12 },
  emptyGhostText: { fontFamily: FONT.bold, color: THEME.accent, fontSize: 14 },

  headerEyebrow: {
    fontFamily: FONT.bold,
    color: THEME.textMuted,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: FONT.extrabold,
    color: THEME.text,
    fontSize: 30,
    letterSpacing: -0.6,
  },
  headerDate: {
    fontFamily: FONT.medium,
    color: THEME.textSoft,
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },

  heroCard: {
    backgroundColor: THEME.surface,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 18,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroLabel: {
    fontFamily: FONT.bold,
    color: THEME.textMuted,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroBadge: {
    backgroundColor: THEME.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroBadgeText: {
    fontFamily: FONT.bold,
    color: THEME.accent,
    fontSize: 10,
    letterSpacing: 0.8,
  },
  heroPrayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroPrayerName: {
    fontFamily: FONT.extrabold,
    color: THEME.text,
    fontSize: 28,
    letterSpacing: -0.5,
  },
  heroPrayerArabic: {
    color: THEME.textSoft,
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Amiri_400Regular',
  },
  heroTimePill: {
    backgroundColor: THEME.surfaceSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroTimePillText: {
    fontFamily: FONT.bold,
    color: THEME.text,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  heroCountdown: {
    fontFamily: FONT.extrabold,
    fontSize: 54,
    lineHeight: 62,
    marginBottom: 4,
    letterSpacing: 1,
    fontVariant: ['tabular-nums'],
  },
  heroSub: {
    fontFamily: FONT.medium,
    color: THEME.textMuted,
    fontSize: 12,
    marginBottom: 18,
  },
  heroProgressTrack: {
    height: 6,
    backgroundColor: THEME.surfaceSoft,
    borderRadius: 999,
    overflow: 'hidden',
  },
  heroProgressFill: {
    height: 6,
    borderRadius: 999,
  },

  alertCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
  },
  alertCardWarn: {
    backgroundColor: '#2C2218',
    borderColor: '#5E4731',
  },
  alertCardDanger: {
    backgroundColor: '#2A1717',
    borderColor: '#5A302B',
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    flexShrink: 0,
  },
  alertText: {
    fontFamily: FONT.medium,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },

  sectionTitle: {
    fontFamily: FONT.extrabold,
    color: THEME.textSoft,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  listCard: {
    backgroundColor: THEME.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  prayerRow: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prayerRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: THEME.border,
  },

  prayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prayerIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: THEME.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerIconWrapActive: {
    backgroundColor: '#34291F',
  },
  prayerIcon: {
    fontSize: 17,
  },

  prayerRight: {
    alignItems: 'flex-end',
    gap: 6,
  },

  prayerName: {
    fontFamily: FONT.semibold,
    color: THEME.text,
    fontSize: 15,
  },
  prayerNameActive: {
    color: THEME.accent,
  },
  prayerNamePassed: {
    color: THEME.textMuted,
  },
  prayerArabic: {
    color: THEME.textMuted,
    fontSize: 12,
    marginTop: 3,
    fontFamily: 'Amiri_400Regular',
  },

  prayerTime: {
    fontFamily: FONT.bold,
    color: THEME.textSoft,
    fontSize: 16,
    fontVariant: ['tabular-nums'],
  },
  prayerTimeActive: {
    color: THEME.accent,
  },
  prayerTimePassed: {
    color: THEME.textMuted,
  },

  inlineBadge: {
    backgroundColor: THEME.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  inlineBadgeText: {
    fontFamily: FONT.bold,
    color: THEME.accent,
    fontSize: 8,
    letterSpacing: 0.8,
  },

  kerahatCard: {
    backgroundColor: THEME.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: THEME.border,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  kerahatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
  },
  kerahatRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: THEME.border,
  },
  kerahatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  kerahatDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: THEME.danger,
  },
  kerahatName: {
    fontFamily: FONT.semibold,
    color: THEME.text,
    fontSize: 13,
  },
  kerahatRange: {
    fontFamily: FONT.semibold,
    color: THEME.textSoft,
    fontSize: 12,
    fontVariant: ['tabular-nums'],
  },

  ornament: {
    textAlign: 'center',
    color: THEME.textMuted,
    fontSize: 13,
    letterSpacing: 6,
    paddingVertical: 24,
    opacity: 0.75,
  },
});