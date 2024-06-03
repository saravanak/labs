---
title: Playing with Data and Candles
date: 2023-12-09T02:23:10.000Z
tags:
  - posts
  - python
  - data
---

A Data Game.

`Advent Of Code : Code :: Hanukkah Of Data : Data`.

<!-- excerpt -->

<!-- toc -->

- [Candle 1](#candle-1)
- [Other Candles](#other-candles)
- [JQ Result collection](#jq-result-collection)
  - [TODO](#todo)

<!-- tocstop -->

Play Here[^1]

<span class="warning">:warning:</span> Spoilers ahead.

## Candle 1

We are tasked with finding a name whose last name, when typed on a phone against
the letters, (ADZ) types (239). The target is to find a person whose last name
types his phone number.

Was introduced to this nifty tool called `visidata`. It allows to do exploratory
analysis on tabular data. Think of it as Excel for CLI.

It's ability to record the actions and redo on the data is simply awesome! How
long have I been missing it.

Here is the meat of the solution

Another long line of text in this way is too cool to get today itself now is the
magic

```python
translate(
    str.maketrans(
        'abcdefghijklmnopqrstuvwxyz',
        '22233344455566677778889999'
    )
)
```

## Other Candles

Most of them were joins on special conditions. Last two of them (7 and 8) were
`with` queries. But no recursive queries. String functions included simple
things `substring` and `length`. Date was `strfmt`. Most challenging was that we
wanted to have a phone number sent in across as a `param`. Since the phone
number was in the format `ddd-ddd-dddd` , this was actually converting the
parameter value to a number by doing the subtractions! Eventually overcame this
by concantenating a character and trimming that character in the query. Might be
using a sql driver in a higher level language would have made this easier.

In the process, also learnt to work with the terminal in the new NeoVim case
(got by with <C=/>), but there was these problems:

- pasting from vim buffer required <C+S=V>, and there was this eternal toggling
  between Normal mode and Terminal mode on scrolling, which was a prick since
  <C=/> in that Normal mode started another terminal from the terminal window!
  **Need to** have more experience with Terminal windows.

## JQ Result collection

The second part of the puzzle stream was that there would be a fast challenge
repeating the entire game from the start. The intention was to make the user do
repeatable analysis and hence I was brought in. So I made this simple result
collection stuff in `jq`. After the execution, a json file will be generated
which contains the phone numbers for all the problems. This was a nice excerise
in configuration and externalization

### TODO

- [ ] Push the stuff to git and show the contents here.
- [ ] Action

---

[^1]: <https://hanukkah.bluebird.sh/>
