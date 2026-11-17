"""Collect freely licensed photo candidates from Wikimedia for each food and draw contact sheets.

Usage: python candidates.py <region_data.py> <out_dir> [city ...]
Writes <out_dir>/candidates.json and <out_dir>/<city>.jpg (one row per food, numbered candidates).
"""
import json, os, re, runpy, sys, time, urllib.parse, urllib.request, io
from PIL import Image, ImageDraw, ImageFont

UA = 'NeredeNeYenir/1.0 (https://nerede-ne-yenir.vercel.app; github.com/DenizASL4N/NeredeNeYenir)'
COMMONS = 'https://commons.wikimedia.org/w/api.php'
TRWIKI = 'https://tr.wikipedia.org/w/api.php'
OK_MIME = {'image/jpeg', 'image/png', 'image/webp'}
MAX_PER_FOOD = 6


def api(base, **params):
    params.update(format='json', formatversion='2')
    url = base + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.load(r)
        except Exception:
            time.sleep(2 + attempt * 3)
    return {}


def strip_html(s):
    return re.sub(r'<[^>]+>', '', s or '').strip()


def file_infos(titles):
    if not titles:
        return []
    d = api(COMMONS, action='query', titles='|'.join(titles), prop='imageinfo',
            iiprop='url|extmetadata|mime|size', iiurlwidth=320)
    out = []
    for p in d.get('query', {}).get('pages', []):
        ii = (p.get('imageinfo') or [{}])[0]
        if ii.get('mime') not in OK_MIME or ii.get('width', 0) < 500:
            continue
        meta = ii.get('extmetadata', {})
        license_ = meta.get('LicenseShortName', {}).get('value', '')
        if not license_ or 'fair use' in license_.lower() or meta.get('NonFree', {}).get('value') == 'true':
            continue
        out.append({
            'title': p['title'],
            'thumb': ii.get('thumburl'),
            'page': ii.get('descriptionurl'),
            'width': ii.get('width'),
            'license': license_,
            'artist': strip_html(meta.get('Artist', {}).get('value', '')),
        })
    return out


def wiki_lead_image(name):
    d = api(TRWIKI, action='query', titles=name, prop='pageimages', piprop='name', redirects=1)
    for p in d.get('query', {}).get('pages', []):
        if p.get('pageimage'):
            return 'File:' + p['pageimage']
    return None


def commons_search(query, limit=8):
    d = api(COMMONS, action='query', list='search', srsearch=query, srnamespace=6, srlimit=limit)
    return [r['title'] for r in d.get('query', {}).get('search', [])]


def candidates_for(name):
    base = re.sub(r'\s*\(.*?\)', '', name).strip()
    words = base.split()
    queries = [name, base]
    if len(words) > 1:
        queries.append(' '.join(words[1:]))
    titles = []
    for q in dict.fromkeys(queries[1:]):
        lead = wiki_lead_image(q)
        if lead and lead not in titles:
            titles.append(lead)
    for q in dict.fromkeys(queries):
        for t in commons_search(q):
            if t not in titles:
                titles.append(t)
    infos = file_infos(titles[:20])
    order = {t: i for i, t in enumerate(titles)}
    infos.sort(key=lambda x: order.get(x['title'], 99))
    return infos[:MAX_PER_FOOD]


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return Image.open(io.BytesIO(r.read())).convert('RGB')


def contact_sheet(city, foods, cands, path):
    cw, ch, label_w = 240, 170, 260
    rows = len(foods)
    sheet = Image.new('RGB', (label_w + cw * MAX_PER_FOOD, ch * rows), 'white')
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype('arial.ttf', 18)
        small = ImageFont.truetype('arial.ttf', 22)
    except OSError:
        font = small = ImageFont.load_default()
    for r, f in enumerate(foods):
        y = r * ch
        draw.rectangle([0, y, label_w - 4, y + ch - 2], fill='#EFE6D6')
        words, line, lines = f['name'].split(), '', []
        for w in words:
            if len((line + ' ' + w).strip()) > 22:
                lines.append(line); line = w
            else:
                line = (line + ' ' + w).strip()
        lines.append(line)
        for i, l in enumerate(lines):
            draw.text((8, y + 8 + i * 22), l, fill='black', font=font)
        for c, cand in enumerate(cands.get(f['id'], [])):
            x = label_w + c * cw
            try:
                img = fetch(cand['thumb'])
                img.thumbnail((cw - 6, ch - 6))
                sheet.paste(img, (x + 3, y + 3))
            except Exception:
                draw.text((x + 10, y + 70), 'yüklenemedi', fill='red', font=font)
            draw.rectangle([x + 3, y + 3, x + 33, y + 33], fill='black')
            draw.text((x + 10, y + 5), str(c), fill='yellow', font=small)
            time.sleep(0.2)
        draw.line([0, y + ch - 1, sheet.width, y + ch - 1], fill='#999')
    sheet.save(path, quality=82)


def main():
    region = runpy.run_path(sys.argv[1])['CITIES']
    out_dir = sys.argv[2]
    only = sys.argv[3:]
    os.makedirs(out_dir, exist_ok=True)
    cache_path = os.path.join(out_dir, 'candidates.json')
    cache = json.load(open(cache_path, encoding='utf-8')) if os.path.exists(cache_path) else {}
    for city, foods in region.items():
        if only and city not in only:
            continue
        rows = [{'id': f'{city}_{f["slug"]}', 'name': f['name']} for f in foods]
        for row in rows:
            if len(cache.get(row['id'], [])) < 2:
                cache[row['id']] = candidates_for(row['name'])
                time.sleep(0.3)
        json.dump(cache, open(cache_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        contact_sheet(city, rows, cache, os.path.join(out_dir, f'{city}.jpg'))
        print(city, 'aday sayıları:', [len(cache[r['id']]) for r in rows])


main()
