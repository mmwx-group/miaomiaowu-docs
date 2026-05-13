import {
  Activity,
  Database,
  FileCode,
  GripVertical,
  LayoutTemplate,
  Link as LinkIcon,
  Network,
  Radar,
  Settings,
  Users,
  Zap,
} from 'lucide-react'
import { navItems, type NavItem } from '@/components/docs/doc-sidebar'
import { xNavItems, type XNavItem } from '@/components/docs/x-doc-sidebar'
import { searchIndex } from '@/generated/search-index'

export type SearchItem = {
  title: string
  description: string
  content: string
  href: string
  section: '妙妙屋文档' | '妙妙屋X文档' | '管理功能'
  icon: React.ComponentType<{ className?: string }>
}

type NavIcon = React.ComponentType<{ className?: string }>

function buildIconMap(
  items: (NavItem | XNavItem)[],
): Map<string, NavIcon> {
  const map = new Map<string, NavIcon>()
  for (const item of items) {
    if (item.href && item.icon) map.set(item.href, item.icon)
    if (item.children) {
      for (const [k, v] of buildIconMap(item.children)) map.set(k, v)
    }
  }
  return map
}

const iconMap = buildIconMap([...navItems, ...xNavItems])

const docItems: SearchItem[] = searchIndex.map((entry) => ({
  title: entry.pageTitle,
  description: entry.description,
  content: entry.content,
  href: entry.href,
  section: entry.section === 'docs' ? '妙妙屋文档' : '妙妙屋X文档',
  icon: iconMap.get(entry.href) ?? FileCode,
}))

const managementItems: SearchItem[] = [
  { title: '流量信息', description: '管理功能', content: '', href: '/', icon: Activity, section: '管理功能' },
  { title: '订阅链接', description: '管理功能', content: '', href: '/subscription', icon: LinkIcon, section: '管理功能' },
  { title: '生成订阅', description: '管理功能', content: '', href: '/generator', icon: Zap, section: '管理功能' },
  { title: '节点管理', description: '管理功能', content: '', href: '/nodes', icon: Network, section: '管理功能' },
  { title: '订阅文件', description: '管理功能', content: '', href: '/subscribe-files', icon: Database, section: '管理功能' },
  { title: '自定义规则', description: '管理功能', content: '', href: '/custom-rules', icon: FileCode, section: '管理功能' },
  { title: '探针管理', description: '管理功能', content: '', href: '/probe', icon: Radar, section: '管理功能' },
  { title: '用户管理', description: '管理功能', content: '', href: '/users', icon: Users, section: '管理功能' },
  { title: '模板管理', description: '管理功能', content: '', href: '/templates', icon: LayoutTemplate, section: '管理功能' },
  { title: '系统设置', description: '管理功能', content: '', href: '/system-settings', icon: Settings, section: '管理功能' },
  { title: '用户设置', description: '管理功能', content: '', href: '/settings', icon: Settings, section: '管理功能' },
  { title: '节点与代理组编辑', description: '管理功能', content: '', href: '/generator', icon: GripVertical, section: '管理功能' },
]

export const searchItems: SearchItem[] = [
  ...docItems,
  ...managementItems,
]
