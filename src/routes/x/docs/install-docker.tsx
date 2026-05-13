import { createFileRoute, Link } from '@tanstack/react-router'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/x/docs/install-docker')({
  component: InstallDockerPage,
})

function InstallDockerPage() {
  return (
    <XDocLayout title='Docker 安装' description='使用 Docker 快速部署妙妙屋X'>
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>快速部署</h2>
        <Card>
          <CardContent className='pt-6'>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto'>
              <pre>{`# 拉取镜像
docker pull ghcr.io/iluobei/miaomiaowux:latest

# 运行容器
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
        <h2 className='text-2xl font-bold mb-4'>Docker Compose</h2>
        <Card>
          <CardContent className='pt-6'>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto'>
              <pre>{`version: '3'
services:
  miaomiaowux:
    image: ghcr.io/iluobei/miaomiaowux:latest
    container_name: miaomiaowux
    restart: always
    ports:
      - "12889:12889"
    volumes:
      - ./data:/app/data
    environment:
      - PORT=12889
      - JWT_SECRET=your-secret-key`}</pre>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>数据持久化</h2>
        <p className='text-muted-foreground mb-4'>
          数据库文件存储在 <code className='bg-muted px-1.5 py-0.5 rounded text-sm'>data/traffic.db</code>，请确保挂载 <code className='bg-muted px-1.5 py-0.5 rounded text-sm'>./data</code> 目录以持久化数据。
        </p>
      </section>

      <section>
        <Link to='/x/docs/install-agent' className='text-primary hover:underline'>→ 接下来部署 Agent 到远程服务器</Link>
      </section>
    </XDocLayout>
  )
}
