# Design Document

## Overview

Bu tasarım, mevcut video oynatıcı sistemini tüm 114 sure için genişletmeyi hedeflemektedir. Şu anda sadece Fatiha Suresi (sure 1) için çalışan sistem, diğer 113 sure için de aynı şekilde çalışacak şekilde genişletilecektir.

### Current Architecture

Mevcut sistem şu bileşenlerden oluşmaktadır:
- **Video Player Screen**: Expo Video ve Expo Audio kullanarak video + audio senkronizasyonu
- **Surah Data System**: Audio, timing ve metin verilerini yöneten lib/videoSurahData.ts
- **Surah List**: Sure listesi ve video rozeti gösteren ekran

### What Needs to Change

1. **Route parametresi**: Video player'a sure numarası gönderilecek
2. **Data expansion**: 114 surenin tümü için veri eklenecek
3. **List update**: SURAHS_WITH_VIDEO dizisi 1-114 arası tüm sureleri içerecek

## Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    SurahListScreen                          │
│  - Tüm 114 sure                                            │
│  - Her surede video rozeti                                  │
│  - Tıklama → video-player/[id]                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Route: /video-player/[id]
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                  VideoPlayerScreen                          │
│  - useLocalSearchParams() ile sure numarası                │
│  - getSurahData(id) ile veri yükleme                       │
│  - Audio + Video senkronizasyonu                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   videoSurahData.ts                         │
│  - AUDIO: Record<1-114, mp3>                               │
│  - TIMINGS: Record<1-114, json>                            │
│  - VERSE_TEXTS: Record<1-114, array>                       │
│  - SURAH_META: Record<1-114, meta>                         │
│  - getSurahData(number): SurahVideoData                    │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Route Parameter System

**File**: `app/video-player/[id].tsx` (yeni dosya)

Expo Router'ın dynamic route özelliğini kullanarak sure numarasını parametre olarak alacağız.

```typescript
// app/video-player/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import VideoPlayerScreen from '../../screens/video-player/VideoPlayerScreen';

export default function VideoPlayerRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const surahNumber = parseInt(id || '1', 10);
  
  return <VideoPlayerScreen surahNumber={surahNumber} />;
}
```

### 2. VideoPlayerScreen Props Update

**File**: `screens/video-player/VideoPlayerScreen.tsx`

Screen artık prop olarak sure numarasını alacak:

```typescript
interface VideoPlayerScreenProps {
  surahNumber?: number; // 1-114, default: 1
}

export default function VideoPlayerScreen({ surahNumber = 1 }: VideoPlayerScreenProps) {
  // Validate range
  const validSurahNumber = Math.max(1, Math.min(surahNumber, 114));
  
  // Load surah data
  const surahData = getSurahData(validSurahNumber);
  
  // Rest of the implementation stays the same
  ...
}
```

### 3. Surah List Navigation Update

**File**: `screens/surah-list/SurahListScreen.tsx`

Sure seçiminde route parametresi ile yönlendirme:

```typescript
const handleSurahPress = useCallback((surahNumber: number) => {
  // Tüm sureler video destekli
  router.push(`/video-player/${surahNumber}`);
}, []);
```

### 4. SURAHS_WITH_VIDEO Expansion

**File**: `screens/surah-list/SurahListScreen.tsx`

```typescript
// Before: const SURAHS_WITH_VIDEO = [1];
// After:
const SURAHS_WITH_VIDEO = Array.from({ length: 114 }, (_, i) => i + 1);
// or simply check: surahNumber >= 1 && surahNumber <= 114
```

## Data Models

### SurahVideoData (existing, no changes)

```typescript
export interface SurahVideoData {
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  totalDuration: number;
  verses: VerseWithTiming[];
}
```

### Data Storage Structure

```
lib/
  videoSurahData.ts
scripts/
  assets/
    audio/
      001.mp3
      002.mp3
      ...
      114.mp3
    timings/
      001.json
      002.json
      ...
      114.json
```

### AUDIO Record Expansion

