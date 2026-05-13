import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const docDirs = [
  { dir: path.join(rootDir, 'src/routes/docs'), section: 'docs' },
  { dir: path.join(rootDir, 'src/routes/x/docs'), section: 'x-docs' },
]

function extractTitle(content) {
  const match = content.match(/(?:DocLayout|XDocLayout)\s[^>]*?title\s*=\s*['"]([^'"]+)['"]/)
  return match ? match[1] : ''
}

function extractDescription(content) {
  const match = content.match(/(?:DocLayout|XDocLayout)\s[^>]*?description\s*=\s*['"]([^'"]+)['"]/)
  if (match) return match[1]
  const multiLine = content.match(/(?:DocLayout|XDocLayout)\s[\s\S]*?description\s*=\s*['"]([^'"]+)['"]/)
  return multiLine ? multiLine[1] : ''
}

function extractHref(content) {
  const match = content.match(/createFileRoute\(\s*['"]([^'"]+)['"]\s*\)/)
  return match ? match[1] : ''
}

function extractTextContent(content) {
  // Only process the JSX return block — find the DocLayout/XDocLayout content
  const layoutMatch = content.match(/<(?:DocLayout|XDocLayout)[\s\S]*$/m)
  if (!layoutMatch) return ''
  let text = layoutMatch[0]

  // Remove JSX comments {/* ... */}
  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

  // Remove HTML/JSX comments <!-- -->
  text = text.replace(/<!--[\s\S]*?-->/g, '')

  // Remove inline code block content (pre/code with template literals)
  text = text.replace(/<pre[^>]*>\s*\{`[\s\S]*?`\}\s*<\/pre>/g, '')

  // Remove className and other JSX attributes
  text = text.replace(/\s+(?:className|onClick|onChange|onSelect|href|target|rel|aria-\w+|style|key|ref|id|src|alt|title|disabled|placeholder|value|type|name|htmlFor|tabIndex|role|data-\w+)\s*=\s*(?:\{[^}]*\}|'[^']*'|"[^"]*")/g, '')

  // Remove activeProps, activeOptions etc.
  text = text.replace(/\s+(?:activeProps|activeOptions|asChild)\s*=\s*\{[\s\S]*?\}/g, '')

  // Remove self-closing component tags (icons, etc.)
  text = text.replace(/<(?:[A-Z]\w+)\s*[^>]*?\/>/g, '')

  // Remove opening and closing tags but keep content between them
  text = text.replace(/<\/?(?:div|span|section|article|aside|header|footer|main|nav|ul|ol|li|p|h[1-6]|table|thead|tbody|tr|td|th|Card|CardContent|CardHeader|CardTitle|CardDescription|Button|Badge|Alert|AlertDescription|Tabs|TabsList|TabsTrigger|TabsContent|Collapsible|CollapsibleTrigger|CollapsibleContent|Link|code|pre|strong|em|br|hr|img|a)\b[^>]*>/gi, ' ')

  // Remove remaining JSX component tags
  text = text.replace(/<\/?[A-Z]\w*[^>]*>/g, ' ')
  text = text.replace(/<\/?[a-z]\w*[^>]*>/g, ' ')

  // Remove JSX expression containers but keep string content
  text = text.replace(/\{(['"`])([^'"`]*)\1\}/g, '$2')

  // Remove remaining curly brace expressions that look like code
  text = text.replace(/\{[^}]*\}/g, ' ')

  // Remove template literal markers
  text = text.replace(/[`]/g, '')

  // Clean up: collapse whitespace, remove empty lines
  text = text.replace(/[ \t]+/g, ' ')
  text = text.replace(/\n\s*\n/g, '\n')
  text = text.split('\n').map(l => l.trim()).filter(l => l.length > 0).join(' ')

  // Remove stray punctuation and symbols
  text = text.replace(/\s+([•·])\s+/g, ' ')

  return text.trim()
}

function extractSections(content) {
  const sections = []
  // Find h2 headings and their content
  const h2Pattern = /<h2[^>]*>([\s\S]*?)<\/h2>/gi
  const h2Matches = [...content.matchAll(h2Pattern)]

  if (h2Matches.length === 0) return sections

  for (let i = 0; i < h2Matches.length; i++) {
    const headingContent = h2Matches[i][1]
    // Extract text from heading (remove tags and attributes)
    let heading = headingContent
      .replace(/<[^>]+>/g, '')
      .replace(/\{[^}]*\}/g, '')
      .replace(/\s+/g, ' ')
      .trim()

    if (!heading) continue

    // Get content between this h2 and the next h2
    const startIdx = h2Matches[i].index + h2Matches[i][0].length
    const endIdx = i + 1 < h2Matches.length ? h2Matches[i + 1].index : content.length

    const sectionContent = content.slice(startIdx, endIdx)
    let sectionText = sectionContent
      .replace(/<[^>]+>/g, ' ')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      .replace(/\{[^}]*\}/g, ' ')
      .replace(/[`]/g, '')
      .replace(/\s+/g, ' ')
      .trim()

    if (sectionText) {
      sections.push({ heading, text: sectionText })
    }
  }

  return sections
}

function processFile(filePath, section) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const href = extractHref(content)
  if (!href) return null

  const pageTitle = extractTitle(content)
  const description = extractDescription(content)
  const fullText = extractTextContent(content)
  const sections = extractSections(content)

  if (!pageTitle && !fullText) return null

  return {
    href,
    pageTitle: pageTitle || path.basename(filePath, '.tsx'),
    description,
    section,
    content: fullText,
    sections,
  }
}

// Main
const entries = []

for (const { dir, section } of docDirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).sort()
  for (const file of files) {
    const filePath = path.join(dir, file)
    const entry = processFile(filePath, section)
    if (entry) entries.push(entry)
  }
}

// Generate TypeScript output
const outputPath = path.join(rootDir, 'src/generated/search-index.ts')

const tsContent = `// Auto-generated by scripts/generate-search-index.mjs
// Do not edit manually

export type SearchEntry = {
  href: string
  pageTitle: string
  description: string
  section: 'docs' | 'x-docs'
  content: string
  sections: Array<{ heading: string; text: string }>
}

export const searchIndex: SearchEntry[] = ${JSON.stringify(entries, null, 2)}
`

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, tsContent, 'utf-8')

console.log(`Generated search index: ${entries.length} pages indexed`)
for (const entry of entries) {
  const contentLen = entry.content.length
  const sectionCount = entry.sections.length
  console.log(`  ${entry.section.padEnd(6)} ${entry.href.padEnd(35)} ${entry.pageTitle.padEnd(15)} ${contentLen} chars, ${sectionCount} sections`)
}
