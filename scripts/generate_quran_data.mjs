/**
 * Tam Kur'an verisini oluşturur:
 * 1. alquran.cloud API'den Arapça (Uthmani) metin
 * 2. Mevcut verses_tr.json'dan Diyanet meali (page/juz bilgisi dahil)
 * 3. alquran.cloud API'den Elmalılı meali
 *
 * Çıktılar:
 *   assets/data/quran_full.json          – Arapça + sayfa/cüz meta
 *   assets/data/translations/diyanet.json – Diyanet meali
 *   assets/data/translations/elmali.json  – Elmalılı Hamdi Yazır meali
 *   assets/data/juzs.json                – 30 cüz başlangıç/bitiş bilgisi
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', 'assets', 'data');
const TRANS_DIR = join(DATA_DIR, 'translations');

// ─── helpers ─────────────────────────────────────────────────────
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${url}`);
  return res.json();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── 1. Arapça metin (Uthmani) ─────────────────────────────────
async function fetchArabic() {
  console.log('⏳ Arapça metin çekiliyor (quran-uthmani)…');
  const result = [];

  for (let surah = 1; surah <= 114; surah++) {
    const url = `https://api.alquran.cloud/v1/surah/${surah}/quran-uthmani`;
    const data = await fetchJSON(url);
    const ayahs = data.data.ayahs;
    for (const a of ayahs) {
      result.push({
        surah_number: surah,
        verse_number: a.numberInSurah,
        arabic: a.text,
        page_number: a.page,
        juz_number: a.juz,
      });
    }
    if (surah % 10 === 0) console.log(`  ✓ ${surah}/114 sure tamamlandı`);
    await sleep(150); // rate limit
  }
  console.log(`✅ Toplam ${result.length} ayet çekildi.`);
  return result;
}

// ─── 2. Diyanet meali (mevcut verses_tr.json'dan) ──────────────
function loadDiyanet() {
  console.log('📖 Diyanet meali yükleniyor (verses_tr.json)…');
  const raw = readFileSync(join(DATA_DIR, 'verses_tr.json'), 'utf-8');
  const verses = JSON.parse(raw);
  return verses.map((v) => ({
    surah_number: v.surah_number,
    verse_number: v.verse_number,
    text: v.turkish,
  }));
}

// ─── 3. Elmalılı meali (API'den) ──────────────────────────────
async function fetchElmali() {
  console.log('⏳ Elmalılı meali çekiliyor (tr.yazir)…');
  const result = [];

  for (let surah = 1; surah <= 114; surah++) {
    const url = `https://api.alquran.cloud/v1/surah/${surah}/tr.yazir`;
    const data = await fetchJSON(url);
    const ayahs = data.data.ayahs;
    for (const a of ayahs) {
      result.push({
        surah_number: surah,
        verse_number: a.numberInSurah,
        text: a.text,
      });
    }
    if (surah % 10 === 0) console.log(`  ✓ ${surah}/114 sure tamamlandı`);
    await sleep(150); // rate limit
  }
  console.log(`✅ Elmalılı toplam ${result.length} ayet.`);
  return result;
}

// ─── 4. Cüz meta verisi ────────────────────────────────────────
function buildJuzMeta(quranFull) {
  console.log('📐 Cüz meta verisi hesaplanıyor…');
  const juzs = [];
  for (let j = 1; j <= 30; j++) {
    const juzVerses = quranFull.filter((v) => v.juz_number === j);
    const first = juzVerses[0];
    const last = juzVerses[juzVerses.length - 1];
    juzs.push({
      juz_number: j,
      start_surah: first.surah_number,
      start_verse: first.verse_number,
      end_surah: last.surah_number,
      end_verse: last.verse_number,
      verse_count: juzVerses.length,
    });
  }
  return juzs;
}

// ─── main ──────────────────────────────────────────────────────
async function main() {
  if (!existsSync(TRANS_DIR)) mkdirSync(TRANS_DIR, { recursive: true });

  // Arapça
  const quranFull = await fetchArabic();
  writeFileSync(
    join(DATA_DIR, 'quran_full.json'),
    JSON.stringify(quranFull),
    'utf-8',
  );
  console.log('💾 quran_full.json yazıldı.');

  // Diyanet
  const diyanet = loadDiyanet();
  writeFileSync(
    join(TRANS_DIR, 'diyanet.json'),
    JSON.stringify(diyanet),
    'utf-8',
  );
  console.log('💾 translations/diyanet.json yazıldı.');

  // Elmalılı
  const elmali = await fetchElmali();
  writeFileSync(
    join(TRANS_DIR, 'elmali.json'),
    JSON.stringify(elmali),
    'utf-8',
  );
  console.log('💾 translations/elmali.json yazıldı.');

  // Cüzler
  const juzs = buildJuzMeta(quranFull);
  writeFileSync(join(DATA_DIR, 'juzs.json'), JSON.stringify(juzs, null, 2), 'utf-8');
  console.log('💾 juzs.json yazıldı.');

  // Doğrulama
  console.log('\n🔍 Doğrulama:');
  console.log(`  Ayet sayısı: ${quranFull.length}`);
  console.log(`  Boş Arapça: ${quranFull.filter((v) => !v.arabic).length}`);
  console.log(`  Diyanet ayet: ${diyanet.length}`);
  console.log(`  Elmalılı ayet: ${elmali.length}`);
  console.log(`  Cüz sayısı: ${juzs.length}`);
  console.log('\n🎉 Tamamlandı!');
}

main().catch((err) => {
  console.error('❌ Hata:', err);
  process.exit(1);
});
