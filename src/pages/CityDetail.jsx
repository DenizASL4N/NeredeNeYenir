import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import FoodModal from '../components/FoodModal';
import { normalizeTurkish } from '../utils/normalizeTurkish';
import { ArrowLeft, Search, MapPin, Loader } from 'lucide-react';
import SafeImage from '../components/SafeImage';
import { CATEGORIES } from '../data/categories';

const categoryButtonClass = (isActive) => `px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
  isActive
    ? 'bg-forest text-cream shadow-sm font-bold'
    : 'bg-cream dark:bg-forest-dark text-forest dark:text-cream/80 hover:bg-gold/10 dark:hover:bg-cream/5'
}`;

export default function CityDetail({ favorites, onToggleFavorite, onUpdateNote }) {
  const { cityId } = useParams();
  // Result of the last load, tagged with the city it belongs to
  const [loaded, setLoaded] = useState({ cityId: null, data: null, error: null });
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);

  const isLoading = loaded.cityId !== cityId;
  const cityData = loaded.data;
  const error = loaded.error;

  // Dynamic Lazy Loading of City JSON data
  useEffect(() => {
    let ignore = false;

    // Vite dynamically resolves import paths matching this template, compiling separate JSON chunks!
    import(`../data/cities/${cityId}.json`)
      .then((module) => {
        if (!ignore) setLoaded({ cityId, data: module.default, error: null });
      })
      .catch((err) => {
        console.error("Şehir verileri yüklenirken hata:", err);
        if (!ignore) setLoaded({ cityId, data: null, error: "Şehir verisi yüklenemedi veya bu il henüz sisteme eklenmedi." });
      });

    // Ignore a slow response for a city the user has already navigated away from
    return () => {
      ignore = true;
    };
  }, [cityId]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center flex flex-col items-center justify-center">
        <Loader size={48} className="animate-spin text-forest dark:text-gold mb-4" />
        <p className="text-forest dark:text-cream font-semibold text-lg">Şehir verileri lazy-load olarak yükleniyor...</p>
      </div>
    );
  }

  if (error || !cityData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold font-montserrat text-forest dark:text-cream mb-4">Veri Bulunamadı</h2>
        <p className="text-forest-dark/70 dark:text-cream/60 mb-6">{error || "Aradığınız şehir bulunamadı."}</p>
        <Link to="/" className="px-6 py-3 bg-forest text-cream rounded-xl font-bold hover:bg-forest-light transition-all duration-200">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const foods = cityData.yemekler || [];

  // Only offer the categories this city actually has
  const cityCategories = CATEGORIES.filter((category) => foods.some((food) => food.category === category.name));

  // A category picked in another city may not exist here; fall back to all
  const selectedCategory = cityCategories.some((category) => category.name === activeCategory) ? activeCategory : 'All';

  // Filter foods by category and query
  const filteredFoods = foods.filter((food) => {
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    const matchesSearch = normalizeTurkish(food.name).includes(
      normalizeTurkish(searchQuery)
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-forest dark:text-gold hover:text-forest-light dark:hover:text-gold-light font-bold text-sm transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          <span>Şehirlere Dön</span>
        </Link>
      </div>

      {/* City Cover Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-12 border border-gold/15 dark:border-cream/10 bg-forest-dark h-[300px] md:h-[380px]">
        <SafeImage
          src={cityData.image}
          alt={`${cityData.il_adi} şehir görünümü`}
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-cream z-10">
          <div className="flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-widest mb-2">
            <MapPin size={14} />
            <span>{cityData.il_adi} / Türkiye</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-3">
            {cityData.il_adi}
          </h1>
          
          <p className="text-base md:text-lg text-cream/90 font-serif italic max-w-2xl border-l-2 border-gold/50 pl-4 py-0.5">
            "{cityData.title}"
          </p>
        </div>

        {cityData.gorsel && (
          <a
            href={cityData.gorsel.kaynak}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-4 z-10 max-w-[60%] truncate text-[10px] text-cream/70 hover:text-cream hover:underline"
          >
            Fotoğraf: {cityData.gorsel.yazar} ({cityData.gorsel.lisans})
          </a>
        )}
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-forest-dark/80 rounded-2xl p-6 border border-gold/15 dark:border-cream/10 shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300">
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-forest-dark/50 dark:text-cream/40 uppercase tracking-wider mr-2 hidden sm:inline-block">
            Kategoriler:
          </span>
          <button
            onClick={() => setActiveCategory('All')}
            className={categoryButtonClass(selectedCategory === 'All')}
          >
            Tümü
          </button>

          {cityCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={categoryButtonClass(selectedCategory === category.name)}
            >
              {category.plural}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80 group">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gold group-focus-within:text-forest dark:group-focus-within:text-gold transition-colors duration-200">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Bu ilde lezzet ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/55 dark:bg-forest-dark/60 border border-gold/30 dark:border-cream/15 focus:border-forest dark:focus:border-gold focus:ring-1 focus:ring-forest dark:focus:ring-gold outline-none text-sm transition-all duration-200 placeholder-forest-dark/40 dark:placeholder-cream/30 font-medium text-forest-dark dark:text-cream"
          />
        </div>

      </div>

      {/* Foods Grid */}
      <div className="mb-12">
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="text-center py-16 bg-white/50 dark:bg-forest-dark/30 rounded-2xl border border-gold/15 dark:border-cream/10">
            <p className="text-forest-dark/60 dark:text-cream/50 font-medium">
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
