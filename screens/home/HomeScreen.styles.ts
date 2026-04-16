import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: { flex: 1 },

  scroll: {
    paddingHorizontal: 20,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 26,
  },
  titleBlock: {
    flex: 1,
    paddingRight: 16,
  },
  titleEyebrow: {
    fontSize: 12,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  sub: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },

  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsBtnText: {
    fontSize: 18,
    fontWeight: '600',
  },

  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 26,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroLabel: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  heroBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 14,
    lineHeight: 22,
  },

  sectionLabel: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
    fontWeight: '700',
  },

  navGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  navCard: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 14,
    minHeight: 112,
    justifyContent: 'space-between',
  },
  navCardIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  navCardIcon: {
    fontSize: 15,
  },
  navCardLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  navCardDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  navCardArrow: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '700',
  },

  verseCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 18,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  verseHeaderLabel: {
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  verseHeaderAction: {
    fontSize: 12,
    fontWeight: '700',
  },
  arabic: {
    fontFamily: 'UthmanicHafs',
    fontSize: 30,
    lineHeight: 54,
    textAlign: 'right',
    marginBottom: 14,
  },
  verseDivider: {
    height: 1,
    marginVertical: 14,
    opacity: 0.5,
  },
  turkish: {
    fontSize: 15,
    lineHeight: 25,
  },
  ref: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },

  hadithCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 18,
  },
  hadithTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  hadithAccent: {
    width: 28,
    height: 3,
    borderRadius: 99,
  },
  hadithLabel: {
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  hadith: {
    fontSize: 15,
    lineHeight: 26,
    fontStyle: 'italic',
  },

  ornament: {
    textAlign: 'center',
    fontSize: 13,
    letterSpacing: 8,
    paddingTop: 8,
    paddingBottom: 18,
    opacity: 0.22,
  },
}); 