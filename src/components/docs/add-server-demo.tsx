import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Server, KeyRound, Copy, Check, ArrowRight, RotateCcw } from 'lucide-react'

// AddServerDemo 是 install-agent 文档内嵌的"添加服务器"交互演示。
// 用户填几个 mock 字段 → 点"生成 Token" → 展示带 token 占位的一键安装命令。
// 完全本地状态,不发任何网络请求。

function genToken() {
  // 32 字符十六进制,假装是主控生成的 server_token
  let s = ''
  for (let i = 0; i < 32; i++) {
    s += Math.floor(Math.random() * 16).toString(16)
  }
  return s
}

export function AddServerDemo() {
  const { t } = useTranslation('xdocs')
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState<'form' | 'result'>('form')

  // 表单字段
  const [name, setName] = useState('HK GoMami Pro N')
  const [ip, setIp] = useState('203.0.113.10')
  const [domain, setDomain] = useState('hk.example.com')
  const [xrayMode, setXrayMode] = useState<'external' | 'embedded'>('external')
  const [stealSelf, setStealSelf] = useState(false)

  const [masterURL] = useState('https://mmwx.example.com')
  const [token, setToken] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setToken(genToken())
    setStage('result')
  }

  const handleReset = () => {
    setToken('')
    setStage('form')
    setCopied(false)
  }

  // 拼装命令
  const installCmd = (() => {
    const params = new URLSearchParams()
    params.set('token', token)
    if (xrayMode === 'embedded') params.set('xray_mode', 'embedded')
    if (stealSelf) params.set('steal_self', '1')
    return `curl -fsSL "${masterURL}/api/remote/install.sh?${params.toString()}" | sudo bash`
  })()

  const copy = () => {
    navigator.clipboard.writeText(installCmd).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className='border-dashed'>
      <CardContent className='pt-6'>
        <div className='flex items-start gap-3 mb-3'>
          <div className='size-10 rounded-md flex items-center justify-center bg-primary/10 text-primary shrink-0'>
            <Server className='size-5' />
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='font-semibold mb-1'>{t('installAgent.demo.heading')}</h3>
            <p className='text-sm text-muted-foreground'>{t('installAgent.demo.intro')}</p>
          </div>
        </div>

        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o)
            if (!o) handleReset()
          }}
        >
          <DialogTrigger asChild>
            <Button variant='outline' className='gap-2'>
              <Server className='size-4' />
              {t('installAgent.demo.openBtn')}
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-2xl'>
            <DialogHeader>
              <DialogTitle>{t('installAgent.demo.dialogTitle')}</DialogTitle>
              <DialogDescription>
                {stage === 'form'
                  ? t('installAgent.demo.dialogDescForm')
                  : t('installAgent.demo.dialogDescResult')}
              </DialogDescription>
            </DialogHeader>

            {stage === 'form' && (
              <div className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <div className='space-y-1'>
                    <Label htmlFor='demo-name'>{t('installAgent.demo.fieldName')}</Label>
                    <Input id='demo-name' value={name} onChange={(e) => setName(e.target.value)} placeholder='HK GoMami Pro N' />
                  </div>
                  <div className='space-y-1'>
                    <Label htmlFor='demo-ip'>{t('installAgent.demo.fieldIp')}</Label>
                    <Input id='demo-ip' value={ip} onChange={(e) => setIp(e.target.value)} placeholder='203.0.113.10' />
                  </div>
                  <div className='space-y-1 sm:col-span-2'>
                    <Label htmlFor='demo-domain'>{t('installAgent.demo.fieldDomain')}</Label>
                    <Input id='demo-domain' value={domain} onChange={(e) => setDomain(e.target.value)} placeholder='hk.example.com' />
                  </div>
                </div>

                <div>
                  <Label className='mb-2 block'>{t('installAgent.demo.fieldXrayMode')}</Label>
                  <div className='flex gap-2'>
                    <Button
                      type='button'
                      variant={xrayMode === 'external' ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setXrayMode('external')}
                    >
                      external
                    </Button>
                    <Button
                      type='button'
                      variant={xrayMode === 'embedded' ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setXrayMode('embedded')}
                    >
                      embedded
                    </Button>
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {xrayMode === 'external'
                      ? t('installAgent.demo.xrayExternalHint')
                      : t('installAgent.demo.xrayEmbeddedHint')}
                  </p>
                </div>

                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    id='demo-steal'
                    checked={stealSelf}
                    onChange={(e) => setStealSelf(e.target.checked)}
                    className='size-4'
                  />
                  <Label htmlFor='demo-steal' className='cursor-pointer text-sm font-normal'>
                    {t('installAgent.demo.fieldStealSelf')}
                  </Label>
                </div>
              </div>
            )}

            {stage === 'result' && (
              <div className='space-y-4'>
                <div className='rounded-lg border bg-muted/40 p-3 space-y-2 text-sm'>
                  <div className='flex justify-between gap-3'>
                    <span className='text-muted-foreground'>{t('installAgent.demo.fieldName')}</span>
                    <span className='font-mono truncate'>{name}</span>
                  </div>
                  <div className='flex justify-between gap-3'>
                    <span className='text-muted-foreground'>{t('installAgent.demo.fieldIp')}</span>
                    <span className='font-mono truncate'>{ip}</span>
                  </div>
                  <div className='flex justify-between gap-3'>
                    <span className='text-muted-foreground'>{t('installAgent.demo.fieldDomain')}</span>
                    <span className='font-mono truncate'>{domain || '—'}</span>
                  </div>
                  <div className='flex justify-between gap-3'>
                    <span className='text-muted-foreground'>{t('installAgent.demo.fieldXrayMode')}</span>
                    <span className='font-mono'>{xrayMode}</span>
                  </div>
                  <div className='flex justify-between gap-3 pt-1 border-t'>
                    <span className='text-muted-foreground flex items-center gap-1.5'>
                      <KeyRound className='size-3.5' />
                      {t('installAgent.demo.tokenLabel')}
                    </span>
                    <span className='font-mono text-xs break-all'>{token}</span>
                  </div>
                </div>

                <div>
                  <Label className='mb-2 block'>{t('installAgent.demo.installCmdLabel')}</Label>
                  <div className='relative'>
                    <pre className='bg-muted rounded-lg p-3 pr-12 font-mono text-xs overflow-x-auto whitespace-pre-wrap break-all'>{installCmd}</pre>
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute top-1 right-1 size-7'
                      onClick={copy}
                      title={t('installAgent.demo.copyBtn')}
                    >
                      {copied ? <Check className='size-3.5 text-green-600' /> : <Copy className='size-3.5' />}
                    </Button>
                  </div>
                  <p className='text-xs text-muted-foreground mt-2'>{t('installAgent.demo.runOnServerHint')}</p>
                </div>
              </div>
            )}

            <DialogFooter>
              {stage === 'form' ? (
                <Button onClick={handleGenerate} disabled={!name || !ip} className='gap-2'>
                  <KeyRound className='size-4' />
                  {t('installAgent.demo.generateBtn')}
                  <ArrowRight className='size-4' />
                </Button>
              ) : (
                <Button variant='outline' onClick={handleReset} className='gap-2'>
                  <RotateCcw className='size-4' />
                  {t('installAgent.demo.regenBtn')}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
