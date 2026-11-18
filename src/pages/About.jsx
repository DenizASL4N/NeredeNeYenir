import { useState, useEffect } from 'react';
import { BadgeCheck, Camera, BookOpen, MessageSquareWarning, ChevronDown } from 'lucide-react';
import citiesRegistry from '../data/citiesRegistry.json';
import { REPORT_URL } from '../utils/report';

const cityFiles = import.meta.glob('../data/cities/*.json');

// One credit row per distinct photo; representative photos used by several foods are listed once
function collectCredits(cities) {
  const byImage = new Map();
  const add = (image, gorsel, label) => {
    if (!image || !gorsel) return;
    const entry = byImage.get(image) || { gorsel, labels: [] };
    entry.labels.push(label);
    byImage.set(image, entry);
  };
  citiesRegistry.forEach((city) => add(city.image, city.gorsel, `${city.name} (şehir)`));
  cities.forEach((city) => city.yemekler.forEach((food) => add(food.image, food.gorsel, food.name)));
  return [...byImage.values()].sort((a, b) => a.labels[0].localeCompare(b.labels[0], 'tr'));
}

export default function About() {
  const [credits, setCredits] = useState(null);
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    if (!showCredits || credits) return;
    let ignore = false;
    Promise.all(Object.values(cityFiles).map((load) => load().then((m) => m.default))).then((cities) => {
      if (!ignore) setCredits(collectCredits(cities));
    });
    return () => {
      ignore = true;
    };
  }, [showCredits, credits]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-forest-dark dark:text-cream/90">
      <title>Hakkında ve Kaynaklar | Nerede Ne Yenir</title>
      <meta name="description" content="Nerede Ne Yenir'deki yemek bilgilerinin ve fotoğrafların kaynakları, coğrafi işaret rozetinin anlamı ve hata bildirme." />

      <h1 className="text-3xl sm:text-5xl font-bold font-montserrat text-forest dark:text-cream mb-4">Hakkında ve Kaynaklar</h1>
      <p className="text-base leading-relaxed mb-10 text-forest-dark/80 dark:text-cream/70">
        Nerede Ne Yenir, Türkiye'nin 81 ilinin yöresel lezzetlerini tanıtan bağımsız bir projedir. Amacımız her ilin gerçekten
        bilinen yemeklerini, doğrulanabilir bilgilerle ve kaynaklarıyla birlikte sunmaktır.
      </p>

      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-bold font-montserrat text-forest dark:text-cream mb-3">
          <BookOpen size={20} className="text-gold" /> Bilgiler nereden geliyor?
        </h2>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed text-forest-dark/80 dark:text-cream/70">
          <li>Yemek listeleri, Türk Patent ve Marka Kurumu'nun (TÜRKPATENT) coğrafi işaret kayıtları, il müdürlüklerinin yayınları, akademik çalışmalar ve haberler taranarak hazırlanmıştır.</li>
          <li>Bir yemeğin bilgisinin dayandığı sayfa, yemek detayındaki <strong>"Kaynak"</strong> bağlantısında gösterilir.</li>
          <li>Açıklamalar bilinen bilgilerle sınırlı tutulmuştur; doğrulanamayan efsane ve iddialara yer verilmemiştir.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-bold font-montserrat text-forest dark:text-cream mb-3">
          <BadgeCheck size={20} className="text-gold" /> "Coğrafi İşaretli" ne demek?
        </h2>
        <p className="leading-relaxed text-forest-dark/80 dark:text-cream/70">
          Coğrafi işaret, bir ürünün belirli bir yöreye özgü olduğunu ve o yöreyle özdeşleştiğini gösteren resmi tescildir.
          Bu rozet, yalnızca tescili bir kaynakta doğrulanabilen yemeklerde gösterilir. Güncel resmi liste için{' '}
          <a href="https://ci.turkpatent.gov.tr" target="_blank" rel="noopener noreferrer" className="text-forest dark:text-gold font-semibold hover:underline">
            TÜRKPATENT Coğrafi İşaretler Portalı
          </a>
          'na bakabilirsiniz.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-bold font-montserrat text-forest dark:text-cream mb-3">
          <Camera size={20} className="text-gold" /> Fotoğraflar
        </h2>
        <p className="leading-relaxed mb-3 text-forest-dark/80 dark:text-cream/70">
          Tüm fotoğraflar Wikimedia Commons ve Openverse üzerinden, kullanımına izin veren açık lisanslarla (CC0, CC BY, CC BY-SA)
          alınmıştır. Her fotoğrafın sahibi ve lisansı, fotoğrafın kullanıldığı sayfada belirtilir.
        </p>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed text-forest-dark/80 dark:text-cream/70">
          <li><strong>Temsili fotoğraf:</strong> o yemeğin kendi fotoğrafı bulunamadığında, aynı türden bir yemeğin fotoğrafı kullanılır.</li>
          <li><strong>Kategori fotoğrafı:</strong> benzer bir yemek de bulunamadığında, aynı kategoriden bir yemeğin fotoğrafı kullanılır.</li>
        </ul>

        <button
          onClick={() => setShowCredits((v) => !v)}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gold/40 text-sm font-semibold text-forest dark:text-gold hover:bg-gold/10 cursor-pointer"
        >
          <ChevronDown size={16} className={`transition-transform ${showCredits ? 'rotate-180' : ''}`} />
          {showCredits ? 'Fotoğraf listesini gizle' : 'Tüm fotoğrafların sahiplerini ve lisanslarını göster'}
        </button>

        {showCredits && (
          <div className="mt-4 max-h-[480px] overflow-y-auto rounded-2xl border border-gold/20 dark:border-cream/10 bg-white dark:bg-forest-dark/60 p-4 text-sm">
            {!credits ? (
              <p className="text-forest-dark/60 dark:text-cream/50">Yükleniyor...</p>
            ) : (
              <ul className="divide-y divide-gold/10">
                {credits.map(({ gorsel, labels }) => (
                  <li key={gorsel.kaynak + labels[0]} className="py-2">
                    <span className="font-semibold">{labels.slice(0, 3).join(', ')}{labels.length > 3 ? ` ve ${labels.length - 3} yemek daha` : ''}</span>
                    {' — '}
                    <a href={gorsel.kaynak} target="_blank" rel="noopener noreferrer" className="text-forest dark:text-gold hover:underline">
                      {gorsel.yazar}
                    </a>
                    {' '}({gorsel.lisans})
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      <section className="mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold font-montserrat text-forest dark:text-cream mb-3">
          <MessageSquareWarning size={20} className="text-gold" /> Bir hata mı gördünüz?
        </h2>
        <p className="leading-relaxed mb-4 text-forest-dark/80 dark:text-cream/70">
          Yanlış bir bilgi, eksik bir yemek ya da yanlış bir fotoğraf fark ederseniz bize bildirin. Her yemeğin detayında da
          "Hata bildir" bağlantısı bulunur.
        </p>
        <a
          href={REPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-cream font-bold rounded-xl shadow-md hover:bg-forest-light transition-all duration-200"
        >
          Hata Bildir
        </a>
        <p className="text-xs mt-2 text-forest-dark/50 dark:text-cream/40">Bildirimler GitHub üzerinden alınır; bir GitHub hesabı gerekir.</p>
      </section>
    </div>
  );
}
