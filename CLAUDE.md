# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

妙妙屋（miaomiaowu）文档与管理前端 — 一个代理订阅管理系统的 Web UI 和文档站点。包含两个产品线的文档：妙妙屋（`/docs`）和 妙妙屋X（`/x/docs`）。

## Commands

- `npm run dev` — 启动 Vite 开发服务器（API 代理到 `VITE_API_URL` 或 `localhost:8080`）
- `npm run build` — TypeScript 编译 + Vite 构建 + 站点配置注入（`scripts/inject-site-config.js` 读取 `site.json` 替换 `dist/index.html` 的元数据）
- `npm run build:only` — 仅构建，不注入站点配置
- `npm run lint` — ESLint 检查
- `npm run format:check` / `npm run format` — Prettier 格式检查 / 格式化
- `npm run knip` — 检测未使用的依赖和导出

## Architecture

**技术栈**: React 19 + TypeScript + Vite 7 + Tailwind CSS 4 + shadcn/ui (new-york style)

**路由**: TanStack Router（文件式路由），路由文件在 `src/routes/`，自动生成 `src/routeTree.gen.ts`（不要手动编辑）。

**状态管理**:
- Zustand (`src/stores/`) — 认证状态（token 存 cookie）
- TanStack Query — 服务端数据请求和缓存

**API 层**: Axios 实例在 `src/lib/api.ts`，使用 `MM-Authorization` header 传 token。开发环境通过 Vite proxy 代理 `/api` 和 `/t/` 到后端。

**路由结构**:
- `/` — Landing 页面（`src/components/landing/`）
- `/docs/*` — 妙妙屋文档（`src/routes/docs/`，使用 `src/components/docs/doc-layout.tsx`）
- `/x/docs/*` — 妙妙屋X 文档（`src/routes/x/docs/`，使用 `src/components/docs/x-doc-layout.tsx`）
- `/nodes`, `/subscription`, `/users`, `/settings` 等 — 管理功能页面

**UI 组件**: `src/components/ui/` 是 shadcn/ui 生成的组件（ESLint 和 knip 已配置忽略此目录），不要手动修改。业务组件在 `src/components/` 其他子目录。

## Conventions

- 路径别名: `@/` 映射到 `src/`
- CSS: Tailwind CSS 4，入口 `src/styles/index.css`，主题变量在 `src/styles/theme.css`
- 暗色模式: 通过 `.dark` class 切换，自定义 variant `@custom-variant dark (&:is(.dark *))`
- 类型导入: 使用 inline type imports（`import { type Foo } from ...`），由 ESLint 强制
- 未使用变量: 以 `_` 前缀命名来规避 lint 警告
- 部署目标: Cloudflare Pages（构建时自动生成 `404.html` 用于 SPA 路由）
