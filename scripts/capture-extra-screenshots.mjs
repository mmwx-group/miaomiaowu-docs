#!/usr/bin/env node
// capture-extra-screenshots.mjs
//
// 给妙妙屋X 文档其他常用页面补截图(subscribe-files / generator / custom-rules / templates /
// system-settings 概览 / update dialog)。仍走本地 mmwx + Playwright + sharp webp。

import { chromium } from 'playwright'
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

fs.mkdirSync(outDir, { recursive: true })

async function saveWebp(buf, fileName, note = '') {
  const out = path.join(outDir, fileName)
  await sharp(buf).webp({ quality: 80 }).toFile(out)
  const size = (fs.statSync(out).size / 1024).toFixed(1)
  console.log(`  ✓ ${fileName}  ${size} KB ${note}`)
}

const captureFullPage = async (page, fn) => saveWebp(await page.screenshot({ type: 'png', fullPage: true }), fn, '(full)')
const captureLocator = async (loc, fn) => {
  await loc.scrollIntoViewIfNeeded()
  await loc.page().waitForTimeout(400)
  return saveWebp(await loc.screenshot({ type: 'png' }), fn)
}

const browser = await chromium.launch({ headless: true })
const targetPort = new URL(MMWX_URL).port || '80'
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  locale: 'zh-CN',
  extraHTTPHeaders: { 'Accept-Language': 'zh-CN,zh;q=0.9' },
})
await ctx.route('**/*', async (route) => {
  const u = route.request().url()
  if (['in.miaomiaowu.net', 'gh-proxy.com', 'raw.githubusercontent.com', 'fonts.gstatic.com'].some((d) => u.includes(d))) return route.abort()
  if (u.includes(':12889/')) return route.continue({ url: u.replace(':12889/', `:${targetPort}/`) })
  return route.continue()
})

const page = await ctx.newPage()
console.log(`▸ Login as ${MMWX_USER}`)
await page.goto(`${MMWX_URL}/login`, { waitUntil: 'domcontentloaded' })
await page.waitForSelector('#username', { timeout: 10000 })
await page.locator('#username').fill(MMWX_USER)
await page.locator('#password').fill(MMWX_PASS)
await Promise.all([
  page.waitForResponse((r) => r.url().includes('/api/login') && r.request().method() === 'POST', { timeout: 15000 }),
  page.locator('button[type=submit]').click(),
])
await page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 10000 })
console.log('  ✓ logged in')

const pages = [
  { url: '/subscribe-files', file: 'doc-subscribe-files-list.webp', wait: 2500 },
  { url: '/generator',       file: 'doc-generator-page.webp',       wait: 2500 },
  { url: '/custom-rules',    file: 'doc-custom-rules-page.webp',    wait: 2500 },
  { url: '/templates',       file: 'doc-templates-page.webp',       wait: 2500 },
  { url: '/system-settings', file: 'doc-system-settings-overview.webp', wait: 3000 },
  { url: '/xray-servers',    file: 'doc-xray-servers-page.webp',    wait: 2500 },
  { url: '/nodes',           file: 'doc-nodes-page.webp',           wait: 2500 },
]

for (const p of pages) {
  console.log(`▸ ${p.url}`)
  try {
    await page.goto(`${MMWX_URL}${p.url}`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(p.wait)
    await captureFullPage(page, p.file)
  } catch (e) {
    console.log(`  ⚠ ${p.url} failed: ${e.message?.slice(0, 200)}`)
  }
}

// 检查更新对话框 — 点开个人菜单 → 检查更新
console.log('▸ Update dialog')
try {
  await page.goto(`${MMWX_URL}/`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1500)
  // 个人菜单 trigger 是头部右上 Avatar 按钮
  const avatarBtn = page.locator('button[aria-label]').filter({ hasText: 'Admin' }).first()
  if (await avatarBtn.count()) {
    await avatarBtn.click()
    await page.waitForTimeout(800)
    const checkUpdateItem = page.locator('[role=menuitem]').filter({ hasText: /检查更新|Check.*Update/ }).first()
    if (await checkUpdateItem.count()) {
      await checkUpdateItem.click()
      await page.waitForTimeout(2500)
      const dialog = page.locator('[role=dialog]').first()
      if (await dialog.count()) {
        await captureLocator(dialog, 'doc-update-dialog.webp')
      }
    } else {
      console.log('  ⚠ 找不到「检查更新」菜单项')
    }
  } else {
    console.log('  ⚠ 找不到头像菜单按钮')
  }
} catch (e) {
  console.log(`  ⚠ update dialog failed: ${e.message?.slice(0, 200)}`)
}

await browser.close()
console.log('\n✅ Done')
