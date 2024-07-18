convert $1 -resize 100x100 px.miff
magick   px.miff -define ftxt:format="\x,\y,\o\n"  px.ftxt 
awk 'BEGIN{FS=","} {print $1','$2','int(($3*6/32)*36+ ($4*6/32)*6 + ($5*6/32)) } ' px.ftxt > pattern.txt

