# 🥙 Nerede Ne Yenir | Türkiye Lezzet Haritası
> **Bilingual Documentation:** [English Version](#english-documentation) | [Türkçe Dokümantasyon](#türkçe-dokümantasyon)

---

## Türkçe Dokümantasyon

**Nerede Ne Yenir**, Türkiye'nin 81 ilinin zengin gastronomi kültürünü, yöresel lezzetlerini ve bu lezzetlerin asırlık hikayelerini interaktif bir şekilde keşfetmenizi sağlayan modern bir web uygulamasıdır. 

Proje, modern web standartları ve duyarlı (responsive) tasarım prensipleri göz önünde bulundurularak geliştirilmiştir.

### 🌟 Öne Çıkan Özellikler
- **81 İl Keşfi:** Arama ve sayfalama özellikleriyle Türkiye'nin tüm illerini ve her ilin kendine özgü hikayesini içeren arayüz.
*   **Detaylı İl & Yemek Sayfaları:** İllere tıklandığında o ile ait meşhur lezzetler, tatlılar ve doğuş hikayeleri.
*   **Favorilerim Sistemi (CRUD):** 
    *   **Ekle:** Beğendiğiniz yemekleri favorilere ekleme.
    *   **Listele:** Tüm beğendiğiniz yemekleri favori listesinde görüntüleme.
    *   **Güncelle:** Favorilere eklediğiniz her yemek için kişisel notlar ekleme/düzenleme.
    *   **Sil:** Beğenmekten vazgeçtiğiniz yemekleri listeden kaldırma.
*   **LocalStorage Entegrasyonu:** Favoriler ve tema tercihleri tarayıcı hafızasında saklanır, sayfa yenilense de kaybolmaz.
*   **Gece/Gündüz Modu (Dark Mode):** Göz yormayan, modern koyu tema desteği.
*   **%100 Mobil Uyumlu:** Telefon, tablet ve masaüstü ekranlarında kusursuz görüntülenen esnek arayüz tasarımı.

### 🛠️ Kullanılan Teknolojiler
- **Kütüphane:** ReactJS (v19)
- **Paketleme / Derleme:** Vite (v8)
- **Tasarım / Stil:** Tailwind CSS (v4)
- **Yönlendirme:** React Router DOM (v7)
- **İkonlar:** Lucide React

### 📁 Proje Klasör Yapısı
```text
Yeni klasör/
├── dist/                # Derlenmiş, yayına hazır üretim dosyaları
├── public/              # Statik dosyalar (Logolar, favicon, resimler)
│   ├── sehirler/        # 81 ilin kapak fotoğrafları
│   └── yemekler/        # Yüzlerce yemeğin kapak fotoğrafları
├── src/                 # Kaynak kodlar
│   ├── components/      # Ortak arayüz bileşenleri (Navbar, Footer, Arama Kutusu vb.)
│   ├── data/            # Şehir ve yemek verilerinin JSON dosyaları
│   ├── pages/           # Sayfa yapıları (Anasayfa, Detay Sayfası, Favoriler)
│   ├── interfaces/      # Tip ve veri modeli şablonları
│   ├── App.jsx          # Ana React bileşeni ve durum yönetimi
│   ├── index.css        # Tailwind CSS entegrasyonu ve global stiller
│   └── main.jsx         # DOM montaj noktası
├── serve.py             # Windows MIME-type uyumluluğuna sahip yerel sunucu script'i
├── package.json         # Proje bağımlılıkları ve npm komutları
└── vite.config.js       # Vite konfigürasyonu
```

### 🚀 Çalıştırma Yöntemleri

#### Geliştirme Ortamı (Development)
Bağımlılıkları kurup geliştirme sunucusunu başlatmak için:
```bash
npm install
npm run dev
```

#### Yayına Hazırlama ve Çalıştırma (Production)
Projeyi derleyip, Windows'taki MIME-type hatalarını otomatik olarak aşan yerel sunucu ile çalıştırmak için:
```bash
# Projeyi derle (dist klasörünü üretir)
npm run build

# Yerel sunucuyu başlat
python serve.py
```
Sunucu başlatıldıktan sonra tarayıcınızdan **`http://localhost:8000`** adresine giderek uygulamayı test edebilirsiniz.

---

## English Documentation

**Nerede Ne Yenir** (Where to Eat What) is a modern web application that allows users to interactively discover the rich gastronomic culture, regional dishes, and centuries-old stories of Turkey's 81 cities.

The project is developed keeping modern web standards and responsive design principles in mind.

### 🌟 Key Features
- **Explore 81 Cities:** Interactive UI showcasing all 81 cities with advanced search and pagination features.
- **Detailed City & Food Pages:** Famous dishes, desserts, and the historical origin stories of each city.
- **My Favorites System (CRUD):**
  - **Create:** Bookmark/like dishes to save them in favorites.
  - **Read/List:** Browse all favorited items in a single list.
  - **Update:** Add and edit personalized notes for each favorited dish.
  - **Delete:** Remove dishes from the favorites list.
- **LocalStorage Integration:** Favorites and light/dark theme preferences persist in the browser storage.
- **Dark/Light Mode:** Seamless transition between dark and light modes.
- **Responsive Layout:** 100% mobile-friendly design adapting perfectly to mobile, tablet, and desktop viewports.

### 🛠️ Tech Stack
- **Library:** ReactJS (v19)
- **Bundler / Build Tool:** Vite (v8)
- **Styling:** Tailwind CSS (v4)
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React

### 📁 Project Folder Structure
```text
Yeni klasör/
├── dist/                # Compiled production-ready assets
├── public/              # Static files (Logos, favicon, images)
│   ├── sehirler/        # Cover photos of 81 cities
│   └── yemekler/        # Cover photos of hundreds of dishes
├── src/                 # Project source code
│   ├── components/      # UI components (Navbar, Footer, SearchBox, etc.)
│   ├── data/            # JSON data registry for cities and foods
│   ├── pages/           # Page components (Home, CityDetail, Favorites)
│   ├── interfaces/      # Type and data model definitions
│   ├── App.jsx          # Main React component and state management
│   ├── index.css        # Tailwind CSS integration & global styles
│   └── main.jsx         # DOM mounting entry point
├── serve.py             # Custom server script bypassing Windows MIME-type bugs
├── package.json         # Project dependencies and npm scripts
└── vite.config.js       # Vite configuration
```

### 🚀 Running the Project

#### Development Environment
To install dependencies and start the development server:
```bash
npm install
npm run dev
```

#### Building and Running in Production
To build the application and run it on a local server that automatically bypasses Windows registry MIME-type errors:
```bash
# Build the project (generates the dist folder)
npm run build

# Start the safe custom python server
python serve.py
```
Open **`http://localhost:8000`** in your browser to run the production build.
