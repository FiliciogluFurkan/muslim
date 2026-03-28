// lib/timings/quranData.ts
// Ayet metinleri + mealler için tip

export interface AyahText {
  surah: number;
  ayah: number;
  arabic: string;
  turkish: string; // Diyanet meali
}

// quran.com veya Al-Quran Cloud API'den Türkçe meal çekme
export async function fetchSurahTexts(surahNumber: number): Promise<AyahText[]> {
  // Al-Quran Cloud — açık API, key gerektirmez
  const arabicRes  = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
  const turkishRes = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/tr.diyanet`);

  const arabicData  = await arabicRes.json();
  const turkishData = await turkishRes.json();

  const arabicAyahs  = arabicData.data.ayahs  as any[];
  const turkishAyahs = turkishData.data.ayahs as any[];

  return arabicAyahs.map((a: any, i: number) => ({
    surah: surahNumber,
    ayah: a.numberInSurah,
    arabic: a.text,
    turkish: turkishAyahs[i]?.text ?? '',
  }));
}