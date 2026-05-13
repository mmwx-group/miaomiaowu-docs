import { createFileRoute, Link } from '@tanstack/react-router'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Card, CardContent } from '@/components/ui/card'
import { StepIndicator } from '@/components/docs/step-indicator'
import { AlertTriangle, Info } from 'lucide-react'

export const Route = createFileRoute('/x/docs/tutorial')({
  component: TutorialPage,
})

function TutorialPage() {
  const steps = [
    '安装前准备', 'DNS 解析', '安装主控', '初始化',
    'HTTPS', '添加服务器', '安装 Agent', '添加节点',
  ]

  return (
    <XDocLayout title='使用教程' description='从零开始部署妙妙屋X完整指南'>
      <div className='mb-8 overflow-x-auto pb-4'>
        <StepIndicator currentStep={0} totalSteps={8} labels={steps} />
      </div>

      {/* Step 1 */}
      <section id='step-1' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>1</div>
          安装前准备
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>开始之前，请确保你已准备好以下资源：</p>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left py-2 pr-8 font-medium'>项目</th>
                    <th className='text-left py-2 font-medium'>数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b'>
                    <td className='py-2 pr-8'>域名</td>
                    <td className='py-2'>1 个（主控域名）（如需使用 REALITY 偷自己）</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='py-2 pr-8'>服务器</td>
                    <td className='py-2'>1 台</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-4'>
              <AlertTriangle className='size-4 text-amber-500 mt-0.5 shrink-0' />
              <p className='text-sm text-amber-700 dark:text-amber-400'>
                如果需要使用 REALITY 偷自己功能，必须准备一个域名用于偷自己的目标网站，这个网站可以是妙妙屋X。
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Step 2 */}
      <section id='step-2' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>2</div>
          添加 DNS 解析
        </h2>
        <Card>
          <CardContent className='pt-6 space-y-4'>
            <div>
              <h3 className='font-medium mb-2'>主控域名（必须）</h3>
              <p className='text-sm text-muted-foreground'>
                为妙妙屋X主控添加一个域名解析，例如 <code className='bg-muted px-1.5 py-0.5 rounded text-xs'>mmwx.example.com</code>，将 <code className='bg-muted px-1.5 py-0.5 rounded text-xs'>example.com</code> 替换为你的实际域名。
              </p>
            </div>
            <div>
              <h3 className='font-medium mb-2'>服务器域名（建议）</h3>
              <p className='text-sm text-muted-foreground'>
                建议为每台服务器添加独立域名，例如 <code className='bg-muted px-1.5 py-0.5 rounded text-xs'>jp.example.com</code>、<code className='bg-muted px-1.5 py-0.5 rounded text-xs'>us.example.com</code>。
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Step 3 */}
      <section id='step-3' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>3</div>
          安装妙妙屋X
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>在服务器上执行一键安装脚本：</p>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto'>
              <pre>curl -sL https://raw.githubusercontent.com/iluobei/miaomiaowuX/main/install.sh | sudo bash</pre>
            </div>
            <p className='text-sm text-muted-foreground mt-4'>
              更多安装方式请参考 <Link to='/x/docs/install-docker' className='text-primary hover:underline'>Docker 安装</Link> 或 <Link to='/x/docs/install-direct' className='text-primary hover:underline'>直接安装</Link>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Step 4 */}
      <section id='step-4' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>4</div>
          初始化
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>浏览器访问主控面板：</p>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4'>
              <pre>http://mmwx.example.com:12889</pre>
            </div>
            <p className='text-sm text-muted-foreground'>输入用户名、密码完成注册，域名填写第 2 步中添加的主控域名（如 <code className='bg-muted px-1.5 py-0.5 rounded text-xs'>mmwx.example.com</code>）。</p>
          </CardContent>
        </Card>
      </section>

      {/* Step 5 */}
      <section id='step-5' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>5</div>
          开启 HTTPS
        </h2>

        <div className='space-y-4'>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-medium mb-3'>5.1 配置 DNS 服务商</h3>
              <ol className='space-y-2 text-sm text-muted-foreground'>
                <li>1. 点击「证书管理」→「DNS 提供商」→「添加提供商」</li>
                <li>2. 填写 DNS 服务商名称，选择服务商类型</li>
                <li>3. 填写 API Key / API Secret（不同服务商所需字段不同）</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-medium mb-3'>5.2 申请证书</h3>
              <p className='text-sm text-muted-foreground mb-4'>点击「证书列表」→「申请证书」，按以下参数填写：</p>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b'>
                      <th className='text-left py-2 pr-4 font-medium'>输入项</th>
                      <th className='text-left py-2 pr-4 font-medium'>填写内容</th>
                      <th className='text-left py-2 font-medium'>备注</th>
                    </tr>
                  </thead>
                  <tbody className='text-muted-foreground'>
                    <tr className='border-b'><td className='py-2 pr-4'>域名</td><td className='py-2 pr-4'><code className='bg-muted px-1.5 py-0.5 rounded text-xs'>*.example.com</code></td><td className='py-2'>申请通配符证书</td></tr>
                    <tr className='border-b'><td className='py-2 pr-4'>邮箱</td><td className='py-2 pr-4'>你的邮箱</td><td className='py-2'>用于证书通知</td></tr>
                    <tr className='border-b'><td className='py-2 pr-4'>CA 提供商</td><td className='py-2 pr-4'>Let's Encrypt</td><td className='py-2'>默认选项</td></tr>
                    <tr className='border-b'><td className='py-2 pr-4'>目标服务器</td><td className='py-2 pr-4'>Master</td><td className='py-2'>默认即可</td></tr>
                    <tr className='border-b'><td className='py-2 pr-4'>验证方式</td><td className='py-2 pr-4'>DNS-01</td><td className='py-2'>通配符证书必须使用 DNS-01</td></tr>
                    <tr className='border-b'><td className='py-2 pr-4'>DNS 提供商</td><td className='py-2 pr-4'>选择已添加的提供商</td><td className='py-2'></td></tr>
                    <tr className='border-b'><td className='py-2 pr-4'>自动续期</td><td className='py-2 pr-4'>开启</td><td className='py-2'>默认开启</td></tr>
                    <tr><td className='py-2 pr-4'>自动部署</td><td className='py-2 pr-4'>关闭</td><td className='py-2'>开启后续期自动重新部署</td></tr>
                  </tbody>
                </table>
              </div>
              <p className='text-sm text-muted-foreground mt-4'>填写完成后点击「申请」，等待申请成功。</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-medium mb-3'>5.3 部署证书</h3>
              <p className='text-sm text-muted-foreground mb-3'>申请成功后，顶部弹出提示框，点击「部署证书到主控」即可开启 HTTPS。也可在证书列表中手动点击部署。</p>
              <div className='flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20'>
                <AlertTriangle className='size-4 text-amber-500 mt-0.5 shrink-0' />
                <p className='text-sm text-amber-700 dark:text-amber-400'>部署过程中会安装 Nginx，视服务器性能与网络情况需等待一段时间。</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Step 6 */}
      <section id='step-6' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>6</div>
          添加服务器
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-4'>
              <Info className='size-4 text-blue-500 mt-0.5 shrink-0' />
              <p className='text-sm text-blue-700 dark:text-blue-400'>本示例中我们将妙妙屋X主控服务器同时作为 Agent 服务器接入。</p>
            </div>
            <p className='text-sm text-muted-foreground mb-4'>点击「服务管理」→「添加服务器」，按以下参数填写：</p>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left py-2 pr-4 font-medium'>输入项</th>
                    <th className='text-left py-2 pr-4 font-medium'>填写内容</th>
                    <th className='text-left py-2 font-medium'>备注</th>
                  </tr>
                </thead>
                <tbody className='text-muted-foreground'>
                  <tr className='border-b'><td className='py-2 pr-4'>服务器名称</td><td className='py-2 pr-4'>自定义名称</td><td className='py-2'></td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>服务器地址</td><td className='py-2 pr-4'>域名或 IP</td><td className='py-2'></td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>流量限制</td><td className='py-2 pr-4'>服务器月流量</td><td className='py-2'></td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>已用流量</td><td className='py-2 pr-4'>服务器已用流量</td><td className='py-2'></td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>重置日期</td><td className='py-2 pr-4'>流量重置日期</td><td className='py-2'></td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>我要偷自己</td><td className='py-2 pr-4'>是否开启 REALITY 偷自己</td><td className='py-2'>默认关闭，开启前需准备一个域名</td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>前置选择</td><td className='py-2 pr-4'>Xray</td><td className='py-2'>目前仅支持 Xray</td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>部署模式</td><td className='py-2 pr-4'>Tunnel / Fallback</td><td className='py-2'>默认 Tunnel 模式</td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>使用 443 端口部署</td><td className='py-2 pr-4'>443</td><td className='py-2'>默认无法修改</td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>域名</td><td className='py-2 pr-4'>偷自己的服务域名</td><td className='py-2'>如 steal.example.com</td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>网站类型</td><td className='py-2 pr-4'>静态页面 / 反向代理</td><td className='py-2'></td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>静态页面</td><td className='py-2 pr-4'>静态页面路径</td><td className='py-2'></td></tr>
                  <tr><td className='py-2 pr-4'>反向代理</td><td className='py-2 pr-4'>反向代理地址</td><td className='py-2'></td></tr>
                </tbody>
              </table>
            </div>
            <div className='mt-4 space-y-2'>
              <div className='flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20'>
                <AlertTriangle className='size-4 text-amber-500 mt-0.5 shrink-0' />
                <p className='text-sm text-amber-700 dark:text-amber-400'>使用 443 端口部署时，请确保服务器的 443 端口没有被其他程序占用。</p>
              </div>
              <div className='flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20'>
                <Info className='size-4 text-blue-500 mt-0.5 shrink-0' />
                <p className='text-sm text-blue-700 dark:text-blue-400'>无需担心无法部署其他服务，点击「Agent 管理」→「添加网站」即可复用 443 端口部署其他服务。</p>
              </div>
              <div className='flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20'>
                <AlertTriangle className='size-4 text-amber-500 mt-0.5 shrink-0' />
                <p className='text-sm text-amber-700 dark:text-amber-400'>开启「我要偷自己」时，必须提前准备好一个域名并解析到该服务器，用于填写下方的「域名」字段。该域名将作为 REALITY 偷自己的目标网站。</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Step 7 */}
      <section id='step-7' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>7</div>
          安装 Agent
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <ol className='space-y-3 text-sm text-muted-foreground'>
              <li>1. 在服务器卡片中点击「生成 Token」</li>
              <li>2. 复制底部的一键安装命令</li>
              <li>3. 在目标服务器上运行该命令，等待安装完成</li>
              <li>4. 安装成功后，服务器卡片名称后会显示「已连接」</li>
            </ol>
            <p className='text-sm text-muted-foreground mt-4'>
              详细说明请参考 <Link to='/x/docs/install-agent' className='text-primary hover:underline'>Agent 部署</Link>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Step 8 */}
      <section id='step-8' className='mb-10'>
        <h2 className='text-2xl font-bold mb-4 flex items-center gap-3'>
          <div className='size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>8</div>
          添加节点
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-sm text-muted-foreground mb-4'>点击「节点管理」→「添加节点」，选择服务器后填写以下参数：</p>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-left py-2 pr-4 font-medium'>输入项</th>
                    <th className='text-left py-2 pr-4 font-medium'>填写内容</th>
                    <th className='text-left py-2 font-medium'>备注</th>
                  </tr>
                </thead>
                <tbody className='text-muted-foreground'>
                  <tr className='border-b'><td className='py-2 pr-4'>协议类型</td><td className='py-2 pr-4'>自行选择</td><td className='py-2'></td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>节点名称</td><td className='py-2 pr-4'>显示在列表中的名称</td><td className='py-2'></td></tr>
                  <tr className='border-b'><td className='py-2 pr-4'>REALITY 域名</td><td className='py-2 pr-4'>默认为偷自己的域名</td><td className='py-2'>也可自行填写其他域名</td></tr>
                  <tr><td className='py-2 pr-4'>选择用户</td><td className='py-2 pr-4'>选择已存在的用户</td><td className='py-2'></td></tr>
                </tbody>
              </table>
            </div>
            <p className='text-sm text-muted-foreground mt-4'>点击保存后，节点会出现在节点管理列表中，用户即可通过订阅链接使用。</p>
          </CardContent>
        </Card>
      </section>
    </XDocLayout>
  )
}
