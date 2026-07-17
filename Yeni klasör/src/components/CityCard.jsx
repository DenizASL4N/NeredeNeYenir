import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function CityCard({ id, name, title, image }) {
  return (
    <Link
      to={`/sehir/${id}`}
      class="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-forest-dark flex flex-col justify-end p-6 food-card-shadow transition-all duration-500 hover:-translate-y-1.5 border border-gold/10 dark:border-cream/5"
    >
      {/* Background Landscape Image */}
      <img
        src={image}
        alt={name}
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-80"
        loading="lazy"
      />
      
      {/* Gradient Overlay */}
      <div class="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/45 to-transparent opacity-90 group-hover:opacity-85 transition-opacity duration-300" />
      
      {/* Decorative Gold Border on Hover */}
      <div class="absolute inset-4 border border-gold/0 group-hover:border-gold/30 rounded-xl transition-all duration-500 pointer-events-none" />

      {/* Content */}
      <div class="relative z-10">
        <div class="flex items-center space-x-1.5 text-gold text-xs font-bold uppercase tracking-wider mb-1.5">
          <MapPin size={12} />
          <span>{name}</span>
        </div>
        
        <h3 class="text-2xl font-bold font-montserrat text-cream mb-1 group-hover:text-gold transition-colors duration-300">
          {name}
        </h3>
        
        <p class="text-xs text-cream/80 font-medium line-clamp-1 italic tracking-wide">
          "{title}"
        </p>
        
        <div class="mt-4 pt-3 border-t border-cream/10 flex items-center justify-between text-xs text-cream/60">
          <span class="font-bold text-gold group-hover:translate-x-1.5 transition-transform duration-300">
            Kültürünü İncele &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
