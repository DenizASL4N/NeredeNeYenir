import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Sun, Moon } from 'lucide-react';

export default function Navbar({ favoritesCount, theme, toggleTheme }) {
  const location = useLocation();

  return (
    <nav class="sticky top-0 z-50 glassmorphism dark:glassmorphism-dark shadow-sm transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          {/* Logo / Branding */}
          <Link to="/" class="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Nerede Ne Yenir Logo" 
              class="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div class="flex flex-col">
              <span class="font-playfair text-lg sm:text-2xl font-bold tracking-tight text-forest dark:text-cream block leading-tight whitespace-nowrap">
                Nerede Ne Yenir
              </span>
              <span class="text-[9px] sm:text-xs uppercase tracking-widest text-gold font-semibold block leading-none whitespace-nowrap">
                Lezzet Haritası
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div class="flex items-center space-x-4 sm:space-x-6">
            <Link
              to="/"
              class={`font-medium transition-colors duration-200 text-sm md:text-base ${
                location.pathname === '/' || location.pathname.startsWith('/sehir')
                  ? 'text-forest dark:text-cream border-b-2 border-gold pb-1 font-semibold'
                  : 'text-forest-dark/70 dark:text-cream/60 hover:text-forest dark:hover:text-cream hover:border-b-2 hover:border-gold/50 pb-1'
              }`}
            >
              Şehirler
            </Link>
            
            <Link
              to="/favoriler"
              class={`flex items-center space-x-2 font-medium transition-colors duration-200 text-sm md:text-base ${
                location.pathname === '/favoriler'
                  ? 'text-forest dark:text-cream border-b-2 border-gold pb-1 font-semibold'
                  : 'text-forest-dark/70 dark:text-cream/60 hover:text-forest dark:hover:text-cream hover:border-b-2 hover:border-gold/50 pb-1'
              }`}
            >
              <Heart
                size={18}
                className={`${
                  favoritesCount > 0 ? 'fill-forest text-forest dark:fill-gold dark:text-gold animate-pulse' : 'text-current'
                }`}
              />
              <span>Favorilerim</span>
              {favoritesCount > 0 && (
                <span class="inline-flex items-center justify-center px-2 py-0.5 ml-1 text-xs font-bold leading-none text-cream bg-gold rounded-full shadow-sm animate-bounce">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              class="p-2.5 rounded-xl bg-forest/5 dark:bg-cream/10 border border-gold/20 dark:border-cream/15 text-forest dark:text-gold hover:bg-forest/10 dark:hover:bg-cream/15 hover:scale-105 transition-all duration-300 cursor-pointer"
              title={theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
              aria-label="Tema Değiştir"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="transition-transform duration-300" />
              ) : (
                <Moon size={18} className="transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
