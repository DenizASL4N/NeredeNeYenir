"""Give every food still without a photo a representative one, labelled as such.

A food gets either a photo of the same kind of dish (another food's photo or a type photo found by
type_photos.py) or, as a last resort, a photo of its category. Both are marked `gorsel.temsili`;
category photos also get `gorsel.kategori`.

Usage: python apply_types.py <types.json>
"""
import io, json, glob, re, sys, time, urllib.parse, urllib.request
from PIL import Image

UA = 'NeredeNeYenir/1.0 (https://nerede-ne-yenir.vercel.app; github.com/DenizASL4N/NeredeNeYenir)'
TR = str.maketrans('çğıöşüâîû', 'cgiosuaiu')

# Chosen candidate per type in types.json
TYPE_PICK = {
    'kestane_bali': 3, 'tulum_peyniri': 2, 'kasar': 1, 'tava': 1, 'helva': 3, 'zeytinyagi': 1, 'karpuz': 2,
    'elma': 0, 'sarimsak': 1, 'findik': 1, 'cam_fistigi': 1, 'kabak_cekirdegi': 0, 'dut': 5,
    'kivi': 0, 'pirinc': 0, 'fasulye': 3, 'corba': 0, 'kebap': 1, 'borek': 1, 'ekmek': 0, 'lokum': 3,
    'kurabiye': 0, 'humus': 2, 'kaymak': 0, 'pilav': 0, 'dolma': 0, 'sarma': 0, 'pide': 0, 'tatli_serbetli': 0,
    'muhallebi': 0, 'kadayif': 1, 'gozleme': 1, 'yahni': 0, 'guvec': 1, 'tirit': 2, 'kofte_sulu': 0,
    'kurutulmus_kayisi': 0, 'kahve': 2, 'balik': 4,
    'domates': 2, 'seftali': 0, 'salgam': 2, 'limonata': 0, 'tursu': 2,
}

# (pattern on the normalized name, target) - first match wins.
# A target is a type key from TYPE_PICK or "food:<id>" to reuse another food's own photo.
RULES = [
    (r'sihilmahsi', 'dolma'), (r'hitap', 'gozleme'), (r'orcig', 'food:bingol_sivan_dut_pekmezi'), (r'meftune', 'yahni'),
    (r'kestane bal|\bbali\b', 'kestane_bali'),
    (r'tulum peynir', 'tulum_peyniri'), (r'kasar|gravyer', 'kasar'),
    (r'yogur', 'food:afyonkarahisar_manda_yogurdu'), (r'kaymag|darti', 'kaymak'),
    (r'peynir|\bkesi\b|\bsir\b', 'food:edirne_beyaz_peynir'),
    (r'karalahana corba', 'food:giresun_karalahana_corbasi_pancar_corbasi'),
    (r'tarhana', 'food:usak_tarhana_corbasi'),
    (r'meyir|peskutan|lebeni|simindirik|meyre|dogaba', 'food:corum_alaca_yarma_asi'),
    (r'kesme|eriste', 'food:erzincan_kesme_corbasi'),
    (r'testi kebab', 'food:nevsehir_testi_kebabi'), (r'firin kebab|firinagzi', 'food:konya_firin_kebabi'),
    (r'ciger', 'food:edirne_tava_ciger'),
    (r'kavurma|taplama', 'food:bingol_cobantasi_kavurmasi'),
    (r'kebab|kebap', 'kebap'),
    (r'\birok\b|kitel|kutlik|icli', 'food:diyarbakir_icli_kofte'),
    (r'acem koft|tas koft|harput', 'kofte_sulu'),
    (r'kofte', 'food:bursa_inegol_koftesi'),
    (r'\btava|tavasi', 'tava'),
    (r'helva|cirik', 'helva'), (r'lokum|sekerleme|pismaniye', 'lokum'),
    (r'baklava', 'food:corum_corum_baklavasi'), (r'kadayif', 'kadayif'), (r'katmer', 'food:kilis_kilis_katmeri'),
    (r'hosmerim', 'food:balikesir_hosmerim_tatlisi'), (r'dondurma', 'food:giresun_gorele_dondurmasi'),
    (r'kurabiye|ehlibilir|gerebic', 'kurabiye'), (r'haytali|muhallebi|camuru', 'muhallebi'),
    (r'pekmez|bulama|koftur|pestil|harire|herire', 'food:bingol_sivan_dut_pekmezi'),
    (r'zeytinyag', 'zeytinyagi'), (r'karpuz', 'karpuz'), (r'elma', 'elma'), (r'sarimsag', 'sarimsak'),
    (r'findik ezme', 'findik'), (r'cam fistig', 'cam_fistigi'),
    (r'kabak cekirdeg', 'kabak_cekirdegi'), (r'\bdut', 'dut'), (r'kivi', 'kivi'), (r'pirinc', 'pirinc'),
    (r'kayisi', 'food:malatya_malatya_kayisisi'), (r'fasulye', 'fasulye'),
    (r'pastirma', 'food:sivas_sivas_pastirmasi'), (r'sucuk', 'food:afyonkarahisar_afyon_sucugu'),
    (r'kelle', 'food:sivas_sivas_kellesi'), (r'kefal|luferi|balik', 'balik'),
    (r'humus|abugannus|cevizli biber', 'humus'),
    (r'karalahana sarma', 'food:artvin_karalahana_sarmasi'), (r'yaprag', 'food:tokat_tokat_yapragi_sarmasi'),
    (r'sarma|pavli', 'sarma'), (r'dolma', 'dolma'),
    (r'manti|hangel|hinkal|peruhi|cimcik|kaypag|kaypak', 'food:kayseri_kayseri_mantisi'),
    (r'simit|simid', 'food:corum_corum_simidi'), (r'leblebi', 'food:corum_leblebi'), (r'tahinli', 'food:aksaray_aksaray_tahinlisi'),
    (r'pide', 'pide'), (r'borek|bukme|boregi', 'borek'),
    (r'corek|coreg|kombe|gombe|kete|kilice', 'food:nevsehir_kaymakli_coregi'), (r'ekmeg|bazlama', 'ekmek'),
    (r'pilav', 'pilav'), (r'tirit|serbidev|banduma|tiridi', 'tirit'), (r'guvec', 'guvec'), (r'yahni', 'yahni'),
    (r'tost', 'food:balikesir_ayvalik_tostu'), (r'murtuga|kavut', 'food:van_van_kahvaltisi'),
    (r'mirra', 'kahve'), (r'kurutul', 'kurutulmus_kayisi'), (r'domates', 'domates'), (r'beyazi', 'seftali'),
    (r'salgam', 'salgam'), (r'limonata', 'limonata'), (r'tursu', 'tursu'),  (r'gozleme|cizleme', 'gozleme'),
]

