# 0x000B10G

一个只放文章的地方。

## 写文章

在 `src/content/posts/` 里新建一个 `.md` 文件：

```markdown
---
title: 标题
date: 2026-10-20
summary: 可选的一句话摘要，会显示在列表里
---

正文，正常写 markdown。
```

保存后首页列表自动出现这一条。删除文件就是删除文章。没有文章时列表区域显示
`No posts yet`。

可选字段 `draft: true` 会让文章不进入列表也不生成页面。

## 命令

```bash
npm install     # 首次
npm run dev     # 本地预览 http://localhost:4321
npm run build   # 生成静态文件到 dist/
```

推送到 `main` 会自动构建并发布到 <https://xnye.github.io>。

## 结构

```
src/
  content.config.ts       文章集合定义（frontmatter 字段）
  content/posts/          文章 markdown 放这里
  layouts/Base.astro      页面骨架：顶栏、主题切换、页脚
  pages/index.astro       首页，按日期倒序列出文章
  pages/posts/[slug].astro  文章详情页
  styles/global.css       全部样式
public/fonts/             自托管字体（Archivo、JetBrains Mono）
```

改颜色在 `src/styles/global.css` 顶部的 `:root`，深色模式是 `html[data-theme='dark']`
里同一组变量。

## 第三方

Astro（MIT）与 Archivo、JetBrains Mono（SIL OFL）均不要求在界面中署名，因此页面上
不显示。许可证信息见 `NOTICE.md`。
