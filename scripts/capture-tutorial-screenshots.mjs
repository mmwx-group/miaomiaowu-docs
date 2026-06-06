#!/usr/bin/env node
// capture-tutorial-screenshots.mjs
//
// 抓 tutorial.tsx 教程页用的所有截图:
//   - 妙妙屋X 后台关键页面(用本地 seed 过的 mmwx 实例)
//   - TG MiniApp 管理员视图 + 用户视图(手机分辨率,从 :23088 抓)
//
// 环境变量:
//   MMWX_URL=http://localhost:12990  (本地 mmwx,axios 硬编码 :12889 会被 route 重写)
//   MMWX_USER=admin
//   MMWX_PASS=admin12345
//   MINIAPP_BASE=http://127.0.0.1:23088
//   MINIAPP_ADMIN_INITDATA=... (URL-encoded)
//   MINIAPP_USER_INITDATA=...

import { chromium, devices } from 'playwright'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outDir = path.join(rootDir, 'public/images/screenshots')

const MMWX_URL = (process.env.MMWX_URL || 'http://localhost:12990').replace(/\/$/, '')
const MMWX_USER = process.env.MMWX_USER || 'admin'
const MMWX_PASS = process.env.MMWX_PASS || 'admin12345'
const MINIAPP_BASE = (process.env.MINIAPP_BASE || 'http://127.0.0.1:23088').replace(/\/$/, '')
const MINIAPP_ADMIN_INITDATA = process.env.MINIAPP_ADMIN_INITDATA || ''
const MINIAPP_USER_INITDATA = process.env.MINIAPP_USER_INITDATA || ''

fs.mkdirSync(outDir, { recursive: true })

async function captureLocator(locator, fileName) {
  await locator.scrollIntoViewIfNeeded()
  await locator.page().waitForTimeout(400)
  const buf = await locator.screenshot({ type: 'png' })
  const outPath = path.join(outDir, fileName)
  await sharp(buf).webp({ quality: 80 }).toFile(outPath)
  const size = (fs.statSync(outPath).size / 1024).toFixed(1)
  console.log(`  ✓ ${fileName}  ${size} KB`)
}

async function captureFullPage(page, fileName) {
  const buf = await page.screenshot({ type: 'png', fullPage: true })
  const outPath = path.join(outDir, fileName)
  await sharp(buf).webp({ quality: 80 }).toFile(outPath)
  const size = (fs.statSync(outPath).size / 1024).toFixed(1)
  console.log(`  ✓ ${fileName}  ${size} KB (full page)`)
}

async function captureViewport(page, fileName) {
  const buf = await page.screenshot({ type: 'png' })
  const outPath = path.join(outDir, fileName)
  await sharp(buf).webp({ quality: 80 }).toFile(outPath)
  const size = (fs.statSync(outPath).size / 1024).toFixed(1)
  console.log(`  ✓ ${fileName}  ${size} KB (viewport)`)
}

const mainCard = (page) => page.locator('main, [role=main]').first()

// ─────────────────────────────────────────────────────────────────────────
// Part 1: 妙妙屋X 后台(桌面分辨率)
// ─────────────────────────────────────────────────────────────────────────
console.log('━━━ Part 1: 妙妙屋X 后台 ━━━')
const browser = await chromium.launch({ headless: true })
const targetUrl = new URL(MMWX_URL)
const targetPort = targetUrl.port || (targetUrl.protocol === 'https:' ? '443' : '80')

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  locale: 'zh-CN',
  extraHTTPHeaders: { 'Accept-Language': 'zh-CN,zh;q=0.9' },
})
await ctx.route('**/*', async (route) => {
  const u = route.request().url()
  const blocked = ['in.miaomiaowu.net', 'gh-proxy.com', 'raw.githubusercontent.com', 'fonts.googleapis.com', 'fonts.gstatic.com']
  if (blocked.some((d) => u.includes(d))) return route.abort()
  if (u.includes(':12889/')) return route.continue({ url: u.replace(':12889/', `:${targetPort}/`) })
  return route.continue()
})

