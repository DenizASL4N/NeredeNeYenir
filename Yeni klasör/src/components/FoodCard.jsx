import React from 'react';
import { Heart, BookOpen } from 'lucide-react';

export default function FoodCard({ food, isFavorite, onToggleFavorite, onViewDetails }) {
  return (
    <div class="group bg-white dark:bg-forest-dark/80 rounded-2xl overflow-hidden food-card-shadow transition-all duration-300 border border-gold/15 dark:border-cream/10 flex flex-col h-full relative">
      
      {/* Favorite Toggle Button on top right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(food);
        }}
        class="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-forest-dark/80 backdrop-blur-sm text-forest dark:text-cream hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-forest-dark hover:scale-110 shadow-sm transition-all duration-300 group/fav"
        title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        aria-label="Favori Ekle/Çıkar"
      >
        <Heart
          size={18}
          className={`transition-all duration-300 ${
            isFavorite ? 'fill-red-500 text-red-500 scale-105' : 'text-forest dark:text-cream group-hover/fav:text-red-500'
          }`}
        />
      </button>

      {/* Image Container */}
      <div 
        onClick={() => onViewDetails(food)}
        class="relative overflow-hidden aspect-[4/3] cursor-pointer"
      >
        <img
          src={food.image}
          alt={food.name}
          class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <span class={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm border ${
          food.category === 'Tatlı' 
            ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700' 
            : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700'
        }`}>
          {food.category}
        </span>
      </div>

      {/* Content */}
      <div class="p-6 flex flex-col flex-grow">
        <h4 
          onClick={() => onViewDetails(food)}
          class="font-playfair text-xl font-bold text-forest-dark dark:text-cream hover:text-forest dark:hover:text-gold cursor-pointer transition-colors duration-200 mb-2 line-clamp-1"
        >
          {food.name}
        </h4>
        
        <p class="text-sm text-forest-dark/70 dark:text-cream/60 line-clamp-3 mb-6 flex-grow leading-relaxed">
          {food.history}
        </p>

        {/* Buttons */}
        <div class="mt-auto pt-4 border-t border-gold/10 dark:border-cream/10 flex items-center justify-between gap-4">
          <button
            onClick={() => onViewDetails(food)}
            class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gold dark:border-gold/50 text-forest dark:text-gold hover:bg-gold/10 dark:hover:bg-gold/5 text-xs font-bold tracking-wider uppercase transition-colors duration-200 w-full"
          >
            <BookOpen size={14} />
            <span>Hikayeyi Oku</span>
          </button>
        </div>
      </div>
    </div>
  );
}
