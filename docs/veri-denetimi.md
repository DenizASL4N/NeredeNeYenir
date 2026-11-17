# Veri Denetimi: Nerede Ne Yenir

Bu belge, sitedeki 81 il ve 405 yemeğin incelenmesinden çıkan **yapılacaklar listesidir**. 1. aşamada teknik düzeltmeler yapılır, 2. aşamada bu listedeki her madde bölge bölge kaynaklarla doğrulanıp veriye işlenir.

Son güncelleme: 17 Kasım 2026

> **Durum (17 Kasım 2026): Bu liste uygulandı.** 81 ilin yemekleri kaynaklarla yeniden kuruldu (405 → 464 kayıt; 338'i coğrafi işaretli, 347'si kaynaklı). Kesinleşen listeler `docs/veri/` altındaki bölge dosyalarındadır ve aşağıdaki ön taramanın yerini alır. Google kaynaklı tüm görseller kaldırıldı; yerine Wikimedia Commons'tan serbest lisanslı 132 yemek ve 81 şehir fotoğrafı kondu (fotoğrafçı ve lisans bilgisiyle). Uygun fotoğraf bulunamayan yemeklerde "fotoğraf hazırlanıyor" görseli gösteriliyor. İlerleme notu: `docs/veri/ILERLEME.md`.

## Kaynaklar

Doğrulamada şu kaynaklar esas alınacak:

1. **TÜRKPATENT Coğrafi İşaretler Portalı**: https://ci.turkpatent.gov.tr. Devletin resmi tescil listesi, 2026 itibarıyla 1.912 tescilli ürün içeriyor. Ürünler il ve ürün grubuna göre filtrelenebilir ("Yemekler ve çorbalar", "Fırıncılık ve pastacılık mamulleri, hamur işleri, tatlılar" vb.).
2. **Kültür ve Turizm Bakanlığı, Türkiye Kültür Portalı**: her il için "Ne Yenir" sayfası, örneğin https://www.kulturportali.gov.tr/turkiye/gaziantep/neyenir
3. İl kültür ve turizm müdürlüklerinin yayınları, akademik gastronomi çalışmaları (DergiPark)

> Not: Bu listedeki öneriler, kaynaklar toplu olarak okunamadığı için bilgiye dayalı bir ön taramadır. **❓ işaretli her madde, veriye işlenmeden önce yukarıdaki kaynaklardan teyit edilmelidir.** "Cİ" ile işaretlenenlerin coğrafi işaretli olduğu biliniyor, tescil adı yine de portaldan kontrol edilecek.

## İşaretler

| İşaret | Anlamı |
|---|---|
| ✅ | Doğru, kalabilir |
| 🏷️ | Doğru ama kategorisi yanlış |
| ❓ | Şüpheli, kaynaktan doğrulanmalı |
| ❌ | Çıkarılmalı veya başka bir kayıtla birleştirilmeli |
| ➕ | Eklenmesi önerilen |
| Cİ | Coğrafi işaretli |

---

## Genel sorunlar

### 1. Her ilde tam 5 yemek var
Veri büyük ihtimalle otomatik üretilmiş. Yemek sayısı ile ilin mutfak zenginliği orantılı olmalı: Gaziantep'te onlarca, bazı illerde 3-4 yemek olabilir. **"Her ilde 5 yemek" kuralı kaldırılacak.**

### 2. Kategori sistemi
Şu anki dağılım: Ana Yemek 261, Tatlı 59, Aperatif 46, Çorba 26, Meze 9, Sokak Lezzeti 4. Çay, boza, bal, fındık gibi ürünler bile "Ana Yemek" yazılmış.

**Yeni kategoriler (1. aşamada uygulanır):**

| Kategori | Örnek |
|---|---|
| Ana Yemek | Kebaplar, köfteler, sulu yemekler, pilavlar |
| Çorba | Beyran, Tarhana, Toyga |
| Hamur İşi | Mantı, börek, pide, çörek, gözleme |
| Meze ve Zeytinyağlı | Dolma, sarma, piyaz, ezme |
| Sokak Lezzeti | Tantuni, kumru, ciğer, kokoreç |
| Kahvaltılık | Kuymak, Murtuğa, Van Kahvaltısı |
| Tatlı | Baklava, helva, lokum, dondurma |
| İçecek | Çay, boza, şalgam, hardaliye, ayran |
| Yöresel Ürün | Peynir, bal, pekmez, sucuk, pastırma, fındık, meyve |

