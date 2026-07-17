import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CityDetail from './pages/CityDetail';
import Favorites from './pages/Favorites';

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState(() => {
    // Load default theme from LocalStorage or system preference
    const stored = localStorage.getItem('nerede-ne-yenir-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme class to document element on theme change
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('nerede-ne-yenir-theme', theme);
  }, [theme]);

  // Load favorites from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nerede-ne-yenir-favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Favoriler yüklenirken hata oluştu:", e);
    }
  }, []);

  // Save favorites to LocalStorage whenever state changes
  const saveToLocalStorage = (newFavs) => {
    setFavorites(newFavs);
    try {
      localStorage.setItem('nerede-ne-yenir-favorites', JSON.stringify(newFavs));
    } catch (e) {
      console.error("Favoriler kaydedilirken hata oluştu:", e);
    }
  };

  // Toggle favorite (CRUD: Create and Delete)
  const handleToggleFavorite = (food, cityName = '', initialNote = '') => {
    const exists = favorites.find((fav) => fav.id === food.id);
    
    if (exists) {
      // Remove (Delete)
      const updated = favorites.filter((fav) => fav.id !== food.id);
      saveToLocalStorage(updated);
    } else {
      // Add (Create)
      const newFavItem = {
        id: food.id,
        name: food.name,
        category: food.category,
        image: food.image,
        history: food.history,
        cityName: cityName,
        notes: initialNote,
        addedAt: new Date().toISOString()
      };
      const updated = [...favorites, newFavItem];
      saveToLocalStorage(updated);
    }
  };

  // Update Favorite Note (CRUD: Update)
  const handleUpdateNote = (foodId, newNote) => {
    const updated = favorites.map((fav) => {
      if (fav.id === foodId) {
        return { ...fav, notes: newNote };
      }
      return fav;
    });
    saveToLocalStorage(updated);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <div class="flex flex-col min-h-screen bg-cream dark:bg-[#0F1A14] text-forest-dark dark:text-cream/90 transition-colors duration-300">
        {/* Navigation */}
        <Navbar favoritesCount={favorites.length} theme={theme} toggleTheme={toggleTheme} />

        {/* Page Content */}
        <main class="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/sehir/:cityId" 
              element={
                <CityDetail 
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onUpdateNote={handleUpdateNote}
                />
              } 
            />
            <Route 
              path="/favoriler" 
              element={
                <Favorites 
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onUpdateNote={handleUpdateNote}
                />
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
