magick \
  -size 2x4 xc: \
  -sparse-color Bilinear 0,0,#000,%%[fx:w-1],0,#812,0,%%[fx:h-1],#e35,%%[fx:w-1],%%[fx:h-1],#ff8\
  -evaluate Multiply 0.9999999 \
  -evaluate Subtract 0.01 \
  -define quantum:format=floating-point -depth 64 \
  fmtt_src.miff


convert px.jpg -resize 100x100 px.miff


magick   px.miff   -scale 400x400 400.png

magick   px.miff -define ftxt:format="\x,\y,\o\n"  px.ftxt 

awk 'BEGIN{FS=","} {print $1','$2','int(($3*6/32)*36+ ($4*6/32)*6 + ($5*6/32)) } ' px.ftxt


convert px.jpg -resize 400x400 px.miff 

https://im.snibgo.com/fmttxt.htm