### 3. Birden fazla ilde geçen yemekler
Ortak bölge yemekleri birden fazla ilde olabilir (Keşkek, Kuymak, Pumpum Çorbası). Aşağıdakiler ise şüpheli:

- ❓ **Testi Kebabı** (Burdur, Yozgat): Nevşehir/Kırşehir ile özdeşleşmiş
- ❓ **Sırık Kebabı** (Sinop): Çorum'da da var, Sinop'taki teyit edilmeli
- ❓ **Etli Ekmek** (Kastamonu): Konya ile özdeşleşmiş (Cİ)
- ❓ **İncir Uyutması** (Yozgat): Aydın tatlısı
- ❓ **İncir Uyuşturması** (Sinop): adı ve yeri teyit edilmeli
- ❓ **Kuymak** (Iğdır): Karadeniz yemeği
- ❓ **Sızgıt** (Nevşehir): Kırıkkale/Kırşehir ile teyit edilmeli
- ❌ **Babuko + Zerefet (Babuko)** (Tunceli): aynı ilde iki kayıt, birleştirilmeli

### 4. Görseller
Görseller Google'dan ekran görüntüsü ve indirme yoluyla toplanmış. Bu yüzden:

- **9 dosya resim değil** (yanlışlıkla web sayfası olarak indirilmiş) ve sitede görünmüyor: Van ve Hakkari kapak fotoğrafları; Feselli (Ardahan), İncir Uyutması (Aydın, Yozgat), Ciğer Sarma (Edirne, Tekirdağ), Çiğ Köfte (Şanlıurfa). Çerkez Tavuğu (Düzce) WebP formatında, çalışıyor ama uzantısı tutarsız.
- **20 grup farklı yemek aynı fotoğrafı kullanıyor**, örneğin Sinop Mantısı = Kelle Tatlısı, Beyaz Baklava = Beyaz Bal, Bat = Akçaabat Köftesi, Abdigor Köftesi = Yalova Köftesi.
- **158 yemek fotoğrafı düşük çözünürlükte** (kısa kenarı 400 pikselden küçük).
- **6 yemek** başka bir siteden (Unsplash) canlı bağlantıyla geliyor ve genel stok fotoğrafı.
- **Telif hakkı:** Google'dan alınan fotoğrafların kullanım izni yok. Site herkese açık olduğu için hepsi lisanslı kaynaklarla (Wikimedia Commons, Unsplash, Pexels, kendi çekimler) değiştirilmeli ve fotoğrafçı adı belirtilmeli. Uygun fotoğraf yoksa yanlış fotoğraf yerine "fotoğraf yok" görseli kullanılmalı.

### 5. Açıklamalar
405 açıklama akıcı ama kaynaksız. Tarihî iddialar ("Osmanlı saray mutfağından gelir", "asırlık efsane" vb.) uydurma olabilir. 2. aşamada her açıklama kaynakla kontrol edilecek, doğrulanamayan iddialar çıkarılacak ve her yemeğe kaynak alanı eklenecek.

---

## İl il liste

### Akdeniz Bölgesi

**Adana**
- ✅ Adana Kebap (Cİ), Yüzük Çorbası, Karakuş Tatlısı
- 🏷️ Şırdan Dolması → Sokak Lezzeti
- ✅ Bici Bici (Tatlı)
- ➕ Şalgam Suyu (İçecek), Ciğer Kebabı, Cartlak Kebabı

**Antalya**
- ✅ Tahinli Piyaz, Hibeş (Meze ve Zeytinyağlı)
- ❓ Yörük Kebabı, Yanık Dondurma
- ✅ Arap Kadayıfı (Tatlı)
- ➕ Serpme Börek? ❓, Turunç Reçeli (Yöresel Ürün) ❓, Antalya Şiş Köfte ❓

**Burdur**
- ✅ Burdur Şiş (Cİ), Ceviz Ezmesi (Cİ, Tatlı)
- ❌ Testi Kebabı (Nevşehir/Kırşehir yemeği)
- ❓ Gazel Böreği, Burdur Muhallebisi (kategori: Tatlı)

