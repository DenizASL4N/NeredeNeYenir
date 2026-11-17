"""Draw every chosen (WebP) photo of the given cities on one sheet for a visual check.

Usage: python review_sheet.py <out.jpg> <city ...>
"""
import json, sys
from PIL import Image, ImageDraw, ImageFont

out, cities = sys.argv[1], sys.argv[2:]
items = []
for city in cities:
    for food in json.load(open(f'src/data/cities/{city}.json', encoding='utf-8'))['yemekler']:
        if food['image'].endswith('.webp'):
            items.append((food['name'], 'public' + food['image']))

cols, w, h = 6, 260, 220
rows = (len(items) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w, rows * h), 'white')
draw = ImageDraw.Draw(sheet)
font = ImageFont.truetype('arial.ttf', 15)
for i, (name, path) in enumerate(items):
    img = Image.open(path).convert('RGB')
    img.thumbnail((w - 6, h - 26))
    x, y = (i % cols) * w, (i // cols) * h
    sheet.paste(img, (x + 3, y + 22))
    draw.text((x + 4, y + 3), name, fill='black', font=font)
sheet.save(out, quality=80)
print(len(items), 'fotoğraf')
