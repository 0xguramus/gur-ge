# Generates 1200x630 share images: python3 scripts/make-og.py <out> "<line1>" "<line2>" "<subtitle, comma separated>" ["<bottom label>"]
import sys, re
from PIL import Image, ImageDraw, ImageFont
F='/home/box/.fonts/'; DJ='/usr/share/fonts/truetype/dejavu/'
out,l1,l2,sub=sys.argv[1:5]; label=sys.argv[5] if len(sys.argv)>5 else 'ხელსაწყოები'
im=Image.new('RGB',(1200,630),'#fbfaf7'); d=ImageDraw.Draw(im)
d.rectangle((0,0,1200,10),fill='#b4475b')
def fonts(geo,lat,size): return ImageFont.truetype(geo,size), ImageFont.truetype(lat,int(size*.92))
def runs(s): return re.findall(r'[\u10A0-\u10FF]+|[^\u10A0-\u10FF]+', s)
def width(s,fg,fl): return sum(d.textlength(r,font=fg if re.match(r'[\u10A0-\u10FF]',r) else fl) for r in runs(s))
def draw(xy,s,fg,fl,fill):
  x,y=xy
  for r in runs(s):
    f=fg if re.match(r'[\u10A0-\u10FF]',r) else fl
    d.text((x,y+fg.size*.8),r,font=f,fill=fill,anchor='ls'); x+=d.textlength(r,font=f)
lf=ImageFont.truetype(DJ+'DejaVuSerif-Bold.ttf',44); x=80
for t,c in (('genius','#1d1d1f'),('.','#b4475b'),('ge','#1d1d1f')): d.text((x,70),t,font=lf,fill=c); x+=d.textlength(t,font=lf)
size=68
while True:
  fg,fl=fonts(F+'NotoSerifGeorgian-Bold.ttf',DJ+'DejaVuSerif-Bold.ttf',size)
  if max(width(l1,fg,fl),width(l2,fg,fl))<=1040: break
  size-=4
draw((80,180),l1,fg,fl,'#1d1d1f'); draw((80,180+size*1.35),l2,fg,fl,'#b4475b')
sg,sl=fonts(F+'NotoSansGeorgian-Regular.ttf',DJ+'DejaVuSans.ttf',34); x=80
for i,w in enumerate(s.strip() for s in sub.split(',')):
  if i: d.ellipse((x+12,440,x+22,450),fill='#b4475b'); x+=34
  draw((x,430),w,sg,sl,'#6b6b70'); x+=width(w,sg,sl)
bg,bl=fonts(F+'NotoSansGeorgian-Bold.ttf',DJ+'DejaVuSans-Bold.ttf',30); draw((80,530),label,bg,bl,'#1d1d1f')
im.save(out,optimize=True)