**Hatay**
- ✅ Tepsi Kebabı, Kağıt Kebabı, Oruk, Antakya Künefesi (Cİ, Tatlı)
- ❓ Belen Tavası
- ➕ Humus, Muhammara (Cevizli Biber), Haytalı (Tatlı), Kaytaz Böreği, Sürk Peyniri (Yöresel Ürün). Hatay, coğrafi işarette en zengin illerden; liste portaldan genişletilmeli.

**Isparta**
- ✅ Isparta Fırın Kebabı (Cİ)
- ❓ Sazan Dolması (Eğirdir), Dirgit, Yalvaç Güllacı (kategori: Tatlı), İrmik Çorbası
- ➕ Gül Reçeli / Gül Lokumu (Yöresel Ürün / Tatlı)

**Kahramanmaraş**
- ✅ Eli Böğründe, Maraş Tarhanası (Cİ, Çorba), Maraş Dondurması (Cİ, Tatlı)
- ❓ Maraş Paçası
- 🏷️ Ravanda Şerbeti → İçecek ❓
- ➕ Maraş Biberi (Cİ, Yöresel Ürün), Kesme Dolma ❓

**Mersin**
- ✅ Tantuni (Cİ, Sokak Lezzeti), Cezerye (Cİ, Tatlı)
- 🏷️ Kerebiç → Tatlı
- ❓ Batırık, Tarsus Kebabı
- ➕ Tarsus Şalgamı (İçecek) ❓, Tarsus Humusu ❓

**Osmaniye**
- 🏷️ Yer Fıstığı → Yöresel Ürün (Cİ)
- ❓ Tirşik Çorbası, Bayram Kömbesi (Hamur İşi), Teleme, Tutmaç Çorbası

### Ege Bölgesi

**Afyonkarahisar**
- ✅ Kaymaklı Ekmek Kadayıfı (Tatlı), İlibada Sarması (Meze ve Zeytinyağlı)
- 🏷️ Afyon Sucuğu → Yöresel Ürün (Cİ)
- 🏷️ Haşhaşlı Bükme → Hamur İşi
- ❓ Çullama Köfte
- ➕ Afyon Kaymağı (Cİ), Afyon Lokumu (Cİ)

**Aydın**
- ✅ Çine Köftesi
- 🏷️ İncir Uyutması → Tatlı
- ❓ Aydın Keşkeki, Paşa Böreği, Yuvarlama
- ➕ Aydın İnciri (Cİ, Yöresel Ürün), Aydın Kestanesi ❓

**Denizli**
- ✅ Denizli Kebabı (Cİ)
- ❓ Yen Böreği, Çaput Aşı, Biber Tatarı
- ❌ "Kale Baklavası / Zafer Gazozu" tek kayıt olmamalı: iki ayrı ürün, ikisi de teyit edilmeli

**İzmir**
- ✅ İzmir Köfte, Şambali (Tatlı)
- 🏷️ Kumru → Sokak Lezzeti; Boyoz → Hamur İşi (Cİ); İzmir Lokması → Tatlı
- ➕ Tire Köftesi (Cİ), İzmir Gevreği (Hamur İşi), Midye Dolma (Sokak Lezzeti)

**Kütahya**
- ✅ Cimcik Mantı (Hamur İşi), Sıkıcık Çorbası
- 🏷️ Tosunum → Tatlı
- ❓ Göveç, Şibit

**Manisa**
- ✅ Manisa Kebabı (Cİ)
- 🏷️ Mesir Macunu (Cİ) → Tatlı
- ❓ Odun Köfte, Kula Güveci, Şekerli Pide
- ➕ Sultaniye Üzümü (Yöresel Ürün), Soma Köftesi ❓

**Muğla**
- ✅ Çökertme Kebabı, Döş Dolması
- ❓ Bodrum Mantısı, Milas Köftesi, Muğla Halkası
- ➕ Muğla Çam Balı (Cİ, Yöresel Ürün), Datça Bademi (Cİ, Yöresel Ürün)

**Uşak**
- ✅ Uşak Tarhanası (Cİ, Çorba), Keşkek
- ❓ Uşak Döndürmesi, Zini Kebabı, Demir Tatlısı

### İç Anadolu Bölgesi

**Aksaray**
- ❓ Sıkma, Aksaray Tavası, Soğan Dolması, Şerbetli Pide (kategori: Tatlı)
- ❓ Bamya Çorbası (Konya ile ortak, teyit edilmeli)

