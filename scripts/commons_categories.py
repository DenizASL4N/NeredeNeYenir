"""Look for real photos of foods that only have a representative photo in Commons categories such as
"Category:Cuisine of Tokat", which people have sorted by hand.

Usage: python commons_categories.py <out_dir>
Writes <out_dir>/kategori_aday.json (food id -> candidates) and contact sheets kat_XX.jpg
"""
import io, json, glob, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(__file__))
UA = 'NeredeNeYenir/1.0 (https://nerede-ne-yenir.vercel.app; github.com/DenizASL4N/NeredeNeYenir)'
OK_LICENSE = re.compile(r'^(CC0|Public domain|CC BY(-SA)? [0-9.]+|CC BY(-SA)?|PD.*)', re.I)
TR = str.maketrans('çğıöşüâîû', 'cgiosuaiu')


def norm(text):
    return text.lower().replace('i̇', 'i').translate(TR)


def api(**params):
    params.update(format='json', formatversion=2)
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
    for attempt in range(4):
        try:
            return json.load(urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=60))
        except Exception:
            time.sleep(3 + attempt * 3)
    return {}


def members(category, kind):
    out, cont = [], {}
    while True:
        d = api(action='query', list='categorymembers', cmtitle=category, cmtype=kind, cmlimit=500, **cont)
        out += [m['title'] for m in d.get('query', {}).get('categorymembers', [])]
        if 'continue' not in d:
            return out
        cont = {'cmcontinue': d['continue']['cmcontinue']}


def files_of(city_name):
    files = set()
    for title in (f'Category:Cuisine of {city_name}', f'Category:Cuisine of {city_name} Province',
                  f'Category:Food of {city_name}', f'Category:Food of {city_name} Province'):
        top = members(title, 'file')
        subs = members(title, 'subcat')
        if not top and not subs:
            continue
        files.update(top)
        for sub in subs:
            files.update(members(sub, 'file'))
    return sorted(files)


def infos(titles):
    out = {}
    for i in range(0, len(titles), 40):
        d = api(action='query', titles='|'.join(titles[i:i + 40]), prop='imageinfo',
                iiprop='url|extmetadata|mime|size', iiurlwidth=320)
        for p in d.get('query', {}).get('pages', []):
            ii = (p.get('imageinfo') or [{}])[0]
            meta = ii.get('extmetadata', {})
            lic = meta.get('LicenseShortName', {}).get('value', '')
            if ii.get('mime') not in ('image/jpeg', 'image/png', 'image/webp') or ii.get('width', 0) < 500:
                continue
            if not OK_LICENSE.match(lic) or meta.get('NonFree', {}).get('value') == 'true':
                continue
            artist = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', meta.get('Artist', {}).get('value', ''))).strip()
            out[p['title']] = {'source': 'commons', 'title': p['title'], 'thumb': ii['thumburl'],
                               'page': ii['descriptionurl'], 'license': lic, 'artist': artist or 'Bilinmiyor'}
    return out


from candidates2 import core_terms  # noqa: E402  (Turkish-aware dish name core)

out_dir = sys.argv[1]
os.makedirs(out_dir, exist_ok=True)
result = {}
for path in sorted(glob.glob('src/data/cities/*.json')):
    city = json.load(open(path, encoding='utf-8'))
    weak = [f for f in city['yemekler'] if not f['image'] or (f.get('gorsel') or {}).get('temsili')]
    if not weak:
        continue
    titles = files_of(city['il_adi'])
    if not titles:
        continue
    pool = infos(titles)
    print(city['il_adi'], len(titles), 'dosya')
    for food in weak:
        core = norm(core_terms(food['name'], city['il_adi']))
        keys = [w[:max(4, len(w) - 1)] for w in core.split() if len(w) > 2]
        if not keys:
            continue
        cands = [c for t, c in pool.items() if all(k in norm(t) for k in keys)]
        if cands:
            result[food['id']] = {'name': food['name'], 'cands': cands[:6]}
    time.sleep(0.2)

json.dump(result, open(os.path.join(out_dir, 'kategori_aday.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('aday bulunan yemek:', len(result))
for fid, e in result.items():
    print(' ', fid, '::', ' | '.join(f'{i}:{c["title"][5:55]}' for i, c in enumerate(e['cands'])))
