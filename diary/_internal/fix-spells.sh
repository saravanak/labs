set -xe
while IFS=, read -r incorrect correct; do
  sed -e "s/$incorrect/$correct/ig" -i"" blog/*.md
done <correct-spellchecker.txt