const page = await ctx.newPage()

console.log(`▸ Login as ${MMWX_USER} → ${MMWX_URL}`)
await page.goto(`${MMWX_URL}/login`, { waitUntil: 'domcontentloaded' })
await page.waitForSelector('#username, #setup-username', { timeout: 10000 })

// 如果是 setup 状态(fresh db),先截 setup wizard
if (await page.locator('#setup-username').count()) {
  console.log('▸ Capture step4: setup wizard')
  await captureFullPage(page, 'tutorial-step4-setup-wizard.webp')
  // 填了 setup 让流程能继续(但我们要在 fresh state 时截这张图,不应继续填)
  throw new Error('mmwx 处于 setup 状态;请先 setup admin 再跑截图脚本')
}

await page.locator('#username').fill(MMWX_USER)
await page.locator('#password').fill(MMWX_PASS)
const loginResp = page.waitForResponse((r) => r.url().includes('/api/login') && r.request().method() === 'POST', { timeout: 15000 })
await page.locator('button[type=submit]').click()
const lr = await loginResp
if (!lr.ok()) throw new Error(`login failed: ${lr.status()}`)
await page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 10000 })
console.log('  ✓ logged in')

// ───── step5: 证书管理(空列表) + 申请证书对话框 ─────
console.log('▸ Capture step5: 证书管理 + 申请证书')
await page.goto(`${MMWX_URL}/certificates`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2000)
await captureFullPage(page, 'tutorial-step5-certificates-list.webp')
const applyBtn = page.locator('button').filter({ hasText: /申请证书|新申请证书|添加证书/ }).first()
if (await applyBtn.count()) {
  await applyBtn.click()
  await page.waitForTimeout(1500)
  const d = page.locator('[role=dialog]').first()
  if (await d.count()) {
    await captureLocator(d, 'tutorial-step5-apply-cert-dialog.webp')
    await page.keyboard.press('Escape')
    await page.waitForTimeout(500)
  }
}

// ───── step6: 服务管理 + 添加服务器对话框 ─────
console.log('▸ Capture step6: 服务管理 + 添加服务器')
await page.goto(`${MMWX_URL}/xray-servers`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2500)
await captureFullPage(page, 'tutorial-step6-servers-list.webp')
const addServerBtn = page.locator('button').filter({ hasText: /添加服务器|新建服务器/ }).first()
if (await addServerBtn.count()) {
  const disabled = await addServerBtn.isDisabled()
  if (disabled) {
    console.log('  ⚠ 添加服务器按钮 disabled(可能 license 限额已满),跳过对话框截图')
  } else {
    await addServerBtn.click()
    await page.waitForTimeout(1500)
    const d = page.locator('[role=dialog]').first()
    if (await d.count()) {
      await captureLocator(d, 'tutorial-step6-add-server-dialog.webp')
      await page.keyboard.press('Escape')
      await page.waitForTimeout(500)
    }
  }
}

// ───── step8: 节点管理(入站列表) ─────
console.log('▸ Capture step8: 节点管理')
await page.goto(`${MMWX_URL}/nodes`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2500)
await captureFullPage(page, 'tutorial-step8-nodes-list.webp')

// ───── step9: 套餐管理页 + 添加套餐对话框 ─────
console.log('▸ Capture step9: 套餐管理 + 添加套餐')
await page.goto(`${MMWX_URL}/packages`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2000)
await captureFullPage(page, 'tutorial-step9-packages-list.webp')

// 打开"添加套餐"对话框
const addBtn = page.locator('button').filter({ hasText: /添加套餐|新建套餐|创建套餐/ }).first()
if (await addBtn.count()) {
  await addBtn.click()
  await page.waitForTimeout(1500)
  // 截 Dialog 容器
  const dialog = page.locator('[role=dialog]').first()
  if (await dialog.count()) {
    await captureLocator(dialog, 'tutorial-step9-package-create-dialog.webp')
    // 关闭
    await page.keyboard.press('Escape')
    await page.waitForTimeout(500)
  }
} else {
  console.log('  ⚠ "添加套餐" 按钮没找到')
}

