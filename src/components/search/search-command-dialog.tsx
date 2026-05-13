import { useState, useEffect, useMemo, useCallback } from 'react'
import Fuse from 'fuse.js'
import { useNavigate } from '@tanstack/react-router'
import { searchItems, type SearchItem } from '@/lib/search-data'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'

const SECTIONS = ['妙妙屋文档', '妙妙屋X文档', '管理功能'] as const

function getSnippet(content: string, query: string, maxLen = 60): string {
  if (!content || !query) return ''
  const lower = content.toLowerCase()
  const qLower = query.toLowerCase()
  const idx = lower.indexOf(qLower)
  if (idx === -1) return ''
  const start = Math.max(0, idx - 20)
  const end = Math.min(content.length, idx + query.length + maxLen - 20)
  let snippet = content.slice(start, end)
  if (start > 0) snippet = '...' + snippet
  if (end < content.length) snippet = snippet + '...'
  return snippet
}

export function SearchCommandDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const fuse = useMemo(
    () =>
      new Fuse(searchItems, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'description', weight: 1.5 },
          { name: 'content', weight: 1 },
        ],
        threshold: 0.3,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    []
  )

  const results = useMemo(() => {
    if (!query.trim()) return searchItems
    return fuse.search(query).map((r) => r.item)
  }, [query, fuse])

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {}
    for (const section of SECTIONS) {
      const items = results.filter((r) => r.section === section)
      if (items.length > 0) groups[section] = items
    }
    return groups
  }, [results])

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false)
      setQuery('')
      navigate({ to: href })
    },
    [navigate]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const onOpenSearch = () => setOpen(true)
    document.addEventListener('open-search', onOpenSearch)
    return () => document.removeEventListener('open-search', onOpenSearch)
  }, [])

  const handleOpenChange = useCallback((value: boolean) => {
    setOpen(value)
    if (!value) setQuery('')
  }, [])

  const trimmedQuery = query.trim()

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogHeader className='sr-only'>
        <DialogTitle>搜索</DialogTitle>
        <DialogDescription>搜索文档和功能页面</DialogDescription>
      </DialogHeader>
      <DialogContent className='overflow-hidden p-0 sm:max-w-lg' showCloseButton={false}>
        <Command shouldFilter={false} className='[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0'>
          <CommandInput
            placeholder='搜索文档和功能...'
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className='max-h-[360px]'>
            <CommandEmpty>没有找到相关结果</CommandEmpty>
            {Object.entries(groupedResults).map(([section, items], idx) => (
              <div key={section}>
                {idx > 0 && <CommandSeparator />}
                <CommandGroup heading={section}>
                  {items.map((item) => {
                    const snippet = trimmedQuery ? getSnippet(item.content, trimmedQuery) : ''
                    return (
                      <CommandItem
                        key={item.href}
                        value={item.href}
                        onSelect={() => handleSelect(item.href)}
                        className='cursor-pointer'
                      >
                        <item.icon className='size-4 shrink-0' />
                        <div className='flex flex-col min-w-0'>
                          <span>{item.title}</span>
                          {snippet && (
                            <span className='text-xs text-muted-foreground truncate'>
                              {snippet}
                            </span>
                          )}
                        </div>
                        {!snippet && item.description && (
                          <span className='ml-auto text-xs text-muted-foreground truncate'>
                            {item.description}
                          </span>
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </div>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
