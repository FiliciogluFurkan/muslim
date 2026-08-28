import { StyleSheet } from 'react-native';
import { FONT } from '../../lib/typography';

export const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20 },

  // Header
  header: { paddingBottom: 20, gap: 14 },
  eyebrow: {
    fontFamily: FONT.extrabold,
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONT.extrabold,
    fontSize: 28,
    letterSpacing: -0.6,
  },

  // Filter tabs
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  filterTabText: {
    fontFamily: FONT.semibold,
    fontSize: 13,
  },

  // Section label
  sectionLabel: {
    fontFamily: FONT.extrabold,
    fontSize: 13,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 8,
  },

  // Card
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 12,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  tagPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontFamily: FONT.semibold,
    fontSize: 11,
  },
  cardTitle: {
    fontFamily: FONT.extrabold,
    fontSize: 17,
    letterSpacing: -0.3,
    flex: 1,
    lineHeight: 24,
  },
  cardSubtitle: {
    fontFamily: FONT.medium,
    fontSize: 13,
    lineHeight: 19,
  },
  readTime: {
    fontFamily: FONT.medium,
    fontSize: 12,
    marginTop: 2,
  },
  cardArrow: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },

  // Detail screen
  detailScroll: { paddingHorizontal: 24 },
  detailHeader: { gap: 10, paddingBottom: 24 },
  detailTag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  detailTagText: {
    fontFamily: FONT.semibold,
    fontSize: 12,
  },
  detailTitle: {
    fontFamily: FONT.extrabold,
    fontSize: 26,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  detailSubtitle: {
    fontFamily: FONT.medium,
    fontSize: 15,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  arabicBox: {
    borderRadius: 16,
    padding: 20,
    gap: 10,
    alignItems: 'center',
  },
  arabicText: {
    fontFamily: FONT.arabic,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 42,
  },
  transliteration: {
    fontFamily: FONT.italic,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  paragraph: {
    fontFamily: FONT.regular,
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 16,
  },
  paragraphFirst: {
    fontFamily: FONT.medium,
    fontSize: 17,
    lineHeight: 30,
    marginBottom: 16,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    marginTop: 8,
  },
  sourceLine: {
    height: 1,
    flex: 1,
  },
  sourceText: {
    fontFamily: FONT.semibold,
    fontSize: 12,
    letterSpacing: 0.4,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
