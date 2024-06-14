awk  'BEGIN { FS=OFS=" " }{ print $6; }'   words.txt > wordle.txt 
LC_ALL=C grep  -Ew '^[^KMVWX]{5,5}$' wordle.txt  > led-wordle.txt  
wc -l wordle.txt words.txt led-wordle.txt 