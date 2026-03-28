// lib/timings/parser.ts
// everyayah.com timing formatı: "surah|verse|duration_ms" — her satır bir ayet

export interface AyahTiming {
  surah: number;
  ayah: number;
  startMs: number;   // ayetin başladığı milisaniye
  durationMs: number;
}

// everyayah .txt dosyasını parse et
// Format: her satır → "surahNo|ayahNo|durationMs"
// startMs = önceki ayetlerin duration toplamı
export function parseEveryayahTimings(rawText: string, targetSurah: number): AyahTiming[] {
  const lines = rawText.trim().split('\n');
  const result: AyahTiming[] = [];
  let cumulativeMs = 0;

  for (const line of lines) {
    const parts = line.trim().split('|');
    if (parts.length < 3) continue;

    const surah    = parseInt(parts[0]);
    const ayah     = parseInt(parts[1]);
    const duration = parseInt(parts[2]);

    if (surah !== targetSurah) {
      // Farklı sure — sadece kümülatif süreyi takip et (aynı dosyada tüm sureler olabilir)
      if (surah > targetSurah) break; // Geçtik, dur
      cumulativeMs += duration;
      continue;
    }

    result.push({
      surah,
      ayah,
      startMs: cumulativeMs,
      durationMs: duration,
    });

    cumulativeMs += duration;
  }

  return result;
}