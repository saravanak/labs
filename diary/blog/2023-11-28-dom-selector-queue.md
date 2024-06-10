---
title: "DOM Selector queue"
date: 2023-11-28
tags: ["posts", "javascript", "dsl", "project-ideas"]
---

A simple DSL suggestion for a pipeline to extract and format text from HTML. Working demo [here](https://labs.oldweaver.co.in/projects/html-extractor)

<!-- excerpt -->

Consider a html snippet like this:

```html
<table id="w243aab7c19b5">
  <tbody>
    <tr>
      <td
        align="left"
        style="text-align: left;vertical-align: top;"
        tabindex="-1"
      >
        <p>Foo</p>
        <p>Bar</p>
      </td>
      <td
        align="left"
        style="text-align: left;vertical-align: top;"
        tabindex="-1"
      >
        <p>Zee</p>
        <p>Kee</p>
      </td>
    </tr>
  </tbody>
</table>
```

Would it not be great to extract hierarchical lists from the above html table
for the `td > p` tags?

How about a DSL which says

```bash
TBODY td | map(Set ${this.idx}) | p | map(- ${this.item.textContent})
```

and extracts something like this:

```markdown
Set 0

- Foo
- Bar

Set 1

- Zee
- Kee
```
