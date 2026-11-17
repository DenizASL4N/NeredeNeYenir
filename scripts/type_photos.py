"""Search Commons for one representative photo per food type (honey, cheese, tava ...).

Usage: python type_photos.py <out_dir>
Writes <out_dir>/types.json (candidates per type) and <out_dir>/types_XX.jpg contact sheets.
"""
import io, json, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image, ImageDraw, ImageFont

UA = 'NeredeNeYenir/1.0 (https://nerede-ne-yenir.vercel.app; github.com/DenizASL4N/NeredeNeYenir)'
OK_LICENSE = re.compile(r'^(CC0|Public domain|CC BY(-SA)? [0-9.]+|CC BY(-SA)?|PD.*)', re.I)

TYPES = {
    'bal': 'honey jar Turkey', 'kestane_bali': 'chestnut honey', 'tulum_peyniri': 'Tulum peyniri',
    'kasar': 'Kaşar peyniri', 'peynir': 'Turkish cheese plate', 'tava': 'Tepsi tava', 'helva': 'Un helvası',
    'zeytinyagi': 'olive oil bottle glass', 'karpuz': 'watermelon slices', 'elma': 'apples market Turkey',
    'domates': 'tomatoes market Turkey', 'sarimsak': 'garlic bulbs', 'susam': 'sesame seeds', 'findik': 'hazelnuts',
    'cam_fistigi': 'pine nuts', 'kabak_cekirdegi': 'pumpkin seeds roasted', 'dut': 'mulberries white', 'kivi': 'kiwifruit',
    'pirinc': 'rice grains', 'fasulye': 'Kuru fasulye', 'corba': 'Mercimek çorbası', 'kebap': 'Şiş kebap',
    'borek': 'Su böreği', 'ekmek': 'village bread Turkey', 'lokum': 'Lokum Turkish delight', 'kurabiye': 'Un kurabiyesi',
    'humus': 'Hummus plate', 'kaymak': 'Kaymak', 'pilav': 'Pirinç pilavı', 'tursu': 'Turşu', 'zahter': 'Zahter',
    'limonata': 'lemonade glass', 'salgam': 'Şalgam suyu bardak', 'dolma': 'Dolma Turkish', 'sarma': 'Lahana sarması',
    'pide': 'Kıymalı pide', 'tatli_serbetli': 'Şerbetli tatlı', 'muhallebi': 'Muhallebi', 'kadayif': 'Kadayıf',
    'gozleme': 'Gözleme', 'yahni': 'Etli yahni', 'guvec': 'Güveç', 'tirit': 'Tirit', 'kofte_sulu': 'Sulu köfte',
    'kurutulmus_kayisi': 'dried apricots', 'pekmez': 'Pekmez', 'kahve': 'Turkish coffee cup', 'balik': 'fried fish Turkey',
    'kiraz_sarmasi': 'Kiraz yaprağı sarması', 'manti': 'Mantı yoğurtlu',
}


def get_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.load(r)
        except Exception:
            time.sleep(3 + attempt * 3)
    return {}


def search(query):
    q = urllib.parse.urlencode({'action': 'query', 'generator': 'search', 'gsrsearch': query, 'gsrnamespace': 6,
                                'gsrlimit': 15, 'prop': 'imageinfo', 'iiprop': 'url|extmetadata|mime|size',
                                'iiurlwidth': 320, 'format': 'json', 'formatversion': 2})
    pages = sorted(get_json('https://commons.wikimedia.org/w/api.php?' + q).get('query', {}).get('pages', []),
                   key=lambda p: p.get('index', 99))
    out = []
    for p in pages:
        ii = (p.get('imageinfo') or [{}])[0]
        meta = ii.get('extmetadata', {})
        lic = meta.get('LicenseShortName', {}).get('value', '')
        if ii.get('mime') not in ('image/jpeg', 'image/png') or ii.get('width', 0) < 800:
            continue
        if not OK_LICENSE.match(lic) or meta.get('NonFree', {}).get('value') == 'true':
            continue
        artist = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', meta.get('Artist', {}).get('value', ''))).strip()
        out.append({'source': 'commons', 'title': p['title'], 'thumb': ii['thumburl'], 'page': ii['descriptionurl'],
                    'license': lic, 'artist': artist or 'Bilinmiyor'})
        if len(out) == 6:
            break
    return out


out_dir = sys.argv[1]
os.makedirs(out_dir, exist_ok=True)
found = {}
for key, query in TYPES.items():
    found[key] = {'cands': search(query)}
    time.sleep(0.3)
json.dump(found, open(os.path.join(out_dir, 'types.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

font = ImageFont.truetype('arial.ttf', 15)
big = ImageFont.truetype('arial.ttf', 20)
keys = list(TYPES)
cw, ch, lw = 190, 140, 160
for s in range(0, len(keys), 18):
    chunk = keys[s:s + 18]
    sheet = Image.new('RGB', (lw + cw * 6, ch * len(chunk)), 'white')
    d = ImageDraw.Draw(sheet)
    for r, key in enumerate(chunk):
        y = r * ch
        d.rectangle([0, y, lw - 4, y + ch - 2], fill='#EFE6D6')
        d.text((6, y + 8), key, fill='black', font=font)
        for c, cand in enumerate(found[key]['cands']):
            x = lw + c * cw
            try:
                req = urllib.request.Request(cand['thumb'], headers={'User-Agent': UA})
                img = Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=40).read())).convert('RGB')
                img.thumbnail((cw - 6, ch - 6))
                sheet.paste(img, (x + 3, y + 3))
            except Exception:
                pass
            d.rectangle([x + 3, y + 3, x + 26, y + 26], fill='black')
            d.text((x + 8, y + 4), str(c), fill='yellow', font=big)
            time.sleep(0.15)
    sheet.save(os.path.join(out_dir, f'types_{s // 18:02d}.jpg'), quality=80)
print('türler:', len(keys), '| adaysız:', [k for k in keys if not found[k]['cands']])
