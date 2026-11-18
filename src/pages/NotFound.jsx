import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <title>Sayfa Bulunamadı | Nerede Ne Yenir</title>
      <Compass size={56} className="mx-auto text-gold mb-6" />
      <p className="text-sm font-bold uppercase tracking-widest text-gold mb-2">404</p>
      <h1 className="text-3xl sm:text-4xl font-bold font-montserrat text-forest dark:text-cream mb-4">
        Bu sayfa haritada yok
      </h1>
      <p className="text-forest-dark/70 dark:text-cream/60 mb-8 leading-relaxed">
        Aradığınız adres taşınmış ya da hiç var olmamış olabilir. 81 ilin lezzetlerini keşfetmeye ana sayfadan devam edebilirsiniz.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-cream font-bold rounded-xl shadow-md hover:bg-forest-light transition-all duration-200"
      >
        Şehirlere Dön
      </Link>
    </div>
  );
}
