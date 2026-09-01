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
  tag: string;
  readTime: number;
}

export const DUAS: Dua[] = [
  // ─── DUALAR ───────────────────────────────────────────────────────────────
  {
    id: 'dua-1',
    category: 'dua',
    title: 'Hz. Âdem\'in Tevbe Duası',
    subtitle: 'Hatasından Sonra Allah\'a Sığınışı',
    arabicText: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration: 'Rabbenâ zalemnâ enfusenâ ve in lem tağfir lenâ ve terhamnâ le-nekûnenne minel-hâsirîn',
    paragraphs: [
      'Hz. Âdem ve eşi, cennetteki imtihanın ardından yaptıkları hatanın farkına vardılar. Hatalarını inkâr etmek veya sorumluluğu başkasına yüklemek yerine doğrudan Allah\'a yöneldiler.',
      'Dualarında önce kendi kusurlarını kabul ettiler: Rabbimiz, biz kendimize zulmettik. Bu ifade, tövbenin en önemli taraflarından birini gösterir: İnsan önce kendi payını görür.',
      'Ardından Allah\'ın iki rahmet kapısını andılar: bağışlama ve merhamet. Böylece dua, yalnızca suçluluk hissi değil, Allah\'ın rahmetine güven anlamına da geldi.',
      'Kur\'an bu duayı A\'râf suresinde aktarır. Mümin için mesaj açıktır: Hata yapmak insanidir; hatadan sonra samimiyetle Rabbine dönmek ise kulluğun güzelliklerindendir.',
      'Bu dua, pişmanlık duyduğunuzda uzun cümleler kuramasanız bile kalbinizdeki gerçeği Allah\'a açıkça söyleyebileceğinizi hatırlatır.'
    ],
    source: 'A\'râf Suresi, 23. Ayet',
    tag: 'Hz. Âdem',
    readTime: 3,
  },
  {
    id: 'dua-2',
    category: 'dua',
    title: 'Hz. Nûh\'un Yardım Duası',
    subtitle: 'Gücünün Tükendiğini Hissettiğinde',
    arabicText: 'أَنِّي مَغْلُوبٌ فَانْتَصِرْ',
    transliteration: 'Ennî mağlûbun fentesir',
    paragraphs: [
      'Hz. Nûh, kavmini uzun yıllar boyunca Allah\'a iman etmeye çağırdı. Buna rağmen karşılaştığı direnç ve inkâr kolay değildi.',
      'Bir noktada Rabbine durumunu olduğu gibi anlattı: Ben yenik düştüm; artık yardım et. Duanın dikkat çekici tarafı, insanın kendi gücünün sınırını kabul etmesidir.',
      'Hz. Nûh burada kendi kuvvetine güvenmek yerine Allah\'ın yardımına sığındı. Bu, çaresizlik anında yapılabilecek en sade ve güçlü yönelişlerden biridir.',
      'Kur\'an\'da ardından Allah\'ın yardımının geldiği ve Nûh ile iman edenlerin kurtarıldığı anlatılır. Dua, sabrın yanında yardım istemenin de kulluğun bir parçası olduğunu gösterir.',
      'Bazen insanın söyleyebileceği en dürüst cümle şudur: Rabbim, gücüm yetmiyor; Sen yardım et.'
    ],
    source: 'Kamer Suresi, 10. Ayet',
    tag: 'Hz. Nûh',
    readTime: 3,
  },
  {
    id: 'dua-3',
    category: 'dua',
    title: 'Hz. İbrahim\'in Salih Evlat Duası',
    subtitle: 'Uzun Bekleyişten Sonra Yapılan Niyaz',
    arabicText: 'رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ',
    transliteration: 'Rabbi heb lî mines-sâlihîn',
    paragraphs: [
      'Hz. İbrahim, hayatının farklı dönemlerinde ailesi ve nesli için Allah\'a yöneldi. Onun dualarında sadece bir evlat istemek değil, salih bir nesil arzusu da görülür.',
      'Bu kısa dua, Allah\'tan kendisine salihlerden bir evlat bağışlamasını istemesidir. Dua çok kısa olmasına rağmen arkasındaki niyet çok büyüktür.',
      'Kur\'an, bu duanın ardından ona yumuşak huylu bir oğul müjdesi verildiğini bildirir. İbrahim\'in duası böylece sadece bir dileğin değil, güzel bir nesil arzusunun örneği olur.',
      'Dua ederken istediğimiz şeyin niteliğini de Allah\'a bırakmak önemlidir. İnsan bazen yalnızca bir sonuç ister; peygamberlerin dualarında ise hayırlı olanı isteme dikkati vardır.',
      'Bu dua, evlat isteyenlerin yanında aileleri ve gelecek nesilleri için hayır dileyen herkes için anlamlı bir niyazdır.'
    ],
    source: 'Sâffât Suresi, 100-101. Ayetler',
    tag: 'Hz. İbrahim',
    readTime: 3,
  },
  {
    id: 'dua-4',
    category: 'dua',
    title: 'Hz. İbrahim\'in Namaz ve Nesil Duası',
    subtitle: 'Kendisini ve Soyunu İbadette Sabit Kılma İsteği',
    arabicText: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    transliteration: 'Rabbic alni mukîmes-salâti ve min zürriyyetî rabbenâ ve tekabbel duâ',
    paragraphs: [
      'Hz. İbrahim, yalnızca kendisinin iyi olmasını istemedi. Kendisinden sonra gelecek neslin de namazı ve kulluğu koruması için Allah\'a dua etti.',
      'Bu dua, ibadetin bireysel bir mesele olmanın ötesinde aile ve nesil açısından da bir emanet olduğunu hatırlatır.',
      'İbrahim\'in duasında bir başka incelik vardır: Sonunda Allah\'tan duasını kabul etmesini ister. Yani insan elinden gelen yönelişi yapar, kabulü ise Rabbinden bekler.',
      'Ailemiz için yaptığımız dualarda sadece dünya nimetlerini değil, iman, ibadet ve güzel ahlakı istemek bu duanın ruhuna uygundur.',
      'Dua, insanın kendi geleceğini olduğu kadar kendisinden sonra geleceklerin geleceğini de Allah\'a emanet etmesidir.'
    ],
    source: 'İbrahim Suresi, 40. Ayet',
    tag: 'Hz. İbrahim',
    readTime: 3,
  },
  {
    id: 'dua-5',
    category: 'dua',
    title: 'Hz. İbrahim\'in Mekke İçin Duası',
    subtitle: 'Güvenli Bir Şehir ve Rızık İçin',
    arabicText: 'رَبِّ اجْعَلْ هَذَا بَلَدًا آمِنًا وَارْزُقْ أَهْلَهُ مِنَ الثَّمَرَاتِ',
    transliteration: 'Rabbic al hâzâ beleden âminen verzuk ehlehû mines-semerât',
    paragraphs: [
      'Hz. İbrahim, Mekke\'nin güvenli bir şehir olması ve orada yaşayan insanların rızıklandırılması için Allah\'a dua etti.',
      'Dikkat çekici olan, duanın yalnızca kendisi için olmamasıdır. Bir şehrin huzuru, güvenliği ve insanların geçimi için Rabbine yalvarmıştır.',
      'Kur\'an\'da bu dua, Hz. İbrahim\'in ailesini ve sonraki nesilleri düşünerek yaptığı yönelişlerin bir parçası olarak anlatılır.',
      'Bu dua bize yaşadığımız şehir, aile ve toplum için de iyilik istemeyi öğretir. Güvenlik ve helal rızık, insan hayatının temel nimetlerindendir.',
      'Bir yer için dua etmek, orada yaşayan insanların iyiliğini istemek ve Allah\'ın nimetlerini hatırlamak anlamına da gelir.'
    ],
    source: 'Bakara Suresi, 126. Ayet',
    tag: 'Hz. İbrahim',
    readTime: 3,
  },
  {
    id: 'dua-6',
    category: 'dua',
    title: 'Hz. Lût\'un Kurtuluş Duası',
    subtitle: 'Zor Bir Ortamdan Allah\'a Sığınmak',
    arabicText: 'رَبِّ نَجِّنِي وَأَهْلِي مِمَّا يَعْمَلُونَ',
    transliteration: 'Rabbi neccinî ve ehlî mimmâ ya\'melûn',
    paragraphs: [
      'Hz. Lût, toplumunun ağır kötülükleri karşısında Allah\'ın yardımına sığındı. Onun duasında hem kendi kurtuluşu hem de ailesinin korunması vardır.',
      'Peygamberler tebliğ görevini yerine getirirken her zaman kolay bir ortamla karşılaşmadılar. Lût kıssası, insanın doğru bildiği yolda yalnız hissedebileceği zamanları da gösterir.',
      'Bu dua, kötü çevreden ve kötülüğün etkisinden korunma isteğinin güzel bir örneğidir.',
      'İnsan bazen değiştiremeyeceği bir ortamın içinde kalabilir. Böyle durumlarda Allah\'a sığınmak, kalbin dayanacağı en güçlü kapıdır.',
      'Dua aynı zamanda ailemizi de iyiliğe yöneltme ve onları zararlı etkilerden koruma sorumluluğumuzu hatırlatır.'
    ],
    source: 'Şuarâ Suresi, 169. Ayet',
    tag: 'Hz. Lût',
    readTime: 3,
  },
  {
    id: 'dua-7',
    category: 'dua',
    title: 'Hz. Mûsâ\'nın Rızık ve Hayır Duası',
    subtitle: 'Medyen\'de Yorgun ve Yalnızken',
    arabicText: 'رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
    transliteration: 'Rabbi innî limâ enzelte ileyye min hayrin fakîr',
    paragraphs: [
      'Hz. Mûsâ Mısır\'dan ayrıldıktan sonra Medyen\'e ulaştığında yorgun, yalnız ve imkânları sınırlıydı. Kuyunun başında iki kadına yardım etti ve sonra bir gölgenin altına çekildi.',
      'Tam bu sırada Rabbine şöyle yalvardı: Rabbim, bana indireceğin her hayra muhtacım.',
      'Dua, doğrudan belirli bir şey istemek yerine Allah\'ın göndereceği hayra muhtaç olduğunu söylemesidir. Bu yüzden hem ihtiyaç hem tevekkül taşır.',
      'Ardından Allah onun için yeni bir kapı açtı. Hz. Mûsâ güvenli bir yere, işe ve aile hayatına kavuştu.',
      'İnsan bazen hangi kapının kendisi için hayırlı olduğunu bilemez. Böyle anlarda hayrın kendisini Allah\'tan istemek, kalbi rahatlatan bir yöneliştir.'
    ],
    source: 'Kasas Suresi, 24. Ayet',
    tag: 'Hz. Mûsâ',
    readTime: 3,
  },
  {
    id: 'dua-8',
    category: 'dua',
    title: 'Hz. Mûsâ\'nın Göğsünü Genişletme Duası',
    subtitle: 'Büyük Bir Görev Öncesinde',
    arabicText: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
    transliteration: 'Rabbishrah lî sadrî ve yessir lî emrî vahlul ukteten min lisânî yefkahû kavlî',
    paragraphs: [
      'Hz. Mûsâ, Firavun\'a gitmek gibi son derece ağır bir görevle karşı karşıyaydı. Böyle bir görevin öncesinde Allah\'tan fiziksel güçten önce gönül genişliği ve işinin kolaylaştırılmasını istedi.',
      'Duasında göğsünün genişletilmesini, işinin kolaylaştırılmasını ve dilindeki düğümün çözülmesini istedi.',
      'Bu, önemli bir konuşma veya sorumluluk öncesinde insanın kendi eksikliklerini Allah\'a arz etmesine güzel bir örnektir.',
      'İnsan bazen ne söyleyeceğini bilir fakat heyecan, korku veya yetersizlik hissi yaşayabilir. Hz. Mûsâ\'nın duası böyle anlarda Rabbinden yardım istemeyi öğretir.',
      'Dua, başarıyı yalnızca kendi becerimize bağlamamak; yeteneğimizi ve sözümüzü bereketlendirmesi için Allah\'a yönelmektir.'
    ],
    source: 'Tâhâ Suresi, 25-28. Ayetler',
    tag: 'Hz. Mûsâ',
    readTime: 3,
  },
  {
    id: 'dua-9',
    category: 'dua',
    title: 'Hz. Mûsâ\'nın Özür ve Bağışlanma Duası',
    subtitle: 'Bir Hatanın Ardından',
    arabicText: 'رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي',
    transliteration: 'Rabbi innî zalemtü nefsî fağfir lî',
    paragraphs: [
      'Hz. Mûsâ, istemeden bir adamın ölümüne sebep olduğu olayın ardından yaptığı hatayı kabul etti. Kendini savunmak yerine Rabbine döndü.',
      'Duası son derece kısadır: Rabbim, ben kendime zulmettim; beni bağışla.',
      'Burada dikkat çeken şey, mazeret üretmeden sorumluluğu kabul etmesidir. Samimi tövbenin temelinde de kişinin hatasını görmesi vardır.',
      'Kur\'an, Allah\'ın onu bağışladığını bildirir. Böylece kıssa, hatanın insanı Allah\'tan uzaklaştırmak yerine samimi tövbe ile yeniden O\'na yönelme vesilesi olabileceğini gösterir.',
      'Bu dua, hata yaptığımızda uzun açıklamalardan önce dürüstçe Rabbimize dönmenin değerini hatırlatır.'
    ],
    source: 'Kasas Suresi, 16. Ayet',
    tag: 'Hz. Mûsâ',
    readTime: 3,
  },
  {
    id: 'dua-10',
    category: 'dua',
    title: 'Hz. Yûnus\'un Karanlıkta Duası',
    subtitle: 'Balinanın Karnında Tevbe ve Tesbih',
    arabicText: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: 'Lâ ilâhe illâ ente subhâneke innî küntü minez-zâlimîn',
    paragraphs: [
      'Hz. Yûnus, denizin karanlığında ve balığın karnında son derece zor bir durumda kaldı. Kur\'an bu olayı, insanın çaresizlik içinde Rabbine dönüşünün güçlü örneklerinden biri olarak anlatır.',
      'Duasında önce Allah\'ın tek ilah olduğunu ilan etti, sonra O\'nu noksanlıklardan tenzih etti ve kendi kusurunu kabul etti.',
      'Duanın merkezinde üç şey vardır: tevhid, tesbih ve itiraf. Bu yüzden dua yalnızca bir kurtuluş isteği değil, kalbin yeniden Allah\'a yönelmesidir.',
      'Allah onu bu sıkıntıdan kurtardı ve Kur\'an\'da müminlerin de böylece kurtarılacağına işaret edildi.',
      'Daraldığınızda bu duanın anlamını düşünmek, sıkıntının içinde bile Allah\'ın kapısının açık olduğunu hatırlatır.'
    ],
    source: 'Enbiyâ Suresi, 87. Ayet',
    tag: 'Hz. Yûnus',
    readTime: 3,
  },
  {
    id: 'dua-11',
    category: 'dua',
    title: 'Hz. Eyyûb\'un Sabır Duası',
    subtitle: 'Sıkıntı ve Hastalık İçinde',
    arabicText: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ',
    transliteration: 'Ennî messeniyed-durru ve ente erhamur-râhimîn',
    paragraphs: [
      'Hz. Eyyûb ağır bir imtihanla karşılaştığında Rabbine yöneldi. Kur\'an onun sıkıntısını anlatırken sabrını ve Allah\'a bağlılığını da öne çıkarır.',
      'Duası, başına gelen zararı inkâr etmeden Allah\'ın merhametini hatırlatır: Bana dert dokundu; Sen merhametlilerin en merhametlisisin.',
      'Burada dikkat çekici bir incelik vardır. Hz. Eyyûb Allah\'ı suçlamaz; kendi acısını anlatır ve Allah\'ın rahmetine güvenini korur.',
      'Allah onun duasına karşılık verdi ve sıkıntısını giderdi. Kur\'an bu kıssayı rahmet ve sabır açısından örnek olarak aktarır.',
      'Bu dua, hastalık veya uzun süren sıkıntılarda şikâyet etmekle Rabbine derdini açmak arasındaki farkı düşünmeye vesile olabilir.'
    ],
    source: 'Enbiyâ Suresi, 83. Ayet',
    tag: 'Hz. Eyyûb',
    readTime: 3,
  },
  {
    id: 'dua-12',
    category: 'dua',
    title: 'Hz. Zekeriyyâ\'nın Evlat Duası',
    subtitle: 'Gizlice ve Umutla Yapılan Niyaz',
    arabicText: 'رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنْتَ خَيْرُ الْوَارِثِينَ',
    transliteration: 'Rabbi lâ tezernî ferden ve ente hayrul-vârisîn',
    paragraphs: [
      'Hz. Zekeriyyâ yaşlanmıştı ve kendisinden sonra gelecek nesil konusunda endişe taşıyordu. Buna rağmen Allah\'ın rahmetinden ümidini kesmedi.',
      'Rabbine gizlice seslenerek yalnız bırakılmamasını istedi. Bu, insanın en özel arzusunu Allah\'a anlatabileceğini gösterir.',
      'Duasında sadece bir evlat değil, Allah\'ın en hayırlı mirasçı olduğu gerçeği de vardır. Yani sonuç üzerinde Allah\'ın hükmünü kabul eden bir teslimiyet bulunur.',
      'Kur\'an, Allah\'ın bu duaya cevap verdiğini ve Hz. Yahyâ\'yı bağışladığını bildirir.',
      'Bu dua, uzun süre bekleyen insanların ümitlerini kaybetmemeleri ve Allah\'ın kudretini kendi imkânlarıyla sınırlamamaları için güçlü bir hatırlatmadır.'
    ],
    source: 'Enbiyâ Suresi, 89. Ayet',
    tag: 'Hz. Zekeriyyâ',
    readTime: 3,
  },
  {
    id: 'dua-13',
    category: 'dua',
    title: 'Hz. Zekeriyyâ\'nın Temiz Nesil Duası',
    subtitle: 'Mâbedde Gelen Müjde',
    arabicText: 'رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ',
    transliteration: 'Rabbi heb lî min ledünke zürriyyeten tayyibeh, inneke semîud-duâ',
    paragraphs: [
      'Hz. Zekeriyyâ, Meryem\'in yanında Allah\'ın lütuflarını gördüğünde Rabbine yöneldi. Gördüğü nimetler onun Allah\'ın kudretine olan güvenini artırdı.',
      'Duasında Allah\'tan temiz ve hayırlı bir nesil istedi. Burada yine sadece sayı veya dünyevi bir beklenti değil, nitelikli bir nesil arzusu vardır.',
      'Sonunda Allah ona Yahyâ\'yı müjdeledi. İnsan açısından zor görünen şartların Allah\'ın kudreti karşısında engel olmadığını kıssa tekrar gösterir.',
      'Dua ederken istediğimiz şeyin hayırlı ve temiz olmasını istemek, sadece sonuca değil sonucun niteliğine de önem verdiğimizi gösterir.',
      'Bu dua, evlat sahibi olmak isteyenler kadar ailelerinin iman ve ahlakı için dua edenler için de anlamlıdır.'
    ],
    source: 'Âl-i İmrân Suresi, 38. Ayet',
    tag: 'Hz. Zekeriyyâ',
    readTime: 3,
  },
  {
    id: 'dua-14',
    category: 'dua',
    title: 'Hz. Süleyman\'ın Şükür Duası',
    subtitle: 'Nimetleri Görüp Şükretmek',
    arabicText: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ',
    transliteration: 'Rabbi evzi\'nî en eşkura ni\'metekelletî en\'amte aleyye ve alâ vâlideyye',
    paragraphs: [
      'Hz. Süleyman büyük bir hükümranlığa ve Allah\'ın özel nimetlerine sahipti. Fakat sahip olduğu güç onu nimetin sahibini unutmaktan koruyacak bir duaya yöneltti.',
      'Allah\'tan kendisine ve anne babasına verdiği nimetlere şükretme gücü istedi.',
      'Bu dua bize şükrün yalnızca dil ile söylenen bir cümle olmadığını hatırlatır. İnsan şükredebilmek için de Allah\'tan yardım ister.',
      'Sahip olduğumuz imkânların büyüklüğü arttıkça şükretme ihtiyacımız da artar. Hz. Süleyman\'ın duası gücü kullukla birlikte düşünmenin güzel bir örneğidir.',
      'Nimet gördüğünüzde sadece nimeti değil, o nimeti veren Allah\'ı hatırlamak bu duanın temel mesajıdır.'
    ],
    source: 'Neml Suresi, 19. Ayet',
    tag: 'Hz. Süleyman',
    readTime: 3,
  },
  {
    id: 'dua-15',
    category: 'dua',
    title: 'Hz. Süleyman\'ın Bağışlanma Duası',
    subtitle: 'Güç ve Mülkten Sonra Tevazu',
    arabicText: 'رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَا يَنْبَغِي لِأَحَدٍ مِنْ بَعْدِي',
    transliteration: 'Rabbığfir lî ve heb lî mulken lâ yenbeğî li-ehadin min ba\'dî',
    paragraphs: [
      'Hz. Süleyman, Allah\'ın kendisine verdiği büyük imkânlar içinde bile önce bağışlanma istedi.',
      'Ardından kendisine özel bir hükümranlık verilmesini diledi. Kur\'an onun duasının kabul edildiğini ve rüzgârın, cinlerin ve başka imkânların emrine verildiğini anlatır.',
      'Burada önemli olan, büyük bir güç sahibi olan peygamberin kendisini Allah\'ın kulu olarak görmeye devam etmesidir.',
      'İnsan imkân kazandığında dua etmeyi bırakmamalıdır. Aksine imkânların beraberinde getirdiği sorumluluklar için daha fazla Allah\'a yönelmelidir.',
      'Bu dua, gücün ve zenginliğin tek başına değer olmadığını; bunların Allah\'ın lütfu ve imtihanı olduğunu hatırlatır.'
    ],
    source: 'Sâd Suresi, 35. Ayet',
    tag: 'Hz. Süleyman',
    readTime: 3,
  },
  {
    id: 'dua-16',
    category: 'dua',
    title: 'Hz. Muhammed\'in Dünya ve Ahiret Duası',
    subtitle: 'Her İki Hayır İçin Dengeli Niyaz',
    arabicText: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhireti haseneten ve kınâ azâben-nâr',
    paragraphs: [
      'Kur\'an\'da öğretilen bu dua, dünya ile ahiret arasında güzel bir denge kurar. Mümin yalnızca dünya nimetlerini değil, ahiret iyiliğini de ister.',
      'Hz. Peygamberin bu duayı sıkça yaptığı rivayet edilmiştir. Dua kısa olmasına rağmen insan hayatının iki yönünü birden kuşatır.',
      'Dünya hayrı; sağlık, huzur, helal rızık ve güzel ilişkiler gibi pek çok iyiliği kapsayabilir. Ahiret hayrı ise Allah\'ın rızası ve kurtuluşu gibi daha büyük bir hedefi ifade eder.',
      'Sonunda ateş azabından korunma istenir. Böylece dua, istek ile korunma talebini birlikte taşır.',
      'Günlük hayatta ezberlenmesi ve anlamıyla düşünülmesi kolay dualardan biridir.'
    ],
    source: 'Bakara Suresi, 201. Ayet; Buhârî ve Müslim\'de rivayetler',
    tag: 'Hz. Muhammed',
    readTime: 3,
  },
  {
    id: 'dua-17',
    category: 'dua',
    title: 'Hz. Muhammed\'in İlim Duası',
    subtitle: 'Bilgiyi Bir Nimet Olarak İstemek',
    arabicText: 'رَبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidnî ilmâ',
    paragraphs: [
      'Kur\'an, Hz. Peygamber\'e ilmin artırılması için dua etmesini öğretir. Bu, öğrenmenin sonu olmayan bir yolculuk olduğunu hatırlatır.',
      'Dua sadece bilgi miktarını değil, insanın Allah\'tan faydalı bir anlayış ve idrak istemesini de düşündürür.',
      'İlim insanı kibirli yapıyorsa amacından uzaklaşır; insanı hakikate ve kulluğa yaklaştırıyorsa nimet olur.',
      'Bu nedenle öğrenciler, öğretmenler ve hayat boyu öğrenmeye devam eden herkes için çok kısa ama güçlü bir duadır.',
      'Her yeni bilgiyle birlikte Allah\'ın bize bilmediklerimizi öğrettiğini hatırlamak, öğrenmeye tevazu kazandırır.'
    ],
    source: 'Tâhâ Suresi, 114. Ayet',
    tag: 'Hz. Muhammed',
    readTime: 2,
  },
  {
    id: 'dua-18',
    category: 'dua',
    title: 'Hz. Muhammed\'in Sıkıntıdan Korunma Duası',
    subtitle: 'Kaygı, Hüzün ve Borçtan Allah\'a Sığınmak',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
    transliteration: 'Allahümme innî eûzü bike minel-hemmi vel-hazen ve eûzü bike minel-aczi vel-kesel',
    paragraphs: [
      'Hz. Peygamberin öğrettiği dualardan biri de insanın iç dünyasını ağırlaştıran kaygı, hüzün, acizlik ve tembellikten Allah\'a sığınmaktır.',
      'Dua, insanın duygularını yok saymasını değil, onları Allah\'a emanet etmesini öğretir.',
      'Kaygı gelecekle, hüzün geçmişle, acizlik güç yetirememe ile, tembellik ise yapabileceklerini erteleme ile ilişkilendirilebilir.',
      'Duanın devamında borç yükünden ve insanların baskısından da Allah\'a sığınmak öğretilmiştir. Böylece dua insanın hem ruhsal hem sosyal sıkıntılarını kuşatır.',
      'Zorlandığınızda bu duayı anlamını düşünerek okumak, sıkıntınızı Allah\'a açıkça arz etmenin bir yoludur.'
    ],
    source: 'Sahih Buhârî, Deavât bölümü',
    tag: 'Hz. Muhammed',
    readTime: 3,
  },
  {
    id: 'dua-19',
    category: 'dua',
    title: 'Hz. Muhammed\'in Afiyet Duası',
    subtitle: 'Dünya ve Ahirette Esenlik İstemek',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
    transliteration: 'Allahümme innî es\'elükel-afve vel-âfiyete fid-dünyâ vel-âhireh',
    paragraphs: [
      'Hz. Peygamber, Allah\'tan af ve afiyet istemeyi öğretti. Af, kusurların bağışlanmasını; afiyet ise insanın dünya ve ahiret bakımından esenlik içinde olmasını kapsayan geniş bir istektir.',
      'İnsan çoğu zaman sahip olduğu sağlığın, güvenliğin ve huzurun değerini kaybettiğinde fark eder. Bu dua ise afiyeti önceden istemeyi öğretir.',
      'Duanın hem dünya hem ahireti kapsaması dikkat çekicidir. Mümin yalnızca bugünkü rahatlığını değil, ebedî hayatını da düşünür.',
      'Sabah ve akşam okunabilecek kısa dualardan biri olarak rivayetlerde yer alır.',
      'Afiyet istemek, Allah\'tan hayatımızı hayırlı şekilde korumasını ve bizi bağışlamasını dilemenin güzel bir yoludur.'
    ],
    source: 'Sünen Ebû Dâvûd, Deavât bölümü',
    tag: 'Hz. Muhammed',
    readTime: 3,
  },
  {
    id: 'dua-20',
    category: 'dua',
    title: 'Hz. Muhammed\'in Günah İtirafı Duası',
    subtitle: 'Kulun Kendi Kusurunu Kabul Etmesi',
    arabicText: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ',
    transliteration: 'Allahümme innî zalemtü nefsî zulmen kesîran ve lâ yağfiruz-zünûbe illâ ente fağfir lî mağfireten min indike',
    paragraphs: [
      'Hz. Peygamberin öğrettiği dualardan biri, kulun kendi kusurunu kabul ederek Allah\'ın bağışlamasına sığınmasıdır.',
      'Duanın merkezinde önemli bir itiraf vardır: Günahları Allah\'tan başka kimsenin bağışlayamayacağı gerçeği.',
      'İnsan hata yaptığında kendini tamamen değersiz görmek yerine tövbe kapısına yönelmelidir. Bu dua tam da bu dönüşü öğretir.',
      'Allah\'ın rahmetine güvenmek, günahı küçümsemek anlamına gelmez. Aksine günahı ciddiye alıp bağışlanma istemektir.',
      'Kalbin ağırlaştığı zamanlarda bu duanın anlamını düşünmek, tövbenin samimi ve umutlu tarafını hatırlatır.'
    ],
    source: 'Sahih Buhârî ve Sahih Müslim',
    tag: 'Hz. Muhammed',
    readTime: 3,
  },
  {
    id: 'dua-21',
    category: 'dua',
    title: 'Hz. İsa ve Havarilerin Sofra Duası',
    subtitle: 'Nimetin Şükrü ve Kalbin Güçlenmesi',
    arabicText: 'اللَّهُمَّ رَبَّنَا أَنْزِلْ عَلَيْنَا مَائِدَةً مِنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِأَوَّلِنَا وَآخِرِنَا',
    transliteration: 'Allahümme rabbenâ enzil aleynâ mâideten mines-semâi tekûnu lenâ îden li-evvelinâ ve âhirinâ',
    paragraphs: [
      'Havariler, Hz. İsa\'dan gökten bir sofra indirilmesini istediklerinde bunun Allah\'ın kudretine dair kalplerini tatmin edecek bir işaret olmasını dilemişlerdi.',
      'Duanın içinde sadece yiyecek isteği yoktur. Sofranın kendileri ve sonraki nesilleri için bir bayram ve işaret olması istenir.',
      'Ayrıca Allah\'ın rızkının en hayırlı rızık olduğu kabul edilir. Böylece nimet, doğrudan Allah\'ın lütfu olarak görülür.',
      'Bu kıssa, nimet karşısında şükretmenin ve Allah\'ın kudretini hatırlamanın önemini anlatır.',
      'Dua ederken istediğimiz şeyin bizi Allah\'a yaklaştırmasını istemek, bu kıssadan çıkarılabilecek güzel bir derstir.'
    ],
    source: 'Mâide Suresi, 114. Ayet',
    tag: 'Hz. İsa',
    readTime: 3,
  },
  {
    id: 'dua-22',
    category: 'dua',
    title: 'Hz. Nûh\'un Ailesi İçin Duası',
    subtitle: 'Allah\'ın Merhametine Sığınmak',
    arabicText: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا',
    transliteration: 'Rabbığfir lî ve li-vâlideyye ve limen dehale beytiye mü\'minen',
    paragraphs: [
      'Hz. Nûh, Rabbinden yalnızca kendisi için değil, anne babası ve iman ederek evine girenler için de bağışlanma istedi.',
      'Bu dua, insanın sevdiği insanlar için Allah\'ın rahmetini dilemesinin güzel bir örneğidir.',
      'Peygamberlerin dualarında aile ve müminler sık sık yer alır. Bu, kulluğun yalnızca bireysel bir yolculuk olmadığını gösterir.',
      'İnsan anne babası, ailesi ve iman kardeşleri için dua ettiğinde kendi kalbinde de merhamet duygusunu büyütür.',
      'Bu duayı okurken sevdiklerimizi isim isim hatırlamak, duayı kişisel bir niyaza dönüştürebilir.'
    ],
    source: 'Nûh Suresi, 28. Ayet',
    tag: 'Hz. Nûh',
    readTime: 3,
  },
  {
    id: 'dua-23',
    category: 'dua',
    title: 'Hz. Muhammed\'in Kalplerin Sabitliği Duası',
    subtitle: 'Hidayetten Sonra Sapmaktan Korunmak',
    arabicText: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً',
    transliteration: 'Rabbenâ lâ tüziğ kulûbenâ ba\'de iz hedeytenâ ve heb lenâ min ledünke rahmeh',
    paragraphs: [
      'Kur\'an, iman edenlerin Allah\'tan kalplerinin hidayetten sonra eğrilmemesini istemelerini öğretir.',
      'İman sahibi olmak, insanın artık hiçbir sınavla karşılaşmayacağı anlamına gelmez. Bu nedenle kalbin sabit kalması için Allah\'tan yardım istemek önemlidir.',
      'Dua aynı zamanda Allah\'ın rahmetini istemeyi içerir. İnsan kendi gücüne güvenmek yerine kalbinin korunmasını Rabbine emanet eder.',
      'Günlük hayatta değişen şartlar, çevre ve nefsin arzuları karşısında bu dua insanın istikametini yeniden hatırlamasına yardımcı olabilir.',
      'Hidayeti bulduktan sonra onu korumak için dua etmek, şükür ve tevazunun birlikte yaşanmasıdır.'
    ],
    source: 'Âl-i İmrân Suresi, 8. Ayet',
    tag: 'Hz. Muhammed',
    readTime: 3,
  },
  {
    id: 'dua-24',
    category: 'dua',
    title: 'Hz. Muhammed\'in Gönül Temizliği Duası',
    subtitle: 'Hidayet, Takva ve İffet İsteme',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    transliteration: 'Allahümme innî es\'elükel-hüdâ vet-tükâ vel-afâfe vel-gınâ',
    paragraphs: [
      'Hz. Peygamberin öğrettiği bu kısa dua dört büyük isteği bir araya getirir: hidayet, takva, iffet ve gönül zenginliği.',
      'Hidayet doğru yolu bilmeyi ve o yolda yürümeyi; takva Allah\'a karşı sorumluluk bilincini ifade eder.',
      'İffet insanın kendisini haramlardan korumasını, gönül zenginliği ise başkasının elindekine muhtaç olmadan Allah\'ın verdiğiyle yetinmesini hatırlatır.',
      'Duanın kısa olması onu günlük hayatta tekrar etmeyi kolaylaştırır. Fakat anlamı insan hayatının çok geniş bir bölümünü kapsar.',
      'İnsan bazen ne isteyeceğini bilemediğinde, bu dört kavramı Allah\'tan istemek kalbin yönünü yeniden belirleyebilir.'
    ],
    source: 'Sahih Müslim, Zikir ve Dua bölümü',
    tag: 'Hz. Muhammed',
    readTime: 3,
  },

  // ─── SAHABE HİKÂYELERİ ────────────────────────────────────────────────────
  {
    id: 'hikaye-1',
    category: 'hikaye',
    title: 'Selmân-ı Fârisî: Hakikati Arayan Yolcu',
    subtitle: 'Bir İnanç Arayışının Yıllar Süren Yolculuğu',
    paragraphs: [
      'Selmân-ı Fârisî, hakikati arama konusunda en dikkat çekici sahabelerden biridir. İran taraflarında başlayan hayatında, içinde bulunduğu inancın kendisini tatmin etmediğini fark etti ve gerçeği aramaya başladı.',
      'Hristiyanlığı öğrendi, farklı kimselerden dinî bilgiler aldı ve kendisine güven veren bir rahibin yanında bulundu. Fakat o rahibin vefatından sonra arayışı bitmedi; yeni insanlardan hakikati öğrenmeye devam etti.',
      'Bu arayış onu Şam, Musul, Nusaybin ve başka bölgelere kadar götürdü. Sonunda son peygamberin geleceğine dair kendisine anlatılan işaretleri takip etti ve Medine\'ye ulaştı.',
      'Hayatının bir döneminde köle olarak satıldı ve farklı sahiplerin eline geçti. Sahih Buhârî\'de onun birden fazla efendinin elinde dolaştığı ve sonunda özgürlüğüne kavuştuğu aktarılır.',
      'Hz. Peygamberin yanında İslam\'ı buldu. Daha sonra Hendek Savaşı sırasında hendek kazılması fikrinin öne çıkmasında rol aldı. Hz. Peygamber de onun imanına ve değerine dikkat çekti; Sahih Müslim\'de, iman Süreyya yıldızında bile olsa İranlılardan insanların ona ulaşacağı anlamındaki övgü rivayet edilir.',
      'Selmân\'ın hikâyesi, hakikati samimiyetle arayan insanın yolunun uzun olabileceğini ama samimi arayışın değerini kaybetmediğini anlatır.'
    ],
    source: 'Sahih Buhârî, 3946-3947; Sahih Müslim, 2546b; Tirmizî, 1548',
    tag: 'Selmân-ı Fârisî',
    readTime: 5,
  },
  {
    id: 'hikaye-2',
    category: 'hikaye',
    title: 'Ebû Bekir ve Hicret Mağarası',
    subtitle: 'Tehlikenin Ortasında Sükûnet',
    paragraphs: [
      'Mekke\'den Medine\'ye hicret gecesinde Hz. Ebû Bekir, Hz. Peygamberin yol arkadaşı oldu. İkisi takipçilerden gizlenmek için Sevr Mağarası\'na sığındı.',
      'Düşmanlar mağaranın girişine kadar yaklaşmıştı. Hz. Ebû Bekir, onları görebilecek kadar yakın olduklarını düşünerek endişelendi. Kur\'an, o anda Hz. Peygamberin arkadaşına Allah\'ın kendileriyle olduğunu söylediğini aktarır.',
      'Bu sahne, korkunun hiç olmadığı bir an değildir. Aksine korkunun içinde Allah\'a güvenin nasıl ayakta tutulduğunu gösterir.',
      'Hz. Ebû Bekir, Hz. Peygamberin en yakın arkadaşlarından biri olarak hicretin en zor anlarından birinde onun yanında bulundu.',
      'Hicret kıssası, insanın tedbir almasıyla Allah\'a güvenmesinin birbirine zıt olmadığını öğretir: Yola çıkılır, saklanılır, plan yapılır; fakat kalp sonunda Allah\'a dayanır.'
    ],
    source: 'Tevbe Suresi, 40. Ayet',
    tag: 'Hz. Ebû Bekir',
    readTime: 4,
  },
  {
    id: 'hikaye-3',
    category: 'hikaye',
    title: 'Bilâl-i Habeşî: Özgürlüğün Sesi',
    subtitle: 'İşkenceden Ezanın İlk Müezzinliğine',
    paragraphs: [
      'Bilâl-i Habeşî, İslam\'ın ilk dönemlerinde iman eden ve Mekke\'de ağır baskıya maruz kalan sahabelerdendi.',
      'Köle olduğu dönemde imanından vazgeçmesi için işkence gördü. Buna rağmen tevhid inancından dönmedi. Bu tavrı, onun sabrının sembolü hâline geldi.',
      'Hz. Ebû Bekir, Bilâl\'i satın alarak özgürlüğüne kavuşturdu. Sahih Buhârî\'de Hz. Ömer\'in Ebû Bekir için "efendimiz" ve Bilâl için "efendimizi özgürleştirdi" anlamındaki sözü aktarılır.',
      'Bilâl daha sonra Hz. Peygamberin müezzini oldu ve ezanıyla Müslümanların namaz vakitlerini duyurdu.',
      'Onun hayatında dikkat çeken şey, Mekke\'de ezilen bir kölenin İslam toplumunda şerefli bir konuma yükselmesidir. Değerin soy, renk ve servetle değil iman ve takvayla ölçülmesi onun hayatında somut bir örnek bulur.'
    ],
    source: 'Sahih Buhârî, 3754 ve Bilâl\'in faziletlerine dair rivayetler',
    tag: 'Bilâl-i Habeşî',
    readTime: 4,
  },
  {
    id: 'hikaye-4',
    category: 'hikaye',
    title: 'Hz. Ömer\'in Hidayet Yolculuğu',
    subtitle: 'Sertlikten İmana Uzanan Değişim',
    paragraphs: [
      'Hz. Ömer, İslam\'ın ilk yıllarında Müslümanlara karşı sert tavrıyla tanınan isimlerden biriydi. Fakat insanın hayatında bir anda yön değiştiren anlar olabilir.',
      'İslam\'ı kabul edişine dair siyer kaynaklarında farklı ayrıntılar anlatılır. Rivayetlerin ortak temasında, Kur\'an ayetleriyle karşılaşmasının onun kalbinde büyük bir dönüşüm meydana getirmesi vardır.',
      'Müslüman olduktan sonra imanını gizlemek yerine açıkça yaşamayı tercih etti. Böylece Müslümanların Mekke\'deki varlığı daha görünür hâle geldi.',
      'Hz. Peygamberin vefatından sonra Ebû Bekir döneminde danışılan isimlerden biri oldu; ardından halife olarak adalet ve kamu sorumluluğu ile öne çıktı.',
      'Hz. Ömer\'in hikâyesi, bir insanın geçmişinin onun geleceğini kesin olarak belirlemediğini gösterir. Kalp hakikate açıldığında insanın bütün yönü değişebilir.'
    ],
    source: 'İbn Hişâm ve siyer rivayetleri; Hz. Ömer\'in faziletleri hakkında Sahih Buhârî rivayetleri',
    tag: 'Hz. Ömer',
    readTime: 4,
  },
  {
    id: 'hikaye-5',
    category: 'hikaye',
    title: 'Hz. Osman ve Rûme Kuyusu',
    subtitle: 'Bir Kuyunun Kamu Yararı İçin Vakfedilmesi',
    paragraphs: [
      'Medine\'de su ihtiyacı önemli bir meseleydi. Rûme Kuyusu olarak bilinen kuyunun satın alınıp Müslümanların kullanımına açılması, Hz. Osman\'ın adıyla anılan önemli sadakalardan biridir.',
      'Rivayetlerde Hz. Peygamberin bu kuyuyu satın alıp insanların faydasına sunacak kimseyi teşvik ettiği ve Hz. Osman\'ın bu işe talip olduğu aktarılır.',
      'Buradaki güzellik, servetin yalnızca kişisel rahatlık için değil toplumun temel ihtiyacını karşılamak için kullanılabilmesidir.',
      'Hz. Osman son derece varlıklı olmasına rağmen malını Allah yolunda harcamasıyla tanınmıştır. Tebük Seferi gibi zor dönemlerde de büyük maddi desteklerde bulunduğu rivayet edilmiştir.',
      'Bu hikâye, sadakanın yalnızca küçük miktarlardan ibaret olmadığını; insanın sahip olduğu imkânı kalıcı bir faydaya dönüştürebileceğini hatırlatır.'
    ],
    source: 'Tirmizî ve Ahmed b. Hanbel\'de Rûme Kuyusu ile ilgili rivayetler',
    tag: 'Hz. Osman',
    readTime: 4,
  },
  {
    id: 'hikaye-6',
    category: 'hikaye',
    title: 'Hz. Ali ve İlme Yakınlık',
    subtitle: 'Genç Yaşta Büyük Bir Sorumluluk',
    paragraphs: [
      'Hz. Ali, Hz. Peygamberin amcasının oğlu ve damadıydı. Çocuk yaşta İslam\'ı kabul eden ilk isimler arasında yer aldı.',
      'Mekke döneminin baskılı ortamında Hz. Peygamberin yanında yetişti. Hicret gecesinde, Hz. Peygamberin yatağında kalması gibi tehlikeli bir görevi üstlendi.',
      'Medine döneminde de savaşlarda ve çeşitli görevlerde Hz. Peygamberin yanında bulundu. İlmi, cesareti ve hitabetiyle tanındı.',
      'Hz. Peygamberin vefatından sonra Müslüman toplumunda önemli bir yere sahip oldu ve daha sonra dördüncü halife olarak görev yaptı.',
      'Hz. Ali\'nin hayatından çıkarılabilecek derslerden biri, genç yaşta verilen sorumluluğun insanı olgunlaştırabileceğidir. Bilgi, cesaret ve adalet birlikte yürüdüğünde güçlü bir karakter ortaya çıkar.'
    ],
    source: 'Sahih Buhârî ve Sahih Müslim\'de Hz. Ali\'nin faziletlerine dair rivayetler; siyer kaynakları',
    tag: 'Hz. Ali',
    readTime: 4,
  },
  {
    id: 'hikaye-7',
    category: 'hikaye',
    title: 'Mus\'ab b. Umeyr: İmkândan Fedakârlığa',
    subtitle: 'Mekke\'nin Refahından Medine\'nin Öğretmenliğine',
    paragraphs: [
      'Mus\'ab b. Umeyr, Mekke\'de gençliği, güzelliği ve ailesinin sağladığı imkânlarla tanınan bir gençti. İslam\'ı kabul ettiğinde hayatının yönü tamamen değişti.',
      'Ailesinin baskısıyla karşılaştı ve bir dönem hapsedildi. Buna rağmen imanından vazgeçmedi.',
      'Hz. Peygamber onu Medine\'ye İslam\'ı öğretmek için gönderdi. Mus\'ab burada Kur\'an öğretti, insanlarla konuştu ve İslam\'ın yayılmasına katkı sağladı.',
      'Uhud Savaşı\'nda İslam sancağını taşıdı ve şehit oldu. Vefat ettiğinde onu örtecek kefen konusunda bile büyük bir yokluk yaşandığı rivayet edilir.',
      'Bir zamanlar rahat bir hayat yaşayan Mus\'ab\'ın sonu, dünyadaki imkânların geçici olduğunu ve insanın değerinin sahip olduklarıyla ölçülmediğini hatırlatır.'
    ],
    source: 'Siyer ve Megâzî kaynakları; Mus\'ab b. Umeyr hakkında rivayetler',
    tag: 'Mus\'ab b. Umeyr',
    readTime: 4,
  },
  {
    id: 'hikaye-8',
    category: 'hikaye',
    title: 'Habbâb b. Eret: Sabırla Ayakta Kalmak',
    subtitle: 'İşkence Günlerinde İman',
    paragraphs: [
      'Habbâb b. Eret, Mekke döneminde İslam\'ı ilk kabul eden ve ağır işkencelere maruz kalan sahabelerdendi.',
      'İmanından dönmesi için zorlandı ve dayanılması güç eziyetler gördü. Buna rağmen Hz. Peygamberin yanında imanını korudu.',
      'Bir gün Hz. Peygamberden yaşadıkları sıkıntının sona ermesi için dua etmesini istediğinde, önceki ümmetlerin de ağır imtihanlardan geçtiğini ve Allah\'ın bu dini tamamlayacağını bildiren teselliyle karşılaştı.',
      'Bu rivayet, sabrın pasif bir bekleyiş olmadığını gösterir. Habbâb gibi sahabeler zorluk içinde bile imanlarını korumaya devam ettiler.',
      'Onun hayatı, sıkıntı sırasında insanın kendisini yalnız hissetse bile geçmişte sabreden insanların hikâyelerinden güç alabileceğini hatırlatır.'
    ],
    source: 'Sahih Buhârî, Mezâlim ve Menâkıb bölümlerindeki rivayetler',
    tag: 'Habbâb b. Eret',
    readTime: 4,
  },
  {
    id: 'hikaye-9',
    category: 'hikaye',
    title: 'Ammâr b. Yâsir ve Ailesi',
    subtitle: 'İşkenceye Rağmen İmanı Korumak',
    paragraphs: [
      'Ammâr b. Yâsir ve ailesi Mekke\'de Müslüman oldukları için ağır işkencelere maruz kaldılar. Ailesi, İslam\'ın ilk dönemlerinde büyük bedeller ödeyen ailelerden biri oldu.',
      'Hz. Peygamber onların yanından geçerken sabretmelerini ve cennetle müjdelenen bir akıbeti hatırlatan sözler söyledi.',
      'Ammâr hayatta kaldı; fakat anne ve babası ağır işkenceler sonucunda şehit edildi. Bu olay, Mekke döneminin ne kadar zor olduğunu gösterir.',
      'Ammâr daha sonra Medine\'ye hicret etti ve Müslüman toplumun önemli isimlerinden biri oldu. Bedir başta olmak üzere çeşitli olaylarda yer aldı.',
      'Onun hayatı, insanın başına gelen acıların iman yolculuğunun bütününü tanımlamadığını; sabırla devam eden bir hayatın da mümkün olduğunu gösterir.'
    ],
    source: 'Sahih Buhârî; siyer kaynakları ve Ammâr ailesi hakkındaki rivayetler',
    tag: 'Ammâr b. Yâsir',
    readTime: 4,
  },
  {
    id: 'hikaye-10',
    category: 'hikaye',
    title: 'Ebû Zer el-Gıfârî: Doğrudanlık ve Hakikat Arayışı',
    subtitle: 'İslam\'ı Duyunca Mekke\'ye Gelişi',
    paragraphs: [
      'Ebû Zer el-Gıfârî, İslam\'ı duymadan önce de putperestlikten uzaklaşmaya çalışan ve tek Allah inancını arayan biriydi.',
      'Hz. Peygamberin Mekke\'de olduğunu öğrenince kardeşini araştırmak için gönderdi. Yeterli bilgi gelmeyince kendisi Mekke\'ye gitti.',
      'Hz. Ali ile karşılaşması ve onun aracılığıyla Hz. Peygamberle tanışması sonucunda İslam\'ı kabul etti. Ardından imanını açıkça ilan etti.',
      'Onun açık sözlülüğü ve dünyaya karşı mesafeli tavrı hayatı boyunca belirgin oldu. İnsanları hakka çağırırken doğru bildiğini söylemekten çekinmedi.',
      'Ebû Zer\'in hikâyesi, hakikati arayan bir insanın sadece bilgi edinmekle kalmayıp öğrendiği hakikati hayatına taşımaya çalışmasının örneğidir.'
    ],
    source: 'Sahih Müslim, Ebû Zer\'in İslam\'ı kabulünü anlatan rivayet',
    tag: 'Ebû Zer el-Gıfârî',
    readTime: 4,
  },
  {
    id: 'hikaye-11',
    category: 'hikaye',
    title: 'Ebû Hüreyre: Açlıktan İlim Halkasına',
    subtitle: 'Mescid-i Nebevî\'de Yaşanan Zorlu Günler',
    paragraphs: [
      'Ebû Hüreyre, Hz. Peygamberle Medine döneminde uzun süre birlikte bulunan ve çok sayıda hadis rivayet eden sahabelerdendi.',
      'Medine\'deki ilk yıllarında maddi imkânları sınırlıydı. Mescid-i Nebevî\'de yaşayan ve kendilerini ilme adayan Suffe ehli arasında bulunuyordu.',
      'Açlığının arttığı zamanlarda insanların yanında oturur, Hz. Peygamberin sohbetlerini takip eder ve öğrendiklerini korumaya çalışırdı.',
      'Daha sonra rivayet ettiği hadislerin çokluğu, onun ilme verdiği değeri gösterdi. Açlık ve imkânsızlık, onu öğrenmekten uzaklaştırmadı.',
      'Ebû Hüreyre\'nin hayatı, insanın şartları mükemmel olmadığı halde ilim ve güzel amaçlar peşinden gidebileceğini anlatır.'
    ],
    source: 'Sahih Buhârî ve Sahih Müslim\'de Ebû Hüreyre ve Suffe rivayetleri',
    tag: 'Ebû Hüreyre',
    readTime: 4,
  },
  {
    id: 'hikaye-12',
    category: 'hikaye',
    title: 'Sa\'d b. Ebî Vakkâs: Anne Sevgisi ve İnanç',
    subtitle: 'Aile Baskısı Karşısında İman',
    paragraphs: [
      'Sa\'d b. Ebî Vakkâs, İslam\'ı ilk kabul eden sahabeler arasındaydı. Müslüman olduğunda ailesinin baskısıyla karşılaştı.',
      'Annesi, Sa\'d\'ın dininden dönmesi için çok ağır bir tavır aldı. Fakat Sa\'d, anne babaya iyilik yapmanın önemini korurken Allah\'a itaat konusunda taviz vermemesi gerektiğini bildi.',
      'Kur\'an\'da da anne babaya iyilik yapılması, ancak Allah\'a ortak koşmaya zorlanıldığında bu konuda itaat edilmemesi öğretilir.',
      'Sa\'d daha sonra İslam toplumunun önemli isimlerinden biri oldu ve çeşitli seferlerde görev aldı.',
      'Onun hayatı, aileye saygı ile inançta kararlılığın birbirinden ayrılabileceğini; insanın ailesine iyilik ederken kendi inancını da koruyabileceğini gösterir.'
    ],
    source: 'Lokmân Suresi, 15. Ayet; Sahih Buhârî ve Müslim\'de Sa\'d ile ilgili rivayetler',
    tag: 'Sa\'d b. Ebî Vakkâs',
    readTime: 4,
  },
  {
    id: 'hikaye-13',
    category: 'hikaye',
    title: 'Abdullah b. Mes\'ûd: Kur\'an\'a Yakın Bir Sahabe',
    subtitle: 'Mekke\'de Kur\'an\'ı Açıkça Okumak',
    paragraphs: [
      'Abdullah b. Mes\'ûd, İslam\'ın ilk dönemlerinde Müslüman olan ve Kur\'an bilgisiyle öne çıkan sahabelerdendi.',
      'Mekke\'de Müslümanların sayısı az ve baskı ağır olduğu bir dönemde Kur\'an\'ı Kâbe çevresinde yüksek sesle okumaya cesaret eden sahabelerden biri oldu.',
      'Müşriklerin saldırısına uğramasına rağmen geri adım atmadı. Bu olay onun Kur\'an\'a olan bağlılığının sembollerinden biri hâline geldi.',
      'Hz. Peygamberin yanında Kur\'an öğrendi ve daha sonra insanlara öğretmeye devam etti. Sahabeler arasında Kur\'an bilgisiyle tanınması bunun sonucuydu.',
      'Onun hayatı, Kur\'an\'ı sadece okumak değil, onu öğrenmek, anlamak ve başkalarına öğretmek için çaba göstermenin değerini anlatır.'
    ],
    source: 'Sahih Buhârî ve Sahih Müslim; İbn Mes\'ûd\'un faziletleri hakkındaki rivayetler',
    tag: 'Abdullah b. Mes\'ûd',
    readTime: 4,
  },
  {
    id: 'hikaye-14',
    category: 'hikaye',
    title: 'Zeyd b. Sâbit: Vahyi Yazıya Geçirmek',
    subtitle: 'Genç Yaşta Büyük Bir Emanet',
    paragraphs: [
      'Zeyd b. Sâbit, Medine\'de genç yaşta Hz. Peygamberin hizmetinde bulunan ve vahyi yazan sahabelerden biri oldu.',
      'Okuma yazma öğrenmesi ve farklı dilleri bilmesi nedeniyle çeşitli yazışma ve tercüme görevlerinde de bulundu.',
      'Hz. Ebû Bekir döneminde Yemâme Savaşı sonrasında Kur\'an\'ın yazılı parçalarının bir araya getirilmesi çalışmasında görev aldı. Bu, büyük bir emanet ve dikkat isteyen bir işti.',
      'Zeyd bu görevi büyük titizlikle yürüttü. Hz. Osman dönemindeki mushafların çoğaltılması çalışmasında da görev alan heyette bulundu.',
      'Onun hikâyesi, genç yaşta verilen önemli bir görevin ciddiyetle taşınabileceğini ve ilmin toplum için bir emanet olduğunu gösterir.'
    ],
    source: 'Sahih Buhârî, Kur\'an\'ın cem\'i ve Zeyd b. Sâbit rivayetleri',
    tag: 'Zeyd b. Sâbit',
    readTime: 4,
  },
  {
    id: 'hikaye-15',
    category: 'hikaye',
    title: 'Muâz b. Cebel: İlme Adanmış Genç',
    subtitle: 'Helal ve Haramı Öğrenme Hassasiyeti',
    paragraphs: [
      'Muâz b. Cebel, genç yaşta Müslüman olan ve ilmiyle öne çıkan sahabelerdendi. Hz. Peygamber onun bilgisinden ve anlayışından faydalanıyordu.',
      'Medine\'de eğitim aldıktan sonra Yemen\'e gönderildi. Bu görevin verilmesi, onun dinî konulardaki bilgisinin ve muhakemesinin güvenilir görüldüğünü gösterir.',
      'Hz. Peygamberin Muâz\'a gönderilişi sırasında Kur\'an, sünnet ve gerektiğinde içtihat konusunda yönlendirmelerde bulunduğu rivayet edilir.',
      'Muâz, insanlara dini öğretmek ve adaletle hükmetmek için Yemen\'de görev yaptı.',
      'Onun hikâyesi, gençliğin ilim öğrenmeye engel olmadığını; bilgi ve sorumluluğun beraber yürüdüğünde genç bir insanın önemli görevler üstlenebileceğini anlatır.'
    ],
    source: 'Tirmizî, Ahkâm bölümü; siyer ve tabakat kaynakları',
    tag: 'Muâz b. Cebel',
    readTime: 4,
  },
  {
    id: 'hikaye-16',
    category: 'hikaye',
    title: 'Ümmü Seleme: Sabır ve Hikmet',
    subtitle: 'Hicretlerin Ardından Gelen Ferahlık',
    paragraphs: [
      'Ümmü Seleme, eşi Ebû Seleme ile birlikte İslam\'ın ilk dönemlerinde büyük sıkıntılar yaşadı. Habeşistan\'a hicret edenler arasında bulundu.',
      'Daha sonra Medine\'ye hicret etmek istediklerinde ailelerinden ve kabilelerinden kaynaklanan engellerle karşılaştılar. Bu ayrılıklar aileyi uzun süre zorladı.',
      'Sonunda Medine\'ye ulaştı. Hayatındaki bu ağır tecrübeler onu sabırlı ve hikmetli bir sahabe hâline getirdi.',
      'Hudeybiye günü Müslümanların zorlandığı bir anda Hz. Peygambere verdiği tavsiyeyle de öne çıktı. Hz. Peygamber onun önerisini uyguladı ve sahabeler de kısa süre sonra hareket etti.',
      'Ümmü Seleme\'nin hayatı, bazen en zor anlarda sakin düşünebilmenin ve doğru zamanda güzel bir fikir sunabilmenin büyük bir değer olduğunu gösterir.'
    ],
    source: 'Sahih Buhârî, Hudeybiye rivayetleri; siyer kaynakları',
    tag: 'Ümmü Seleme',
    readTime: 4,
  },
  {
    id: 'hikaye-17',
    category: 'hikaye',
    title: 'Esma bint Ebû Bekir: Hicretin Gizli Yardımcısı',
    subtitle: 'Zor Günlerde Üstlenilen Küçük Ama Büyük Görev',
    paragraphs: [
      'Esma bint Ebû Bekir, hicret hazırlığında Hz. Peygamber ve babası Ebû Bekir\'e yardım eden isimlerden biriydi.',
      'Sevr Mağarası\'nda bulunanlara yiyecek taşımak için hazırlık yaptı. Kemerini ikiye bölerek yiyecek bağladığı için Zâtünnitâkeyn, yani iki kuşak sahibi lakabıyla anıldı.',
      'Bu görev savaş meydanında yapılan büyük bir hareket değildi. Fakat hicret gibi kritik bir yolculukta küçük bir yardım bile büyük önem taşıyabiliyordu.',
      'Esma hayatının ilerleyen dönemlerinde de güçlü karakteri, sabrı ve cesaretiyle tanındı.',
      'Onun hikâyesi, büyük sonuçların bazen sessizce yapılan küçük hizmetlerden oluştuğunu gösterir.'
    ],
    source: 'Sahih Buhârî, Hicret ve Menâkıb bölümlerindeki rivayetler',
    tag: 'Esma bint Ebû Bekir',
    readTime: 4,
  },
  {
    id: 'hikaye-18',
    category: 'hikaye',
    title: 'Enes b. Mâlik: Çocukluktan Peygamber Evine',
    subtitle: 'On Yıllık Hizmetin Hatırası',
    paragraphs: [
      'Enes b. Mâlik, küçük yaşta Hz. Peygamberin hizmetine verildi. Böylece çocukluğu ve gençliğinin önemli bir kısmı Hz. Peygamberin yanında geçti.',
      'Yıllar sonra Hz. Peygamberin kendisine sert davranmadığını ve yaptığı bir iş için sürekli azarlamadığını anlatmıştır.',
      'Bu hatıra, Hz. Peygamberin çocuklarla ve gençlerle ilişkisini anlamak açısından önemlidir. Eğitimde şefkat ve sabır, Enes\'in hatıralarında belirgin biçimde görülür.',
      'Enes daha sonra uzun bir ömür yaşadı ve çok sayıda hadis rivayet etti. Çocuklukta gördüğü davranışları sonraki nesillere aktardı.',
      'Onun hayatı, çocuklara verilen sevginin ve güzel muamelenin hafızalarda yıllarca yaşayabileceğini gösterir.'
    ],
    source: 'Sahih Buhârî ve Sahih Müslim, Enes b. Mâlik rivayetleri',
    tag: 'Enes b. Mâlik',
    readTime: 4,
  },
  {
    id: 'hikaye-19',
    category: 'hikaye',
    title: 'Ebû Mûsâ el-Eş\'arî: Güzel Ses ve Güzel Kur\'an',
    subtitle: 'Kur\'an Okuyuşuyla Öne Çıkan Sahabe',
    paragraphs: [
      'Ebû Mûsâ el-Eş\'arî, Kur\'an okuyuşunun güzelliğiyle tanınan sahabelerden biriydi.',
      'Hz. Peygamber onun Kur\'an okuyuşunu dinlemiş ve kendisine Dâvûd ailesine verilen güzel sesten bir pay verildiğini ifade eden bir övgüde bulunmuştur.',
      'Ebû Mûsâ bu övgüyü şöhret için değil, Kur\'an\'ın güzelliğini insanlara ulaştırmak için taşıdı.',
      'Daha sonra valilik ve çeşitli görevlerde bulundu. Böylece güzel Kur\'an okuyuşunun yanında yönetim ve sorumluluk alanlarında da hizmet etti.',
      'Onun hikâyesi, bir yeteneğin Allah\'ın kitabına ve insanlara hizmet için kullanılabileceğini gösterir.'
    ],
    source: 'Sahih Buhârî ve Sahih Müslim, Ebû Mûsâ el-Eş\'arî rivayetleri',
    tag: 'Ebû Mûsâ el-Eş\'arî',
    readTime: 4,
  },
  {
    id: 'hikaye-20',
    category: 'hikaye',
    title: 'Abdurrahman b. Avf: Ticaret ve Tevekkül',
    subtitle: 'Medine\'de Yeniden Başlamak',
    paragraphs: [
      'Abdurrahman b. Avf, Mekke\'de servet sahibi bir tüccarken hicret ettiğinde birçok malını geride bıraktı.',
      'Medine\'ye geldiğinde Ensar\'dan Sa\'d b. Rebî\' ona mal paylaşmayı teklif etti. Abdurrahman ise kendisine sadece pazarın yolunu göstermesini istedi.',
      'Kendi emeğiyle ticarete başladı ve kısa sürede yeniden geçimini sağlamayı başardı. Bu olay, çalışmanın ve başkasına yük olmamak için gayret etmenin güzel örneklerinden biri olarak anlatılır.',
      'Servet kazandığında bunu sadece kendisi için tutmadı; Allah yolunda büyük infaklarda bulundu.',
      'Abdurrahman b. Avf\'ın hikâyesi, tevekkülün çalışmayı bırakmak olmadığını; insanın elinden geleni yapıp sonucu Allah\'a bırakması olduğunu gösterir.'
    ],
    source: 'Sahih Buhârî, Ensar ve hicret rivayetleri; siyer kaynakları',
    tag: 'Abdurrahman b. Avf',
    readTime: 4,
  },
  {
    id: 'hikaye-21',
    category: 'hikaye',
    title: 'Talha b. Ubeydullah: Uhud\'da Fedakârlık',
    subtitle: 'Hz. Peygamberi Korumak İçin Öne Çıkmak',
    paragraphs: [
      'Talha b. Ubeydullah, İslam\'ın ilk döneminde iman eden ve Bedir, Uhud gibi önemli olaylarda bulunan sahabelerdendi.',
      'Uhud Savaşı sırasında savaşın çok ağırlaştığı bir anda Hz. Peygamberin çevresinde kalan sahabeler arasında yer aldı.',
      'Rivayetlerde Talha\'nın Hz. Peygamberi korumak için kendisini siper ettiği ve çok sayıda yara aldığı anlatılır.',
      'Savaş sonrasında yaralarının izleri hayatında kaldı. Onun için önemli olan, tehlike anında yanında bulunan kişiyi korumaktı.',
      'Talha\'nın hikâyesi, sevginin sadece sözden ibaret olmadığını; zor anlarda fedakârlıkla ortaya çıktığını gösterir.'
    ],
    source: 'Siyer kaynakları; Uhud\'da Talha b. Ubeydullah\'ın faziletleri hakkında rivayetler',
    tag: 'Talha b. Ubeydullah',
    readTime: 4,
  },
  {
    id: 'hikaye-22',
    category: 'hikaye',
    title: 'Zübeyr b. Avvâm: Cesaret ve Sadakat',
    subtitle: 'Genç Yaşta İslam\'ın Yanında Durmak',
    paragraphs: [
      'Zübeyr b. Avvâm, İslam\'ı genç yaşta kabul eden ve Hz. Peygamberin yakın çevresinde bulunan sahabelerdendi.',
      'Mekke döneminde imanından dolayı baskı gördü. Buna rağmen İslam\'dan vazgeçmedi.',
      'Savaşlarda cesaretiyle öne çıktı ve Hz. Peygamberin yanında önemli görevler üstlendi. Onun adı Bedir ve Uhud gibi önemli mücadelelerle birlikte anılır.',
      'Zübeyr, hayatı boyunca güçlü bir sadakat ve cesaret örneği sergiledi. Sahabeler arasında Hz. Peygamberin havarisi olarak anıldığı rivayetler vardır.',
      'Onun hayatı, cesaretin sadece savaş meydanında değil, doğru bildiğinin arkasında durmakta da ortaya çıktığını hatırlatır.'
    ],
    source: 'Sahih Buhârî ve Sahih Müslim; Zübeyr b. Avvâm\'ın faziletleri hakkında rivayetler',
    tag: 'Zübeyr b. Avvâm',
    readTime: 4,
  },
  {
    id: 'hikaye-23',
    category: 'hikaye',
    title: 'Huzeyfe b. Yemân: Emanet ve Güven',
    subtitle: 'Sırları Koruyan Sahabe',
    paragraphs: [
      'Huzeyfe b. Yemân, Hz. Peygamberin yanında özel bazı bilgileri bilen sahabelerden biri olarak tanınır.',
      'Özellikle münafıklarla ilgili kendisine verilen bilgileri başkalarına yaymaması, onun güvenilirliğiyle ilgili önemli bir örnektir.',
      'İnsanların merak ettiği şeyleri anlatmak yerine emanete riayet etti. Bu tavır, bilginin her zaman paylaşılması gerekmediğini gösterir.',
      'Huzeyfe aynı zamanda savaşlarda ve farklı görevlerde bulunmuş, olayları dikkatle değerlendiren bir sahabe olarak öne çıkmıştır.',
      'Onun hikâyesi, güvenilirliğin sadece doğru söz söylemekten değil, gerektiğinde susmayı bilmekten de oluştuğunu öğretir.'
    ],
    source: 'Sahih Buhârî ve Sahih Müslim; Huzeyfe b. Yemân rivayetleri',
    tag: 'Huzeyfe b. Yemân',
    readTime: 4,
  },
  {
    id: 'hikaye-24',
    category: 'hikaye',
    title: 'Câbir b. Abdullah: Ailesi İçin Sorumluluk',
    subtitle: 'Zorluk İçinde Aileyi Ayakta Tutmak',
    paragraphs: [
      'Câbir b. Abdullah genç yaşta Müslüman oldu ve Hz. Peygamberin yanında bulundu. Babası Abdullah, Uhud Savaşı\'nda şehit olan Ensar sahabelerindendi.',
      'Câbir babasının vefatından sonra ailesinin sorumluluğunu üstlendi. Birden fazla kız kardeşinin bulunduğu bir aileyi geçindirmek zorunda kaldı.',
      'Hz. Peygamber Câbir\'in durumunu biliyor ve ona yardımcı oluyordu. Câbir\'in devesiyle ilgili meşhur rivayette, Hz. Peygamberin onun yükünü hafifletmesine ve ailesi için kolaylık sağlamasına yönelik bir yardım görülür.',
      'Câbir daha sonra çok sayıda hadis rivayet etti ve uzun yıllar ilimle meşgul oldu.',
      'Onun hikâyesi, aile sorumluluğunun bazen genç yaşta insanın omuzlarına binebileceğini; sabır, çalışma ve Allah\'ın yardımıyla bu sorumluluğun taşınabileceğini gösterir.'
    ],
    source: 'Sahih Buhârî ve Sahih Müslim; Câbir b. Abdullah rivayetleri',
    tag: 'Câbir b. Abdullah',
    readTime: 4,
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