**Ankara**
- ✅ Ankara Tavası, Beypazarı Kurusu (Hamur İşi)
- ❓ Tamtak Tiridi, İnceğiz Çorbası, Uruş Kapama
- ➕ Çubuk Turşusu (Cİ, Yöresel Ürün), Ankara Simidi (Hamur İşi), Beypazarı Güveci ❓

**Çankırı**
- ❓ Sarımsaklı Et, Yaren Güveci, İnce Ekmek Muskası, Çankırı Höşmerimi, Yumurta Tatlısı (ilin tamamı teyit edilmeli)

**Eskişehir**
- ✅ Çibörek (Hamur İşi), Balaban Kebabı, Met Helvası (Tatlı)
- ❓ Sorpa Çorbası, Haşhaşlı Çörek
- ➕ Nuga Helvası ❓

**Karaman**
- ❓ Callı, Arabaşı, Guymak, Batırık, Zerde
- ➕ Divle Obruk Peyniri (Cİ, Yöresel Ürün)

**Kayseri**
- ✅ Kayseri Mantısı (Cİ, Hamur İşi), Kayseri Yağlaması, Nevzine Tatlısı
- 🏷️ Pastırma → Yöresel Ürün (Cİ, AB tescilli)
- ❓ Sucuklu Yumurta (genel bir yemek, ile özgü değil)
- ➕ Kayseri Sucuğu (Cİ, Yöresel Ürün)

**Kırıkkale**
- ❓ Keskin Tavası, Sızgıt, Tuvalak, Yoğurtlu Tarhana, Haside Tatlısı

