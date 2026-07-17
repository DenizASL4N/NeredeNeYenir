import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Edit2, Check, MapPin, Calendar, BookOpen } from 'lucide-react';
import FoodModal from '../components/FoodModal';

export default function Favorites({ favorites, onToggleFavorite, onUpdateNote }) {
  const [editingId, setEditingId] = useState(null);
  const [editNoteText, setEditNoteText] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState(null);

  const handleStartEdit = (favItem) => {
    setEditingId(favItem.id);
    setEditNoteText(favItem.notes || '');
  };

  const handleSaveEdit = (id) => {
    onUpdateNote(id, editNoteText);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleViewDetails = (favItem) => {
    setSelectedFood({
      id: favItem.id,
      name: favItem.name,
      category: favItem.category,
      image: favItem.image,
      history: favItem.history
    });
    setSelectedCityName(favItem.cityName);
  };

  return (
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div class="border-b border-gold/20 dark:border-cream/10 pb-6 mb-10 text-center md:text-left">
        <h1 class="text-3xl sm:text-5xl font-bold font-montserrat text-forest dark:text-cream mb-2">
          Favori Lezzetlerim
        </h1>
        <p class="text-sm sm:text-base text-forest-dark/70 dark:text-cream/50 font-serif italic">
          Keşfettiğiniz, beğendiğiniz ve kendi özel notlarınızı eklediğiniz tarihi lezzetlerin listesi.
        </p>
      </div>

      {favorites.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              class="bg-white dark:bg-forest-dark/80 rounded-3xl overflow-hidden border border-gold/15 dark:border-cream/10 food-card-shadow flex flex-col sm:flex-row h-full transition-all duration-300"
            >
              
              {/* Card Image */}
              <div
                onClick={() => handleViewDetails(fav)}
                class="w-full sm:w-2/5 relative min-h-[160px] sm:min-h-full cursor-pointer overflow-hidden group"
              >
                <img
                  src={fav.image}
                  alt={fav.name}
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Mobile overlay for Category */}
                <span class="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-forest-dark/80 text-forest dark:text-cream border border-gold/20 dark:border-cream/10 shadow-sm">
                  {fav.category}
                </span>
              </div>

              {/* Card Body */}
              <div class="w-full sm:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  
                  {/* Top tags */}
                  <div class="flex items-center justify-between text-xs font-bold text-forest/70 dark:text-cream/60 uppercase mb-2">
                    <span class="flex items-center gap-1">
                      <MapPin size={12} className="text-gold" />
                      {fav.cityName}
                    </span>
                    <span class="text-gold font-semibold">{fav.category}</span>
                  </div>

                  {/* Food Name */}
                  <h3
                    onClick={() => handleViewDetails(fav)}
                    class="font-montserrat text-xl font-bold text-forest-dark dark:text-cream hover:text-forest dark:hover:text-gold transition-colors duration-200 cursor-pointer mb-3 leading-tight"
                  >
                    {fav.name}
                  </h3>

                  {/* History Snippet */}
                  <p class="text-xs text-forest-dark/60 dark:text-cream/50 line-clamp-2 italic mb-4">
                    "{fav.history}"
                  </p>

                  {/* Note Section (CRUD - Read/Update) */}
                  <div class="bg-cream/40 dark:bg-forest-dark/40 border border-gold/10 dark:border-cream/5 rounded-2xl p-4 mt-3">
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="text-[10px] font-bold text-forest/80 dark:text-cream/60 uppercase tracking-widest">
                        Kişisel Notum:
                      </span>
                      
                      {editingId !== fav.id && (
                        <button
                          onClick={() => handleStartEdit(fav)}
                          class="p-1 rounded-md text-forest dark:text-gold hover:bg-gold/10 dark:hover:bg-gold/5 hover:text-gold-dark transition-all duration-200 cursor-pointer"
                          title="Notu Düzenle"
                        >
                          <Edit2 size={12} />
                        </button>
                      )}
                    </div>

                    {editingId === fav.id ? (
                      // Inline Note Editor
                      <div class="space-y-2">
                        <textarea
                          value={editNoteText}
                          onChange={(e) => setEditNoteText(e.target.value)}
                          maxLength={200}
                          class="w-full min-h-[60px] p-2 text-xs rounded-xl bg-white dark:bg-forest-dark/60 border border-gold/30 dark:border-cream/15 focus:border-forest dark:focus:border-gold focus:ring-1 focus:ring-forest dark:focus:ring-gold outline-none text-forest-dark dark:text-cream resize-none transition-all duration-200 font-medium placeholder-forest-dark/40 dark:placeholder-cream/30"
                          placeholder="Bu lezzete ait notlarınızı yazın..."
                        />
                        <div class="flex justify-end gap-1.5">
                          <button
                            onClick={handleCancelEdit}
                            class="p-1 px-2.5 rounded-lg border border-gold/40 dark:border-gold/20 text-[10px] font-bold hover:bg-gold/10 text-forest dark:text-cream cursor-pointer"
                          >
                            İptal
                          </button>
                          <button
                            onClick={() => handleSaveEdit(fav.id)}
                            class="p-1 px-2.5 rounded-lg bg-forest text-cream text-[10px] font-bold flex items-center gap-1 hover:bg-forest-light transition-all duration-200 shadow-sm cursor-pointer"
                          >
                            <Check size={10} />
                            Kaydet
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display Saved Note
                      <div>
                        {fav.notes ? (
                          <p class="text-xs text-forest-dark/85 dark:text-cream/70 italic leading-relaxed">
                            "{fav.notes}"
                          </p>
                        ) : (
                          <p class="text-[11px] text-forest-dark/35 dark:text-cream/25 italic">
                            Eklenmiş bir not bulunmamaktadır. Sağ üstteki simgeden not ekleyebilirsiniz.
                          </p>
                        )}
                        
                        {fav.addedAt && (
                          <div class="flex items-center gap-1 mt-2 text-[9px] text-forest-dark/45 dark:text-cream/35">
                            <Calendar size={8} />
                            <span>
                              Eklendi: {new Date(fav.addedAt).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions (CRUD - Delete / Detail View) */}
                <div class="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-gold/10 dark:border-cream/5">
                  <button
                    onClick={() => handleViewDetails(fav)}
                    class="flex items-center justify-center gap-1.5 text-xs font-bold text-forest dark:text-gold hover:underline cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>Hikaye Detayı</span>
                  </button>

                  <button
                    onClick={() => onToggleFavorite({ id: fav.id })}
                    class="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-bold transition-all duration-200 group/del cursor-pointer"
                    title="Favorilerden Kaldır"
                  >
                    <Trash2 size={13} className="group-hover/del:scale-110 transition-transform" />
                    <span>Kaldır</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <div class="text-center py-20 bg-white/40 dark:bg-forest-dark/30 border border-gold/15 dark:border-cream/10 rounded-3xl max-w-lg mx-auto">
          <Heart size={48} className="mx-auto text-gold/60 mb-4" />
          <h3 class="text-xl font-bold font-montserrat text-forest dark:text-cream mb-2">Henüz favori lezzetiniz yok</h3>
          <p class="text-xs sm:text-sm text-forest-dark/65 dark:text-cream/45 px-6 leading-relaxed mb-6">
            Şehirlerin detay sayfalarını gezerek beğendiğiniz yemekleri ve hikayeleri kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.
          </p>
          <Link
            to="/"
            class="inline-flex items-center gap-2 px-6 py-3 bg-forest text-cream font-bold rounded-xl shadow-md hover:bg-forest-light transition-all duration-200"
          >
            Lezzetleri Keşfet
          </Link>
        </div>
      )}

      {/* Detail Modal Overlay */}
      {selectedFood && selectedCityName && (
        <FoodModal
          food={selectedFood}
          cityName={selectedCityName}
          isFavorite={!!favorites.find((f) => f.id === selectedFood.id)}
          favoriteItem={favorites.find((f) => f.id === selectedFood.id)}
          onToggleFavorite={(f, cName, note) => onToggleFavorite(f, cName, note)}
          onUpdateNote={onUpdateNote}
          onClose={() => {
            setSelectedFood(null);
            setSelectedCityName(null);
          }}
        />
      )}

    </div>
  );
}
