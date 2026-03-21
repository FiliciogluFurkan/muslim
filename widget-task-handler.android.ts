import Constants from 'expo-constants';

// Expo Go bu modülü yüklese bile native widget API’si yok; sadece gerçek build’de kayıt et.
if (Constants.appOwnership !== 'expo') {
  const { registerWidgetTaskHandler } = require('react-native-android-widget') as typeof import('react-native-android-widget');
  const { renderAndroidVerseWidget } = require('./widgets/AndroidVerseWidget') as typeof import('./widgets/AndroidVerseWidget');

  registerWidgetTaskHandler(async ({ widgetInfo, renderWidget }) => {
    if (widgetInfo.widgetName !== 'MushafVerse') {
      return;
    }
    renderWidget(await renderAndroidVerseWidget());
  });
}
