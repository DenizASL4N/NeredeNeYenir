"""Apply picks from candidates2.json (Commons or Openverse) and representative photos.

Usage: python select_images2.py <candidates2.json> <picks2.json>
picks2.json maps food id to one of:
  3                         -> candidate #3, shows the dish itself
  {"temsili": 3}            -> candidate #3, a photo of the same kind of dish (labelled "Temsili fotoğraf")
  {"temsili_from": "<id>"}  -> reuse another food's photo as a representative photo
"""
import io, json, glob, re, shutil, sys, time, urllib.parse, urllib.request
from PIL import Image

UA = 'NeredeNeYenir/1.0 (https://nerede-ne-yenir.vercel.app; github.com/DenizASL4N/NeredeNeYenir)'
cands = json.load(open(sys.argv[1], encoding='utf-8'))
picks = json.load(open(sys.argv[2], encoding='utf-8'))


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception:
            time.sleep(3 + attempt * 4)
    raise RuntimeError('indirilemedi: ' + url)


def full_url(cand):
    if cand['source'] == 'commons':
        q = urllib.parse.urlencode({'action': 'query', 'titles': cand['title'], 'prop': 'imageinfo', 'iiprop': 'url',
                                    'iiurlwidth': 1200, 'format': 'json', 'formatversion': 2})
        return json.loads(get('https://commons.wikimedia.org/w/api.php?' + q))['query']['pages'][0]['imageinfo'][0]['thumburl']
    return cand['full']


def clean_artist(name):
    name = re.sub(r'\s+', ' ', name).strip()
    m = re.match(r'No machine-readable author provided\. (.+?) assumed', name)
    if m:
        return m.group(1)
    m = re.match(r'(?:The )?[Oo]riginal uploader was (.+?) at ', name)
    if m:
        return m.group(1) + ' (Vikipedi)'
    return name[:120] or 'Bilinmiyor'


foods = {}
for path in glob.glob('src/data/cities/*.json'):
    for food in json.load(open(path, encoding='utf-8'))['yemekler']:
        foods[food['id']] = (path, food)

# Own photos first, so representative copies can point at them
order = sorted(picks.items(), key=lambda kv: isinstance(kv[1], dict) and 'temsili_from' in kv[1])
changed = {}
for fid, pick in order:
    path, food = foods[fid]
    data = changed.get(path) or json.load(open(path, encoding='utf-8'))
    target = next(f for f in data['yemekler'] if f['id'] == fid)
    out = f'public/yemekler/{fid}.webp'
    if isinstance(pick, dict) and 'temsili_from' in pick:
        src_path, _ = foods[pick['temsili_from']]
        src_data = changed.get(src_path) or json.load(open(src_path, encoding='utf-8'))
        src = next(f for f in src_data['yemekler'] if f['id'] == pick['temsili_from'])
        assert src['image'], f'{pick["temsili_from"]} has no photo'
        shutil.copyfile('public' + src['image'], out)
        target['gorsel'] = dict(src['gorsel'], temsili=True)
    else:
        idx = pick['temsili'] if isinstance(pick, dict) else pick
        cand = cands[fid]['cands'][idx]
        img = Image.open(io.BytesIO(get(full_url(cand)))).convert('RGB')
        img.thumbnail((1200, 1200))
        img.save(out, 'WEBP', quality=80)
        target['gorsel'] = {'yazar': clean_artist(cand['artist']), 'lisans': cand['license'], 'kaynak': cand['page']}
        if isinstance(pick, dict):
            target['gorsel']['temsili'] = True
        time.sleep(0.3)
    target['image'] = '/' + out.split('public/', 1)[1]
    changed[path] = data
    print(fid, '->', 'temsili' if target['gorsel'].get('temsili') else 'kendi', target['gorsel']['lisans'])

for path, data in changed.items():
    open(path, 'w', encoding='utf-8', newline='\n').write(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
