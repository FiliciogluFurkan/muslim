// lib/dualarData.ts

export type DuaCategory = 'dua' | 'hikaye';

export interface Dua {
  id: string;
  category: DuaCategory;
  title: string;
  subtitle: string;
  arabicText?: string;
  transliteration?: string;
  paragraphs: string[];
  source: string;
  tag: string; // "Hz. Musa", "Hz. Yunus", vb.
  readTime: number; // dakika
}

export const DUAS: Dua[] = [
  // ─── DUALAR ───────────────────────────────────────────────────────────────
  {
    id: 'dua-1',
    category: 'dua',
    title: 'Hz. Musa\'nın Rabbine Yalvarışı',
    subtitle: 'Firavun\'dan Kaçarken Edilmiş Dua',
    arabicText: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
    transliteration: 'Rabbi innî limâ enzelte ileyye min hayrin fakîr',
    paragraphs: [
      'Hz. Musa, Mısır\'dan kaçtıktan sonra yorgun ve yalnız olarak Medyen\'e ulaştı. Kuyunun başında, koyunlarını sulayamayan iki genç kızın yardımına koştu — tek başına, sessizce, karşılık beklemeden.',
      'Ardından bir ağacın gölgesine çekildi. Ne yiyeceği vardı, ne barınacak yeri. İşte tam o an, yüreğinin derinliklerinden Rabbine döndü ve sadece şunu söyledi:',
      '"Rabbim! Bana indireceğin her hayra muhtacım."',
      'Bu dua, ne uzundur ne süslü. Sadece saf bir itiraf, saf bir tevekkül. Beklenti değil, teslim oluş. Allah bu duayı öyle karşıladı ki; o kızların babası Hz. Musa\'yı çağırttı, ona yemek verdi, sonunda kızıyla evlendirdi.',
      'İnsan bazen en güçsüz anında en büyük ihsana kavuşur.',
    ],
    source: 'Kasas Suresi, 24. Ayet',
    tag: 'Hz. Musa',
    readTime: 2,
  },
  {
    id: 'dua-2',
    category: 'dua',
    title: 'Hz. Yunus\'un Karanlıktan Duası',
    subtitle: 'Balinanın Karnında Edilmiş Dua',
    arabicText: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'Lâ ilâhe illâ ente subhâneke innî kunte minez-zâlimîn',
    paragraphs: [
      'Üç katmanlık karanlık: gecenin karanlığı, denizin derinliği ve balinanın karnı. Hz. Yunus, tüm bunların ortasında yapayalnızdı.',
      'Hiçbir insan sesine ulaşamayacağı, hiçbir ışığın bir daha göremeyeceği o karanlıkta Rabbine seslendi. Ama şikâyet etmedi. Özür diledi.',
      '"Senden başka ilah yoktur. Sen her türlü noksanlıktan münezzehsin. Şüphesiz ben zalimlerden oldum."',
      'Allah bu duayı duydu. Kur\'an\'da anlatılır: "Eğer Allah\'ı tesbih edenlerden olmasaydı, yeniden diriltilecekleri güne kadar onun karnında kalırdı."',
      'Dua, zor anlarda söylenen bir söz değil; tüm benliğinle Rabbinize yönelişinizdir. Hz. Yunus bunu bize üç katmanlı karanlıktan öğretti.',
    ],
    source: 'Enbiya Suresi, 87. Ayet',
    tag: 'Hz. Yunus',
    readTime: 2,
  },
  {
    id: 'dua-3',
    category: 'dua',
    title: 'Hz. İbrahim\'in Şükür Duası',
    subtitle: 'Yaşlılıkta Oğul Müjdesine Karşı',
    arabicText: 'الْحَمْدُ لِلَّهِ الَّذِي وَهَبَ لِي عَلَى الْكِبَرِ إِسْمَاعِيلَ وَإِسْحَاقَ',
    transliteration: 'Elhamdülillâhillezî vehebe lî alel-kiberi İsmâîle ve İshâk',
    paragraphs: [
      'Onlarca yıl çocuk özlemiyle geçti. Her bahar geldi geçti, her çocuk sesi onu biraz daha doldurdu — o doluluk hem hüzün hem umuttu.',
      'Sonunda yaşlılığında müjde geldi: iki oğlu olacaktı. Hz. İbrahim\'in ilk tepkisi şikâyet değil, şükür oldu.',
      '"Hamd olsun Allah\'a ki bana yaşlılığımda İsmail\'i ve İshak\'ı bağışladı. Şüphesiz Rabbim duayı işitendir."',
      'Beklemenin uzunluğu nimeti küçültmedi; aksine büyüttü. Hz. İbrahim bize şunu öğretti: Şükür, nimeti elde ettiğinde değil, nimet için yapılan tüm bekleyişin sonunda daha derin bir anlam taşır.',
    ],
    source: 'İbrahim Suresi, 39. Ayet',
    tag: 'Hz. İbrahim',
    readTime: 2,
  },
  {
    id: 'dua-4',
    category: 'dua',
    title: 'Hz. Eyyüb\'ün Sabır Duası',
    subtitle: 'Yıllarca Süren Hastalıkta Edilmiş Dua',
    arabicText: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
    transliteration: 'Ennî messeniyad-durru ve ente erhamur-râhimîn',
    paragraphs: [
      'Yıllar boyunca hastalık, yoksulluk, kayıp. Hz. Eyyüb\'ün sabrı artık dillere destan olmuştu; ama o da bir insan olarak sınırına yaklaştığı bir an yaşadı.',
      'O anda şikâyetle değil, ince bir teslimiyetle Rabbine döndü: "Bana dert dokundu. Sen merhametlilerin en merhametlisisin."',
      'Bu duada eleştiri yok, isyan yok. Sadece iki gerçeğin itirafı var: "Acı içindeyim" ve "Sen Rahmansın."',
      'Allah bu duayı duydu. Ona şifa verdi, ailesini geri verdi ve katından bir rahmet bahşetti. Kur\'an onu "ne güzel kul" diye nitelendirdi.',
      'Siz de zor bir dönemdeyken bu duayı okuyun. Şikâyet değil, teslimiyet — bu farkın kalbinizde nasıl bir değişim yarattığını hissedeceksiniz.',
    ],
    source: 'Enbiya Suresi, 83. Ayet',
    tag: 'Hz. Eyyüb',
    readTime: 2,
  },
  {
    id: 'dua-5',
    category: 'dua',
    title: 'Hz. Zekeriyya\'nın İçten Niyazı',
    subtitle: 'Gece Karanlığında Gizlice Yapılan Dua',
    arabicText: 'رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ',
    transliteration: 'Rabbi lâ tezerní ferdan ve ente hayrul-vârisîn',
    paragraphs: [
      'Kur\'an anlatır: Hz. Zekeriyya Rabbine gizlice seslendi. Gece karanlığında, alçak bir sesle, sadece Allah\'ın duyabileceği kadar sessizce.',
      '"Rabbim, beni yalnız bırakma. Sen mirasçıların en hayırlısısın."',
      'O zamanlar yaşlıydı, saçları ağarmıştı. Hanımı kısırdı. İnsan gözüyle bakıldığında bu duanın "imkânsızı" istediği söylenebilirdi.',
      'Ama Allah için imkânsız yoktur. Hz. Yahya o duanın meyvesi olarak dünyaya geldi. Bir peygamber, bir müjde — yaşlı bir babanın gece karanlığında gizlice döktüğü gözyaşlarından.',
      'Allah\'a yaptığınız dua ne kadar sessiz olursa olsun, O duyar.',
    ],
    source: 'Enbiya Suresi, 89. Ayet',
    tag: 'Hz. Zekeriyya',
    readTime: 2,
  },

  // ─── HİKAYELER ───────────────────────────────────────────────────────────
  {
    id: 'hikaye-1',
    category: 'hikaye',
    title: 'Yaşlı Teyzenin Duası',
    subtitle: 'Hz. Musa\'nın Cennette Komşusu',
    paragraphs: [
      'Rivayete göre bir gün Hz. Musa, Allah\'a yalvardı: "Ya Rabbi, cennette komşum kim olacak? Onu bu dünyada görmek istiyorum."',
      'Allah buyurdu: "Falan kasabada, falan sokakta, şu isimde bir kadın — cennette komşun o olacak."',
      'Hz. Musa yola çıktı. Küçük bir kulübeyi buldu. Kapıyı çaldı. Kapıyı yaşlı, yoksul, tek başına yaşayan bir kadın açtı.',
      'Hz. Musa merakla sordu: "Hanımefendi, ne yaparsınız? Nasıl ibadet edersiniz?" Kadın biraz utanarak cevap verdi: "Ben çok cahilim. Hiçbir şey bilmiyorum. Sadece her gün Allah\'a şunu söylüyorum: Allah\'ım, sana çok şükür. Bana bu gözleri verdin — görüyorum. Bu kulakları verdin — duyuyorum. Bu elleri verdin — tutuyorum. Bu ayakları verdin — yürüyorum. Sana şükürler olsun."',
      'Hz. Musa kadına baktı. Gözleri doldu. Bu kadın belki yıllarca hiçbir din kitabı okumamıştı. Hiçbir ilim meclisine katılmamıştı. Ama kalbini Allah\'a adayarak yaşamıştı.',
      'Şükür bazen ilmin ötesinde bir kapı açar.',
    ],
    source: 'Tasavvuf Rivayetleri',
    tag: 'Hz. Musa',
    readTime: 3,
  },
  {
    id: 'hikaye-2',
    category: 'hikaye',
    title: 'Köpeğe Su Veren Kadın',
    subtitle: 'Bir Bardak Su ve Cennet',
    paragraphs: [
      'Hz. Peygamber bir gün sahabelere şu kıssayı anlattı: Günahkâr bir kadın varmış. Ömrünü yanlışlarla geçirmişti.',
      'Bir gün sıcak bir yolda, ağzını açmış soluk solan, ölmek üzere olan bir köpek gördü. Toprağı kazmaya başladı. Bir su kuyusu bulduğunda ayakkabısını çıkardı, köpekten su taşıdı.',
      'O köpek o gün içtiği suyla hayata tutundu.',
      'Allah bu küçük hareketi gördü. Ve o günahkâr kadını bağışladı.',
      'Sahabe sordu: "Ya Resulallah, hayvanlar için de mi sevap var?" Hz. Peygamber buyurdu: "Her canlıya yapılan iyilikte sevap vardır."',
      'Bazen cennet, büyük ibadetlerin değil — küçük, gösterişsiz, saf bir merhametin kapısından girer.',
    ],
    source: 'Buhari ve Müslim',
    tag: 'Hz. Peygamber',
    readTime: 2,
  },
  {
    id: 'hikaye-3',
    category: 'hikaye',
    title: 'Hz. Yusuf\'un İmtihanı',
    subtitle: 'Kuyudan Tahta Uzanan Yolda Sabır',
    paragraphs: [
      'Küçücük bir çocuktu. Babasının en çok sevdiği oğluydu — bu, kardeşlerinin kalbinde bir kor gibi yanıyordu yıllarca.',
      'Bir gün kuyuya attılar onu. "Baban artık bizi sever" dediler birbirlerine. Hz. Yusuf o karanlık kuyunun dibinde ne hissetti bilemeyiz. Ama Kur\'an bize şunu söyler: Allah onu orada yalnız bırakmadı.',
      'Ardından Mısır\'a götürüldü, köle olarak satıldı. Sonra iftiraya uğradı. Yıllarca zindanda kaldı. Her kapı yüzüne kapandı sanki.',
      'Ama her kapı kapandığında, Allah başka bir kapı açıyordu.',
      'Yıllar sonra Mısır\'ın en güçlü adamı oldu. Ve kuyuya atılan o çocuk, kardeşlerini affettiğinde şöyle dedi: "Bu gün size kınamak yok. Allah sizi bağışlasın."',
      'Hz. Yusuf\'un hikayesi bize şunu öğretiyor: Hayatının en karanlık anı, sonunuz değil — dönüşümünüzün başlangıcıdır.',
    ],
    source: 'Yusuf Suresi',
    tag: 'Hz. Yusuf',
    readTime: 3,
  },
  {
    id: 'hikaye-4',
    category: 'hikaye',
    title: 'Huneyn Günü',
    subtitle: 'Zafer Sarhoşluğunun Ardından Gelen Ders',
    paragraphs: [
      'Mekke fethedilmişti. Müslümanlar tarihin en büyük zaferlerinden birini kazanmıştı. On bin kişilik bir ordu yürüyordu.',
      'Huneyn vadisine girdiklerinde, çukurda pusu kuran düşman okları yağmur gibi yağdı. Ordu dağıldı. Panik sardı herkesi.',
      'Hz. Peygamber katırından indi. Geri çekilmedi. Öne doğru yürüdü ve seslendi: "Ben Allah\'ın elçisiyim, bu yalan değil. Ben Abdülmuttalib\'in oğluyum!"',
      'O ses, o duruş — dağılan orduyu topladı. Savaş kazanıldı. Ama asıl ders zaferden sonra geldi.',
      'Kur\'an nazil oldu: "Huneyn günü Allah sizi birçok yerde ve çok olduğunuz halde yardım etmişti; ama çokluğunuz sizi şımartmıştı."',
      'Sayı değil, Allah\'ın yardımı kazandırır. Güç değil, ihlas. Bunu en büyük zafer gününde, savaş meydanının ortasında öğrendiler.',
    ],
    source: 'Tevbe Suresi, 25-26. Ayetler',
    tag: 'Hz. Peygamber',
    readTime: 3,
  },
  {
    id: 'hikaye-5',
    category: 'hikaye',
    title: 'Meryem Ana\'nın Tevekkülü',
    subtitle: 'Hurma Dalı ve Doğum Sancısı',
    paragraphs: [
      'Tek başınaydı. Hamile, yorgun ve uzak bir yere çekilmişti. Doğum sancısı onu bir hurma ağacının dibine götürdü.',
      '"Keşke daha önce ölseydim, unutulup gitseydim" dedi. Bu kelimeler bize Hz. Meryem\'in ne kadar insani bir an yaşadığını anlatır — güçlü, seçilmiş biri bile zorlandı.',
      'Tam o anda bir ses geldi: "Üzülme. Rabbin senin altında bir dere kıldı. Hurma dalını kendine doğru salla, üstüne taze hurma dökülsün."',
      'O anda ihtiyacı olan her şey oradaydı: su, yiyecek ve bir ses — "üzülme."',
      'Hz. Meryem, Hz. İsa\'yı kucağında taşıyarak halkının karşısına çıktı. Konuşmadı. Sadece bebeğine işaret etti. Ve bebek konuştu.',
      'Allah\'ın koruması bazen bir dere, bazen bir hurma dalı, bazen de beklenmedik bir anda gelen bir ses olarak gelir.',
    ],
    source: 'Meryem Suresi, 23-26. Ayetler',
    tag: 'Hz. Meryem',
    readTime: 3,
  },
  {
    id: 'hikaye-6',
    category: 'hikaye',
    title: 'Üç Kişi ve Mağara',
    subtitle: 'Samimi Niyetin Mucizesi',
    paragraphs: [
      'Hz. Peygamber şu kıssayı anlattı: Üç kişi bir yolculukta ani bir yağmura yakalandı. Bir mağaraya sığındılar. Büyük bir kaya kapıyı tıkadı.',
      'Çıkış yoktu. Üç adam birbirine baktı. Ve şu kararı aldılar: "Hadi, yaptığımız en samimi ameli Allah\'a vesile edelim ve dua edelim."',
      'Birincisi yaşlı anne-babasını doyurduktan sonra çocuklarını yatırdığını anlattı — hiç istisnasız, yıllarca. Kaya biraz oynadı.',
      'İkincisi, ücretini ödeyemediği işçisini yıllarca beklettiğini, parasını katlayarak büyüttüğünü ve geri verdiğini anlattı. Kaya biraz daha oynadı.',
      'Üçüncüsü, sevdiği kadını kazanma fırsatı bulduğunda Allah korkusuyla geri çekildiğini anlattı. Kaya tamamen açıldı.',
      'Samimi niyet bazen kayaları bile kaldırır.',
    ],
    source: 'Buhari',
    tag: 'Hz. Peygamber',
    readTime: 3,
  },
];

export function getDualar(): Dua[] {
  return DUAS.filter(d => d.category === 'dua');
}

export function getHikayeler(): Dua[] {
  return DUAS.filter(d => d.category === 'hikaye');
}

export function getAll(): Dua[] {
  return DUAS;
}
