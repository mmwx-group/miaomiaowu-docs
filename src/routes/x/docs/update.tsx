import { createFileRoute } from '@tanstack/react-router'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/x/docs/update')({
  component: UpdatePage,
})

function UpdatePage() {
  return (
    <XDocLayout title='版本更新' description='如何升级妙妙屋X到最新版本'>
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>Docker 更新</h2>
        <Card>
          <CardContent className='pt-6'>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto'>
              <pre>{`# 拉取最新镜像
docker pull ghcr.io/iluobei/miaomiaowux:latest

# 停止并删除旧容器
docker stop miaomiaowux && docker rm miaomiaowux

# 重新运行
docker run -d \\
  --name miaomiaowux \\
  -p 12889:12889 \\
  -v ./data:/app/data \\
  ghcr.io/iluobei/miaomiaowux:latest`}</pre>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>二进制更新</h2>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-muted-foreground mb-4'>下载新版本二进制文件替换旧文件，重启服务即可。数据库会自动迁移。</p>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto'>
              <pre>{`# 停止服务
systemctl stop miaomiaowux

# 替换二进制
cp mmwx-linux-amd64-new /opt/mmwx/mmwx-linux-amd64

# 重启
systemctl start miaomiaowux`}</pre>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4'>Agent 更新</h2>
        <p className='text-muted-foreground'>Agent 更新方式与主控端相同，下载新版本替换后重启即可。Agent 与主控端版本建议保持一致。</p>
      </section>
    </XDocLayout>
  )
}
