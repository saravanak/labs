---
title: Small Commands for Your Inner Joy
date: 2024-08-01T11:31:48+05:30
tags: ["posts", "cli"]
---

## Whats on your machine ?

Command to list all the binaries that are installed on your machine , indexed by
$PATH. Can be expanded to a quiz later ?

```
IFS=':';for i in $PATH; do test -d "$i" && find "$i" -maxdepth 1 -executable -type f  ; done
```
