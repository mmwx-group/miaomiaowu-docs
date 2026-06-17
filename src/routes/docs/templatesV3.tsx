import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { DocLayout } from '@/components/docs/doc-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import {
  Plus,
  Pencil,
  Sparkles,
  Shield,
  FileCode,
  Globe,
  Settings,
  Database,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Filter,
  Layers,
  MapPin,
  Link2,
  RefreshCw,
  Upload,
  FileText,
  Zap,
  Lightbulb,
} from 'lucide-react'

export const Route = createFileRoute('/docs/templatesV3')({
  component: TemplatesV3DocPage,
})

// V3 模板示例
const v3TemplateExample = `port: 7890
socks-port: 7891
allow-lan: true
mode: rule
log-level: info
external-controller: 127.0.0.1:9090

dns:
  enable: true
  ipv6: true
  enhanced-mode: fake-ip
  nameserver:
    - https://223.5.5.5/dns-query
    - https://120.53.53.53/dns-query

proxies:

proxy-groups:
  - name: 🚀 手动选择
    type: select
    include-all: true
    proxies:
      - ♻️ 自动选择
      - __PROXY_PROVIDERS__
      - __PROXY_NODES__
      - 🌄 落地节点
      - 🇭🇰 香港节点
  - name: ♻️ 自动选择
    type: url-test
    include-all: true
    proxies:
      - __PROXY_PROVIDERS__
      - __PROXY_NODES__
    url: https://cp.cloudflare.com/generate_204
    interval: 300
    tolerance: 50
  - name: 🌠 中转节点
    type: select
    include-all: true
    filter: 中转|CO|co
    proxies:
      - __PROXY_PROVIDERS__
      - __PROXY_NODES__
  - name: 🌄 落地节点
    type: select
    include-all: true
    filter: LD|落地|Bage|bage|jinx|ctc|Jinx|JINX|CTC|Luodi|luodi|LUODI|zouter|legend|Alice|alice
    dialer-proxy-group: 🌠 中转节点
    proxies:
      - __PROXY_PROVIDERS__
      - __PROXY_NODES__
  - name: 🎯 全球直连
    type: select
    proxies:
      - DIRECT

rules:
  - GEOSITE,private,🎯 全球直连
  - GEOIP,private,🎯 全球直连,no-resolve
  - GEOSITE,cn,🎯 全球直连
  - GEOIP,cn,🎯 全球直连,no-resolve
  - MATCH,🚀 节点选择`

// 代理组配置示例
const proxyGroupExample = `- name: 🚀 节点选择
  type: select
  include-all-proxies: true        # 引入所有代理节点
  include-region-proxy-groups: true # 引入区域代理组
  filter: "港|HK|Hong Kong"        # 筛选包含关键词的节点
  exclude-filter: "过期|到期"       # 排除包含关键词的节点
  include-type: "vmess|vless|trojan" # 只引入指定类型的节点
  exclude-type: "ss|ssr"           # 排除指定类型的节点`

const proxyGroupExampleResult = `- name: 🚀 手动选择
  type: select
  proxies:
    - ♻️ 自动选择
    - 🇭🇰 香港01
    - ... 命中filter的节点
    - 🌄 落地节点
    - 🇭🇰 香港节点
    - 🇺🇸 美国节点
    - 🇯🇵 日本节点
    - 🇸🇬 新加坡节点
    - 🇼🇸 台湾节点
    - 🇰🇷 韩国节点
    - 🇨🇦 加拿大节点
    - 🇬🇧 英国节点
    - 🇫🇷 法国节点
    - 🇩🇪 德国节点
    - 🇳🇱 荷兰节点
    - 🇹🇷 土耳其节点
    - 🌐 其他地区`

// 场景 1:自动同步全部节点
const scenario1Code = `proxy-groups:
  - name: 🚀 全部节点
    type: select
    include-all: true   # 引入所有出站节点 + 代理集合
    proxies:
      - __PROXY_NODES__   # 占位符,生成时自动展开
`

// 场景 2:按地区分组(手动写 filter)
const scenario2Code = `proxy-groups:
  - name: 🇭🇰 香港节点
    type: url-test
    include-all: true
    filter: 'HK|香港|Hong Kong'   # 匹配名字含 HK / 香港 等的节点
    url: https://cp.cloudflare.com/generate_204
    interval: 300
  - name: 🇯🇵 日本节点
    type: url-test
    include-all: true
    filter: 'JP|日本|Japan'
    url: https://cp.cloudflare.com/generate_204
    interval: 300
`

