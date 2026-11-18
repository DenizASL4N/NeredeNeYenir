# 🥙 Nerede Ne Yenir | Türkiye Lezzet Haritası
> **Bilingual Documentation:** [English Version](#english-documentation) | [Türkçe Dokümantasyon](#türkçe-dokümantasyon)

---

## Türkçe Dokümantasyon

**Nerede Ne Yenir**, Türkiye'nin 81 ilinin yöresel lezzetlerini, coğrafi işaret kayıtları ve kaynaklarıyla birlikte keşfetmenizi sağlayan bir web uygulamasıdır.

🌐 **Canlı site:** https://nerede-ne-yenir.vercel.app

### 🌟 Öne Çıkan Özellikler
- **81 İl Keşfi:** Arama ve sayfalama özellikleriyle Türkiye'nin tüm illeri.
*   **Doğrulanmış Yemek Listeleri:** 464 yemek; 338'i coğrafi işaretli. Her yemekte kaynak bağlantısı, "Coğrafi İşaretli" rozeti ve "Hata bildir" bağlantısı bulunur. Hazırlık süreci `docs/veri/` klasöründedir.
*   **9 Kategori ve Filtre:** Ana Yemek, Çorba, Hamur İşi, Meze ve Zeytinyağlı, Sokak Lezzeti, Kahvaltılık, Tatlı, İçecek, Yöresel Ürün.
*   **Lisanslı Fotoğraflar:** Tüm fotoğraflar Wikimedia Commons ve Openverse'ten açık lisanslarla alınmıştır; sahibi ve lisansı sayfada ve "Hakkında ve Kaynaklar" sayfasında listelenir. Kendi fotoğrafı bulunamayan yemeklerde "Temsili fotoğraf" ya da "Kategori fotoğrafı" etiketi gösterilir.
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
NeredeNeYenir/
├── dist/                # Derlenmiş, yayına hazır üretim dosyaları
├── public/              # Statik dosyalar (Logolar, favicon, resimler)
│   ├── sehirler/        # 81 ilin kapak fotoğrafları
│   └── yemekler/        # Yüzlerce yemeğin kapak fotoğrafları
├── src/                 # Kaynak kodlar
│   ├── components/      # Ortak arayüz bileşenleri (Navbar, Footer, Arama Kutusu vb.)
│   ├── data/            # Şehir ve yemek verilerinin JSON dosyaları
│   ├── pages/           # Sayfalar (Anasayfa, Şehir, Favoriler, Hakkında, 404)
│   ├── utils/           # Yardımcı fonksiyonlar (Türkçe arama, hata bildirme)
│   ├── App.jsx          # Ana React bileşeni ve durum yönetimi
│   ├── index.css        # Tailwind CSS entegrasyonu ve global stiller
│   └── main.jsx         # DOM montaj noktası
├── docs/                # Veri denetimi, bölge bölge doğrulanmış listeler, ilerleme notu
├── scripts/             # Veri ve fotoğraf işlemleri için Python betikleri
├── package.json         # Proje bağımlılıkları ve npm komutları
├── vercel.json          # Vercel yayın ayarı (tüm adresleri React Router'a yönlendirir)
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
Projeyi derleyip yayındaki haliyle yerel olarak denemek için:
```bash
# Projeyi derle (dist klasörünü üretir)
npm run build

# Derlenmiş siteyi yerel sunucuda aç
npm run preview
```
Sunucu başlatıldıktan sonra tarayıcınızdan **`http://localhost:4173`** adresine giderek uygulamayı test edebilirsiniz.

Proje Vercel'de yayınlanmaya hazırdır: `vercel.json`, tüm adresleri React Router'a yönlendirir.

---

## English Documentation

**Nerede Ne Yenir** (Where to Eat What) is a web application for discovering the regional dishes of Turkey's 81 provinces, together with their geographical indication records and sources.

🌐 **Live site:** https://nerede-ne-yenir.vercel.app

### 🌟 Key Features
- **Explore 81 Cities:** All 81 provinces with search and pagination.
- **Verified Dish Lists:** 464 dishes, 338 of them with a registered geographical indication. Each dish shows its source, a "Geographical Indication" badge and a "report an error" link. The research process is in `docs/veri/`.
- **9 Categories with Filters:** Main dish, soup, pastry, meze, street food, breakfast, dessert, drink and regional product.
- **Licensed Photos:** All photos come from Wikimedia Commons and Openverse under open licenses, credited on each page and on the "About and Sources" page. Dishes without their own photo show a clearly labelled representative or category photo.
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
NeredeNeYenir/
├── dist/                # Compiled production-ready assets
├── public/              # Static files (Logos, favicon, images)
│   ├── sehirler/        # Cover photos of 81 cities
│   └── yemekler/        # Cover photos of hundreds of dishes
├── src/                 # Project source code
│   ├── components/      # UI components (Navbar, Footer, SearchBox, etc.)
│   ├── data/            # JSON data registry for cities and foods
│   ├── pages/           # Pages (Home, City, Favorites, About, 404)
│   ├── utils/           # Helpers (Turkish-aware search, error reports)
│   ├── App.jsx          # Main React component and state management
│   ├── index.css        # Tailwind CSS integration & global styles
│   └── main.jsx         # DOM mounting entry point
├── package.json         # Project dependencies and npm scripts
├── docs/                # Data audit, verified lists per region, progress notes
├── scripts/             # Python scripts for data and photo work
├── vercel.json          # Vercel deployment config (routes all paths to React Router)
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
To build the application and try the production build locally:
```bash
# Build the project (generates the dist folder)
npm run build

# Serve the built site locally
npm run preview
```
Open **`http://localhost:4173`** in your browser to run the production build.

The project is ready to deploy on Vercel: `vercel.json` routes all paths to React Router.

<img width="1919" height="908" alt="Ekran görüntüsü 2026-07-17 213427" src="https://github.com/user-attachments/assets/cfe4d092-eba1-4508-84e4-8bb704703cd0" />
<img width="1919" height="902" alt="Ekran görüntüsü 2026-07-17 213159" src="https://github.com/user-attachments/assets/ae30ba49-54c7-4edc-9e89-452f42f7024d" />
<img width="1918" height="903" alt="Ekran görüntüsü 2026-07-17 213359" src="https://github.com/user-attachments/assets/fadd94ee-fed5-4951-a0fa-ff83b1c8d0da" />
<img width="1577" height="792" alt="Ekran görüntüsü 2026-07-17 214308" src="https://github.com/user-attachments/assets/0225ff8f-ac5a-4dad-b314-609b51be03f6" />
<img width="1788" height="908" alt="Ekran görüntüsü 2026-07-17 213525" src="https://github.com/user-attachments/assets/3fe0b7fe-2bdf-42c3-a13d-8b78b4d75652" />
