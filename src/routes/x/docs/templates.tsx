import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Screenshot } from '@/components/docs/screenshot'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/x/docs/templates')({
  component: TemplatesPage,
})

function TemplatesPage() {
  const { t } = useTranslation('xdocs')

  return (
    <XDocLayout title={t('templates.title')} description={t('templates.description')}>
      <Screenshot
        src='/images/screenshots/doc-templates-page.webp'
        alt={t('templates.screenshot.alt')}
        caption={t('templates.screenshot.caption')}
      />
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>{t('templates.overview.heading')}</h2>
        <p className='text-muted-foreground'>{t('templates.overview.text')}</p>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>{t('templates.structure.heading')}</h2>
        <Card>
          <CardContent className='pt-6'>
            <div className='text-sm space-y-3 text-muted-foreground'>
              <p>{t('templates.structure.text')}</p>
              <ul className='space-y-1 ml-4'>
                <li>- <code className='bg-muted px-1.5 py-0.5 rounded'>proxy-groups</code> — {t('templates.structure.proxyGroups')}</li>
                <li>- <code className='bg-muted px-1.5 py-0.5 rounded'>rules</code> — {t('templates.structure.rules')}</li>
                <li>- <code className='bg-muted px-1.5 py-0.5 rounded'>dns</code> — {t('templates.structure.dns')}</li>
                <li>- <code className='bg-muted px-1.5 py-0.5 rounded'>general</code> — {t('templates.structure.general')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>{t('templates.proxyGroups.heading')}</h2>
        <p className='text-muted-foreground mb-4'>{t('templates.proxyGroups.text')}</p>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead><tr className='border-b'><th className='text-left py-3 px-4'>{t('templates.proxyGroups.typeCol')}</th><th className='text-left py-3 px-4'>{t('templates.proxyGroups.descCol')}</th></tr></thead>
            <tbody>
              <tr className='border-b'><td className='py-3 px-4'>select</td><td className='py-3 px-4'>{t('templates.proxyGroups.select')}</td></tr>
              <tr className='border-b'><td className='py-3 px-4'>url-test</td><td className='py-3 px-4'>{t('templates.proxyGroups.urlTest')}</td></tr>
              <tr className='border-b'><td className='py-3 px-4'>fallback</td><td className='py-3 px-4'>{t('templates.proxyGroups.fallback')}</td></tr>
              <tr><td className='py-3 px-4'>load-balance</td><td className='py-3 px-4'>{t('templates.proxyGroups.loadBalance')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4'>{t('templates.usage.heading')}</h2>
        <div className='text-sm text-muted-foreground space-y-2'>
          <p>{t('templates.usage.step1')}</p>
          <p>{t('templates.usage.step2')}</p>
          <p>{t('templates.usage.step3')}</p>
          <p>{t('templates.usage.step4')}</p>
        </div>
      </section>
    </XDocLayout>
  )
}
