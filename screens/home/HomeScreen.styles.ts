import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    gap: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 13,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  sub: {
    fontSize: 14,
    marginTop: 2,
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsBtnText: {
    fontSize: 16,
  },
  navBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  navBtnText: {
    fontSize: 15,
    fontWeight: '500',
  },
  navBtnDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  navBtnArrow: {
    fontSize: 15,
  },
  section: {
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  arabic: {
    fontFamily: 'UthmanicHafs',
    fontSize: 32,
    lineHeight: 52,
    textAlign: 'right',
  },
  turkish: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  hadith: {
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'left',
  },
  ref: {
    fontSize: 13,
    lineHeight: 18,
  },
});
