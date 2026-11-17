"""Second, wider photo search for foods that still have no image.

Searches Wikimedia Commons with Turkish-aware query variants (possessive suffixes and place
names removed, "<dish> from <city>") and, optionally, Openverse (anonymous limit: 200/day).
Only candidates whose file title contains the dish's core word are kept.

Usage: python candidates2.py <out_dir> [--openverse N]   (N = max Openverse requests to spend)
Writes <out_dir>/candidates2.json and contact sheets <out_dir>/sheet_XX.jpg
"""
import io, json, glob, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image, ImageDraw, ImageFont

UA = 'NeredeNeYenir/1.0 (https://nerede-ne-yenir.vercel.app; github.com/DenizASL4N/NeredeNeYenir)'
OK_LICENSE = re.compile(r'^(CC0|Public domain|CC BY(-SA)? [0-9.]+|CC BY(-SA)?|PD.*)', re.I)
TR = str.maketrans('çğıöşüâîû', 'cgiosuaiu')


def norm(text):
    return text.lower().replace('i̇', 'i').translate(TR)


def get_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                return {'_limited': True}
            time.sleep(3 + attempt * 3)
        except Exception:
            time.sleep(3 + attempt * 3)
    return {}


def strip_suffix(word):
    w = word
    for suf in ('ları', 'leri'):
        if w.endswith(suf) and len(w) > 6:
            return w[:-len(suf)]
    for suf in ('sı', 'si', 'su', 'sü'):
        if w.endswith(suf) and len(w) > 5:
            return w[:-2]
    if w[-1:] in 'ıiuü' and len(w) > 5:
        w = w[:-1]
        if w.endswith('ğ'):  # böreği -> börek, fıstığı -> fıstık
            w = w[:-1] + 'k'
    return w


# Province, district and place names that prefix dish names ("Tire Şiş Köfte", "Oltu Cağ Kebabı")
PLACES = {norm(c['name']) for c in json.load(open('src/data/citiesRegistry.json', encoding='utf-8'))} | {norm(p) for p in '''
Antep Urfa Maraş Antakya Tarsus Kahta Besni Tut Hasankeyf Sason Kozluk Pervari Tillo Cizre Dergul Afşin Kadirli
Zorkun Gölhisar Söke Tire Ödemiş Emet Simav Kula Alaşehir Akhisar Salihli Milas Bodrum Gökova Karahallı Ayvalık
Göbel Susurluk Edremit Osmaneli Pazaryeri İnegöl Biga Bayramiç Ezine Kandıra İzmit Adapazarı Ahmetbey Boğaziçi
Akyurt Beypazarı Çubuk Kızılcahamam Sivrihisar Cihanbeyli Gelveri Divle Karaahmetli Çerkeş Kaman Kaymaklı Oltu
Hopa Şavşat Hatila Amasra Mengen Bolu İskilip Alaca Konuralp Akçakoca Görele Kelkit Taşköprü Devrekani Tosya
Fatsa Yalıköy Çayeli Derepazarı Ayder Bafra Terme Çakallı Gazidere Zile Sürmene Akçaabat Hamsiköy Trabzon Çaycuma
Doğubayazıt Kemaliye Eğin Çukurca Çemişgezek Ağın Harput Sivan Çobantaşı Van Kars Iğdır Malatya Erzurum'''.split()}


def core_terms(name, city):
    base = re.sub(r'\s*\(.*?\)', '', name).strip()
    words = base.split()
    while len(words) > 1 and (norm(words[0]) in PLACES or norm(strip_suffix(words[0])) in PLACES):
        words = words[1:]
    return ' '.join(strip_suffix(w) for w in words)


def commons_search(query, limit=10):
    q = urllib.parse.urlencode({'action': 'query', 'list': 'search', 'srsearch': query, 'srnamespace': 6,
                                'srlimit': limit, 'format': 'json', 'formatversion': 2})
    d = get_json('https://commons.wikimedia.org/w/api.php?' + q)
    return [r['title'] for r in d.get('query', {}).get('search', [])]


def commons_infos(titles):
    out = []
    for i in range(0, len(titles), 20):
        q = urllib.parse.urlencode({'action': 'query', 'titles': '|'.join(titles[i:i + 20]), 'prop': 'imageinfo',
                                    'iiprop': 'url|extmetadata|mime|size', 'iiurlwidth': 320,
                                    'format': 'json', 'formatversion': 2})
        d = get_json('https://commons.wikimedia.org/w/api.php?' + q)
        for p in d.get('query', {}).get('pages', []):
            ii = (p.get('imageinfo') or [{}])[0]
            meta = ii.get('extmetadata', {})
            lic = meta.get('LicenseShortName', {}).get('value', '')
            if ii.get('mime') not in ('image/jpeg', 'image/png', 'image/webp') or ii.get('width', 0) < 500:
                continue
            if not OK_LICENSE.match(lic) or meta.get('NonFree', {}).get('value') == 'true':
                continue
            artist = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', meta.get('Artist', {}).get('value', ''))).strip()
            out.append({'source': 'commons', 'title': p['title'], 'thumb': ii.get('thumburl'),
                        'page': ii.get('descriptionurl'), 'license': lic, 'artist': artist or 'Bilinmiyor'})
    return out


