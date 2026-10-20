# 0x000B10G

一个简单的地方，随便写点东西。

## 命令

```bash
npm install     # 装依赖
npm run dev     # 本地预览
npm run build   # 生成到 dist/
```

## 结构

```
src/
  layouts/Base.astro    页面骨架
  pages/index.astro     首页
  styles/global.css     全部样式
public/
  fonts/archivo.woff2
  favicon.svg
```

改文字直接编 `src/pages/index.astro`。改颜色在 `src/styles/global.css` 顶部的
`:root` 里，深色模式是同一组变量的另一套值。

零 JS，深浅色跟随系统。推到 `main` 会自动构建发布到 <https://xnye.github.io>。
