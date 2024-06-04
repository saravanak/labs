---
title: "Getting back my system from a kernel crash"
date: 2018-02-15T15:00:51+05:30
tags: ["arch", "linux", "pacman", "crash", "posts"]
---

Upgrading a package from the pacman cache after a system crash on a new package
install.

Today I happened to face a system crash on my `arch linux` setup. I wanted to
use `dig`, but the program complained of a missing dependency:

```
➜ dig
 dig: error while loading shared libraries: libjson-c.so.3: cannot open shared object file: No such file or directory

```

Then, I decided to upgrade the `json-c` library.

```
➜ _ pacman -S json-c
```

It was installed (overriding the existing version 2), and I was happy it worked.
Until I shutdown my machine:

```
Feb 15 14:37:10 archlinux systemd[1]: Starting Power-Off...
Feb 15 14:37:10 archlinux systemctl[1207]: /usr/bin/systemctl: error while loading shared libraries: libjson-c.so.2: cannot open shared object file: No such file or directory
Feb 15 14:37:10 archlinux systemd[1]: systemd-poweroff.service: Main process exited, code=exited, status=127/n/a
Feb 15 14:37:10 archlinux systemd[1]: systemd-poweroff.service: Failed with result 'exit-code'.
Feb 15 14:37:10 archlinux systemd[1]: Failed to start Power-Off.

```

:scream:

I was doubtful that I had screwed up my machine. So, I quickly restarted the
machine, to my happiness, it was indeed !!. :innocent: :gun:.

## Fixing

Fixing this was easy and speasy, just boot in with a liveboot USB and do:

```bash
pacman -U #<path to the old jsonlibtar file in the cache>
```

## Why this post?

This is just a rubber ducking post. Over the course, I learnt to find how to
find all the packages that are dependant on a given one:

```bash
pactree -r <package>
```

## Dependant packages

```bash
pacman -Qil #Package Name
```

Lists all the files and other meta information for an installed package on the system

## Changes

| Date | Comments |
| ------ | ----------- |
|2018-02-15|Initial Content|
|2024-06-04|Add heading `Dependant packages` |