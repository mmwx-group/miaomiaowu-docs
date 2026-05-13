import { createFileRoute, Link } from '@tanstack/react-router'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Card, CardContent } from '@/components/ui/card'
import { StepIndicator } from '@/components/docs/step-indicator'

export const Route = createFileRoute('/x/docs/quick-start')({
  component: QuickStartPage,
})

function QuickStartPage() {
  const steps = ['部署主控', '添加服务器', '安装 Xray', '创建入站', '同步节点', '生成订阅']

  return (
    <XDocLayout title='快速开始' description='快速部署妙妙屋X并完成基本配置'>
      <div className='mb-8 overflow-x-auto pb-4'>
        <StepIndicator currentStep={0} totalSteps={6} labels={steps} />
      </div>

      <section id='step-1' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>1</div>
          部署主控
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>推荐使用 Docker 方式部署主控端：</p>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm mb-4 overflow-x-auto'>
              <pre>{`docker pull ghcr.io/iluobei/miaomiaowux:latest

docker run -d \\
  --name miaomiaowux \\
  -p 12889:12889 \\
  -v ./data:/app/data \\
  ghcr.io/iluobei/miaomiaowux:latest`}</pre>
            </div>
            <p className='text-sm text-muted-foreground'>
              更多安装方式请参考 <Link to='/x/docs/install-docker' className='text-primary hover:underline'>Docker 安装</Link> 或 <Link to='/x/docs/install-direct' className='text-primary hover:underline'>直接安装</Link>
            </p>
          </CardContent>
        </Card>
      </section>

      <section id='step-2' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>2</div>
          添加远程服务器
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <ol className='space-y-3 text-sm'>
              <li>1. 登录主控面板，进入「服务管理」页面</li>
              <li>2. 点击「添加服务器」，填写服务器名称、IP 地址、域名（可选）</li>
              <li>3. 系统自动生成连接 Token</li>
              <li>4. 在远程服务器上部署 Agent（参考 <Link to='/x/docs/install-agent' className='text-primary hover:underline'>Agent 部署</Link>）</li>
              <li>5. Agent 连接成功后，服务器状态变为「已连接」</li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section id='step-3' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>3</div>
          安装 Xray
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-3'>在服务管理页面，点击服务器卡片上的「安装 Xray」按钮，系统会通过 Agent 在远程服务器上自动安装 Xray。</p>
            <p className='text-sm text-muted-foreground'>安装过程通过 SSE 流式展示进度，安装完成后可选择安装 Nginx（用于 TLS 伪装）。</p>
          </CardContent>
        </Card>
      </section>

      <section id='step-4' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>4</div>
          创建入站
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-3'>进入服务器的「入站管理」页面，使用入站向导创建代理入站：</p>
            <ol className='space-y-2 text-sm'>
              <li>1. 选择协议（VLESS/VMess/Trojan/Shadowsocks/Hysteria2）</li>
              <li>2. 选择传输方式（TCP/WebSocket/gRPC/XHTTP）</li>
              <li>3. 选择安全层（TLS/REALITY/None）</li>
              <li>4. 配置端口和其他参数</li>
              <li>5. 点击创建，入站自动部署到远程服务器</li>
            </ol>
            <p className='text-sm text-muted-foreground mt-3'>
              详细的协议组合请参考 <Link to='/x/docs/protocol-matrix' className='text-primary hover:underline'>协议矩阵</Link>
            </p>
          </CardContent>
        </Card>
      </section>

      <section id='step-5' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>5</div>
          同步节点
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-3'>入站创建成功后，系统会自动将入站同步为节点。也可以在「节点管理」页面手动触发同步。</p>
            <p className='text-sm text-muted-foreground'>同步后的节点会自动转换为 mihomo/Clash 兼容的代理配置。</p>
          </CardContent>
        </Card>
      </section>

      <section id='step-6' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>6</div>
          生成订阅
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-3'>进入「用户管理」创建用户并分配节点，用户即可通过订阅链接获取代理配置。</p>
            <p className='text-sm text-muted-foreground'>
              支持 Clash/Stash/Shadowrocket/Surge 等 12 种客户端格式。详见 <Link to='/x/docs/generator' className='text-primary hover:underline'>生成订阅</Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </XDocLayout>
  )
}
