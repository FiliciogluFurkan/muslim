import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  backText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '400',
  },
  headerCenter: {
    alignItems: 'center',
    gap: 2,
  },
  headerLabel: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
  },
  surahTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  placeholder: {
    width: 40,
  },

  // ✅ Yazıların arkasına koyu katman
  verseContainer: {
    justifyContent: 'center',        // flex-end → center (yazılar ortada)
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 14,
    marginHorizontal: 16,
    marginVertical: 60,              // header ve bottom'dan uzak dursun
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',  // yarı saydam koyu arka plan
  },
  verseText: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 42,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 64,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  translationText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 24,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  bottomMeta: {
    paddingHorizontal: 22,
    alignItems: 'center',
    gap: 8,
  },
  verseNumber: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    letterSpacing: 0.8,
  },
  progressTrack: {
    width: '100%',
    height: 2,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.34)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  swipeHint: {
    color: 'rgba(255,255,255,0.74)',
    fontSize: 12,
  },
});