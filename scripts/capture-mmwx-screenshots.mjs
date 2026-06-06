#!/usr/bin/env node
// capture-mmwx-screenshots.mjs
//
// 用 Playwright 自动登录生产 mmwx 主控,截图系统设置 / 登录页几张关键 Card,转 webp 落地到
// public/images/screenshots/。给 docs 项目两篇教程页(tool-mmwx-tgbot, tool-cloudflare-turnstile)
// 配图用。
//
// 使用:
//   MMWX_URL=https://mmwx.tty.mom MMWX_USER=admin MMWX_PASS=12345678 \
//     node scripts/capture-mmwx-screenshots.mjs
//
// Turnstile widget 截图临时配 CF 官方测试 key(永远 PASS),截完清空恢复未启用。

import { chromium } from 'playwright'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outDir = path.join(rootDir, 'public/images/screenshots')

const MMWX_URL = (process.env.MMWX_URL || '').replace(/\/$/, '')
const MMWX_USER = process.env.MMWX_USER
const MMWX_PASS = process.env.MMWX_PASS
if (!MMWX_URL || !MMWX_USER || !MMWX_PASS) {
  console.error('Missing env: MMWX_URL / MMWX_USER / MMWX_PASS')
  process.exit(1)
}

// CF 官方测试 key — 永远 PASS,只用于截图,生产端不需要真账号
const CF_TEST_SITE_KEY = '1x00000000000000000000AA'
const CF_TEST_SECRET_KEY = '1x0000000000000000000000000000000AA'

fs.mkdirSync(outDir, { recursive: true })

// 截一个 Card 并转 webp 落地。Playwright Locator.screenshot 返回 buffer,sharp 转 webp。
async function captureCard(locator, fileName, padding = 8) {
  const buf = await locator.screenshot({ type: 'png' })
  const outPath = path.join(outDir, fileName)
  await sharp(buf).webp({ quality: 80 }).toFile(outPath)
  const size = (fs.statSync(outPath).size / 1024).toFixed(1)
  console.log(`  ✓ ${fileName}  ${size} KB`)
}

// 找 CardTitle 文本所在的最近 shadcn Card 容器(.rounded-xl + .border + .shadow 类组合)。
function cardByTitle(page, title) {
  // shadcn Card 渲染 .pixel-card.border.bg-card,标题在 .text-xl.font-semibold 里
  return page.locator('.pixel-card').filter({ hasText: title }).first()
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,                       // retina 截图,清晰度高
  locale: 'zh-CN',                            // 让 i18next 走中文,Card 标题显示中文
  extraHTTPHeaders: { 'Accept-Language': 'zh-CN,zh;q=0.9' },
})
const page = await context.newPage()

// 前端 axios baseURL 当 hostname=localhost 时硬编码 :12889。本地 mmwx 跑在自定义端口
// (MMWX_URL 解析出来),需要把所有 :12889 API 请求重写到 MMWX_URL 端口上。
const targetUrl = new URL(MMWX_URL)
const targetPort = targetUrl.port || (targetUrl.protocol === 'https:' ? '443' : '80')

await context.route('**/*', async (route) => {
  const url = route.request().url()

  // 拦掉拖慢 SPA 启动的外部资源(analytics / 远程字体 / GitHub 配置)
  const blocked = ['in.miaomiaowu.net', 'gh-proxy.com', 'raw.githubusercontent.com', 'fonts.googleapis.com', 'fonts.gstatic.com']
  if (blocked.some((d) => url.includes(d))) return route.abort()

  // hardcoded :12889 API → 重写到本地实际端口
  if (url.includes(':12889/')) {
    const rewritten = url.replace(':12889/', `:${targetPort}/`)
    return route.continue({ url: rewritten })
  }
  return route.continue()
})

console.log(`▸ Login as ${MMWX_USER} → ${MMWX_URL}`)
await page.goto(`${MMWX_URL}/login`, { waitUntil: 'domcontentloaded' })
await page.waitForSelector('#username', { timeout: 10000 })
// 用 locator + 模拟真实输入 — react-hook-form 注册依赖 onChange 事件
await page.locator('#username').click()
await page.locator('#username').fill(MMWX_USER)
await page.locator('#password').click()
await page.locator('#password').fill(MMWX_PASS)
// 监听一次 /api/login 响应,准确判断成功失败 — 不依赖 URL 跳转
const loginResp = page.waitForResponse(
  (r) => r.url().includes('/api/login') && r.request().method() === 'POST',
  { timeout: 15000 }
)
await page.locator('button[type=submit]').click()
const resp = await loginResp
if (!resp.ok()) {
  await page.screenshot({ path: '/tmp/mmwx-shot-debug-login.png' })
  throw new Error(`login failed: ${resp.status()} ${await resp.text()}`)
}
await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 10000 })
console.log('  ✓ logged in')

