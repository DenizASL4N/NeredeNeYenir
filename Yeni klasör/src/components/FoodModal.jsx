import React from 'react';
import { X } from 'lucide-react';
import FoodDetail from './FoodDetail';

export default function FoodModal({ food, cityName, isFavorite, favoriteItem, onToggleFavorite, onUpdateNote, onClose }) {
  return (
    <div 
      onClick={onClose}
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/50 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()} // Stop closing on clicking inside modal
        class="relative w-full max-w-4xl bg-[#F5F2ED] dark:bg-[#162B20] rounded-3xl overflow-hidden shadow-2xl border border-gold/20 dark:border-cream/10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          class="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest-dark/10 dark:bg-cream/10 hover:bg-forest-dark/20 dark:hover:bg-cream/20 text-forest-dark dark:text-cream transition-colors duration-200 cursor-pointer"
          title="Kapat"
        >
          <X size={20} />
        </button>

        {/* Modular Food Detail Content */}
        <FoodDetail
          food={food}
          cityName={cityName}
          isFavorite={isFavorite}
          favoriteItem={favoriteItem}
          onToggleFavorite={onToggleFavorite}
          onUpdateNote={onUpdateNote}
        />

      </div>
    </div>
  );
}
