import { createFileRoute } from '@tanstack/react-router'
import { DocLayout } from '@/components/docs/doc-layout'
import { Card, CardContent } from '@/components/ui/card'
import {
  Network,
  Zap,
  Users,
  FileCode,
  Download,
  RefreshCw,
  Link as LinkIcon,
  Activity,
  EyeOff,
  ScrollText,
  Bell,
  Bug,
  DatabaseBackup,
  ShieldCheck,
  Wifi,
} from 'lucide-react'

// 导入客户端图标
import clashIcon from '@/assets/icons/clash_color.png'
import stashIcon from '@/assets/icons/stash_color.png'
import shadowrocketIcon from '@/assets/icons/shadowrocket_color.png'
import surfboardIcon from '@/assets/icons/surfboard_color.png'
import surgeIcon from '@/assets/icons/surge_color.png'
import surgeMacIcon from '@/assets/icons/surgeformac_icon_color.png'
import loonIcon from '@/assets/icons/loon_color.png'
import quanxIcon from '@/assets/icons/quanx_color.png'
import egernIcon from '@/assets/icons/egern_color.png'
import singboxIcon from '@/assets/icons/sing-box_color.png'
import v2rayIcon from '@/assets/icons/v2ray_color.png'
import uriIcon from '@/assets/icons/uri-color.svg'

const CLIENT_TYPES = [
  { type: 'clash', name: 'Clash', icon: clashIcon },
  { type: 'stash', name: 'Stash', icon: stashIcon },
  { type: 'shadowrocket', name: 'Shadowrocket', icon: shadowrocketIcon },
  { type: 'surfboard', name: 'Surfboard', icon: surfboardIcon },
  { type: 'surge', name: 'Surge', icon: surgeIcon },
  { type: 'surgemac', name: 'Surge Mac', icon: surgeMacIcon },
  { type: 'loon', name: 'Loon', icon: loonIcon },
  { type: 'qx', name: 'QuantumultX', icon: quanxIcon },
  { type: 'egern', name: 'Egern', icon: egernIcon },
  { type: 'sing-box', name: 'sing-box', icon: singboxIcon },
  { type: 'v2ray', name: 'V2Ray', icon: v2rayIcon },
  { type: 'uri', name: 'URI', icon: uriIcon },
]

export const Route = createFileRoute('/docs/features')({
  component: FeaturesPage,
})