CATEGORY_FALLBACK = {
    'Ana Yemek': 'guvec', 'Çorba': 'corba', 'Hamur İşi': 'borek', 'Tatlı': 'tatli_serbetli',
    'Meze ve Zeytinyağlı': 'dolma', 'Kahvaltılık': 'kaymak', 'Sokak Lezzeti': 'kebap',
}


def norm(text):
    return text.lower().replace('i̇', 'i').translate(TR)


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception:
            time.sleep(3 + attempt * 4)
    raise RuntimeError('indirilemedi: ' + url)


def clean_artist(name):
    name = re.sub(r'\s+', ' ', name).strip()
    m = re.match(r'No machine-readable author provided\. (.+?) assumed', name)
    if m:
        return m.group(1)
    m = re.match(r'(?:The )?[Oo]riginal uploader was (.+?) at ', name)
    return (m.group(1) + ' (Vikipedi)') if m else (name[:120] or 'Bilinmiyor')


types = json.load(open(sys.argv[1], encoding='utf-8'))
type_photo = {}


def type_image(key):
    """Download a type photo once and return (path, credit)."""
    if key not in type_photo:
        cand = types[key]['cands'][TYPE_PICK[key]]
        q = urllib.parse.urlencode({'action': 'query', 'titles': cand['title'], 'prop': 'imageinfo', 'iiprop': 'url',
                                    'iiurlwidth': 1200, 'format': 'json', 'formatversion': 2})
        url = json.loads(get('https://commons.wikimedia.org/w/api.php?' + q))['query']['pages'][0]['imageinfo'][0]['thumburl']
        img = Image.open(io.BytesIO(get(url))).convert('RGB')
        img.thumbnail((1200, 1200))
        path = f'public/yemekler/_tur_{key}.webp'
        img.save(path, 'WEBP', quality=80)
        type_photo[key] = ('/' + path.split('public/', 1)[1],
                           {'yazar': clean_artist(cand['artist']), 'lisans': cand['license'], 'kaynak': cand['page']})
        time.sleep(0.3)
    return type_photo[key]


paths = sorted(glob.glob('src/data/cities/*.json'))
all_foods = {f['id']: f for p in paths for f in json.load(open(p, encoding='utf-8'))['yemekler']}
unmatched = []
for path in paths:
    data = json.load(open(path, encoding='utf-8'))
    changed = False
    for food in data['yemekler']:
        if food['image']:
            continue
        name = norm(food['name'])
        target = next((t for pattern, t in RULES if re.search(pattern, name)), None)
        kategori = False
        if target and target.startswith('food:') and not all_foods[target[5:]]['image']:
            target = None
        if not target:
            target = CATEGORY_FALLBACK.get(food['category'])
            kategori = True
        if not target:
            unmatched.append(food['name'])
            continue
        if target.startswith('food:'):
            src = all_foods[target[5:]]
            image, credit = src['image'], dict(src['gorsel'])
            credit.pop('temsili', None)
            credit.pop('kategori', None)
        else:
            image, credit = type_image(target)
            credit = dict(credit)
        credit['temsili'] = True
        if kategori:
            credit['kategori'] = True
        food['image'] = image
        food['gorsel'] = credit
        changed = True
        print(f"{food['name']} -> {target}{' (kategori)' if kategori else ''}")
    if changed:
        open(path, 'w', encoding='utf-8', newline='\n').write(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print('eşleşmeyen:', unmatched)