**Kırşehir**
- ❓ Çullama, Besmeç, Tandırda Çömlek Kebabı, Düğür Çorbası, Ahi Helvası
- ➕ Testi Kebabı ❓ (Burdur'dan taşınabilir)

**Konya**
- ✅ Etli Ekmek (Cİ), Fırın Kebabı (Cİ), Konya Tiridi, Bamya Çorbası, Saç Arası Tatlısı
- ➕ Höşmerim ❓, Bütümet ❓

**Nevşehir**
- ✅ Testi Kebabı
- 🏷️ Köftür → Tatlı
- ❓ Nevşehir Tavası, Ağpakla, Sızgıt

**Niğde**
- ✅ Niğde Tavası
- ❓ Söğürme, Mazaklı, Halveter (kategori: Tatlı), Niğde Elma Tatlısı
- ➕ Niğde Gazozu (İçecek), Niğde Elması (Cİ, Yöresel Ürün) ❓

**Sivas**
- ✅ Sivas Köftesi (Cİ), Divriği Pilavı, Peskutan Çorbası, Madımak
- ❓ Kelle Tatlısı (ayrıca fotoğrafı Sinop Mantısı ile aynı)

**Yozgat**
- ✅ Arabaşı (Çorba)
- ❌ İncir Uyutması (Aydın tatlısı)
- ❓ Testi Kebabı, Yozgat Böreği, Çedeneli Kavurga
- ➕ Yozgat Tandırı ❓

### Karadeniz Bölgesi

**Amasya**
- ✅ Keşkek, Bakla Dolması, Toyga Çorbası
- 🏷️ Amasya Çöreği → Hamur İşi
- ❓ Elma Tatlısı
- ➕ Amasya Misket Elması (Cİ, Yöresel Ürün)

**Artvin**
- ✅ Karalahana Sarması, Silor, Laz Böreği (Tatlı)
- 🏷️ Kuymak → Kahvaltılık
- ❓ Kalaco

**Bartın**
- ✅ Amasra Salatası, Pumpum Çorbası
- ❓ Yumurtalı İsput, Pirinçli Mantı, İncir Dondurması

**Bayburt**
- ✅ Bayburt Lor Dolması
- ❓ Yalancı Dolma, Herse, Tatlı Çorba, Süt Böreği

**Bolu**
- ✅ Mengen Pilavı, Abant Kebabı, Kaldırık Dolması
- ❓ Keşli Cevizli Erişte, Saray Helvası

**Çorum**
- ✅ İskilip Dolması (Cİ, Ana Yemek)
- 🏷️ Leblebi → Yöresel Ürün (Cİ)
- ❓ Çorum Mantısı, Sırık Kebabı, Sıkma Baklava

**Düzce**
- ✅ Çerkez Tavuğu
- ❓ İsli Balık, Haluj, Kiremitte Alabalık, Melengücceği Tatlısı

**Giresun**
- ✅ Karalahana Çorbası, Görele Pidesi (Hamur İşi)
- ❓ Hamsili Pilav (Rize/Trabzon ile ortak), Taflan Kavurması, Fındıklı Kadayıf
- ➕ Giresun Tombul Fındığı (Cİ, Yöresel Ürün)

**Gümüşhane**
- ✅ Siron (Cİ, Hamur İşi)
- 🏷️ Pestil ve Köme → Tatlı (Cİ); Kuymak → Kahvaltılık
- ❓ Lemis, Fıtfıt Haşılı

**Karabük**
- ✅ Safranbolu Lokumu (Cİ), Peruhi
- ❓ Kuyu Kebabı, Bükme, Su Böreği
- ➕ Safranbolu Safranı (Cİ, Yöresel Ürün)

**Kastamonu**
- ✅ Banduma, Çekme Helva (Tatlı)
- ❓ Kuyu Kebabı, Etli Ekmek, Simit Tiridi
- ➕ Taşköprü Sarımsağı (Cİ, Yöresel Ürün), İhsangazi Siyez Bulguru ❓

**Ordu**
- 🏷️ Yağlı Ordu Pidesi → Hamur İşi
- ❓ Melocan Kavurması, Sakarca Mıhlaması, Galdirik Kavurması, Fırın Fasulye

**Rize**
- ✅ Hamsili Pilav, Pepeçura (Tatlı)
- 🏷️ Muhlama → Kahvaltılık; Rize Çayı → İçecek (Cİ)
- ❓ Rize Kavurması
- ➕ Laz Böreği (Tatlı)

**Samsun**
- ✅ Bafra Pidesi (Cİ, Hamur İşi), Çakallı Menemeni
- 🏷️ Nokul → Hamur İşi (Bafra Nokulu, Cİ ❓)
- ❓ Samsun Simidi, Kıvratma Tatlısı

**Sinop**
- ✅ Sinop Mantısı (Hamur İşi), Nokul
- ❓ Sırık Kebabı, İncir Uyuşturması
- 🏷️ Kestane → Yöresel Ürün ❓

**Tokat**
- ✅ Tokat Kebabı (Cİ), Bat, Tokat Yaprağı Sarması, Keşkek
- 🏷️ Zile Pekmezi → Yöresel Ürün (Cİ)

**Trabzon**
- ✅ Akçaabat Köftesi (Cİ), Karalahana Çorbası, Laz Böreği (Tatlı)
- 🏷️ Kuymak → Kahvaltılık; Hamsiköy Sütlacı → Tatlı
- ➕ Vakfıkebir Ekmeği (Cİ, Hamur İşi), Hamsi Tava

**Zonguldak**
- ✅ Pumpum Çorbası
- ❓ Teneke Tavuk, Malay, Uğmaç Çorbası, Beyaz Baklava (fotoğrafı yanlış)

### Marmara Bölgesi

**Balıkesir**
- ✅ Susurluk Tostu ve Ayranı, Höşmerim (Tatlı)
- ❓ Balıkesir Tiridi, Sura, Bigadiç Güveci
- ➕ Ayvalık Tostu (Sokak Lezzeti), Edremit Zeytinyağı (Cİ, Yöresel Ürün)

**Bilecik**
- ✅ Pazaryeri Helvası (Tatlı)
- ❓ Bıldırcın Kebabı, Nohutlu Mantı, Büzme Tatlısı, Dağ Eriği Ekşisi

**Bursa**
- ✅ İskender Kebap (Cİ), Pideli Köfte (Ana Yemek), Kestane Şekeri (Cİ), Kemalpaşa Tatlısı (Cİ)
- 🏷️ Cantık → Hamur İşi
- ➕ İnegöl Köftesi (Cİ), Gemlik Zeytini (Cİ, Yöresel Ürün)

**Çanakkale**
- ✅ Peynir Helvası, Sardalya, Mafiş Tatlısı
- ❓ Biga Köftesi, Melki Mantarı Yemeği
- ➕ Ezine Peyniri (Cİ, Yöresel Ürün)

**Edirne**
- ✅ Tava Ciğer (Cİ, Sokak Lezzeti), Ciğer Sarma, Badem Ezmesi (Cİ, Tatlı), Deva-i Misk Helvası
- ❓ Elbasan Tava
- ➕ Edirne Beyaz Peyniri (Cİ, Yöresel Ürün)

**İstanbul**
- ✅ Sultanahmet Köftesi, Süleymaniye Kuru Fasulyesi
- 🏷️ Kanlıca Yoğurdu → Tatlı/Yöresel Ürün; Vefa Bozası → İçecek
- ❓ Sarıyer Böreği
- ➕ Balık Ekmek, Midye Dolma, Kokoreç (Sokak Lezzeti), Hünkâr Beğendi, Ortaköy Kumpiri, Islak Hamburger. İstanbul listesi baştan kurulmalı.

**Kırklareli**
- ✅ Kırklareli Köftesi (Cİ)
- 🏷️ Hardaliye → İçecek (Cİ); Kırklareli Bozası → İçecek; Eski Kaşar → Yöresel Ürün
- ❓ Sütlü Siron

**Kocaeli**
- ✅ Mancarlı Pide (Hamur İşi), İzmit Pişmaniyesi (Cİ, Tatlı)
- 🏷️ Değirmendere Fındığı → Yöresel Ürün ❓
- ❓ Cızlama, Kandıra Simidi

**Sakarya**
- ✅ Islama Köfte (Cİ), Kabak Tatlısı
- ❓ Dartı, Kara Lahana, Uhut Tatlısı

**Tekirdağ**
- ✅ Tekirdağ Köftesi (Cİ), Peynir Helvası
- ❓ Ciğer Sarma (Edirne ile ortak), Cizleme, Bulama
- ➕ Hayrabolu Tatlısı (Cİ), Malkara Eski Kaşarı (Cİ, Yöresel Ürün)

**Yalova**
- ❓ İlin tamamı teyit edilmeli: Yalova Köftesi (fotoğrafı Abdigor Köftesi ile aynı), Termal Sarma, Milföylü Yalova Kebabı, Pavli, Çırpma

### Doğu Anadolu Bölgesi

**Ağrı**
- ✅ Abdigor Köftesi (fotoğrafı yanlış)
- 🏷️ Beyaz Bal → Yöresel Ürün
- ❓ Selekeli, Gösteberg, Haşıl

**Ardahan**
- ✅ Kaz Eti, Hınkal (Hamur İşi), Kesme Aşı
- ❓ Feselli (görseli bozuk), Elma Dolması
- ➕ Göle Kaşarı (Cİ, Yöresel Ürün)

**Bingöl**
- ✅ Mastuva, Keldoş
- ❓ Sorina Pel, Löl, Çıldır
- ➕ Bingöl Balı (Cİ ❓, Yöresel Ürün)

**Bitlis**
- ✅ Büryan Kebabı (Cİ), Halise
- ❓ Bitlis Köftesi, Katikli Dolma, Şekerali (fotoğrafı yanlış)

**Elazığ**
- ✅ Harput Köftesi, Sırın, Gömbe (Hamur İşi)
- 🏷️ Orcik → Tatlı
- ❓ Lobik Çorbası

**Erzincan**
- ✅ Kesme Çorbası
- ❓ Erzincan Döneri, Kemah Tiridi, Kete, Gasefe Tatlısı
- ➕ Erzincan Tulum Peyniri (Cİ, Yöresel Ürün)

**Erzurum**
- ✅ Cağ Kebabı (Cİ), Çiriş Yemeği, Kadayıf Dolması (Cİ, Tatlı)
- ❓ Aşotu Çorbası, Su Böreği
- ➕ Erzurum Civil Peyniri (Cİ, Yöresel Ürün), Erzurum Ketesi ❓

**Hakkari**
- ❓ İlin tamamı teyit edilmeli: Doğaba, Kemikli Kavurma, Yüksekova Kebabı, Kıris, Lalepet Tatlısı (kapak fotoğrafı da bozuk)

**Iğdır**
- ✅ Bozbaş (Piti)
- ❌ Kuymak (Karadeniz yemeği)
- ❓ Taş Köfte, Lepeli Etli Pilav, Omaç Helvası
- ➕ Iğdır Kayısısı (Cİ, Yöresel Ürün)

**Kars**
- ✅ Kaz Eti ve Pilavı, Hangel (Hamur İşi), Piti
- 🏷️ Kars Gravyeri → Yöresel Ürün (Cİ)
- ❓ Umaç Helvası
- ➕ Kars Kaşarı (Cİ), Kars Balı (Cİ ❓)

**Malatya**
- ✅ Analı Kızlı (Çorba), Kiraz Yaprağı Sarması (Cİ), Kağıt Kebabı (Cİ)
- ❓ Geleli Kebabı
- 🏷️ Kayısı Tatlısı; ➕ Malatya Kayısısı (Cİ, Yöresel Ürün)

**Muş**
- ✅ Muş Köftesi
- ❓ Hez Dolması, Çorti, Kırçıklı Kelem Dolması, Mırtöge

**Tunceli**
- ❌ Babuko ve Zerefet (Babuko): tek kayıtta birleştirilmeli
- 🏷️ Şir → Meze
- ❓ Dersim Mantısı, Halbori

**Van**
- ✅ İnci Kefali, Keledoş, Otlu Peynir (Cİ, Yöresel Ürün)
- 🏷️ Van Kahvaltısı ve Murtuğa → Kahvaltılık
- (kapak fotoğrafı bozuk)

### Güneydoğu Anadolu Bölgesi

**Adıyaman**
- ✅ Adıyaman Çiğ Köftesi
- ❓ Besni Tavası, Meyir Çorbası, Hıtap (Hamur İşi), Tene Helvası

**Batman**
- ❓ İlin tamamı teyit edilmeli: Şam Böreği, Mumbar, Ayran Çorbası, Kaburga Dolması, Tandır Ekmeği

**Diyarbakır**
- ✅ Ciğer Kebabı (Sokak Lezzeti), Meftune, Kaburga Dolması, Burma Kadayıf
- ❓ Nardanaşı
- ➕ Diyarbakır Karpuzu (Cİ, Yöresel Ürün), Lebeniye Çorbası ❓

**Gaziantep**
- ✅ Ali Nazik, Antep Baklavası (Cİ)
- 🏷️ Beyran → Çorba (Cİ); Yuvalama → Çorba; Katmer → Tatlı
- ➕ Gaziantep Lahmacunu, Allı Yeşilli Dolma (Cİ), Simit Kebabı, Küşleme, Firik Pilavı, Malhıta Çorbası, Şiveydiz, Antep Fıstığı (Cİ, Yöresel Ürün), Antep Fıstık Ezmesi (Cİ). Gaziantep, coğrafi işarette Türkiye'nin en zengin ili; liste portaldan genişletilmeli.

**Kilis**
- ✅ Kilis Tavası, Oruk
- 🏷️ Cennet Çamuru → Tatlı; Gerebiç → Tatlı
- ❓ Şıhılmahşi

**Mardin**
- ✅ Kaburga Dolması, Sembusek, İrok, Kiliçe (Hamur İşi), Harire (Tatlı)
- ➕ Ikbebet ❓, Mardin Dövme Kahvesi ❓

**Siirt**
- ✅ Büryan Kebabı (Cİ), Perde Pilavı (Cİ), Kitel
- ❓ İsmeket Köftesi (açıklaması çok kısa), Zerfet
- ➕ Siirt Fıstığı (Cİ, Yöresel Ürün)

**Şanlıurfa**
- ✅ Urfa Kebabı (Cİ), Çiğ Köfte (görseli bozuk), Ciğer Kebabı (Sokak Lezzeti), Şıllık Tatlısı
- 🏷️ Lahmacun → Hamur İşi (şu an "Tatlı" yazıyor)
- ➕ İsot / Urfa Biberi (Cİ, Yöresel Ürün), Mırra (İçecek), Patlıcan Kebabı

**Şırnak**
- ❓ İlin tamamı teyit edilmeli: Kutlık, Serbidev, Hekeheşandi, Kipe, Meyre Çorbası

---

## Uygulama planı

1. **1. aşama (teknik):** bozuk görseller, yeni kategori sistemi ve filtre, açık tema. Bu belgedeki 🏷️ maddeleri burada uygulanır.
2. **2. aşama (veri):** bölge bölge ilerlenir. Her bölgede ❓ maddeler kaynaktan teyit edilir, ❌ maddeler çıkarılır, ➕ maddeler doğrulanıp eklenir, açıklamalar kontrol edilir. Sıra: Güneydoğu → Akdeniz → Ege → Marmara → İç Anadolu → Karadeniz → Doğu Anadolu.
3. **3. aşama (görsel):** lisanslı fotoğraflar, fotoğrafçı bilgisi, WebP'ye dönüştürme.
