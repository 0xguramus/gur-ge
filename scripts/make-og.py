# Generates 1200x630 share images for tools: python3 scripts/make-og.py <out> "<line1>" "<line2>" "<subtitle words, comma separated>"
import sys
from PIL import Image, ImageDraw, ImageFont
F='/home/box/.fonts/'; DJ='/usr/share/fonts/truetype/dejavu/'
out,l1,l2,sub=sys.argv[1:5]
im=Image.new('RGB',(1200,630),'#fbfaf7'); d=ImageDraw.Draw(im)
d.rectangle((0,0,1200,10),fill='#b4475b')
lf=ImageFont.truetype(DJ+'DejaVuSerif-Bold.ttf',44); x=80
for t,c in (('gur','#1d1d1f'),('.','#b4475b'),('ge','#1d1d1f')): d.text((x,70),t,font=lf,fill=c); x+=d.textlength(t,font=lf)
size=68
t=ImageFont.truetype(F+'NotoSerifGeorgian-Bold.ttf',size)
while max(d.textlength(l1,font=t),d.textlength(l2,font=t))>1040: size-=4; t=ImageFont.truetype(F+'NotoSerifGeorgian-Bold.ttf',size)
d.text((80,180),l1,font=t,fill='#1d1d1f'); d.text((80,180+size*1.35),l2,font=t,fill='#b4475b')
sf=ImageFont.truetype(F+'NotoSansGeorgian-Regular.ttf',34); x=80
for i,w in enumerate(sub.split(',')):
  if i: d.ellipse((x+12,452,x+22,462),fill='#b4475b'); x+=34
  d.text((x,430),w.strip(),font=sf,fill='#6b6b70'); x+=d.textlength(w.strip(),font=sf)
d.text((80,530),'ხელსაწყოები',font=ImageFont.truetype(F+'NotoSansGeorgian-Bold.ttf',30),fill='#1d1d1f')
im.save(out,optimize=True)
