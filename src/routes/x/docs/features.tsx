import { createFileRoute, Link } from '@tanstack/react-router'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Server, Network, Shield, Users, Package, Layers, LayoutTemplate, Zap, Globe, FileCode, MonitorCog, ArrowUpFromLine, Activity, Wifi } from 'lucide-react'

export const Route = createFileRoute('/x/docs/features')({
  component: FeaturesPage,
})

function FeaturesPage() {
  const features = [
    { icon: Globe, title: '远程服务器管理', desc: 'Master-Agent 架构，通过 WebSocket/HTTP/Pull 三种模式管理远程服务器。支持自动重连、Token 轮换、状态监控。' },
    { icon: Server, title: 'Xray 服务管理', desc: '远程安装/卸载 Xray 和 Nginx，服务启停控制，SSE 流式安装进度展示。' },
    { icon: Network, title: 'Xray 入站管理', desc: '可视化入站配置向导，支持 VLESS/VMess/Trojan/Shadowsocks/Hysteria2 全协议，TCP/WS/gRPC/XHTTP 传输，TLS/REALITY 安全层。' },
    { icon: Layers, title: '协议矩阵', desc: '完整的协议×传输×安全组合支持，自动生成 mihomo/Clash 兼容的节点配置。' },
    { icon: Shield, title: '证书管理', desc: 'ACME 证书自动申请，支持 Cloudflare/阿里云/腾讯云/Namesilo 等 DNS 提供商，自动部署到远程服务器。' },
    { icon: Package, title: '套餐管理', desc: '流量套餐配置，支持按流量/时间限额，用户绑定套餐。' },
    { icon: Users, title: '用户管理', desc: '多用户管理，角色权限控制，订阅分配，流量统计。' },
    { icon: Zap, title: '订阅生成', desc: '支持 Clash/Stash/Shadowrocket/Surge/Loon/QX/SingBox 等 12 种客户端格式。' },
    { icon: LayoutTemplate, title: '模板系统', desc: 'V3 模板引擎，灵活的订阅配置模板，支持自定义规则和代理组。' },
    { icon: FileCode, title: '自定义规则', desc: '自定义 DNS、分流规则、规则集，精细化流量控制。' },
    { icon: MonitorCog, title: 'Nginx 管理', desc: '远程安装/卸载 Nginx，配置文件管理，SSL 证书部署，Stream 端口管理。' },
    { icon: ArrowUpFromLine, title: 'Agent 升级管理', desc: 'Agent 远程在线升级和卸载，SSE 流式进度展示，无需手动登录服务器。' },
    { icon: Activity, title: '系统监控', desc: '远程服务器系统信息（CPU、内存、磁盘），实时网速监控，流量统计与上报。' },
    { icon: Wifi, title: '域名延迟探测', desc: '批量 TCP 延迟探测（最多 200 域名），16 并发检测，用于节点质量评估。' },
  ]

  return (
    <XDocLayout title='核心特性' description='妙妙屋X 的主要功能和特性概览'>
      <div className='grid gap-6 md:grid-cols-2'>
        {features.map((f) => (
          <div key={f.title} className='flex items-start gap-4 p-4 rounded-lg border bg-card'>
            <f.icon className='size-8 text-primary shrink-0 mt-1' />
            <div>
              <h3 className='font-semibold mb-1'>{f.title}</h3>
              <p className='text-sm text-muted-foreground'>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8'>
        <Link to='/x/docs/quick-start' className='text-primary hover:underline'>→ 开始使用妙妙屋X</Link>
      </div>
    </XDocLayout>
  )
}
