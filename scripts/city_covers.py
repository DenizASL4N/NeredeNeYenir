"""Find a freely licensed cover photo for each city from its Turkish Wikipedia article.

Usage:
  python city_covers.py candidates <out_dir>            # collect candidates + contact sheet
  python city_covers.py apply <out_dir> <skip_ids...>   # download them (except skipped cities) as WebP
"""
import io, json, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image, ImageDraw, ImageFont

UA = 'NeredeNeYenir/1.0 (https://nerede-ne-yenir.vercel.app; github.com/DenizASL4N/NeredeNeYenir)'
REGISTRY = 'src/data/citiesRegistry.json'


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception:
            time.sleep(3 + attempt * 4)
    raise RuntimeError('indirilemedi: ' + url)


def api(base, **params):
    params.update(format='json', formatversion='2')
    return json.loads(get(base + '?' + urllib.parse.urlencode(params)))


def lead_image(title):
    d = api('https://tr.wikipedia.org/w/api.php', action='query', titles=title, prop='pageimages',
            piprop='name', redirects=1)
    for p in d.get('query', {}).get('pages', []):
        if p.get('pageimage'):
            return 'File:' + p['pageimage']
    return None


def file_info(title, width):
    d = api('https://commons.wikimedia.org/w/api.php', action='query', titles=title, prop='imageinfo',
            iiprop='url|extmetadata|mime', iiurlwidth=width)
    page = d['query']['pages'][0]
    if 'imageinfo' not in page:
        return None  # not on Commons (e.g. a local, possibly non-free file)
    ii = page['imageinfo'][0]
    meta = ii.get('extmetadata', {})
    license_ = meta.get('LicenseShortName', {}).get('value', '')
    if not license_ or meta.get('NonFree', {}).get('value') == 'true':
        return None
    artist = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', meta.get('Artist', {}).get('value', ''))).strip()
    return {'title': title, 'thumb': ii['thumburl'], 'page': ii['descriptionurl'],
            'license': license_, 'artist': artist or 'Bilinmiyor'}


def candidates(out_dir):
    os.makedirs(out_dir, exist_ok=True)
    cities = json.load(open(REGISTRY, encoding='utf-8'))
    found = {}
    for city in cities:
        title = lead_image(city['name']) or lead_image(city['name'] + ' (il)')
        found[city['id']] = file_info(title, 400) if title else None
        time.sleep(0.2)
    json.dump(found, open(os.path.join(out_dir, 'covers.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

    cols, w, h = 9, 220, 190
    rows = (len(cities) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * w, rows * h), 'white')
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.truetype('arial.ttf', 15)
    for i, city in enumerate(cities):
        x, y = (i % cols) * w, (i // cols) * h
        draw.text((x + 4, y + 2), city['id'], fill='black', font=font)
        info = found[city['id']]
        if not info:
            draw.text((x + 10, y + 80), 'YOK', fill='red', font=font)
            continue
        img = Image.open(io.BytesIO(get(info['thumb']))).convert('RGB')
        img.thumbnail((w - 6, h - 24))
        sheet.paste(img, (x + 3, y + 21))
    sheet.save(os.path.join(out_dir, 'covers.jpg'), quality=80)
    print('bulunamayan:', [k for k, v in found.items() if not v])


def apply(out_dir, skip):
    found = json.load(open(os.path.join(out_dir, 'covers.json'), encoding='utf-8'))
    registry = json.load(open(REGISTRY, encoding='utf-8'))
    for city in registry:
        info = found.get(city['id'])
        path = f'src/data/cities/{city["id"]}.json'
        data = json.load(open(path, encoding='utf-8'))
        if not info or city['id'] in skip:
            image, credit = '', None
        else:
            big = file_info(info['title'], 1600)
            img = Image.open(io.BytesIO(get(big['thumb']))).convert('RGB')
            img.thumbnail((1600, 1600))
            img.save(f'public/sehirler/{city["id"]}.webp', 'WEBP', quality=78)
            image = f'/sehirler/{city["id"]}.webp'
            credit = {'yazar': big['artist'][:120], 'lisans': big['license'], 'kaynak': big['page']}
            time.sleep(0.3)
        for target in (city, data):
            target['image'] = image
            if credit:
                target['gorsel'] = credit
            else:
                target.pop('gorsel', None)
        data.pop('unsplash_query', None)
        open(path, 'w', encoding='utf-8', newline='\n').write(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
        print(city['id'], image or '(yok)')
    open(REGISTRY, 'w', encoding='utf-8', newline='\n').write(json.dumps(registry, ensure_ascii=False, indent=2) + '\n')


if sys.argv[1] == 'candidates':
    candidates(sys.argv[2])
else:
    apply(sys.argv[2], set(sys.argv[3:]))
