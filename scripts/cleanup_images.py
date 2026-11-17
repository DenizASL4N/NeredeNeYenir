"""Delete photos in public/yemekler and public/sehirler that no data file references."""
import glob, json, os

used = set()
for path in glob.glob('src/data/cities/*.json') + ['src/data/citiesRegistry.json']:
    data = json.load(open(path, encoding='utf-8'))
    items = data if isinstance(data, list) else [data] + data['yemekler']
    for item in items:
        if item.get('image', '').startswith('/'):
            used.add(os.path.normpath('public' + item['image']))

missing = sorted(p for p in used if not os.path.exists(p))
print('veride olup dosyası olmayan:', missing)

removed = 0
for f in glob.glob('public/yemekler/*') + glob.glob('public/sehirler/*'):
    if os.path.normpath(f) not in used:
        os.remove(f)
        removed += 1
print('silinen:', removed, '| kalan:', len(glob.glob('public/yemekler/*')), 'yemek,',
      len(glob.glob('public/sehirler/*')), 'şehir')
