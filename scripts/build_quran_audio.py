#!/usr/bin/env python3
# build_quran_audio.py
# Çalıştır: python build_quran_audio.py
# Çıktı: assets/audio/ klasöründe MP3'ler + assets/timings/ klasöründe JSON'lar

from __future__ import annotations  # ← BU SATIRI EN ÜSTE EKLE
import os
import json
import subprocess
import urllib.request
from pathlib import Path

# ─── Ayarlar ──────────────────────────────────────────────────────────────────
RECITER    = "Yasser_Ad-Dussary_128kbps"
BASE_URL   = f"https://everyayah.com/data/{RECITER}"
OUT_AUDIO  = Path("assets/audio")
OUT_TIMING = Path("assets/timings")
TEMP_DIR   = Path("temp_ayahs")

# Sure başına ayet sayıları (1-114)
SURAH_VERSE_COUNTS = [
    7,286,200,176,120,165,206,75,129,109,
    123,111,43,52,99,128,111,110,98,135,
    112,78,118,64,77,227,93,88,69,60,
    34,30,73,54,45,83,182,88,75,85,
    54,53,89,59,37,35,38,29,18,45,
    60,49,62,55,78,96,29,22,24,13,
    14,11,11,18,12,12,30,52,52,44,
    28,28,20,56,40,31,50,40,46,42,
    29,19,36,25,22,17,19,26,30,20,
    15,21,11,8,8,19,5,8,8,11,
    11,8,3,9,5,4,7,3,6,3,
    5,4,5,4,4,10,4,7,
]

def download_file(url: str, dest: Path) -> bool:
    if dest.exists():
        return True
    try:
        urllib.request.urlretrieve(url, dest)
        return True
    except Exception as e:
        print(f"  ❌ İndirme hatası: {url} → {e}")
        return False

def get_duration(mp3_path: Path) -> float:
    """FFprobe ile MP3 süresini saniye cinsinden al"""
    result = subprocess.run(
        [
            "ffprobe", "-v", "quiet",
            "-show_entries", "format=duration",
            "-of", "csv=p=0",
            str(mp3_path)
        ],
        capture_output=True, text=True
    )
    try:
        return float(result.stdout.strip())
    except:
        return 0.0

def merge_audio(input_files: list[Path], output: Path) -> bool:
    """FFmpeg ile MP3'leri birleştir"""
    if output.exists():
        return True

    # Türkçe karakter sorununu aşmak için temp klasörü C:\ altına al
    import tempfile
    tmp_dir = Path(tempfile.gettempdir())  # C:\Users\furka\AppData\Local\Temp
    list_file = tmp_dir / "concat_list.txt"
    out_tmp = tmp_dir / output.name  # önce temp'e yaz

    with open(list_file, "w", encoding="utf-8") as f:
        for p in input_files:
            # Kısa yol al (8.3 format) - Türkçe karakteri ortadan kaldırır
            import ctypes
            buf = ctypes.create_unicode_buffer(32768)
            ctypes.windll.kernel32.GetShortPathNameW(str(p.absolute()), buf, 32768)
            short = buf.value or str(p.absolute())
            f.write(f"file '{short}'\n")

    result = subprocess.run(
        [
            "ffmpeg", "-y",
            "-f", "concat",
            "-safe", "0",
            "-i", str(list_file),
            "-acodec", "libmp3lame",
            "-q:a", "4",
            str(out_tmp)
        ],
        capture_output=True, text=True
    )

    if result.returncode != 0:
        print(f"  FFmpeg stderr:\n{result.stderr[-1000:]}")
        return False

    # Temp'ten asıl hedefe taşı
    import shutil
    shutil.move(str(out_tmp), str(output))
    return True

def build_surah(surah_num: int, verse_count: int) -> dict | None:
    surah_str  = str(surah_num).zfill(3)
    surah_dir  = TEMP_DIR / surah_str
    surah_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n📖 Sure {surah_num} ({verse_count} ayet) işleniyor...")

    # 1. Ayet MP3'lerini indir
    ayah_files = []
    for ayah_num in range(1, verse_count + 1):
        ayah_str  = str(ayah_num).zfill(3)
        filename  = f"{surah_str}{ayah_str}.mp3"
        url       = f"{BASE_URL}/{filename}"
        dest      = surah_dir / filename

        print(f"  ⬇ {filename}", end="\r")
        if not download_file(url, dest):
            print(f"  ❌ Sure {surah_num} ayet {ayah_num} indirilemedi, atlanıyor")
            return None
        ayah_files.append(dest)

    print(f"  ✅ {verse_count} ayet indirildi          ")

    # 2. Süreleri hesapla → timing JSON
    timings = []
    cursor  = 0.0
    for i, f in enumerate(ayah_files):
        duration = get_duration(f)
        timings.append({
            "verseNumber": i + 1,
            "start":       round(cursor, 3),
            "duration":    round(duration, 3),
        })
        cursor += duration

    total_duration = round(cursor, 3)

    # 3. MP3'leri birleştir
    out_mp3 = OUT_AUDIO / f"{surah_str}.mp3"
    print(f"  🔗 Birleştiriliyor → {out_mp3.name}")
    if not merge_audio(ayah_files, out_mp3):
        print(f"  ❌ Birleştirme başarısız")
        return None

    print(f"  ✅ {out_mp3.name} oluşturuldu ({total_duration:.1f}s)")

    # 4. Timing JSON kaydet
    timing_data = {
        "surahNumber":   surah_num,
        "totalDuration": total_duration,
        "timings":       timings,
    }
    out_json = OUT_TIMING / f"{surah_str}.json"
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(timing_data, f, ensure_ascii=False, indent=2)

    print(f"  ✅ {out_json.name} kaydedildi")
    return timing_data

def main():
    # FFmpeg kontrolü
    result = subprocess.run(["ffmpeg", "-version"], capture_output=True)
    if result.returncode != 0:
        print("❌ FFmpeg bulunamadı. Kur: https://ffmpeg.org/download.html")
        return

    # Klasörleri oluştur
    OUT_AUDIO.mkdir(parents=True, exist_ok=True)
    OUT_TIMING.mkdir(parents=True, exist_ok=True)
    TEMP_DIR.mkdir(parents=True, exist_ok=True)

    # Hangi sureleri işleyeceksin?
    # Tümü için: range(1, 115)
    # Test için: [1, 112, 113, 114]
    TARGET_SURAHS = [1]  # ← önce sadece Fatiha ile test et

    results = {}
    for surah_num in TARGET_SURAHS:
        verse_count = SURAH_VERSE_COUNTS[surah_num - 1]
        data = build_surah(surah_num, verse_count)
        if data:
            results[surah_num] = data

    # Özet
    print(f"\n{'='*50}")
    print(f"✅ {len(results)} sure tamamlandı")
    print(f"📁 Sesler:    {OUT_AUDIO.absolute()}")
    print(f"📁 Timing'ler: {OUT_TIMING.absolute()}")

    # Örnek timing çıktısı
    if 1 in results:
        print(f"\nFatiha timing örneği:")
        for t in results[1]["timings"]:
            print(f"  Ayet {t['verseNumber']:2d} → start={t['start']:6.3f}s  dur={t['duration']:.3f}s")

if __name__ == "__main__":
    main()