def openverse_search(query):
    q = urllib.parse.urlencode({'q': query, 'license_type': 'commercial', 'page_size': 12, 'mature': 'false'})
    d = get_json('https://api.openverse.org/v1/images/?' + q)
    if d.get('_limited'):
        return None
    out = []
    for r in d.get('results', []):
        if (r.get('width') or 0) < 500:
            continue
        lic = 'CC0' if r['license'] == 'cc0' else ('Public domain' if r['license'] == 'pdm'
                                                    else f"CC {r['license'].upper()} {r.get('license_version') or ''}".strip())
        out.append({'source': r.get('provider'), 'title': r.get('title') or '', 'thumb': r.get('thumbnail') or r['url'],
                    'full': r['url'], 'page': r.get('foreign_landing_url') or r['url'], 'license': lic,
                    'artist': r.get('creator') or 'Bilinmiyor'})
    return out


def relevant(cands, core):
    key = norm(core.split()[-1]) if core else ''
    key = key[:max(4, len(key) - 1)]
    seen, out = set(), []
    for c in cands:
        t = norm(c['title'])
        if key and key in t and c['title'] not in seen:
            seen.add(c['title'])
            out.append(c)
    return out


def main():
    out_dir = sys.argv[1]
    ov_budget = int(sys.argv[sys.argv.index('--openverse') + 1]) if '--openverse' in sys.argv else 0
    os.makedirs(out_dir, exist_ok=True)
    cache_path = os.path.join(out_dir, 'candidates2.json')
    cache = json.load(open(cache_path, encoding='utf-8')) if os.path.exists(cache_path) else {}

    todo = []
    for path in sorted(glob.glob('src/data/cities/*.json')):
        city = json.load(open(path, encoding='utf-8'))
        for f in city['yemekler']:
            if not f['image']:
                todo.append((f['id'], f['name'], city['il_adi']))

    ov_used = 0
    for fid, name, city in todo:
        entry = cache.get(fid, {'commons_done': False, 'openverse_done': False, 'cands': []})
        core = core_terms(name, city)
        if not entry['commons_done']:
            titles = []
            for q in dict.fromkeys([name, core, f'{core} {city}', f'{core} from {city}']):
                for t in commons_search(q):
                    if t not in titles:
                        titles.append(t)
            entry['cands'] = relevant(commons_infos(titles[:40]), core)[:8]
            entry['commons_done'] = True
            entry['core'] = core
            time.sleep(0.2)
        if not entry['openverse_done'] and len(entry['cands']) < 2 and ov_used < ov_budget:
            res = openverse_search(core or name)
            ov_used += 1
            if res is None:
                print('Openverse limiti doldu')
                ov_budget = ov_used
            else:
                have = {c['title'] for c in entry['cands']}
                entry['cands'] += [c for c in relevant(res, core) if c['title'] not in have][:8]
                entry['openverse_done'] = True
            time.sleep(3.2)  # stay under 20 requests/minute
        cache[fid] = entry
        json.dump(cache, open(cache_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

    have = [(fid, name) for fid, name, _ in todo if cache.get(fid, {}).get('cands')]
    print(f'eksik {len(todo)} yemekten {len(have)} tanesinde aday var | Openverse isteği: {ov_used}')
    draw_sheets(out_dir, have, cache)


def draw_sheets(out_dir, rows, cache, per_sheet=24, cols=6):
    font = ImageFont.truetype('arial.ttf', 15)
    big = ImageFont.truetype('arial.ttf', 20)
    cw, ch, lw = 200, 150, 230
    for s in range(0, len(rows), per_sheet):
        chunk = rows[s:s + per_sheet]
        sheet = Image.new('RGB', (lw + cw * cols, ch * len(chunk)), 'white')
        d = ImageDraw.Draw(sheet)
        for r, (fid, name) in enumerate(chunk):
            y = r * ch
            d.rectangle([0, y, lw - 4, y + ch - 2], fill='#EFE6D6')
            d.text((6, y + 6), f'{s + r}', fill='#7a4', font=big)
            words, line, lines = name.split(), '', []
            for w in words:
                if len((line + ' ' + w).strip()) > 22:
                    lines.append(line); line = w
                else:
                    line = (line + ' ' + w).strip()
            lines.append(line)
            for i, l in enumerate(lines):
                d.text((6, y + 32 + i * 18), l, fill='black', font=font)
            for c, cand in enumerate(cache[fid]['cands'][:cols]):
                x = lw + c * cw
                try:
                    req = urllib.request.Request(cand['thumb'], headers={'User-Agent': UA})
                    img = Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=40).read())).convert('RGB')
                    img.thumbnail((cw - 6, ch - 6))
                    sheet.paste(img, (x + 3, y + 3))
                except Exception:
                    d.text((x + 10, y + 60), 'yüklenemedi', fill='red', font=font)
                d.rectangle([x + 3, y + 3, x + 26, y + 26], fill='black')
                d.text((x + 8, y + 4), str(c), fill='yellow', font=big)
            d.line([0, y + ch - 1, sheet.width, y + ch - 1], fill='#999')
        sheet.save(os.path.join(out_dir, f'sheet_{s // per_sheet:02d}.jpg'), quality=80)


main()
