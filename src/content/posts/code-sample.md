---
title: 代码块与表格
date: 2026-10-18
summary: 测一下 Shiki 高亮、行内代码、列表和分隔线在 864px 栏目里的样子。
---

行内代码 `--frame` 和 `const x = 1` 混在正文里。

```ts
const published = posts.filter((p) => !p.data.draft);
export const newest = published.toSorted(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
);
```

列表：

- 第一项
- 第二项，稍微长一点，用来确认换行后的缩进对齐
- 第三项

分隔线：

---

最后一段。
