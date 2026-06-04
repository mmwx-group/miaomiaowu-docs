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
import { navStructure } from '@/components/docs/doc-sidebar'
import { xNavStructure } from '@/components/docs/x-doc-sidebar'
import { searchIndex } from '@/generated/search-index'
import i18n from '@/i18n'

export type SearchItem = {
  title: string
  description: string
  content: string
  ngramContent: string
  href: string
  section: string
  icon: React.ComponentType<{ className?: string }>
}

type NavIcon = React.ComponentType<{ className?: string }>

function buildIconMap(
  items: { icon: NavIcon; href?: string; children?: { icon: NavIcon; href?: string; children?: unknown[] }[] }[],
): Map<string, NavIcon> {
  const map = new Map<string, NavIcon>()
  for (const item of items) {
    if (item.href && item.icon) map.set(item.href, item.icon)
    if (item.children) {
      for (const [k, v] of buildIconMap(item.children as typeof items)) map.set(k, v)
    }
  }
  return map
}

const iconMap = buildIconMap([...navStructure, ...xNavStructure] as Parameters<typeof buildIconMap>[0])

function getSectionLabel(section: string): string {
  const t = i18n.t.bind(i18n)
  if (section === 'docs') return t('search:sections.mmwDocs')
  if (section === 'x-docs') return t('search:sections.mmwxDocs')
  return t('search:sections.management')
}

export function getSearchItems(): SearchItem[] {
  const t = i18n.t.bind(i18n)

  const docItems: SearchItem[] = searchIndex.map((entry) => ({
    title: entry.pageTitle,
    description: entry.description,
    content: entry.content,
    ngramContent: entry.ngramContent ?? '',
    href: entry.href,
    section: getSectionLabel(entry.section),
    icon: iconMap.get(entry.href) ?? FileCode,
  }))

  const managementItems: SearchItem[] = [
    { title: t('layout:nav.trafficInfo'), description: '', content: '', ngramContent: '', href: '/', icon: Activity, section: t('search:sections.management') },
    { title: t('layout:nav.subscriptionLink'), description: '', content: '', ngramContent: '', href: '/subscription', icon: LinkIcon, section: t('search:sections.management') },
    { title: t('layout:nav.generateSubscription'), description: '', content: '', ngramContent: '', href: '/generator', icon: Zap, section: t('search:sections.management') },
    { title: t('layout:nav.nodeManagement'), description: '', content: '', ngramContent: '', href: '/nodes', icon: Network, section: t('search:sections.management') },
    { title: t('sidebar:mmw.subscribe-files'), description: '', content: '', ngramContent: '', href: '/subscribe-files', icon: Database, section: t('search:sections.management') },
    { title: t('sidebar:mmw.custom-rules'), description: '', content: '', ngramContent: '', href: '/custom-rules', icon: FileCode, section: t('search:sections.management') },
    { title: t('sidebar:mmw.probe'), description: '', content: '', ngramContent: '', href: '/probe', icon: Radar, section: t('search:sections.management') },
    { title: t('layout:nav.userManagement'), description: '', content: '', ngramContent: '', href: '/users', icon: Users, section: t('search:sections.management') },
    { title: t('sidebar:mmw.templates'), description: '', content: '', ngramContent: '', href: '/templates', icon: LayoutTemplate, section: t('search:sections.management') },
    { title: t('layout:nav.systemSettings'), description: '', content: '', ngramContent: '', href: '/system-settings', icon: Settings, section: t('search:sections.management') },
    { title: t('sidebar:mmw.settings'), description: '', content: '', ngramContent: '', href: '/settings', icon: Settings, section: t('search:sections.management') },
    { title: t('sidebar:mmw.edit-nodes'), description: '', content: '', ngramContent: '', href: '/generator', icon: GripVertical, section: t('search:sections.management') },
  ]

  return [...docItems, ...managementItems]
}

export const searchItems: SearchItem[] = getSearchItems()