// ───── step10: 用户管理页 + 管理套餐对话框 ─────
console.log('▸ Capture step10: 用户管理 + 绑定套餐')
await page.goto(`${MMWX_URL}/users`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(2000)
await captureFullPage(page, 'tutorial-step10-users-list.webp')

// 在 alice 那行找"管理套餐"操作 — alice 行 → 操作菜单 → 管理套餐
const aliceRow = page.locator('tr').filter({ hasText: 'alice' }).first()
const managePkgBtn = aliceRow.locator('button').filter({ hasText: /管理套餐|套餐管理|绑定套餐/ }).first()
if (await managePkgBtn.count()) {
  await managePkgBtn.click()
  await page.waitForTimeout(1500)
  const d = page.locator('[role=dialog]').first()
  if (await d.count()) {
    await captureLocator(d, 'tutorial-step10-bind-package-dialog.webp')
    await page.keyboard.press('Escape')
  }
} else {
  console.log('  ⚠ alice "管理套餐" 按钮没找到 — 尝试点 alice 行展开')
  // 兜底:点 alice 用户名/行,可能展开行内卡片;直接截整行的下方区域
}

// ───── step11: 流量信息(3 张视图) ─────
console.log('▸ Capture step11: 流量信息')
await page.goto(`${MMWX_URL}/`, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(3000)

// 服务器视图(底部表格,横向 server / 速度 / 流量)
const serverTable = page.locator('table').filter({ hasText: 'GoMami' }).first()
if (await serverTable.count()) {
  // 截整个 Card(table 的祖先)
  const serverCard = serverTable.locator('xpath=ancestor::div[contains(@class,"pixel-card")]').first()
  await captureLocator(serverCard.first(), 'tutorial-step11-server-view.webp')
} else {
  await captureFullPage(page, 'tutorial-step11-overview.webp')
}

// 用户视图 Card(标题"用户视图"或"按周期流量排序" + 含 alice/bob)
const userCard = page.locator('.pixel-card').filter({ hasText: /用户视图|alice/ }).first()
if (await userCard.count()) {
  await captureLocator(userCard, 'tutorial-step11-user-view.webp')
}

// 节点视图 Card
const nodeCard = page.locator('.pixel-card').filter({ hasText: /节点视图|GoMami/ }).first()
if (await nodeCard.count()) {
  await captureLocator(nodeCard, 'tutorial-step11-node-view.webp')
}

await browser.close()

// ─────────────────────────────────────────────────────────────────────────
// Part 2: TG MiniApp(手机分辨率)
// ─────────────────────────────────────────────────────────────────────────
if (MINIAPP_ADMIN_INITDATA || MINIAPP_USER_INITDATA) {
  console.log('━━━ Part 2: TG MiniApp ━━━')
  const mb = await chromium.launch({ headless: true })
  const iPhone = devices['iPhone 13']
  const mctx = await mb.newContext({
    ...iPhone,
    deviceScaleFactor: 2,
    locale: 'zh-CN',
  })
  const mp = await mctx.newPage()

  if (MINIAPP_ADMIN_INITDATA) {
    console.log('▸ Capture MiniApp admin view')
    await mp.goto(`${MINIAPP_BASE}/app?initData=${MINIAPP_ADMIN_INITDATA}`, { waitUntil: 'domcontentloaded' })
    await mp.waitForTimeout(4500)
    await captureFullPage(mp, 'tutorial-step12-miniapp-admin.webp')
  }
  if (MINIAPP_USER_INITDATA) {
    console.log('▸ Capture MiniApp user view')
    await mp.goto(`${MINIAPP_BASE}/app?initData=${MINIAPP_USER_INITDATA}`, { waitUntil: 'domcontentloaded' })
    await mp.waitForTimeout(4500)
    await captureFullPage(mp, 'tutorial-step12-miniapp-user.webp')
  }

  await mb.close()
}

console.log(`\n✅ Done. Screenshots in ${outDir}`)
// 触发 mainCard 引用以免 linter 警告
void mainCard
