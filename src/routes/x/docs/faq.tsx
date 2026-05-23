import { createFileRoute } from '@tanstack/react-router'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/x/docs/faq')({
  component: FaqPage,
})

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <Card className='mb-4'>
      <CardContent className='pt-6'>
        <h3 className='font-semibold mb-2'>{q}</h3>
        <div className='text-sm text-muted-foreground'>{children}</div>
      </CardContent>
    </Card>
  )
}

function FaqPage() {
  return (
    <XDocLayout title='常见问题' description='FAQ'>
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>安装与部署</h2>
        <FaqItem q='妙妙屋X 和妙妙屋有什么区别？'>
          <p>妙妙屋X 是妙妙屋的扩展版本，增加了远程服务器管理、Xray 入站/出站管理、协议连通性测试等功能。妙妙屋专注于订阅管理和流量监控，妙妙屋X 则提供完整的服务器管理能力。</p>
        </FaqItem>
        <FaqItem q='需要什么系统环境？'>
          <p>主控端：Linux x86_64，1 核 512MB 内存即可。Agent 端：Linux x86_64，需要安装 Xray-core。支持 Docker 和二进制两种部署方式。</p>
        </FaqItem>
        <FaqItem q='可以在同一台机器上运行主控和 Agent 吗？'>
          <p>可以，但需要使用不同端口。主控默认使用 12889 端口，Agent 需要配置不同的端口。</p>
        </FaqItem>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>常见操作</h2>
        <FaqItem q='怎么添加入站 / 节点?'>
          <p>进入「节点管理」,点右上角的「<strong>添加节点</strong>」按钮,在弹出的向导里选服务器、协议、传输/安全后保存即可。系统会同时创建对应的 xray 入站,并自动同步成节点显示在列表里。</p>
        </FaqItem>
        <FaqItem q='怎么指定节点出站(给节点配落地)?'>
          <p>在「节点管理」的节点行点<strong>双向箭头按钮(⇄)</strong>,弹出的对话框里既可以选择<strong>已有节点</strong>作为该节点的出站,也可以选择某台服务器<strong>新建一个落地入站</strong>(系统会自动配好入站、出站与路由规则)。这是实现链式代理 / 落地中转的入口。</p>
        </FaqItem>
        <FaqItem q='怎么开车 / 拼车 给别人开账号?'>
          <p>两步:</p>
          <p>1) <strong>建套餐</strong>:在「套餐管理」新建一个套餐——设流量额度、重置周期(按月/自定义)、限速(可选)、设备数(可选)、并勾选该套餐包含的节点。</p>
          <p>2) <strong>建用户并绑定</strong>:在「用户管理」新建用户,绑定刚才的套餐即可。系统会自动给该用户生成订阅链接,他用任意客户端拉这个链接就能看到套餐内的节点。</p>
          <p>超额时按套餐配置自动停止返回节点或自动限速(看你怎么配)。</p>
        </FaqItem>
        <FaqItem q='我从妙妙屋(mmw)迁移过来,怎么看不到妙妙屋的原有功能?'>
          <p>需要在「<strong>系统设置</strong>」里把「<strong>妙妙屋功能开关</strong>」打开。开启后顶部会出现妙妙屋相关菜单(订阅探针、订阅生成等),与妙妙屋X 的服务器管理 / 套餐 / 模板等功能并存。</p>
        </FaqItem>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>服务器管理</h2>
        <FaqItem q='远程服务器连接不上怎么办？'>
          <p>检查以下几点：1) Agent 是否正在运行；2) 防火墙是否放行了 Agent 端口；3) Token 是否正确；4) 网络是否可达。可在服务器管理页面查看连接状态和错误信息。</p>
        </FaqItem>
        <FaqItem q='WebSocket、HTTP、Pull 连接模式怎么选？'>
          <p>WebSocket 适合大多数场景，实时性好。HTTP 适合网络不稳定的环境。Pull 模式由 Agent 主动拉取，适合 Agent 在 NAT 后面的场景。Auto 模式会自动选择最佳方式。</p>
        </FaqItem>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>协议与入站</h2>
        <FaqItem q='推荐使用什么协议？'>
          <p>推荐 VLESS + TCP + REALITY + XTLS-Vision，无需域名和证书，性能最佳。如果需要 CDN 中转，使用 VLESS/VMess + WebSocket + TLS。</p>
        </FaqItem>
        <FaqItem q='REALITY 和 TLS 有什么区别？'>
          <p>TLS 需要域名和证书，REALITY 不需要。REALITY 通过伪装成目标网站的 TLS 握手来避免检测，安全性更高。但 REALITY 不支持 CDN 中转。</p>
        </FaqItem>
        <FaqItem q='为什么 Trojan 不支持 XTLS-Vision？'>
          <p>Xray-core 已移除 Trojan 的 flow（XTLS-Vision）支持。如需 Vision 流控，请使用 VLESS 协议。</p>
        </FaqItem>
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4'>订阅与客户端</h2>
        <FaqItem q='订阅链接打不开或节点为空？'>
          <p>检查：1) Token 是否正确；2) 用户是否绑定了套餐；3) 是否有可用节点；4) 节点是否被禁用。</p>
        </FaqItem>
        <FaqItem q='mihomo 中 Trojan 节点连不上？'>
          <p>mihomo 中 Trojan 使用 <code className='bg-muted px-1.5 py-0.5 rounded'>sni</code> 字段而非 <code className='bg-muted px-1.5 py-0.5 rounded'>servername</code>，系统已自动处理此差异。如仍有问题，检查证书域名是否匹配。</p>
        </FaqItem>
      </section>
    </XDocLayout>
  )
}
