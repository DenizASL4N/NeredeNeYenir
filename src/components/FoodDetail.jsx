import { useState } from 'react';
import { Heart, Save, Calendar, BookOpen } from 'lucide-react';

export default function FoodDetail({ food, cityName, isFavorite, favoriteItem, onToggleFavorite, onUpdateNote }) {
  const [note, setNote] = useState(favoriteItem?.notes || '');
  const [isEditing, setIsEditing] = useState(false);
  const [prevFavoriteItem, setPrevFavoriteItem] = useState(favoriteItem);

  // Sync internal note text with favoriteItem when it changes
  if (favoriteItem !== prevFavoriteItem) {
    setPrevFavoriteItem(favoriteItem);
    setNote(favoriteItem?.notes || '');
  }

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (isFavorite) {
      onUpdateNote(food.id, note);
      setIsEditing(false);
    } else {
      onToggleFavorite(food, cityName, note);
    }
  };

  const handleToggle = () => {
    onToggleFavorite(food, cityName, note);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-[#F5F2ED] dark:bg-[#162B20] rounded-3xl overflow-hidden">
      {/* Left: Food Image */}
      <div className="w-full md:w-1/2 relative min-h-[260px] md:min-h-full">
        <img
          src={food.image}
          alt={food.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 via-transparent to-transparent md:hidden" />
        
        {/* Mobile Overlay Title */}
        <div className="absolute bottom-4 left-4 right-4 md:hidden z-10 text-white">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold text-forest-dark">
            {food.category}
          </span>
          <h3 className="text-2xl font-bold font-montserrat mt-1.5 drop-shadow-md">
            {food.name}
          </h3>
        </div>
      </div>

      {/* Right: Info & Notes CRUD */}
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
        <div>
          {/* Header Info */}
          <div className="hidden md:flex items-center justify-between gap-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${
              food.category === 'Tatlı' 
                ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700'
            }`}>
              {food.category}
            </span>
            <span className="text-xs text-forest/80 dark:text-gold font-bold uppercase tracking-wider">
              {cityName}
            </span>
          </div>

          <h3 className="hidden md:block text-3xl font-bold font-montserrat text-forest dark:text-cream mb-4 leading-tight">
            {food.name}
          </h3>

          {/* Historical Story */}
          <div className="mb-6">
            <h5 className="text-xs uppercase tracking-widest text-gold font-bold mb-2 flex items-center gap-1.5">
              <BookOpen size={12} />
              <span>Tarihi Hikayesi</span>
            </h5>
            <p className="text-forest-dark/95 dark:text-cream/85 text-sm md:text-base leading-relaxed font-serif italic border-l-2 border-gold/40 pl-4 py-1">
              {food.history}
            </p>
          </div>
        </div>

        {/* Favorites and Notes Manager (CRUD) */}
        <div className="border-t border-gold/20 dark:border-cream/10 pt-6 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xs uppercase tracking-widest text-forest dark:text-cream font-bold">
              {isFavorite ? 'Favori Notlarım' : 'Favorilere Ekle'}
            </h5>
            
            <button
              onClick={handleToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                isFavorite
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30'
                  : 'bg-forest text-cream border border-forest hover:bg-forest-light'
              }`}
            >
              <Heart size={14} className={isFavorite ? 'fill-current' : ''} />
              <span>{isFavorite ? 'Kaldır' : 'Favorile'}</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveNote} className="space-y-3">
            {isFavorite && !isEditing ? (
              <div className="bg-white/80 dark:bg-forest-dark/50 border border-gold/15 dark:border-cream/10 rounded-2xl p-4 relative">
                {note ? (
                  <p className="text-sm text-forest-dark/80 dark:text-cream/75 italic leading-relaxed pr-8">
                    "{note}"
                  </p>
                ) : (
                  <p className="text-xs text-forest-dark/40 dark:text-cream/30 italic">
                    Henüz bir not eklemediniz...
                  </p>
                )}
                
                {favoriteItem?.addedAt && (
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-forest-dark/50 dark:text-cream/40">
                    <Calendar size={10} />
                    <span>
                      Ekleme: {new Date(favoriteItem.addedAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="absolute top-3 right-3 text-xs text-forest dark:text-gold font-bold hover:underline cursor-pointer"
                >
                  Düzenle
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={
                    isFavorite 
                      ? "Yemekle ilgili notlarınızı buraya yazın..." 
                      : "Bu yemeği favorilerinize eklerken bir not bırakın (opsiyonel)..."
                  }
                  className="w-full min-h-[80px] p-3 text-sm rounded-2xl bg-white dark:bg-forest-dark/60 border border-gold/30 dark:border-cream/15 focus:border-forest dark:focus:border-gold focus:ring-1 focus:ring-forest dark:focus:ring-gold outline-none text-forest-dark dark:text-cream transition-all duration-200 resize-none font-medium placeholder-forest-dark/40 dark:placeholder-cream/30"
                  maxLength={200}
                />
                <div className="flex items-center justify-between text-xs text-forest-dark/50 dark:text-cream/40">
                  <span>{note.length}/200 karakter</span>
                  <div className="flex gap-2">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setNote(favoriteItem?.notes || '');
                        }}
                        className="px-3 py-1.5 rounded-lg border border-gold dark:border-gold/40 text-forest dark:text-cream hover:bg-gold/10 font-medium cursor-pointer"
                      >
                        İptal
                      </button>
                    )}
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-forest text-cream font-bold hover:bg-forest-light transition-colors duration-200 shadow-sm cursor-pointer"
                    >
                      <Save size={12} />
                      <span>{isFavorite ? 'Güncelle' : 'Kaydet ve Ekle'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
