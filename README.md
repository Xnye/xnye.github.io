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
  content.config.ts          文章集合定义（frontmatter 字段）
  content/posts/             文章 markdown 放这里
  lib/posts.ts               取文章、排序、日期格式、文章 URL
  layouts/Document.astro     <head> + 顶栏 + 栏框 + 页脚
  components/ThemeToggle.astro  顶栏右侧的明暗切换
  components/PostList.astro     首页列表的一行
  pages/index.astro          首页，按日期倒序列出文章
  pages/posts/[slug].astro   文章详情页
  styles/global.css          样式入口，按顺序 @import 下面各层
  styles/reset.css           字体声明与最小重置
  styles/tokens.css          调色板、字体、所有随视口变化的尺寸
  styles/frame.css           顶栏、栏框、页脚
  styles/index-list.css      首页列表
  styles/post-prose.css      文章页与正文排版
  styles/short-viewport.css  矮视口（横屏手机）只重写变量
public/fonts/                自托管字体（Archivo、JetBrains Mono）
```

改颜色和尺寸都在 `src/styles/tokens.css` 的 `:root`，深色模式是同一文件里
`html[data-theme='dark']` 那组同名变量。矮视口也只在 `short-viewport.css` 里重写
这些变量、不重复写规则，所以两种版式不会各自漂移。

## 第三方

Astro（MIT）与 Archivo、JetBrains Mono（SIL OFL）均不要求在界面中署名，因此页面上
不显示。许可证信息见 `NOTICE.md`。
