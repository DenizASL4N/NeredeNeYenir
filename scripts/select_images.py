"""Download the chosen Wikimedia photos, save them as WebP and record their credits.

Usage: python select_images.py <candidates.json> <picks.json> <cities...>
picks.json maps food id -> candidate index. Foods of the given cities without a pick get no image
(the site shows its placeholder) so no unlicensed photo stays in use.
"""
import io, json, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image

UA = 'NeredeNeYenir/1.0 (https://nerede-ne-yenir.vercel.app; github.com/DenizASL4N/NeredeNeYenir)'
COMMONS = 'https://commons.wikimedia.org/w/api.php'
cands = json.load(open(sys.argv[1], encoding='utf-8'))
picks = json.load(open(sys.argv[2], encoding='utf-8'))
cities = sys.argv[3:]


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception:
            time.sleep(3 + attempt * 4)
    raise RuntimeError('indirilemedi: ' + url)


def large_url(title):
    q = urllib.parse.urlencode({'action': 'query', 'titles': title, 'prop': 'imageinfo',
                                'iiprop': 'url', 'iiurlwidth': 1200, 'format': 'json', 'formatversion': 2})
    d = json.loads(get(COMMONS + '?' + q))
    return d['query']['pages'][0]['imageinfo'][0]['thumburl']


for city in cities:
    path = f'src/data/cities/{city}.json'
    data = json.load(open(path, encoding='utf-8'))
    for food in data['yemekler']:
        pick = picks.get(food['id'])
        if pick is None:
            food['image'] = ''
            food.pop('gorsel', None)
            continue
        cand = cands[food['id']][pick]
        img = Image.open(io.BytesIO(get(large_url(cand['title'])))).convert('RGB')
        img.thumbnail((1200, 1200))
        out = f'public/yemekler/{food["id"]}.webp'
        img.save(out, 'WEBP', quality=80)
        artist = re.sub(r'\s+', ' ', cand['artist']).strip() or 'Bilinmiyor'
        food['image'] = '/' + out.split('public/', 1)[1]
        food['gorsel'] = {'yazar': artist[:120], 'lisans': cand['license'], 'kaynak': cand['page']}
        print(f'{food["name"]}: {cand["title"]} ({cand["license"]}) {os.path.getsize(out) // 1024}KB')
        time.sleep(0.3)
    open(path, 'w', encoding='utf-8', newline='\n').write(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