// 等首屏稳一会
await page.waitForLoadState('networkidle')

// ============== 系统设置页 ==============
console.log(`▸ Open /system-settings`)
await page.goto(`${MMWX_URL}/system-settings`, { waitUntil: 'networkidle' })
await page.waitForLoadState('networkidle')
// 等所有 Card 渲染完;部分 Card 走 useQuery 异步
await page.waitForTimeout(2000)

// ───── 截图 1: API Token Card ─────
console.log('▸ Capture #1: API Token card')
const apiTokenCard = cardByTitle(page, 'API Token')
await apiTokenCard.scrollIntoViewIfNeeded()
await page.waitForTimeout(500)
await captureCard(apiTokenCard, 'system-settings-api-token.webp')

// ───── 截图 2: Turnstile Card 未填 ─────
console.log('▸ Capture #2: Turnstile card (empty)')
const turnstileCard = cardByTitle(page, 'Cloudflare 人机验证')
await turnstileCard.scrollIntoViewIfNeeded()
await page.waitForTimeout(500)
// 先确保两 key 输入框是空(防上次脚本残留)
const siteKeyInput = page.locator('#turnstile-site-key')
const secretKeyInput = page.locator('#turnstile-secret-key')
await siteKeyInput.fill('')
await siteKeyInput.blur()  // 触发 saveSecurityConfig
await page.waitForTimeout(300)
await secretKeyInput.fill('')
await secretKeyInput.blur()
await page.waitForTimeout(800)
await captureCard(turnstileCard, 'system-settings-turnstile-empty.webp')

// ───── 截图 3: Turnstile Card 已填测试 key ─────
console.log('▸ Capture #3: Turnstile card (filled with CF test key)')
await siteKeyInput.fill(CF_TEST_SITE_KEY)
await siteKeyInput.blur()
await page.waitForTimeout(500)
await secretKeyInput.fill(CF_TEST_SECRET_KEY)
await secretKeyInput.blur()
// 等 PUT 完 + GET 返回(secret 会变 masked)
await page.waitForTimeout(1500)
await captureCard(turnstileCard, 'system-settings-turnstile-filled.webp')

// ───── 截图 4: 登录页 + Turnstile widget ─────
console.log('▸ Capture #4: login page with Turnstile widget')
// 登出 → 重开登录页
await context.clearCookies()
// 也清 localStorage(auth-store)
await page.evaluate(() => localStorage.clear())
await page.goto(`${MMWX_URL}/login`, { waitUntil: 'networkidle' })
// CF widget 加载需要时间
await page.waitForTimeout(4000)
// 截整张登录卡片
const loginCard = page.locator('.pixel-card').filter({ hasText: '登录妙妙屋' }).first()
await captureCard(loginCard, 'login-page-with-widget.webp')

// ───── 收尾: 清空 Turnstile key,恢复生产环境未启用状态 ─────
console.log('▸ Cleanup: clear Turnstile keys back to empty')
// 重新登录(刚才清了 cookies)
await page.goto(`${MMWX_URL}/login`, { waitUntil: 'networkidle' })
await page.fill('input[name=username]', MMWX_USER)
await page.fill('input[name=password]', MMWX_PASS)
// 登录页此时也有 widget,因为 key 还在 — 但 CF 测试 key 自动 PASS,token 自动注入
// 等 widget 自动 callback(测试 key 通常 <2s 给 token)
await page.waitForTimeout(3500)
await page.click('button[type=submit]')
await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 15000 })

await page.goto(`${MMWX_URL}/system-settings`, { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)
await siteKeyInput.fill('')
await siteKeyInput.blur()
await page.waitForTimeout(300)
await secretKeyInput.fill('')
await secretKeyInput.blur()
await page.waitForTimeout(800)
console.log('  ✓ keys cleared')

await browser.close()
console.log(`\n✅ Done. 4 screenshots in ${outDir}`)
