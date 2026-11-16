import { Heart } from 'lucide-react';

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
                Tarihi Yemek Hikayeleri
              </span>
            </div>
          </div>
          
          <p className="text-sm text-cream/70 text-center md:text-right max-w-md">
            Şehirlerimizin asırlık lezzet miraslarını, tariflerin doğuş hikayelerini ve gastronomi kültürünü geleceğe taşıyoruz.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-cream/60">
          <p>
            &copy; {new Date().getFullYear()} Nerede Ne Yenir. Tüm hakları saklıdır.
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
