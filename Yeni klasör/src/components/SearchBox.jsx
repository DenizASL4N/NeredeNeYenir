import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';

export default function SearchBox({ cities }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(10); // Lazy render results count
  
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  // Filter cities based on search query
  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      setActiveIndex(-1);
      return;
    }

    const cleanQuery = query.toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g');

    const matches = cities.filter((city) => {
      const cleanName = city.name.toLowerCase()
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g');
      return cleanName.includes(cleanQuery);
    });

    setFiltered(matches);
    setActiveIndex(-1);
    setVisibleCount(10); // Reset pagination count on search query change
  }, [query, cities]);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Keyboard navigation inside dropdown
  const handleKeyDown = (e) => {
    if (!isOpen || filtered.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filtered.length) {
        selectCity(filtered[activeIndex].id);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const selectCity = (cityId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/sehir/${cityId}`);
  };

  // Lazy loading scrolling handler for performance
  const handleScroll = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 40) {
      // Near bottom, load more
      setVisibleCount((prev) => Math.min(prev + 10, filtered.length));
    }
  };

  return (
    <div ref={containerRef} class="relative w-full max-w-xl mx-auto z-40">
      <div class="relative group">
        <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gold group-focus-within:text-forest dark:group-focus-within:text-gold transition-colors duration-200">
          <Search size={22} />
        </div>
        
        <input
          type="text"
          placeholder="81 il arasından keşfetmeye başla... (örn: Trabzon, İzmir)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          class="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-forest-dark/80 border border-gold/45 dark:border-cream/15 focus:border-forest dark:focus:border-gold focus:ring-1 focus:ring-forest dark:focus:ring-gold outline-none text-forest-dark dark:text-cream shadow-sm hover:shadow transition-all duration-300 placeholder-forest-dark/45 dark:placeholder-cream/30 font-medium"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            class="absolute inset-y-0 right-4 flex items-center text-forest-dark/40 dark:text-cream/40 hover:text-forest dark:hover:text-cream transition-colors"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && filtered.length > 0 && (
        <div 
          ref={listRef}
          onScroll={handleScroll}
          class="absolute left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-white dark:bg-forest-dark/95 border border-gold/20 dark:border-cream/10 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-gold/5 dark:divide-cream/5"
        >
          {filtered.slice(0, visibleCount).map((city, idx) => (
            <div
              key={city.id}
              onClick={() => selectCity(city.id)}
              class={`flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors duration-150 ${
                idx === activeIndex ? 'bg-forest/5 dark:bg-cream/5 text-forest dark:text-cream font-bold' : 'hover:bg-forest/5 dark:hover:bg-cream/5 text-forest-dark dark:text-cream/80'
              }`}
            >
              <div class="flex items-center gap-3">
                <MapPin size={16} class="text-gold" />
                <div>
                  <span class="font-semibold text-sm sm:text-base">{city.name}</span>
                  <span class="block text-xs text-forest-dark/50 dark:text-cream/40 italic">"{city.title}"</span>
                </div>
              </div>
              <ArrowRight size={16} className="text-gold opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-150" />
            </div>
          ))}
          
          {filtered.length > visibleCount && (
            <div class="px-5 py-2 text-center text-xs text-forest-dark/40 dark:text-cream/30 bg-cream/20 dark:bg-forest-dark/50">
              Daha fazlası için kaydırın...
            </div>
          )}
        </div>
      )}

      {isOpen && query && filtered.length === 0 && (
        <div class="absolute left-0 right-0 mt-2 p-6 bg-white dark:bg-forest-dark/95 border border-gold/20 dark:border-cream/10 rounded-2xl shadow-xl z-50 text-center text-sm text-forest-dark/60 dark:text-cream/50 font-medium">
          Aradığınız il bulunamadı. Lütfen kontrol edip tekrar deneyin.
        </div>
      )}
    </div>
  );
}
