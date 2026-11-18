"""Write public/sitemap.xml and public/robots.txt for search engines.

Usage: python sitemap.py   (run again whenever cities are added)
"""
import datetime, json

SITE = 'https://nerede-ne-yenir.vercel.app'
cities = json.load(open('src/data/citiesRegistry.json', encoding='utf-8'))
today = datetime.date.today().isoformat()

urls = [('/', '1.0'), ('/hakkinda', '0.5')] + [(f'/sehir/{c["id"]}', '0.8') for c in cities]
lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for path, priority in urls:
    lines.append(f'  <url><loc>{SITE}{path}</loc><lastmod>{today}</lastmod><priority>{priority}</priority></url>')
lines.append('</urlset>')
open('public/sitemap.xml', 'w', encoding='utf-8', newline='\n').write('\n'.join(lines) + '\n')

open('public/robots.txt', 'w', encoding='utf-8', newline='\n').write(
    f'User-agent: *\nAllow: /\nDisallow: /favoriler\n\nSitemap: {SITE}/sitemap.xml\n')
print(len(urls), 'adres')
