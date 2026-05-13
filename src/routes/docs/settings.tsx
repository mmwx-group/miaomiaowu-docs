import { createFileRoute } from '@tanstack/react-router'
import { DocLayout } from '@/components/docs/doc-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  UserCog,
  User,
  Mail,
  Lock,
  Save,
  Shield,
  Sparkles,
  ShieldCheck,
  Bug,
} from 'lucide-react'

export const Route = createFileRoute('/docs/settings')({
  component: SettingsDocPage,
})

function SettingsDocPage() {
  return (
    <DocLayout
      title='用户设置'
      description='管理个人账户信息和偏好设置'
    >
      {/* 功能介绍 */}
      <section className='mb-8'>
        <Card className='bg-muted/30'>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground'>
              用户设置页面允许用户管理自己的个人信息，包括修改昵称、邮箱和密码。所有用户都可以访问此页面。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 主要功能 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Sparkles className='size-5 text-primary' />
          主要功能
        </h2>
        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardContent className='pt-4'>
              <div className='flex items-start gap-3'>
                <User className='size-5 text-primary mt-0.5' />
                <div>
                  <h4 className='font-semibold'>修改昵称</h4>
                  <p className='text-sm text-muted-foreground'>
                    更新显示在系统中的昵称
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-4'>
              <div className='flex items-start gap-3'>
                <Mail className='size-5 text-primary mt-0.5' />
                <div>
                  <h4 className='font-semibold'>修改邮箱</h4>
                  <p className='text-sm text-muted-foreground'>
                    更新账户关联的邮箱地址
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-4'>
              <div className='flex items-start gap-3'>
                <Lock className='size-5 text-primary mt-0.5' />
                <div>
                  <h4 className='font-semibold'>修改密码</h4>
                  <p className='text-sm text-muted-foreground'>
                    更改账户登录密码
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-4'>
              <div className='flex items-start gap-3'>
                <ShieldCheck className='size-5 text-primary mt-0.5' />
                <div>
                  <h4 className='font-semibold'>双因素认证 (2FA)</h4>
                  <p className='text-sm text-muted-foreground'>
                    启用 TOTP 验证码增强账户安全
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-4'>
              <div className='flex items-start gap-3'>
                <Bug className='size-5 text-primary mt-0.5' />
                <div>
                  <h4 className='font-semibold'>调试日志</h4>
                  <p className='text-sm text-muted-foreground'>
                    临时开启调试日志排查问题
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 设置页面演示 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <UserCog className='size-5 text-primary' />
          设置页面
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <div className='max-w-lg mx-auto space-y-6'>
              {/* 个人信息 */}
              <div className='space-y-4'>
                <h3 className='font-semibold'>个人信息</h3>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='demo-username'>用户名</Label>
                    <Input id='demo-username' value='demo_user' disabled />
                    <p className='text-xs text-muted-foreground'>用户名创建后不可修改</p>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='demo-nickname'>昵称</Label>
                    <Input id='demo-nickname' placeholder='请输入昵称' defaultValue='演示用户' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='demo-email'>邮箱</Label>
                    <Input id='demo-email' type='email' placeholder='请输入邮箱' defaultValue='demo@example.com' />
                  </div>
                </div>
                <Button disabled className='gap-2'>
                  <Save className='size-4' />
                  保存信息
                </Button>
              </div>

              <hr />

              {/* 修改密码 */}
              <div className='space-y-4'>
                <h3 className='font-semibold'>修改密码</h3>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='demo-old-password'>当前密码</Label>
                    <Input id='demo-old-password' type='password' placeholder='请输入当前密码' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='demo-new-password'>新密码</Label>
                    <Input id='demo-new-password' type='password' placeholder='请输入新密码' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='demo-confirm-password'>确认新密码</Label>
                    <Input id='demo-confirm-password' type='password' placeholder='请再次输入新密码' />
                  </div>
                </div>
                <Button disabled className='gap-2'>
                  <Lock className='size-4' />
                  修改密码
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 修改步骤 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>修改个人信息</h2>
        <Card>
          <CardContent className='pt-6'>
            <ol className='space-y-4 text-sm'>
              <li className='flex gap-3'>
                <span className='flex-shrink-0 size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold'>
                  1
                </span>
                <div>
                  <p className='font-medium'>点击右上角用户头像</p>
                  <p className='text-muted-foreground'>展开用户菜单</p>
                </div>
              </li>
              <li className='flex gap-3'>
                <span className='flex-shrink-0 size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold'>
                  2
                </span>
                <div>
                  <p className='font-medium'>点击"设置"</p>
                  <p className='text-muted-foreground'>进入用户设置页面</p>
                </div>
              </li>
              <li className='flex gap-3'>
                <span className='flex-shrink-0 size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold'>
                  3
                </span>
                <div>
                  <p className='font-medium'>修改信息</p>
                  <p className='text-muted-foreground'>填写需要修改的昵称或邮箱</p>
                </div>
              </li>
              <li className='flex gap-3'>
                <span className='flex-shrink-0 size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold'>
                  4
                </span>
                <div>
                  <p className='font-medium'>保存更改</p>
                  <p className='text-muted-foreground'>点击"保存信息"按钮完成修改</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* 修改密码步骤 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>修改密码</h2>
        <Card>
          <CardContent className='pt-6'>
            <ol className='space-y-4 text-sm'>
              <li className='flex gap-3'>
                <span className='flex-shrink-0 size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold'>
                  1
                </span>
                <div>
                  <p className='font-medium'>输入当前密码</p>
                  <p className='text-muted-foreground'>验证账户所有权</p>
                </div>
              </li>
              <li className='flex gap-3'>
                <span className='flex-shrink-0 size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold'>
                  2
                </span>
                <div>
                  <p className='font-medium'>输入新密码</p>
                  <p className='text-muted-foreground'>建议使用包含大小写字母、数字和特殊字符的强密码</p>
                </div>
              </li>
              <li className='flex gap-3'>
                <span className='flex-shrink-0 size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold'>
                  3
                </span>
                <div>
                  <p className='font-medium'>确认新密码</p>
                  <p className='text-muted-foreground'>再次输入新密码确保一致</p>
                </div>
              </li>
              <li className='flex gap-3'>
                <span className='flex-shrink-0 size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold'>
                  4
                </span>
                <div>
                  <p className='font-medium'>提交修改</p>
                  <p className='text-muted-foreground'>点击"修改密码"按钮，成功后需要重新登录</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* 双因素认证 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <ShieldCheck className='size-5 text-primary' />
          双因素认证 (2FA)
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              双因素认证为账户添加额外的安全层。启用后，登录时除了密码还需要输入动态验证码。
            </p>
            <div className='space-y-4'>
              <div className='bg-muted/30 rounded-lg p-4'>
                <h4 className='font-semibold text-sm mb-2'>设置步骤</h4>
                <ol className='text-xs text-muted-foreground space-y-2'>
                  <li>1. 在设置页面找到「双因素认证」区域，点击「设置 2FA」</li>
                  <li>2. 使用认证器 App（Google Authenticator、Microsoft Authenticator 等）扫描二维码</li>
                  <li>3. 输入 App 显示的 6 位验证码完成绑定</li>
                  <li>4. 妥善保存恢复代码，用于认证器丢失时恢复账户访问</li>
                </ol>
              </div>
              <div className='bg-muted/30 rounded-lg p-4 border-l-4 border-orange-500'>
                <h4 className='font-semibold text-sm mb-2'>恢复代码</h4>
                <p className='text-xs text-muted-foreground'>
                  • 启用 2FA 时会生成一次性恢复代码<br/>
                  • 当手机丢失或无法使用认证器时，可使用恢复代码登录<br/>
                  • <strong>务必将恢复代码保存在安全的地方</strong>，恢复代码仅显示一次
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 调试日志 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Bug className='size-5 text-primary' />
          调试日志
        </h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>
              调试日志功能用于临时采集详细运行日志，帮助排查订阅获取、节点同步等问题。
            </p>
            <div className='space-y-4'>
              <div className='bg-muted/30 rounded-lg p-4'>
                <h4 className='font-semibold text-sm mb-2'>使用方式</h4>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• 点击「开启调试」后，系统开始记录详细日志</li>
                  <li>• 调试模式会在 <strong>5 分钟后自动关闭</strong>，避免日志文件过大</li>
                  <li>• 可随时手动关闭调试模式</li>
                  <li>• 支持下载日志文件或实时查看最新日志</li>
                  <li>• 日志文件保留 7 天后自动清理</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 注意事项 */}
      <section className='mb-8'>
        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
          <Shield className='size-5 text-orange-500' />
          注意事项
        </h2>
        <Card className='border-orange-500/20'>
          <CardContent className='pt-6'>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>用户名不可修改：</strong>用户名在创建后无法更改，只能修改昵称</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>密码要求：</strong>建议密码长度至少8位，包含字母和数字</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>修改密码后：</strong>修改密码成功后当前会话会失效，需要重新登录</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>忘记密码：</strong>如果忘记当前密码，请联系管理员重置</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-orange-500 mt-1'>⚠</span>
                <span><strong>2FA 恢复代码：</strong>启用双因素认证后务必保存恢复代码，丢失后需管理员协助</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </DocLayout>
  )
}
