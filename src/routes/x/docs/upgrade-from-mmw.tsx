import { createFileRoute } from '@tanstack/react-router'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/x/docs/upgrade-from-mmw')({
  component: UpgradeFromMmwPage,
})

function UpgradeFromMmwPage() {
  return (
    <XDocLayout
      title='从妙妙屋迁移到妙妙屋X'
      description='把已有妙妙屋(mmw)数据完整迁移到妙妙屋X,客户端订阅 URL / xray 凭据 / nginx / 证书全部保留,只换主控'
    >
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>谁需要看这篇</h2>
        <Card>
          <CardContent className='pt-6 text-sm text-muted-foreground space-y-2'>
            <p>已经在用 <a href='https://github.com/iluobei/miaomiaowu' target='_blank' rel='noopener noreferrer' className='text-primary underline'>妙妙屋(mmw)</a> 跑订阅 + 节点管理,想升级到妙妙屋X(mmwx)继续用,但不想:</p>
            <ul className='list-disc pl-6 space-y-1'>
              <li>让客户端重新加订阅(URL 保持不变)</li>
              <li>重新申请 SSL 证书 / 改 nginx 反代配置</li>
              <li>修改 xray 服务器的 UUID / password(协议层无感)</li>
              <li>手工重建套餐 / 用户 / 节点 / 订阅模板</li>
            </ul>
            <p className='pt-2'>这套迁移向导<strong>就是为你设计的</strong>。所有操作只动 mmw 数据库,不碰客户端、不碰 nginx、不碰证书,失败可回滚。</p>
          </CardContent>
        </Card>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>迁移保证 vs 前置要求</h2>
        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2 text-green-700 dark:text-green-400'>✓ 迁移保证</h3>
              <ul className='text-sm text-muted-foreground list-disc pl-5 space-y-1'>
                <li><strong>客户端订阅 URL 不变</strong> — Clash / Shadowrocket 等不用动</li>
                <li><strong>xray UUID / password 不变</strong> — 协议层无感</li>
                <li><strong>nginx 配置不动</strong> — 反代继续指向同一端口</li>
                <li><strong>SSL 证书不动</strong> — certbot 不需重新申请</li>
                <li><strong>mmw 服务可回滚</strong> — systemctl 只是停掉,不删除任何文件</li>
                <li><strong>用户短码 / 订阅短码保留</strong> — 之前发出去的 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/x/&lt;code&gt;</code> 短链继续可用</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2 text-red-700 dark:text-red-400'>! 前置要求</h3>
              <ul className='text-sm text-muted-foreground list-disc pl-5 space-y-1'>
                <li>已经保存了妙妙屋的完整数据备份</li>
                <li>已经把 mmwx 二进制装好(<a href='/x/docs/install-direct' className='text-primary underline'>直接安装</a> 或 <a href='/x/docs/install-docker' className='text-primary underline'>Docker</a>),并通过 systemd 跑在 mmw 同一端口</li>
                <li>当前 mmwx 数据库<strong>是空的</strong>(刚装好的初始状态,无套餐 / 节点 / 用户),否则会被 mmw 数据覆盖</li>
                <li>具备 root SSH 访问到部署 mmw 的机器</li>
                <li>所有 mmw 时代用过的远程节点服务器都已装 <code className='bg-muted px-1 py-0.5 rounded text-xs'>mmw-agent</code> 并接入 mmwx 主控,见 <a href='/x/docs/install-agent' className='text-primary underline'>Agent 部署</a></li>
                <li>客户端在迁移期间会有 <strong>1-2 分钟短暂断连</strong>(mmw 停 → mmwx 接管订阅生效)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>入口</h2>
        <Card>
          <CardContent className='pt-6 text-sm text-muted-foreground'>
            <p className='mb-3'>用<strong>管理员账号</strong>登录 mmwx 后,点右上角头像菜单 → <strong>「从妙妙屋迁移」</strong>,即可进入 5 步向导。该入口对普通用户不可见,后端 6 个 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/api/admin/migrate/*</code> 接口全部受 RequireAdmin 保护,非管理员调用会返回 403。</p>
            <p>总预计耗时 10–30 分钟(主要取决于 mmw 数据规模和 SSH 网络)。</p>
          </CardContent>
        </Card>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Step 1 — 概述与前置</h2>
        <Card>
          <CardContent className='pt-6 text-sm text-muted-foreground'>
            <p>向导首页把上述「保证 + 前置」列出来一遍,请认真过一遍 — 特别是「mmwx 数据库必须是空的」这一条,否则继续会失败或覆盖现有数据。确认无误点「我已了解,开始」。</p>
          </CardContent>
        </Card>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Step 2 — 停止 mmw + 备份</h2>
        <div className='space-y-4'>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2'>自动模式(推荐)</h3>
              <ol className='text-sm text-muted-foreground list-decimal pl-5 space-y-1'>
                <li>填写 mmw 主控地址、管理员账号 / 密码</li>
                <li>mmwx 主控以该账号登录 mmw,调 mmw 的 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/api/admin/backup/download</code> 拉取完整备份 zip(数据库 + 订阅文件)到 mmwx 本地的 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/tmp/mmwx-migrate/</code></li>
                <li>解压、记录 db 路径、订阅文件数,展示给你确认</li>
                <li>SSH 到 mmw 机器 <code className='bg-muted px-1 py-0.5 rounded text-xs'>systemctl stop miaomiaowu</code> 停服,防止迁移过程中 mmw 数据继续变化</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2'>手动模式</h3>
              <p className='text-sm text-muted-foreground mb-2'>不想给 mmw 账号 / 不能跑 SSH?切到手动模式,向导提供完整命令片段:</p>
              <pre className='bg-muted text-xs p-3 rounded overflow-x-auto'>{`# 在 mmw 机器上:
systemctl stop miaomiaowu
cd /path/to/miaomiaowu
zip -r /tmp/mmw-backup.zip data/ subscribes/
scp /tmp/mmw-backup.zip 你@mmwx 主控:/tmp/`}</pre>
              <p className='text-xs text-muted-foreground mt-2'>把 zip 拷到 mmwx 主控本地任意路径,下一步告诉向导路径即可。</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6 text-sm text-muted-foreground'>
              <strong>失败回滚:</strong> 此步只是 <code className='bg-muted px-1 py-0.5 rounded text-xs'>systemctl stop</code>,没删任何文件。任何时候出问题,SSH 上去 <code className='bg-muted px-1 py-0.5 rounded text-xs'>systemctl start miaomiaowu</code> 即可恢复 mmw。
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Step 3 — 导入 mmw 数据库</h2>
        <Card>
          <CardContent className='pt-6'>
            <h3 className='font-semibold mb-2'>支持两种导入</h3>
            <ul className='text-sm text-muted-foreground list-disc pl-5 space-y-1 mb-3'>
              <li><strong>自动模式接力</strong>:Step 2 已经把备份拉到本地,这里直接显示路径,点「导入」即可</li>
              <li><strong>上传 zip</strong>:浏览器上传整个 mmw 备份 zip(数据库 + subscribes/),后端自动解压</li>
            </ul>
            <h3 className='font-semibold mb-2'>导入做了什么</h3>
            <ul className='text-sm text-muted-foreground list-disc pl-5 space-y-1'>
              <li>用 SQLite <code className='bg-muted px-1 py-0.5 rounded text-xs'>ATTACH DATABASE</code> 把 mmw.db 挂为 src,每张表 <code className='bg-muted px-1 py-0.5 rounded text-xs'>INSERT OR IGNORE INTO main.X SELECT ... FROM src.X</code></li>
              <li>迁移的表:<code className='bg-muted px-1 py-0.5 rounded text-xs'>users, user_tokens, nodes, subscribe_files, user_subscriptions, user_settings, templates, custom_rules, override_scripts, external_subscriptions</code></li>
              <li><strong>用户短码 + 订阅短码原样保留</strong>(从 user_tokens / subscribe_files 带过来),之前分发的 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/x/&lt;code&gt;</code> 短链继续生效</li>
              <li>拷贝 subscribes/ 目录里的 yaml 模板文件到 mmwx subscribes/(同名文件保留 mmwx 现有的,不覆盖)</li>
              <li>把 subscribe_files / templates 中 <code className='bg-muted px-1 py-0.5 rounded text-xs'>created_by</code> 为空的行设为系统第一个 admin 用户名</li>
            </ul>
            <p className='text-xs text-muted-foreground mt-3'>整个导入在一个 SQLite 事务里,任何一张表失败 → 全部回滚,数据库保持 import 前状态。</p>
          </CardContent>
        </Card>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Step 4 — 认领节点 / 用户</h2>
        <div className='space-y-4'>
          <Card>
            <CardContent className='pt-6'>
              <p className='text-sm text-muted-foreground mb-3'>
                mmw 时代的节点配置以 <strong>clash_config</strong> 形式存在(裸 vless / vmess / trojan / hy2 配置),没有"远程服务器"概念,服务器是手工运维的。
                mmwx 改成了「服务器 + 入站 + 节点」三层模型,需要把 mmw 节点跟 mmwx 受管 xray 服务器对接起来。
                这一步做<strong>两件事</strong>:
              </p>
              <ol className='text-sm text-muted-foreground list-decimal pl-5 space-y-2'>
                <li>
                  <strong>添加服务器</strong> — 向导列出所有 mmw 节点指向的去重服务器地址。点旁边的「去添加」自动在 mmwx 创建一台远程服务器(地址 / 名称从节点信息自动填入),生成 agent token,提示你去服务器装 mmw-agent。
                </li>
                <li>
                  <strong>接管外部 xray + 扫描补 email</strong> — 服务器上 mmw 时代手动起的外置 xray,如果选择以 embedded 模式重新部署,可一键合并 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/etc/xray/config.json</code> + <code className='bg-muted px-1 py-0.5 rounded text-xs'>/etc/xray/conf/*.json</code> 到 mmwx 标准路径 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/usr/local/etc/xray/config.json</code>(原文件归档为 <code className='bg-muted px-1 py-0.5 rounded text-xs'>.before-mmwx-&lt;ts&gt;</code>)。然后扫描这个 xray 配置里所有 inbound 的 client,把 email 补全并绑到管理员的子账户里(mmw 时代没有这个概念,迁移后这些"自定义 client"统一归属 admin)。
                </li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2'>智能认领,不创建重复节点</h3>
              <p className='text-sm text-muted-foreground'>
                扫描完成后,主控会把 xray 入站同步到 mmwx 节点表。如果某个入站的 <code className='bg-muted px-1 py-0.5 rounded text-xs'>protocol:port</code> 跟一个已从 mmw 导入的"外部节点"(<code className='bg-muted px-1 py-0.5 rounded text-xs'>original_server=''</code>)匹配,会自动 <strong>claim</strong> 该节点(绑定 server + inbound_tag),而不是新建一个重复节点。
                结果以 toast 显示:「扫描完成,自动绑定 X 个已有节点,新增 Y 个节点」。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Step 5 — 验证并完成</h2>
        <Card>
          <CardContent className='pt-6'>
            <h3 className='font-semibold mb-2'>必做的 3 项验证</h3>
            <ol className='text-sm text-muted-foreground list-decimal pl-5 space-y-2'>
              <li>
                <strong>客户端订阅可拉取</strong> — 用一个原 mmw 用户的订阅 URL(原样不变)在 Clash 里刷新一下,看节点列表是否还在 + 能不能连上。
              </li>
              <li>
                <strong>节点测速</strong> — 在节点管理打开 <a href='/x/docs/node-speedtest' className='text-primary underline'>节点测速</a> 工作台,对几个迁移过来的节点测一下,确认实际可用。
              </li>
              <li>
                <strong>用户登录</strong> — 找一个普通用户账号登 mmwx,用原 mmw 密码登录,看个人订阅页能不能进。
              </li>
            </ol>
            <p className='text-sm text-muted-foreground mt-4'>三项都通过,迁移完成 ✓。可以把 mmw 二进制 / data 目录留着,确认稳定运行 1-2 周后再清理。</p>
          </CardContent>
        </Card>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>常见问题</h2>
        <div className='space-y-3'>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2 text-sm'>导入提示「INSERT OR IGNORE 跳过 N 行」</h3>
              <p className='text-xs text-muted-foreground'>
                说明 mmwx 数据库不是空的,某些主键 / 唯一索引冲突导致行被忽略。建议:停 mmwx → 删 <code className='bg-muted px-1 py-0.5 rounded text-xs'>data/mmwx.db</code> → 重启 mmwx(会重新走 setup 创建一个干净库)→ 重跑迁移。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2 text-sm'>家用 mmw 备份接口拉不到</h3>
              <p className='text-xs text-muted-foreground'>
                mmw 的 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/api/admin/backup/download</code> 需要 mmw v0.7+ 版本。老版本只能走手动模式 scp。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2 text-sm'>接管外部 xray 后某些 inbound 丢了</h3>
              <p className='text-xs text-muted-foreground'>
                合并逻辑按 <code className='bg-muted px-1 py-0.5 rounded text-xs'>tag</code> 字段去重。两个 confdir 文件里同名 tag 只保留先合并的那个。如果丢失,可以从 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/etc/xray/config.json.before-mmwx-&lt;ts&gt;</code> 恢复后手工合并到 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/usr/local/etc/xray/config.json</code>。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2 text-sm'>同 server:port 的 mmw 外部节点被新建了两次,没自动绑定</h3>
              <p className='text-xs text-muted-foreground'>
                Claim 逻辑用 server + port + protocol 三元组匹配,clash <code className='bg-muted px-1 py-0.5 rounded text-xs'>type:ss</code> 跟 xray <code className='bg-muted px-1 py-0.5 rounded text-xs'>protocol:shadowsocks</code> 等价已经处理。若仍未匹配,通常是 mmw 节点存的服务器地址跟 mmwx 服务器配置的不一致(例如一个用 IP,一个用域名),可以手工去节点详情页改 <code className='bg-muted px-1 py-0.5 rounded text-xs'>original_server</code> / <code className='bg-muted px-1 py-0.5 rounded text-xs'>inbound_tag</code>。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2 text-sm'>普通用户能调迁移接口吗?</h3>
              <p className='text-xs text-muted-foreground'>
                不能。所有 6 个 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/api/admin/migrate/*</code> 接口都受 <code className='bg-muted px-1 py-0.5 rounded text-xs'>RequireAdmin</code> 中间件保护(校验 token + 校验 <code className='bg-muted px-1 py-0.5 rounded text-xs'>user.Role == "admin"</code>),非管理员返回 403。前端菜单入口也只对管理员可见,路由 <code className='bg-muted px-1 py-0.5 rounded text-xs'>/migrate-from-mmw</code> 的 <code className='bg-muted px-1 py-0.5 rounded text-xs'>beforeLoad</code> 守卫会把非管理员重定向到首页。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>回滚预案</h2>
        <Card>
          <CardContent className='pt-6 text-sm text-muted-foreground space-y-2'>
            <p>任何一步出错都可以回到 mmw:</p>
            <ol className='list-decimal pl-5 space-y-1'>
              <li>SSH 到 mmw 机器:<code className='bg-muted px-1 py-0.5 rounded text-xs'>systemctl stop miaomiaowux && systemctl start miaomiaowu</code></li>
              <li>原 nginx 反代配置不需要改 — 它指的是同一个端口,谁起来谁接管</li>
              <li>SSL 证书 / 客户端订阅 URL 全部保持原样,客户端无感切回 mmw</li>
              <li>清理 mmwx 残留数据:<code className='bg-muted px-1 py-0.5 rounded text-xs'>rm /path/to/mmwx/data/mmwx.db</code>(下次重启会重建空库)</li>
            </ol>
            <p className='pt-2'>因此迁移是个<strong>低风险</strong>动作:就算搞砸了,30 秒就能切回原状态。</p>
          </CardContent>
        </Card>
      </section>
    </XDocLayout>
  )
}