function FeaturesPage() {
  return (
    <DocLayout
      title='核心特性'
      description='详细了解妙妙屋的核心功能和特性'
    >
      {/* 多客户端支持 */}
      <section id='multi-client' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <Download className='size-6 text-primary' />
          多客户端支持
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              妙妙屋支持将订阅转换为多种客户端格式，满足不同平台和设备的需求：
            </p>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
              {CLIENT_TYPES.map((client) => (
                <div
                  key={client.type}
                  className='flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors'
                >
                  <img src={client.icon} alt={client.name} className='size-8' />
                  <span className='text-xs font-medium text-center'>{client.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 节点管理 */}
      <section id='node-management' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <Network className='size-6 text-primary' />
          节点管理
        </h2>
        <div className='space-y-4'>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-3'>支持的协议</h3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                {['VMess', 'VLESS', 'Trojan', 'Shadowsocks', 'Hysteria', 'Hysteria2', 'TUIC', 'WireGuard'].map((protocol) => (
                  <div
                    key={protocol}
                    className='px-3 py-2 rounded bg-primary/10 text-primary text-sm font-medium text-center'
                  >
                    {protocol}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-3'>节点功能</h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>手动添加节点：</strong>支持输入 vmess://、vless://、trojan:// 等格式的链接</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>订阅导入：</strong>从外部机场订阅链接批量导入节点</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>域名解析：</strong>将节点域名解析为固定 IP，支持 IPv4 和 IPv6</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>链式代理：</strong>为节点指定前置节点，创建多层代理链路</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>探针绑定：</strong>将节点与探针服务器关联，实现精确流量统计</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 订阅生成 */}
      <section id='subscription-generator' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <Zap className='size-6 text-primary' />
          订阅生成
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>可视化配置：</strong>通过拖拽方式将节点分配到不同代理组</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>内置模板：</strong>支持 ACL4SSR 和 Aethersailor 等预设模板</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>链式代理分组：</strong>支持配置落地节点和中转节点代理组</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>版本管理：</strong>自动保存订阅版本历史，支持回退</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 用户管理 */}
      <section id='user-management' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <Users className='size-6 text-primary' />
          用户管理
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>用户创建：</strong>手动创建用户账户，设置用户名和密码</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>订阅分配：</strong>为不同用户分配不同的订阅配置</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>状态管理：</strong>启用或停用用户账户</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>密码重置：</strong>管理员可为用户重置登录密码</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 流量统计 */}
      <section id='traffic-statistics' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <Activity className='size-6 text-primary' />
          流量统计
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              通过集成探针系统，实现精确的流量统计功能：
            </p>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>多探针支持：</strong>支持哪吒、Dstatus、Komari 等探针面板</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>节点级统计：</strong>为每个节点绑定探针，精确统计流量</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>灵活配置：</strong>支持上行、下行或双向流量统计</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 自定义规则 */}
      <section id='custom-rules' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <FileCode className='size-6 text-primary' />
          自定义规则
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>DNS 配置：</strong>自定义 DNS 服务器和分流策略</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>规则列表：</strong>创建域名、IP 等规则，设置代理行为</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>规则集提供商：</strong>引用外部规则集文件，支持定时更新</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 外部订阅同步 */}
      <section id='external-sync' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <RefreshCw className='size-6 text-primary' />
          外部订阅同步
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>自动同步：</strong>开启强制同步后，获取订阅时自动更新节点信息</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>缓存机制：</strong>设置缓存时间，避免频繁请求外部订阅</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>匹配规则：</strong>支持按节点名称或服务器:端口匹配更新</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 链式代理 */}
      <section id='chain-proxy' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <LinkIcon className='size-6 text-primary' />
          链式代理
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              通过 dialer-proxy 技术实现多层代理转发：
            </p>
            <div className='bg-muted/30 rounded-lg p-4 font-mono text-sm mb-4'>
              客户端 → 中转节点 → 落地节点 → 目标网站
            </div>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>中转加速：</strong>通过就近中转提升连接速度</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>隐私保护：</strong>多层代理隐藏真实 IP</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>灵活组合：</strong>支持多中转、多落地的负载均衡策略</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
      {/* 安全功能 */}
      <section id='security' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <ShieldCheck className='size-6 text-primary' />
          安全功能
        </h2>
        <div className='space-y-4'>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-3 flex items-center gap-2'>
                <EyeOff className='size-4' />
                静默模式
              </h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>面板隐藏：</strong>开启后所有非订阅请求返回 404，有效防止扫描探测</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>临时窗口：</strong>用户获取订阅后自动开放管理面板访问，超时后恢复静默</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>可配置超时：</strong>自定义访问窗口时长（默认 15 分钟）</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-3'>双因素认证 (2FA)</h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>TOTP 验证：</strong>支持 Google Authenticator 等认证器 App</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>恢复代码：</strong>提供一次性恢复代码，防止认证器丢失后无法登录</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 覆写脚本 */}
      <section id='override-scripts' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <ScrollText className='size-6 text-primary' />
          覆写脚本
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>JavaScript 脚本：</strong>通过 JS 脚本在订阅获取时动态修改节点配置</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>多个钩子：</strong>支持 post_fetch（获取后处理）和 pre_save_nodes（保存前处理）</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>排序控制：</strong>多个脚本按设定的顺序依次执行</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>独立开关：</strong>每个脚本可单独启用或禁用</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Telegram 通知 */}
      <section id='notifications' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <Bell className='size-6 text-primary' />
          Telegram 通知
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <ul className='space-y-3 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>多事件通知：</strong>订阅获取、用户登录、IP 封禁、静默模式变化等</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>每日报告：</strong>定时发送流量统计摘要</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>到期提醒：</strong>用户订阅即将到期时自动通知</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-primary mt-1'>•</span>
                <span><strong>独立开关：</strong>每种事件通知可单独开启或关闭</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 运维工具 */}
      <section id='ops-tools' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <Wifi className='size-6 text-primary' />
          运维工具
        </h2>
        <div className='space-y-4'>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-3 flex items-center gap-2'>
                <Bug className='size-4' />
                调试日志
              </h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>临时开启：</strong>5 分钟自动关闭，避免日志过大</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>日志下载：</strong>支持下载完整日志文件或实时查看最新日志</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-3'>TCP Ping</h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>节点测速：</strong>单个或批量 TCP Ping 测试节点延迟</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>可配超时：</strong>支持 5-30 秒超时设置</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-3 flex items-center gap-2'>
                <DatabaseBackup className='size-4' />
                备份与恢复
              </h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>全量备份：</strong>导出包含所有配置、用户、节点数据的备份文件</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-primary mt-1'>•</span>
                  <span><strong>一键恢复：</strong>从备份文件恢复全部系统数据</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </DocLayout>
  )
}