```typescript
const AUDIO: Record<number, any> = {
  1: require('../scripts/assets/audio/001.mp3'),
  2: require('../scripts/assets/audio/002.mp3'),
  // ... 3-113 ...
  114: require('../scripts/assets/audio/114.mp3'),
};
```

### TIMINGS Record Expansion

```typescript
const TIMINGS: Record<number, any> = {
  1: require('../scripts/assets/timings/001.json'),
  2: require('../scripts/assets/timings/002.json'),
  // ... 3-113 ...
  114: require('../scripts/assets/timings/114.json'),
};
```

### VERSE_TEXTS Record Expansion

Quran.com API veya mevcut quranData.ts'den çekilecek:

```typescript
const VERSE_TEXTS: Record<number, { text: string; translation: string }[]> = {
  1: [...], // existing Fatiha
  2: [...], // Bakara ayetleri
  // ... etc
};
```

### SURAH_META Record Expansion

```typescript
const SURAH_META: Record<number, { name: string; nameArabic: string }> = {
  1: { name: 'Fatiha', nameArabic: 'الفاتحة' },
  2: { name: 'Bakara', nameArabic: 'البقرة' },
  // ... etc from lib/surahNames.ts
};
```

## Error Handling

### Invalid Surah Number

```typescript
function validateSurahNumber(input: number): number {
  const num = Math.floor(input);
  if (num < 1 || num > 114 || isNaN(num)) {
    console.warn(`Invalid surah number: ${input}, defaulting to 1`);
    return 1;
  }
  return num;
}
```

### Missing Data Fallback

```typescript
export function getSurahData(surahNumber: number): SurahVideoData {
  const validNumber = validateSurahNumber(surahNumber);
  
  if (!AUDIO[validNumber] || !TIMINGS[validNumber] || !VERSE_TEXTS[validNumber]) {
    console.error(`Missing data for surah ${validNumber}, falling back to Fatiha`);
    return getSurahData(1);
  }
  
  // ... rest of implementation
}
```

## Testing Strategy

### Unit Tests

1. **validateSurahNumber function**
   - Test range: 1-114 valid
   - Test invalid: 0, 115, -1, NaN
   - Test edge cases: 1, 114

2. **getSurahData function**
   - Test all 114 sure numbers return valid data
   - Test data structure completeness
   - Test fallback to Fatiha for invalid input

3. **Route parameter parsing**
   - Test valid number strings: "1", "57", "114"
   - Test invalid strings: "abc", "0", "115"
   - Test undefined/null defaults to 1

### Integration Tests

1. **Navigation flow**
   - Select sure from list → video player opens with correct sure
   - Back navigation returns to list
   - Parameter persistence across route changes

2. **Data loading**
   - Audio loads correctly for each sure
   - Timing sync works for all suras
   - Verse text displays correctly in Arabic and Turkish

### Manual Testing Checklist

- [ ] Open any sure from list → video player opens
- [ ] Audio plays correctly
- [ ] Verses sync with audio timing
- [ ] Swipe left/right navigates verses
- [ ] Progress bar shows correctly
- [ ] Back button returns to list
- [ ] Video rozeti shows on all 114 suras
- [ ] Direct URL navigation works: /video-player/57

## Implementation Notes

### Build Script (Optional Enhancement)

Tüm sure verilerini otomatik oluşturmak için:

```bash
node scripts/generateAllSurahs.js
```

Script will:
1. Download audio from Everyayah API
2. Download timing JSON files
3. Fetch verse texts from Quran.com API
4. Generate videoSurahData.ts with all 114 suras

### Performance Considerations

- **Bundle size**: ~2GB for all audio files
- **Initial load**: Only load data for selected sure
- **Memory**: Unload previous sure data when switching
- **Video switching**: Use existing 3-slot buffering system

### Future Enhancements (Not in Scope)

- Lazy loading of audio files
- Download progress indicators
- Offline caching with AsyncStorage
- Custom reciter selection
- Playback speed control
