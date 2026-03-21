import Constants from 'expo-constants';

/** `true` yalnızca Expo Go istemcisinde; development / production build’de `false`. */
export function isExpoGo(): boolean {
  return Constants.appOwnership === 'expo';
}
