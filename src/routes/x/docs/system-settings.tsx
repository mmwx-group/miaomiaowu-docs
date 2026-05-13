import { createFileRoute } from '@tanstack/react-router'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/x/docs/system-settings')({
  component: SystemSettingsPage,
})

function SystemSettingsPage() {
  return (
    <XDocLayout title='系统设置' description='全局系统配置项'>
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>概述</h2>
        <p className='text-muted-foreground'>
          妙妙屋X 采用 Master-Agent 架构，系统设置分为两部分：Master 端（主控）全局配置和 Agent 端（子端）连接配置。修改后立即生效，无需重启。
        </p>
      </section>

      {/* Master 端配置 */}
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Master 端配置项</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead><tr className='border-b'><th className='text-left py-3 px-4'>配置</th><th className='text-left py-3 px-4'>说明</th><th className='text-left py-3 px-4'>默认值</th></tr></thead>
            <tbody>
              <tr className='border-b'><td className='py-3 px-4'>站点名称</td><td className='py-3 px-4'>显示在页面标题和订阅信息中</td><td className='py-3 px-4'>妙妙屋X</td></tr>
              <tr className='border-b'><td className='py-3 px-4'>服务端口</td><td className='py-3 px-4'>后端 HTTP 服务监听端口</td><td className='py-3 px-4'>12889</td></tr>
              <tr className='border-b'><td className='py-3 px-4'>代理组 URL</td><td className='py-3 px-4'>代理组配置的远程 URL</td><td className='py-3 px-4'>-</td></tr>
              <tr className='border-b'><td className='py-3 px-4'>流量采集间隔</td><td className='py-3 px-4'>从 Xray 采集流量数据的间隔</td><td className='py-3 px-4'>60s</td></tr>
              <tr><td className='py-3 px-4'>日志级别</td><td className='py-3 px-4'>系统日志输出级别（debug/info/warn/error）</td><td className='py-3 px-4'>info</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Master 端配置文件 */}
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Master 端配置文件</h2>
        <Card>
          <CardContent className='pt-6'>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto'>
              <pre>{`# config.yaml
port: 12889
database_path: data/traffic.db
jwt_secret: your-secret-key
log_level: info
allowed_origins: "*"`}</pre>
            </div>
            <p className='mt-4 text-sm text-muted-foreground'>
              配置文件通过 <code className='bg-muted px-1.5 py-0.5 rounded'>-c config.yaml</code> 指定，也可通过环境变量覆盖。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Master 端环境变量 */}
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Master 端环境变量</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead><tr className='border-b'><th className='text-left py-3 px-4'>变量</th><th className='text-left py-3 px-4'>说明</th></tr></thead>
            <tbody>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>PORT</td><td className='py-3 px-4'>服务端口</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>DATABASE_PATH</td><td className='py-3 px-4'>SQLite 数据库路径</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>JWT_SECRET</td><td className='py-3 px-4'>JWT 签名密钥</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>LOG_LEVEL</td><td className='py-3 px-4'>日志级别</td></tr>
              <tr><td className='py-3 px-4 font-mono text-xs'>ALLOWED_ORIGINS</td><td className='py-3 px-4'>CORS 允许的来源</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Agent 端连接配置 */}
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Agent 端连接配置</h2>
        <p className='text-muted-foreground mb-4'>
          Agent 部署在远程代理服务器上，需要配置与 Master 的连接方式。
        </p>
        <Card>
          <CardContent className='pt-6'>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto'>
              <pre>{`# config.yaml (Agent 端)
master_url: "https://your-master-domain.com"
token: "your-server-token"
listen_port: "23889"
connection_mode: "auto"
traffic_report_interval: "1m"
speed_report_interval: "3s"
restart_method: "auto"
restart_command: ""`}</pre>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Agent 配置项详解 */}
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Agent 配置项详解</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead><tr className='border-b'><th className='text-left py-3 px-4'>配置</th><th className='text-left py-3 px-4'>说明</th><th className='text-left py-3 px-4'>默认值</th></tr></thead>
            <tbody>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>master_url</td><td className='py-3 px-4'>Master 主控服务器地址</td><td className='py-3 px-4'>-</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>token</td><td className='py-3 px-4'>服务器认证 Token</td><td className='py-3 px-4'>-</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>listen_port</td><td className='py-3 px-4'>Agent API 监听端口</td><td className='py-3 px-4'>23889</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>connection_mode</td><td className='py-3 px-4'>连接模式（见下方说明）</td><td className='py-3 px-4'>auto</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>traffic_report_interval</td><td className='py-3 px-4'>流量数据上报间隔</td><td className='py-3 px-4'>1m</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>speed_report_interval</td><td className='py-3 px-4'>网速数据上报间隔</td><td className='py-3 px-4'>3s</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>restart_method</td><td className='py-3 px-4'>Xray 重启方式（auto/systemctl/自定义命令）</td><td className='py-3 px-4'>auto</td></tr>
              <tr><td className='py-3 px-4 font-mono text-xs'>restart_command</td><td className='py-3 px-4'>自定义重启命令（restart_method 非 auto 时生效）</td><td className='py-3 px-4'>-</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 连接模式 */}
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>连接模式</h2>
        <p className='text-muted-foreground mb-4'>
          Agent 与 Master 之间支持多种通信方式，可根据网络环境选择最合适的模式。
        </p>
        <div className='space-y-4'>
          <Card>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='bg-muted/30 rounded-lg p-4 border-l-4 border-blue-500'>
                  <h4 className='font-semibold text-sm mb-2'>auto（推荐）</h4>
                  <p className='text-xs text-muted-foreground'>
                    自动选择最佳连接方式。优先使用 WebSocket，失败后降级到 HTTP，再降级到 Pull 模式。支持指数退避自动重连。
                  </p>
                </div>
                <div className='bg-muted/30 rounded-lg p-4 border-l-4 border-green-500'>
                  <h4 className='font-semibold text-sm mb-2'>websocket</h4>
                  <p className='text-xs text-muted-foreground'>
                    全双工 WebSocket 连接，支持实时双向通信。心跳间隔 30 秒，空闲超时 5 分钟。适合网络稳定的环境。
                  </p>
                </div>
                <div className='bg-muted/30 rounded-lg p-4 border-l-4 border-orange-500'>
                  <h4 className='font-semibold text-sm mb-2'>http</h4>
                  <p className='text-xs text-muted-foreground'>
                    通过 HTTP POST 主动推送数据到 Master。适用于无法建立长连接的网络环境。
                  </p>
                </div>
                <div className='bg-muted/30 rounded-lg p-4 border-l-4 border-purple-500'>
                  <h4 className='font-semibold text-sm mb-2'>pull</h4>
                  <p className='text-xs text-muted-foreground'>
                    被动模式，由 Master 主动拉取 Agent 数据。Agent 仅暴露本地 API，无需主动连接 Master。适用于 Agent 在内网或无法主动出站的场景。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Agent 端环境变量 */}
      <section>
        <h2 className='text-2xl font-bold mb-4'>Agent 端环境变量</h2>
        <p className='text-muted-foreground mb-4'>
          环境变量会覆盖 config.yaml 中的同名配置：
        </p>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead><tr className='border-b'><th className='text-left py-3 px-4'>变量</th><th className='text-left py-3 px-4'>说明</th></tr></thead>
            <tbody>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>MMWX_MASTER_URL</td><td className='py-3 px-4'>Master 主控地址</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>MMWX_TOKEN</td><td className='py-3 px-4'>服务器认证 Token</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>MMWX_CONNECTION_MODE</td><td className='py-3 px-4'>连接模式（auto/websocket/http/pull）</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>MMWX_LISTEN_PORT</td><td className='py-3 px-4'>Agent API 监听端口</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>MMWX_XRAY_CONFIG</td><td className='py-3 px-4'>Xray 配置文件路径（config.json）</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>MMWX_XRAY_CONFDIR</td><td className='py-3 px-4'>Xray 配置目录路径（多文件模式）</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>MMWX_TRAFFIC_INTERVAL</td><td className='py-3 px-4'>流量上报间隔（如 1m、30s）</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>MMWX_SPEED_INTERVAL</td><td className='py-3 px-4'>网速上报间隔（如 3s、5s）</td></tr>
              <tr className='border-b'><td className='py-3 px-4 font-mono text-xs'>MMWX_RESTART_METHOD</td><td className='py-3 px-4'>Xray 重启方式</td></tr>
              <tr><td className='py-3 px-4 font-mono text-xs'>MMWX_RESTART_COMMAND</td><td className='py-3 px-4'>自定义 Xray 重启命令</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </XDocLayout>
  )
}
