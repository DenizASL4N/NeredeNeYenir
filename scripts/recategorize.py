import json, glob, re, collections, sys

# Explicit category for a food, keyed by name (applies in every city)
OVERRIDES = {
    'Tatlı': ['Katmer', 'Cennet Çamuru', 'Kerebiç', 'Gerebiç', 'Hamsiköy Sütlacı', 'İzmir Lokması',
              'İncir Uyutması', 'İncir Uyuşturması', 'Orcik (Cevizli Sucuk)', 'Halveter', 'Pestil ve Köme',
              'Tosunum', 'Köftür', 'Yalvaç Güllacı', 'Burdur Muhallebisi', 'İzmit Pişmaniyesi', 'Cezerye',
              'Kanlıca Yoğurdu', 'Laz Böreği', 'Şerbetli Pide', 'Süt Böreği'],
    'Çorba': ['Beyran', 'Yuvalama (Yuvalça)', 'Arabaşı', 'Analı Kızlı', 'Kesme Aşı', 'Mastuva'],
    'Hamur İşi': ['Amasya Çöreği', 'Beypazarı Kurusu', 'Hınkal', 'Paşa Böreği', 'Gazel Böreği', 'Cantık',
                  'Yen Böreği', 'Gömbe (Kömbe)', 'Kete', 'Su Böreği', 'Haşhaşlı Çörek', 'Siron',
                  'Sütlü Siron (Sütlü Pita)', 'Sarıyer Böreği', 'Yozgat Böreği', 'Etli Ekmek',
                  'Kocaeli Simidi (Kandıra Simidi)', 'Samsun Simidi', 'Nokul', 'Bayram Kömbesi', 'Kiliçe',
                  'Sembusek', 'Şam Böreği', 'Tandır Ekmeği', 'Hıtap', 'İnce Ekmek Muskası', 'Lahmacun',
                  'Sorina Pel', 'Peruhi', 'Cizleme'],
    'Kahvaltılık': ['Kuymak', 'Muhlama (Mıhlama)', 'Van Kahvaltısı', 'Murtuğa', 'Sucuklu Yumurta',
                    'Çakallı Menemeni', 'Sakarca Mıhlaması', 'Guymak'],
    'İçecek': ['Rize Çayı', 'Vefa Bozası', 'Kırklareli Bozası', 'Hardaliye', 'Ravanda Şerbeti'],
    'Yöresel Ürün': ['Afyon Sucuğu', 'Beyaz Bal', 'Leblebi', 'Pastırma', 'Değirmendere Fındığı', 'Yer Fıstığı',
                     'Kestane', 'Zile Pekmezi', 'Kars Gravyeri', 'Eski Kaşar Peyniri', 'Otlu Peynir',
                     'Dağ Eriği Ekşisi', 'Çedeneli Kavurga'],
    'Sokak Lezzeti': ['Kumru', 'Şırdan Dolması', 'Susurluk Tostu (ve Ayranı)'],
    'Ana Yemek': ['Pideli Köfte', 'Kaburga Dolması', 'İskilip Dolması', 'Soğan Dolması', 'Döş Dolması',
                  'Sazan Dolması', 'Ciğer Sarma', 'Elma Dolması'],
}
BY_NAME = {name: cat for cat, names in OVERRIDES.items() for name in names}
HAMUR = re.compile(r'mantı|pide|börek|bükme|çibörek|boyoz|hangel|haluj|cızlama|lor dolması', re.I)
VALID = {'Ana Yemek', 'Çorba', 'Hamur İşi', 'Meze ve Zeytinyağlı', 'Sokak Lezzeti', 'Kahvaltılık',
         'Tatlı', 'İçecek', 'Yöresel Ürün'}

def new_category(food):
    name, old = food['name'], food['category']
    if name in BY_NAME:
        return BY_NAME[name]
    if old == 'Aperatif':
        return 'Hamur İşi' if HAMUR.search(name) else 'Meze ve Zeytinyağlı'
    if old == 'Meze':
        return 'Meze ve Zeytinyağlı'
    return old

used = set(); moves = collections.Counter(); counts = collections.Counter()
for path in sorted(glob.glob('src/data/cities/*.json')):
    raw = open(path, encoding='utf-8').read()
    data = json.loads(raw)
    for food in data['yemekler']:
        cat = new_category(food)
        assert cat in VALID, (path, food['name'], cat)
        if food['name'] in BY_NAME: used.add(food['name'])
        if cat != food['category']:
            moves[(food['category'], cat)] += 1
            food['category'] = cat
        counts[cat] += 1
    if '--write' in sys.argv:
        open(path, 'w', encoding='utf-8', newline='\n').write(json.dumps(data, ensure_ascii=False, indent=2) + ('\n' if raw.endswith('\n') else ''))

missing = set(BY_NAME) - used
print('Eşleşmeyen isimler:', missing or 'yok')
print('Yeni dağılım:', counts.most_common())
for (a, b), n in sorted(moves.items(), key=lambda x: -x[1]): print(f'  {a} -> {b}: {n}')
