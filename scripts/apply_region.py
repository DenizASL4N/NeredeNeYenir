"""Rewrite the food lists of the given cities from a region data file.

Usage: python apply_region.py <region_data.py> [--write]
Kept foods (same id) keep their current image; new foods start without one.
"""
import json, runpy, sys, os

region = runpy.run_path(sys.argv[1])['CITIES']
write = '--write' in sys.argv
CATEGORIES = {'Ana Yemek', 'Çorba', 'Hamur İşi', 'Meze ve Zeytinyağlı', 'Sokak Lezzeti',
              'Kahvaltılık', 'Tatlı', 'İçecek', 'Yöresel Ürün'}
base = 'src/data/cities'

for city_id, foods in region.items():
    path = os.path.join(base, f'{city_id}.json')
    raw = open(path, encoding='utf-8').read()
    data = json.loads(raw)
    old = {f['id']: f for f in data['yemekler']}
    new_list, ids = [], set()
    for f in foods:
        fid = f'{city_id}_{f["slug"]}'
        assert fid not in ids, fid
        assert f['category'] in CATEGORIES, (fid, f['category'])
        assert len(f['history']) > 40, fid
        ids.add(fid)
        new_list.append({
            'id': fid,
            'name': f['name'],
            'category': f['category'],
            'image': old.get(fid, {}).get('image', ''),
            'history': f['history'],
            'cografiIsaret': f.get('gi', False),
            'kaynak': f.get('src', ''),
        })
    removed = [o['name'] for i, o in old.items() if i not in ids]
    added = [f['name'] for f in new_list if f['id'] not in old]
    print(f"{data['il_adi']}: {len(old)} -> {len(new_list)} | eklendi: {added} | çıkarıldı: {removed}")
    data['yemekler'] = new_list
    if write:
        open(path, 'w', encoding='utf-8', newline='\n').write(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
