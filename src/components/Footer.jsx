import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { REPORT_URL } from '../utils/report';

export default function Footer() {
  return (
    <footer className="bg-forest dark:bg-[#0A1510] text-cream border-t border-gold/20 dark:border-cream/5 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-cream/10 pb-8">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Nerede Ne Yenir Logo" className="h-10 w-auto object-contain" />
            <div>
              <span className="font-playfair text-xl font-bold tracking-tight block">
                Nerede Ne Yenir
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold-light block -mt-1 font-medium">
                Lezzet Haritası
              </span>
            </div>
          </div>

          <p className="text-sm text-cream/70 text-center md:text-right max-w-md">
            Türkiye'nin 81 ilinin yöresel lezzetlerini, coğrafi işaret kayıtları ve kaynaklarıyla birlikte tanıtıyoruz.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 pt-6 text-sm text-cream/80">
          <Link to="/" className="hover:text-gold transition-colors">Şehirler</Link>
          <Link to="/favoriler" className="hover:text-gold transition-colors">Favorilerim</Link>
          <Link to="/hakkinda" className="hover:text-gold transition-colors">Hakkında ve Kaynaklar</Link>
          <a href={REPORT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Hata Bildir
          </a>
        </nav>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-cream/60">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Nerede Ne Yenir. Fotoğraflar, sahiplerinin belirttiği açık lisanslarla kullanılmıştır.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Kültür ve lezzetle</span>
            <Heart size={12} className="fill-gold text-gold" />
            <span>tasarlandı.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