// 场景 3:排除测试 / 失效节点
const scenario3Code = `proxy-groups:
  - name: 🚀 可用节点
    type: select
    include-all: true
    exclude-filter: '测试|TEST|故障|失效|DEAD'   # 这些关键词都跳过
    proxies:
      - __PROXY_NODES__
`

// 场景 4:按协议类型筛选
const scenario4Code = `proxy-groups:
  - name: 🚀 VLESS-Only
    type: select
    include-all: true
    include-type: 'vless|vmess'   # 只引入这两种协议(| 分隔)
    proxies:
      - __PROXY_NODES__

  - name: 🚀 不要 SS
    type: select
    include-all: true
    exclude-type: 'ss|hysteria'   # 排除这两种协议
    proxies:
      - __PROXY_NODES__
`

// 场景 5:中转代理(链式)
const scenario5Code = `proxy-groups:
  - name: 🚇 中转入口
    type: select
    include-all: true
    filter: 'JP|日本'   # 中转选日本节点

  - name: 🏠 香港落地
    type: select
    include-all: true
    filter: 'HK|香港'
    dialer-proxy: 🚇 中转入口   # 关键:本组节点的流量先经中转入口
`

function CollapsibleCode({ title, code, language }: { title: string; code: string; language: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='border rounded-lg overflow-hidden'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted/70 transition-colors text-left'
      >
        <span className='font-medium text-sm'>{title}</span>
        {isExpanded ? <ChevronUp className='size-4' /> : <ChevronDown className='size-4' />}
      </button>
      {isExpanded && (
        <div className='max-h-96 overflow-auto'>
          <pre className='p-4 text-xs bg-muted/30 overflow-x-auto'>
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}

function TemplatesV3DocPage() {
  const { t } = useTranslation('docs')

  return (
    <DocLayout
      title={t('templatesV3.title')}
      description={t('templatesV3.description')}
    >
      {/* 前置条件 */}
      <section className='mb-8'>
        <Card className='border-primary/20 bg-primary/5'>
          <CardContent className='pt-6'>
            <div className='flex items-start gap-3'>
              <Settings className='size-5 text-primary mt-0.5' />
              <div>
                <h4 className='font-semibold text-sm mb-1'>{t('templatesV3.prerequisite.title')}</h4>
                <p className='text-sm text-muted-foreground'>
                  {t('templatesV3.prerequisite.desc1')}
                  <Link to='/docs/system-settings' className='text-primary hover:underline mx-1'>
                    {t('templatesV3.prerequisite.settingsLink')}
                  </Link>
                  {t('templatesV3.prerequisite.desc2')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 功能介绍 */}
      <section className='mb-8'>
        <Card className='bg-muted/30'>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              {t('templatesV3.intro')}
            </p>
            <div className='flex gap-2 flex-wrap'>
              <Badge variant='destructive'>{t('templatesV3.adminFeature')}</Badge>
              <Badge variant='secondary'>{t('templatesV3.mihomoCompat')}</Badge>
              <Badge variant='outline'>{t('templatesV3.visualEdit')}</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 版本对比 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Layers className='size-5 text-primary' />
          {t('templatesV3.versionCompare.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              {t('templatesV3.versionCompare.desc1')}
              <Link to='/docs/system-settings' className='text-primary hover:underline mx-1'>
                {t('templatesV3.versionCompare.settingsLink')}
              </Link>
              {t('templatesV3.versionCompare.desc2')}
            </p>
            <div className='space-y-4'>
              <div className='bg-muted/30 rounded-lg p-4 border-l-4 border-gray-400'>
                <div className='flex items-center gap-2 mb-2'>
                  <FolderOpen className='size-4 text-gray-500' />
                  <h4 className='font-semibold text-sm'>{t('templatesV3.versionCompare.v1Title')}</h4>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {t('templatesV3.versionCompare.v1Desc')}
                </p>
              </div>
              <div className='bg-muted/30 rounded-lg p-4 border-l-4 border-blue-500'>
                <div className='flex items-center gap-2 mb-2'>
                  <Database className='size-4 text-blue-500' />
                  <h4 className='font-semibold text-sm'>{t('templatesV3.versionCompare.v2Title')}</h4>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {t('templatesV3.versionCompare.v2Desc')}
                </p>
              </div>
              <div className='bg-muted/30 rounded-lg p-4 border-l-4 border-green-500'>
                <div className='flex items-center gap-2 mb-2'>
                  <Zap className='size-4 text-green-500' />
                  <h4 className='font-semibold text-sm'>{t('templatesV3.versionCompare.v3Title')}</h4>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {t('templatesV3.versionCompare.v3Desc')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 核心概念 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Sparkles className='size-5 text-primary' />
          {t('templatesV3.coreConcepts.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              {t('templatesV3.coreConcepts.desc')}
            </p>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='bg-primary/5 rounded-lg p-4 border border-primary/20'>
                <h4 className='font-semibold text-sm mb-2'>{t('templatesV3.coreConcepts.includeTitle')}</h4>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• <code className='bg-muted px-1 rounded'>include-all</code> - {t('templatesV3.coreConcepts.includeAll')}</li>
                  <li>• <code className='bg-muted px-1 rounded'>include-all-proxies</code> - {t('templatesV3.coreConcepts.includeAllProxies')}</li>
                  <li>• <code className='bg-muted px-1 rounded'>include-all-providers</code> - {t('templatesV3.coreConcepts.includeAllProviders')}</li>
                  <li>• <code className='bg-muted px-1 rounded'>include-type</code> - {t('templatesV3.coreConcepts.includeType')}</li>
                </ul>
              </div>
              <div className='bg-primary/5 rounded-lg p-4 border border-primary/20'>
                <h4 className='font-semibold text-sm mb-2'>{t('templatesV3.coreConcepts.filterTitle')}</h4>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• <code className='bg-muted px-1 rounded'>filter</code> - {t('templatesV3.coreConcepts.filter')}</li>
                  <li>• <code className='bg-muted px-1 rounded'>exclude-filter</code> - {t('templatesV3.coreConcepts.excludeFilter')}</li>
                  <li>• <code className='bg-muted px-1 rounded'>exclude-type</code> - {t('templatesV3.coreConcepts.excludeType')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 代理组配置属性 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Filter className='size-5 text-primary' />
          {t('templatesV3.configAttrs.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <div className='space-y-6'>
              {/* 基础属性 */}
              <div>
                <h4 className='font-semibold mb-3'>{t('templatesV3.configAttrs.basicTitle')}</h4>
                <div className='overflow-x-auto'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.attrCol')}</th>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.typeCol')}</th>
                        <th className='text-left py-2'>{t('templatesV3.configAttrs.descCol')}</th>
                      </tr>
                    </thead>
                    <tbody className='text-muted-foreground'>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>name</code></td>
                        <td className='py-2 pr-4'>string</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.nameDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>type</code></td>
                        <td className='py-2 pr-4'>string</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.typeDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>proxies</code></td>
                        <td className='py-2 pr-4'>array</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.proxiesDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>icon</code></td>
                        <td className='py-2 pr-4'>string</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.iconDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>hidden</code></td>
                        <td className='py-2 pr-4'>boolean</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.hiddenDesc')}</td>
                      </tr>
                      </tbody>
                      </table>                </div>
              </div>

              {/* 引入属性 */}
              <div>
                <h4 className='font-semibold mb-3'>{t('templatesV3.configAttrs.includeTitle')}</h4>
                <div className='overflow-x-auto'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.attrCol')}</th>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.typeCol')}</th>
                        <th className='text-left py-2'>{t('templatesV3.configAttrs.descCol')}</th>
                      </tr>
                    </thead>
                    <tbody className='text-muted-foreground'>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>include-all</code></td>
                        <td className='py-2 pr-4'>boolean</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.includeAllDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>include-all-proxies</code></td>
                        <td className='py-2 pr-4'>boolean</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.includeAllProxiesDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>include-all-providers</code></td>
                        <td className='py-2 pr-4'>boolean</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.includeAllProvidersDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>include-type</code></td>
                        <td className='py-2 pr-4'>string</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.includeTypeDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>include-region-proxy-groups</code></td>
                        <td className='py-2 pr-4'>boolean</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.includeRegionDesc')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 筛选属性 */}
              <div>
                <h4 className='font-semibold mb-3'>{t('templatesV3.configAttrs.filterAttrTitle')}</h4>
                <div className='overflow-x-auto'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.attrCol')}</th>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.typeCol')}</th>
                        <th className='text-left py-2'>{t('templatesV3.configAttrs.descCol')}</th>
                      </tr>
                    </thead>
                    <tbody className='text-muted-foreground'>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>filter</code></td>
                        <td className='py-2 pr-4'>string</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.filterDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>exclude-filter</code></td>
                        <td className='py-2 pr-4'>string</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.excludeFilterDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>exclude-type</code></td>
                        <td className='py-2 pr-4'>string</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.excludeTypeDesc')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 中转代理组 */}
              <div>
                <h4 className='font-semibold mb-3'>{t('templatesV3.configAttrs.relayTitle')}</h4>
                <div className='overflow-x-auto'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.attrCol')}</th>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.typeCol')}</th>
                        <th className='text-left py-2'>{t('templatesV3.configAttrs.descCol')}</th>
                      </tr>
                    </thead>
                    <tbody className='text-muted-foreground'>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>dialer-proxy-group</code></td>
                        <td className='py-2 pr-4'>string</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.dialerProxyDesc')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='bg-muted/30 rounded-lg p-4 mt-3'>
                  <p className='text-xs text-muted-foreground'>
                    {t('templatesV3.configAttrs.dialerProxyNote')}
                  </p>
                </div>
              </div>

              {/* 测速属性 */}
              <div>
                <h4 className='font-semibold mb-3'>{t('templatesV3.configAttrs.speedTestTitle')}</h4>
                <div className='overflow-x-auto'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.attrCol')}</th>
                        <th className='text-left py-2 pr-4'>{t('templatesV3.configAttrs.typeCol')}</th>
                        <th className='text-left py-2'>{t('templatesV3.configAttrs.descCol')}</th>
                      </tr>
                    </thead>
                    <tbody className='text-muted-foreground'>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>url</code></td>
                        <td className='py-2 pr-4'>string</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.urlDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>interval</code></td>
                        <td className='py-2 pr-4'>number</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.intervalDesc')}</td>
                      </tr>
                      <tr className='border-b'>
                        <td className='py-2 pr-4'><code className='bg-muted px-1 rounded'>tolerance</code></td>
                        <td className='py-2 pr-4'>number</td>
                        <td className='py-2'>{t('templatesV3.configAttrs.toleranceDesc')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* YAML 变量 */}
              <div>
                <h4 className='font-semibold mb-3'>{t('templatesV3.configAttrs.yamlVarTitle')}</h4>
                <div className='bg-muted/30 rounded-lg p-4'>
                  <p className='text-xs text-muted-foreground mb-3'>
                    {t('templatesV3.configAttrs.yamlVarDesc')}
                  </p>
                  <ul className='text-xs text-muted-foreground space-y-1 mb-3'>
                    <li>• {t('templatesV3.configAttrs.yamlVar1')}</li>
                    <li>• {t('templatesV3.configAttrs.yamlVar2')}</li>
                    <li>• {t('templatesV3.configAttrs.yamlVar3')}</li>
                  </ul>
                  <CollapsibleCode
                    title={t('templatesV3.configAttrs.yamlVarExample')}
                    code={`# 定义变量（顶层）
FILTER_US: "美|US|United States|🇺🇸"
FILTER_HK: "港|HK|Hong Kong|🇭🇰"

proxy-groups:
  - name: 🇺🇸 美国节点
    type: select
    include-all-proxies: true
    filter: FILTER_US        # 引用上面定义的变量

  - name: 🇭🇰 香港节点
    type: select
    include-all-proxies: true
    filter: FILTER_HK        # 引用上面定义的变量`}
                    language='yaml'
                  />
                </div>
              </div>

              <CollapsibleCode
                title={t('templatesV3.configAttrs.proxyGroupExample')}
                code={proxyGroupExample}
                language='yaml'
              />
              <p className='text-sm text-muted-foreground mt-4 mb-2'>{t('templatesV3.configAttrs.equivDesc')}</p>
              <img src='/images/proxygroups_ui.png' alt={t('templatesV3.configAttrs.equivImgAlt')} className='rounded-lg border' />
              <CollapsibleCode
                title={t('templatesV3.configAttrs.resultExample')}
                code={proxyGroupExampleResult}
                language='yaml'
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 支持的节点类型 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Globe className='size-5 text-primary' />
          {t('templatesV3.nodeTypes.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              {t('templatesV3.nodeTypes.desc')}
            </p>
            <div className='flex flex-wrap gap-2'>
              {['ss', 'ssr', 'vmess', 'vless', 'trojan', 'hysteria', 'hysteria2', 'tuic', 'wireguard', 'socks5', 'http', 'snell', 'anytls', 'ssh'].map(type => (
                <Badge key={type} variant='outline' className='font-mono'>{type}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 区域代理组 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <MapPin className='size-5 text-primary' />
          {t('templatesV3.regionGroups.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              {t('templatesV3.regionGroups.desc')}
            </p>
            <div className='bg-primary/5 rounded-lg p-4 border border-primary/20 mb-4'>
              <h4 className='font-semibold text-sm mb-2'>{t('templatesV3.regionGroups.presetTitle')}</h4>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-2 text-sm'>
                <div className='flex items-center gap-1'>🇭🇰 香港节点</div>
                <div className='flex items-center gap-1'>🇺🇸 美国节点</div>
                <div className='flex items-center gap-1'>🇯🇵 日本节点</div>
                <div className='flex items-center gap-1'>🇸🇬 新加坡节点</div>
                <div className='flex items-center gap-1'>🇼🇸 台湾节点</div>
                <div className='flex items-center gap-1'>🇰🇷 韩国节点</div>
                <div className='flex items-center gap-1'>🇨🇦 加拿大节点</div>
                <div className='flex items-center gap-1'>🇬🇧 英国节点</div>
                <div className='flex items-center gap-1'>🇫🇷 法国节点</div>
                <div className='flex items-center gap-1'>🇩🇪 德国节点</div>
                <div className='flex items-center gap-1'>🇳🇱 荷兰节点</div>
                <div className='flex items-center gap-1'>🇹🇷 土耳其节点</div>
                <div className='flex items-center gap-1'>🌐 其他地区</div>
              </div>
            </div>
            <div className='bg-muted/30 rounded-lg p-4'>
              <h4 className='font-semibold text-sm mb-2'>{t('templatesV3.regionGroups.usageTitle')}</h4>
              <ul className='text-xs text-muted-foreground space-y-1'>
                <li>• {t('templatesV3.regionGroups.usage1')}</li>
                <li>• {t('templatesV3.regionGroups.usage2')}</li>
                <li>• {t('templatesV3.regionGroups.usage3')}</li>
                <li>• {t('templatesV3.regionGroups.usage4')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 模板创建方式 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Plus className='size-5 text-primary' />
          {t('templatesV3.createMethods.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <div className='space-y-4'>
              <div className='bg-muted/30 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <Upload className='size-4 text-primary' />
                  <h4 className='font-semibold text-sm'>{t('templatesV3.createMethods.uploadTitle')}</h4>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {t('templatesV3.createMethods.uploadDesc')}
                </p>
              </div>
              <div className='bg-muted/30 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <FileText className='size-4 text-primary' />
                  <h4 className='font-semibold text-sm'>{t('templatesV3.createMethods.pasteTitle')}</h4>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {t('templatesV3.createMethods.pasteDesc')}
                </p>
              </div>
              <div className='bg-muted/30 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <RefreshCw className='size-4 text-primary' />
                  <h4 className='font-semibold text-sm'>{t('templatesV3.createMethods.convertTitle')}</h4>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {t('templatesV3.createMethods.convertDesc')}
                </p>
              </div>
              <div className='bg-muted/30 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <Database className='size-4 text-primary' />
                  <h4 className='font-semibold text-sm'>{t('templatesV3.createMethods.fromSubTitle')}</h4>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {t('templatesV3.createMethods.fromSubDesc')}
                </p>
              </div>
              <div className='bg-muted/30 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <FileCode className='size-4 text-primary' />
                  <h4 className='font-semibold text-sm'>{t('templatesV3.createMethods.blankTitle')}</h4>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {t('templatesV3.createMethods.blankDesc')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 可视化编辑器 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Pencil className='size-5 text-primary' />
          {t('templatesV3.visualEditor.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              {t('templatesV3.visualEditor.desc')}
            </p>
            <div className='space-y-4'>
              <div className='bg-primary/5 rounded-lg p-4 border border-primary/20'>
                <h4 className='font-semibold text-sm mb-2'>{t('templatesV3.visualEditor.layoutTitle')}</h4>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• <strong>{t('templatesV3.visualEditor.desktopLabel')}</strong>{t('templatesV3.visualEditor.desktopDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.tabletLabel')}</strong>{t('templatesV3.visualEditor.tabletDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.mobileLabel')}</strong>{t('templatesV3.visualEditor.mobileDesc')}</li>
                </ul>
              </div>
              <div className='bg-primary/5 rounded-lg p-4 border border-primary/20'>
                <h4 className='font-semibold text-sm mb-2'>{t('templatesV3.visualEditor.editFeaturesTitle')}</h4>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• <strong>{t('templatesV3.visualEditor.filterKeywordLabel')}</strong>{t('templatesV3.visualEditor.filterKeywordDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.excludeKeywordLabel')}</strong>{t('templatesV3.visualEditor.excludeKeywordDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.nodeTypeLabel')}</strong>{t('templatesV3.visualEditor.nodeTypeDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.includeOptionsLabel')}</strong>{t('templatesV3.visualEditor.includeOptionsDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.iconHiddenLabel')}</strong>{t('templatesV3.visualEditor.iconHiddenDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.groupRefLabel')}</strong>{t('templatesV3.visualEditor.groupRefDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.relayLabel')}</strong>{t('templatesV3.visualEditor.relayDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.previewLabel')}</strong>{t('templatesV3.visualEditor.previewDesc')}</li>
                </ul>
              </div>
              <div className='bg-primary/5 rounded-lg p-4 border border-primary/20'>
                <h4 className='font-semibold text-sm mb-2'>{t('templatesV3.visualEditor.dualModeTitle')}</h4>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• <strong>{t('templatesV3.visualEditor.visualModeLabel')}</strong>{t('templatesV3.visualEditor.visualModeDesc')}</li>
                  <li>• <strong>{t('templatesV3.visualEditor.yamlModeLabel')}</strong>{t('templatesV3.visualEditor.yamlModeDesc')}</li>
                  <li>• {t('templatesV3.visualEditor.modeSyncDesc')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 订阅绑定 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Link2 className='size-5 text-primary' />
          {t('templatesV3.subBinding.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              {t('templatesV3.subBinding.desc')}
            </p>
            <div className='space-y-4'>
              <div className='bg-green-500/10 rounded-lg p-4 border border-green-500/20'>
                <h4 className='font-semibold text-sm mb-2 text-green-600'>{t('templatesV3.subBinding.flowTitle')}</h4>
                <ol className='space-y-2 text-sm'>
                  <li className='flex gap-3'>
                    <span className='flex-shrink-0 size-5 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs font-semibold'>1</span>
                    <span className='text-muted-foreground'>{t('templatesV3.subBinding.flow1')}</span>
                  </li>
                  <li className='flex gap-3'>
                    <span className='flex-shrink-0 size-5 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs font-semibold'>2</span>
                    <span className='text-muted-foreground'>{t('templatesV3.subBinding.flow2')}</span>
                  </li>
                  <li className='flex gap-3'>
                    <span className='flex-shrink-0 size-5 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs font-semibold'>3</span>
                    <span className='text-muted-foreground'>{t('templatesV3.subBinding.flow3')}</span>
                  </li>
                </ol>
              </div>
              <div className='bg-primary/5 rounded-lg p-4 border border-primary/20'>
                <h4 className='font-semibold text-sm mb-2'>{t('templatesV3.subBinding.behaviorTitle')}</h4>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• {t('templatesV3.subBinding.behavior1')}</li>
                  <li>• {t('templatesV3.subBinding.behavior2')}</li>
                  <li>• {t('templatesV3.subBinding.behavior3')}</li>
                  <li>• {t('templatesV3.subBinding.behavior4')}</li>
                  <li>• {t('templatesV3.subBinding.behavior5')}</li>
                </ul>
              </div>
              <div className='bg-primary/5 rounded-lg p-4 border border-primary/20'>
                <h4 className='font-semibold text-sm mb-2'>{t('templatesV3.subBinding.autoUpdateTitle')}</h4>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• {t('templatesV3.subBinding.autoUpdate1')}</li>
                  <li>• {t('templatesV3.subBinding.autoUpdate2')}</li>
                  <li>• {t('templatesV3.subBinding.autoUpdate3')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 常见使用场景 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Lightbulb className='size-5 text-primary' />
          {t('templatesV3.commonScenarios.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-6'>
              {t('templatesV3.commonScenarios.desc')}
            </p>
            <div className='space-y-6'>
              {[
                { titleKey: 's1Title', goalKey: 's1Goal', configKey: 's1Config', effectKey: 's1Effect', code: scenario1Code },
                { titleKey: 's2Title', goalKey: 's2Goal', configKey: 's2Config', effectKey: 's2Effect', code: scenario2Code },
                { titleKey: 's3Title', goalKey: 's3Goal', configKey: 's3Config', effectKey: 's3Effect', code: scenario3Code },
                { titleKey: 's4Title', goalKey: 's4Goal', configKey: 's4Config', effectKey: 's4Effect', code: scenario4Code },
                { titleKey: 's5Title', goalKey: 's5Goal', configKey: 's5Config', effectKey: 's5Effect', code: scenario5Code },
              ].map((s) => (
                <div key={s.titleKey} className='border-l-4 border-primary/40 pl-4 py-1'>
                  <h4 className='font-semibold text-sm mb-3'>{t(`templatesV3.commonScenarios.${s.titleKey}`)}</h4>
                  <div className='space-y-2 mb-3'>
                    <div className='text-xs'>
                      <span className='font-semibold text-primary'>{t('templatesV3.commonScenarios.scenarioGoal')}:</span>{' '}
                      <span className='text-muted-foreground'>{t(`templatesV3.commonScenarios.${s.goalKey}`)}</span>
                    </div>
                    <div className='text-xs'>
                      <span className='font-semibold text-primary'>{t('templatesV3.commonScenarios.scenarioConfig')}:</span>{' '}
                      <span className='text-muted-foreground'>{t(`templatesV3.commonScenarios.${s.configKey}`)}</span>
                    </div>
                    <div className='text-xs'>
                      <span className='font-semibold text-primary'>{t('templatesV3.commonScenarios.scenarioEffect')}:</span>{' '}
                      <span className='text-muted-foreground'>{t(`templatesV3.commonScenarios.${s.effectKey}`)}</span>
                    </div>
                  </div>
                  <CollapsibleCode
                    title={t(`templatesV3.commonScenarios.scenarioConfig`)}
                    code={s.code}
                    language='yaml'
                  />
                </div>
              ))}
            </div>

            {/* 组合搭配 tips */}
            <div className='mt-6 bg-primary/5 rounded-lg p-4 border border-primary/20'>
              <h4 className='font-semibold text-sm mb-2 flex items-center gap-2'>
                <Sparkles className='size-4 text-primary' />
                {t('templatesV3.commonScenarios.tipsTitle')}
              </h4>
              <ul className='text-xs text-muted-foreground space-y-1.5'>
                <li>• {t('templatesV3.commonScenarios.tip1')}</li>
                <li>• {t('templatesV3.commonScenarios.tip2')}</li>
                <li>• {t('templatesV3.commonScenarios.tip3')}</li>
                <li>• {t('templatesV3.commonScenarios.tip4')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 完整模板示例 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <FileCode className='size-5 text-primary' />
          {t('templatesV3.fullExample.heading')}
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <CollapsibleCode
              title={t('templatesV3.fullExample.title')}
              code={v3TemplateExample}
              language='yaml'
            />
          </CardContent>
        </Card>
      </section>

      {/* 注意事项 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Shield className='size-5 text-orange-500' />
          {t('templatesV3.notes.heading')}
        </h2>
        <Card className='border-orange-500/20'>
          <CardContent className='pt-6'>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>{t('templatesV3.notes.formatTitle')}</strong>{t('templatesV3.notes.formatDesc')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>{t('templatesV3.notes.filterRuleTitle')}</strong>{t('templatesV3.notes.filterRuleDesc')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>{t('templatesV3.notes.regexTitle')}</strong>{t('templatesV3.notes.regexDesc')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>{t('templatesV3.notes.orderTitle')}</strong>{t('templatesV3.notes.orderDesc')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>{t('templatesV3.notes.emptyGroupTitle')}</strong>{t('templatesV3.notes.emptyGroupDesc')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>{t('templatesV3.notes.bindingTitle')}</strong>{t('templatesV3.notes.bindingDesc')}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </DocLayout>
  )
}
