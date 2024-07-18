---
title: Fix Spellings on Your Posts!
date: 2024-07-17T13:36:35+05:30
tags: ["posts", "cli", "sed"]
---

I find myself doing a lot of spelling mistakes! And, though there is awesome
ecosystems on vim and Emacs, its been some time since I used vim, now that
there is vscode. More on that later!

So, a quick google gave me the
[`spellchecker-cli`](https://github.com/tbroadley/spellchecker-cli) which did
what it said on the tin. I invoked it with arguments as below

```bash

spellchecker -f blog/*.md  --generate-dictionary blog-words.txt

```

So it gave back `blog-words.txt` as below (as an excerpt)

```
DOM
DSL
Dat
Datasette
Dogfooding
EOD
FS
Frontend
Gnucash
GraphQL
Graphql
HN
HackerNew
```

## Identifying the mistakes

This contained both legitimate words (technical, but not English) and actual
misspellings. So I extracted the misspellings to another file in the following
format:

```
synchronizer,synchronizer
update,update
separate,separate
separator,separator
```

## Correcting the mistakes

```
set -xe
while IFS=, read -r incorrect correct; do
  sed -e "s/$incorrect/$correct/ig" -i"" blog/*.md
done <correct-spellchecker.txt
```

Loop through the list of mistakes and correct them in-place using `sed`. Profit.
Now I have both the list of allowed words and the list of auto-corrections to
this list. Any spelling errors that I repeat will be caught by the above script.

## Conclusion

Glad I was able to make this from an idea into execution. I think the spell
check correction functionality should be baked into the spellchecker-cli itself.
