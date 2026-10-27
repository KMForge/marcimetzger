import urllib.request,re,json,io
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image,ImageOps,ImageDraw
base='https://img1.wsimg.com/isteam/'
ip=base+'ip/067a4d42-19e8-46d9-9bed-578bf62dd44e/'
items=[('marci-metzger-logo',ip+'blob-6c0c2e0.png','header'),('marci-metzger-portrait',ip+'photo-5db79f9.jpg','about'),('mountain-falls-pond',ip+'mtn%20falls%20pond.jpg','hero'),('residential-sales',base+'stock/3395','results'),('listing-marketing',base+'stock/107927','selling'),('buyer-guidance',base+'stock/771','buying'),('ridge-realty-logo',ip+'BIG%20CIRCLE%202.png','affiliations'),('equal-housing-logo',ip+'Equal%20Housing%20Logo.png','affiliations'),('realtor-logo',ip+'Realtor%20Pin.jpg','affiliations'),('chamber-logo',ip+'Chamber.jpg','affiliations'),('real-estate-done-right',base+'stock/12792','services'),('commercial-residential',base+'stock/43920','services'),('real-estate-expertise',base+'stock/kayaJdA','services'),('search-landscape',base+'getty/2223376026','search')]
s=urllib.request.urlopen('https://img1.wsimg.com/blobby/go/067a4d42-19e8-46d9-9bed-578bf62dd44e/gpub/ba0e1a00cf64f1d/script.js').read().decode()
Path('research/reference-widgets.js').write_text(s,encoding='utf8')
for m in re.finditer(r'JSON.parse\(("(?:\\.|[^"\\])*")\)',s):
 d=json.loads(json.loads(m.group(1)))
 if 'galleryImages' in d:
  for entry in d['galleryImages']:
   url='https:'+entry['image']['image']
   from urllib.parse import unquote
   name=unquote(url.split('/')[-1]).replace('.jpg-SMALL.JPG','').lower().replace(' ','-')
   items.append((name,url,'gallery'))
  break

def fetch(item):
 name,url,use=item
 data=urllib.request.urlopen(url,timeout=45).read()
 original=Image.open(io.BytesIO(data)); im=original.copy(); im.thumbnail((1920,1920))
 im.save('public/assets/'+name+'.webp','WEBP',quality=86)
 if use=='hero':
  sm=original.copy();sm.thumbnail((800,800));sm.save('public/assets/'+name+'-mobile.webp','WEBP',quality=83)
 return dict(name=name,source=url,file='/assets/'+name+'.webp',use=use,width=im.width,height=im.height,originalWidth=original.width,originalHeight=original.height)
with ThreadPoolExecutor(max_workers=6) as ex: assets=list(ex.map(fetch,items))
Path('docs/assets.json').write_text(json.dumps(assets,indent=2),encoding='utf8')
canvas=Image.new('RGB',(1000,((len(assets)+3)//4)*190),'white'); draw=ImageDraw.Draw(canvas)
for i,a in enumerate(assets):
 im=Image.open('public'+a['file']).convert('RGB');im.thumbnail((240,150));x=(i%4)*250;y=(i//4)*190;canvas.paste(im,(x,y));draw.text((x,y+152),a['name'],fill='black')
canvas.save('research/assets-contact-sheet.jpg')
print(json.dumps(assets,indent=2))
