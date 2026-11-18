# Veri ve görsel yenileme: ilerleme notu

Son güncelleme: 17 Kasım 2026

## Tamamlananlar
- Favoriler sayfası her yemeğin güncel bilgisini kendi il dosyasından okuyor (`src/pages/Favorites.jsx`).
- Veri yapısına `cografiIsaret`, `kaynak` ve `gorsel` (yazar, lisans, kaynak) alanları eklendi. Yemek detayında coğrafi işaret rozeti, kaynak bağlantısı ve fotoğraf bilgisi, şehir sayfasında kapak fotoğrafının bilgisi gösteriliyor.
- **81 ilin yemek listesi kaynaklarla yeniden kuruldu.** Bölge dosyaları:
  - `docs/veri/guneydogu.py` (9 il)
  - `docs/veri/akdeniz_ege.py` (16 il)
  - `docs/veri/marmara_icanadolu.py` (24 il)
  - `docs/veri/karadeniz_dogu.py` (32 il)
- **Yemek görselleri:** 7 bölgenin hepsi için Wikimedia Commons'tan seçildi (`docs/veri/gorsel-secimleri.json`, 132 fotoğraf).
- **Şehir kapakları:** 81 ilin hepsi Wikimedia Commons'tan (`scripts/city_covers.py`).

- Kullanılmayan 472 eski (Google kaynaklı) görsel silindi (`scripts/cleanup_images.py`).

- **Fotoğrafsız yemekler dolduruldu (18 Kasım 2026):** Türkçe eklere duyarlı ikinci arama ve Openverse ile 22 yemeğe daha kendi fotoğrafı bulundu (`scripts/candidates2.py`, `scripts/select_images2.py`, `docs/veri/gorsel-secimleri-2.json`). Kalanlara aynı türden bir yemeğin ya da kategorinin lisanslı fotoğrafı atandı ve arayüzde "Temsili fotoğraf" / "Kategori fotoğrafı" olarak etiketlendi (`scripts/type_photos.py`, `scripts/apply_types.py`). Durum: 464 yemekten 150'si kendi fotoğraflı, 261'i temsili, 50'si kategori fotoğraflı, 3'ü fotoğrafsız.
- **Ek arama (18 Kasım 2026):** Google'ın Creative Commons filtresi otomatik aramada robot doğrulamasına takıldı. Bing'in lisans filtresi çalıştı ama yemekle ilgili sonuçlar lisansı doğrulanamayan kişisel bloglardan geldi, kullanılmadı. Commons'taki il mutfak kategorileri ("Cuisine of …", `scripts/commons_categories.py`) 5 yemeğe gerçek fotoğraf, 3 yemeğe daha yakın temsili fotoğraf kazandırdı (`docs/veri/gorsel-secimleri-4.json`). Güncel durum: 155 kendi fotoğraflı, 257 temsili, 49 kategori, 3 fotoğrafsız.

## Kalanlar
- Temsili ve kategori fotoğraflı yemekler için zamanla kendi fotoğraflarını bulmak (Openverse günlük 200 arama sınırıyla devam edilebilir, ya da kendi çekimler).
- Muş, Bayburt, Yalova gibi az kayıtlı illerin listesini resmi portaldan genişletmek.
- Commit ve canlıya alma.

## Yöntem
1. Her il için "coğrafi işaretli yemekleri" web araması → bölge dosyası (`docs/veri/<bolge>.py`).
2. `scripts/apply_region.py` ile veriye yazılır (kalan yemeklerin id'si korunur).
3. `scripts/candidates.py` ile Wikimedia adayları toplanır, dosya adları ve karşılaştırma görseliyle elle seçilir.
4. `scripts/select_images.py` seçilenleri WebP olarak indirir; seçilmeyenlerin eski görselini kaldırır.
5. `scripts/review_sheet.py` ile seçilen fotoğraflar topluca gözden geçirilir. Marka/reklam içeren fotoğraflar elenir.

## Henüz commit edilmedi
Bu oturumdaki değişikliklerin hiçbiri commit edilmedi veya canlıya gönderilmedi.
