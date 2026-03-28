import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = Math.min(width, height) * 0.65;

export const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowRing: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(245, 216, 100, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    // Glow — tek halkadan geliyor
    shadowColor: '#d4a820',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 28,
    elevation: 20,
  },
  arabicText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#ddc98a',
    fontFamily: 'Amiri_700Bold',
    textAlign: 'center',
    textShadowColor: 'rgba(180,140,60,0.65)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
});