import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import FoodModal from '../components/FoodModal';
import { ArrowLeft, Search, MapPin, Loader } from 'lucide-react';

export default function CityDetail({ favorites, onToggleFavorite, onUpdateNote }) {
  const { cityId } = useParams();
  const [cityData, setCityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);

  // Dynamic Lazy Loading of City JSON data
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setCityData(null);

    // Vite dynamically resolves import paths matching this template, compiling separate JSON chunks!
    import(`../data/cities/${cityId}.json`)
      .then((module) => {
        setCityData(module.default);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Şehir verileri yüklenirken hata:", err);
        setError("Şehir verisi yüklenemedi veya bu il henüz sisteme eklenmedi.");
        setIsLoading(false);
      });
  }, [cityId]);

  if (isLoading) {
    return (
      <div class="max-w-7xl mx-auto px-4 py-32 text-center flex flex-col items-center justify-center">
        <Loader size={48} className="animate-spin text-forest dark:text-gold mb-4" />
        <p class="text-forest dark:text-cream font-semibold text-lg">Şehir verileri lazy-load olarak yükleniyor...</p>
      </div>
    );
  }

  if (error || !cityData) {
    return (
      <div class="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 class="text-3xl font-bold font-montserrat text-forest dark:text-cream mb-4">Veri Bulunamadı</h2>
        <p class="text-forest-dark/70 dark:text-cream/60 mb-6">{error || "Aradığınız şehir bulunamadı."}</p>
        <Link to="/" class="px-6 py-3 bg-forest text-cream rounded-xl font-bold hover:bg-forest-light transition-all duration-200">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  // Filter foods by category and query
  const filteredFoods = (cityData.yemekler || []).filter((food) => {
    const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
    const matchesSearch = food.name.toLowerCase().replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').includes(
      searchQuery.toLowerCase().replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Back button */}
      <div class="mb-6">
        <Link
          to="/"
          class="inline-flex items-center gap-2 text-forest dark:text-gold hover:text-forest-light dark:hover:text-gold-light font-bold text-sm transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          <span>Şehirlere Dön</span>
        </Link>
      </div>

      {/* City Cover Banner - Dynamic landscape image based on unsplash_query */}
      <div class="relative rounded-3xl overflow-hidden mb-12 border border-gold/15 dark:border-cream/10 bg-forest-dark h-[300px] md:h-[380px]">
        <img
          src={cityData.image}
          alt={`${cityData.il_adi} - ${cityData.unsplash_query}`}
          class="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-75"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/30 to-transparent" />
        
        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-cream z-10">
          <div class="flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-widest mb-2">
            <MapPin size={14} />
            <span>{cityData.il_adi} / Türkiye</span>
          </div>
          
          <h1 class="text-4xl md:text-6xl font-bold font-montserrat mb-3">
            {cityData.il_adi}
          </h1>
          
          <p class="text-base md:text-lg text-cream/90 font-serif italic max-w-2xl border-l-2 border-gold/50 pl-4 py-0.5">
            "{cityData.title}"
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div class="bg-white dark:bg-forest-dark/80 rounded-2xl p-6 border border-gold/15 dark:border-cream/10 shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300">
        
        <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span class="text-xs font-bold text-forest-dark/50 dark:text-cream/40 uppercase tracking-wider mr-2 hidden sm:inline-block">
            Kategoriler:
          </span>
          <button
            onClick={() => setActiveCategory('All')}
            class={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeCategory === 'All'
                ? 'bg-forest text-cream shadow-sm font-bold'
                : 'bg-cream dark:bg-forest-dark text-forest dark:text-cream/80 hover:bg-gold/10 dark:hover:bg-cream/5'
            }`}
          >
            Tümü
          </button>
          
          <button
            onClick={() => setActiveCategory('Ana Yemek')}
            class={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeCategory === 'Ana Yemek'
                ? 'bg-forest text-cream shadow-sm font-bold'
                : 'bg-cream dark:bg-forest-dark text-forest dark:text-cream/80 hover:bg-gold/10 dark:hover:bg-cream/5'
            }`}
          >
            Ana Yemekler
          </button>
          
          <button
            onClick={() => setActiveCategory('Tatlı')}
            class={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeCategory === 'Tatlı'
                ? 'bg-forest text-cream shadow-sm font-bold'
                : 'bg-cream dark:bg-forest-dark text-forest dark:text-cream/80 hover:bg-gold/10 dark:hover:bg-cream/5'
            }`}
          >
            Tatlılar
          </button>
        </div>

        <div class="relative w-full md:w-80 group">
          <div class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gold group-focus-within:text-forest dark:group-focus-within:text-gold transition-colors duration-200">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Bu ilde lezzet ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/55 dark:bg-forest-dark/60 border border-gold/30 dark:border-cream/15 focus:border-forest dark:focus:border-gold focus:ring-1 focus:ring-forest dark:focus:ring-gold outline-none text-sm transition-all duration-200 placeholder-forest-dark/40 dark:placeholder-cream/30 font-medium text-forest-dark dark:text-cream"
          />
        </div>

      </div>

      {/* Foods Grid */}
      <div class="mb-12">
        {filteredFoods.length > 0 ? (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFoods.map((food) => {
              const favoriteItem = favorites.find((f) => f.id === food.id);
              const isFav = !!favoriteItem;
              return (
                <FoodCard
                  key={food.id}
                  food={food}
                  isFavorite={isFav}
                  onToggleFavorite={(f, note) => onToggleFavorite(f, cityData.il_adi, note)}
                  onViewDetails={setSelectedFood}
                />
              );
            })}
          </div>
        ) : (
          <div class="text-center py-16 bg-white/50 dark:bg-forest-dark/30 rounded-2xl border border-gold/15 dark:border-cream/10">
            <p class="text-forest-dark/60 dark:text-cream/50 font-medium">
              Bu ilde henüz bir lezzet listelenmedi veya aramanıza uygun sonuç bulunamadı.
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedFood && (
        <FoodModal
          food={selectedFood}
          cityName={cityData.il_adi}
          isFavorite={!!favorites.find((f) => f.id === selectedFood.id)}
          favoriteItem={favorites.find((f) => f.id === selectedFood.id)}
          onToggleFavorite={(f, cName, note) => onToggleFavorite(f, cName, note)}
          onUpdateNote={onUpdateNote}
          onClose={() => setSelectedFood(null)}
        />
      )}

    </div>
  );
}
