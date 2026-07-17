import React, { useState, useMemo } from 'react';
import CityCard from '../components/CityCard';
import SearchBox from '../components/SearchBox';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import citiesRegistry from '../data/citiesRegistry.json';

const CITIES_PER_PAGE = 12;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  // All cities from registry
  const allCities = citiesRegistry;
  const totalPages = Math.ceil(allCities.length / CITIES_PER_PAGE);

  // Get cities for current page
  const paginatedCities = useMemo(() => {
    const start = (currentPage - 1) * CITIES_PER_PAGE;
    return allCities.slice(start, start + CITIES_PER_PAGE);
  }, [currentPage, allCities]);

  // Generate page numbers for pagination display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll to top of cities section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <div class="relative z-10 text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/5 dark:bg-cream/5 text-forest dark:text-gold border border-forest/10 dark:border-cream/10 mb-6 text-sm font-semibold tracking-wide uppercase">
          <img src="/logo.png" alt="Logo" class="h-4 w-auto object-contain" />
          <span>Anadolu'nun Gastronomi Mirası</span>
        </div>
        
        <h1 class="text-4xl sm:text-6xl font-bold font-montserrat text-forest dark:text-cream mb-6 leading-tight">
          Nerede Ne Yenir?
        </h1>
        
        <p class="text-lg text-forest-dark/80 dark:text-cream/70 font-serif leading-relaxed italic">
          "Her şehrin bir tadı, her lezzetin asırlık bir hikayesi vardır. Türkiye'nin 81 ilinin en meşhur gastronomi duraklarını ve yemeklerin doğuş efsanelerini keşfedin."
        </p>

        {/* High Performance 81-city Search Dropdown */}
        <div class="mt-10 relative z-50">
          <SearchBox cities={citiesRegistry} />
        </div>
      </div>

      {/* All Cities Section */}
      <div>
        <div class="flex items-center justify-between border-b border-gold/20 dark:border-cream/10 pb-4 mb-8">
          <h2 class="text-2xl font-bold font-montserrat text-forest dark:text-cream flex items-center gap-2">
            <MapPin size={22} className="text-gold" />
            <span>Lezzet Durakları</span>
          </h2>
          <span class="text-sm font-semibold text-forest-dark/50 dark:text-cream/40">
            {allCities.length} Şehir · Sayfa {currentPage}/{totalPages}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedCities.map((city) => (
            <CityCard
              key={city.id}
              id={city.id}
              name={city.name}
              title={city.title}
              image={city.image}
            />
          ))}
        </div>

        {/* Google-style Pagination */}
        {totalPages > 1 && (
          <div class="flex items-center justify-center mt-14 mb-4">
            <nav class="flex items-center gap-1 sm:gap-2 bg-white dark:bg-forest-dark/80 px-4 py-3 rounded-2xl border border-gold/15 dark:border-cream/10 shadow-sm" aria-label="Sayfa Navigasyonu">
              
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                class={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  currentPage === 1
                    ? 'text-forest-dark/25 dark:text-cream/20 cursor-not-allowed'
                    : 'text-forest dark:text-cream hover:bg-forest/5 dark:hover:bg-cream/10'
                }`}
                aria-label="Önceki Sayfa"
              >
                <ChevronLeft size={16} />
                <span class="hidden sm:inline">Önceki</span>
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`dots-${idx}`} class="px-2 py-2 text-sm text-forest-dark/40 dark:text-cream/30 font-medium select-none">
                    ···
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    class={`min-w-[40px] h-[40px] flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                      currentPage === page
                        ? 'bg-forest text-cream shadow-md scale-105'
                        : 'text-forest-dark dark:text-cream/80 hover:bg-forest/5 dark:hover:bg-cream/10'
                    }`}
                    aria-label={`Sayfa ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                class={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  currentPage === totalPages
                    ? 'text-forest-dark/25 dark:text-cream/20 cursor-not-allowed'
                    : 'text-forest dark:text-cream hover:bg-forest/5 dark:hover:bg-cream/10'
                }`}
                aria-label="Sonraki Sayfa"
              >
                <span class="hidden sm:inline">Sonraki</span>
                <ChevronRight size={16} />
              </button>
            </nav>
          </div>
        )}
      </div>

    </div>
  );
}
