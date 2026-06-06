import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { XDocLayout } from '@/components/docs/x-doc-layout'
import { Screenshot } from '@/components/docs/screenshot'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/x/docs/nodes')({
  component: NodesPage,
})

function NodesPage() {
  const { t } = useTranslation('xdocs')

  return (
    <XDocLayout title={t('nodes.title')} description={t('nodes.description')}>
      <Screenshot
        src='/images/screenshots/doc-nodes-page.webp'
        alt={t('nodes.screenshot.alt')}
        caption={t('nodes.screenshot.caption')}
      />
      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>{t('nodes.overview')}</h2>
        <p className='text-muted-foreground'>{t('nodes.overviewText')}</p>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>{t('nodes.sourceHeading')}</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead><tr className='border-b'><th className='text-left py-3 px-4'>{t('nodes.sourceCol')}</th><th className='text-left py-3 px-4'>{t('nodes.descCol')}</th><th className='text-left py-3 px-4'>{t('nodes.syncMethodCol')}</th></tr></thead>
            <tbody>
              <tr className='border-b'><td className='py-3 px-4'>{t('nodes.sourceXray')}</td><td className='py-3 px-4'>{t('nodes.sourceXrayDesc')}</td><td className='py-3 px-4'>{t('nodes.autoSync')}</td></tr>
              <tr className='border-b'><td className='py-3 px-4'>{t('nodes.sourceRemote')}</td><td className='py-3 px-4'>{t('nodes.sourceRemoteDesc')}</td><td className='py-3 px-4'>{t('nodes.autoSync')}</td></tr>
              <tr><td className='py-3 px-4'>{t('nodes.sourceExternal')}</td><td className='py-3 px-4'>{t('nodes.sourceExternalDesc')}</td><td className='py-3 px-4'>{t('nodes.manualScheduled')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>{t('nodes.autoSyncHeading')}</h2>
        <p className='text-muted-foreground mb-4'>{t('nodes.autoSyncText')}</p>
        <Card>
          <CardContent className='pt-6'>
            <div className='text-sm space-y-2 text-muted-foreground'>
              <p>{t('nodes.syncTriggerLabel')}</p>
              <ul className='space-y-1 ml-4'>
                <li>- {t('nodes.syncTrigger1')}</li>
                <li>- {t('nodes.syncTrigger2')}</li>
                <li>- {t('nodes.syncTrigger3')}</li>
                <li>- {t('nodes.syncTrigger4')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>{t('nodes.operationsHeading')}</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead><tr className='border-b'><th className='text-left py-3 px-4'>{t('nodes.operationCol')}</th><th className='text-left py-3 px-4'>{t('nodes.descCol')}</th></tr></thead>
            <tbody>
              <tr className='border-b'><td className='py-3 px-4'>{t('nodes.opEnableDisable')}</td><td className='py-3 px-4'>{t('nodes.opEnableDisableDesc')}</td></tr>
              <tr className='border-b'><td className='py-3 px-4'>{t('nodes.opRename')}</td><td className='py-3 px-4'>{t('nodes.opRenameDesc')}</td></tr>
              <tr className='border-b'><td className='py-3 px-4'>{t('nodes.opSort')}</td><td className='py-3 px-4'>{t('nodes.opSortDesc')}</td></tr>
              <tr><td className='py-3 px-4'>{t('nodes.opGroup')}</td><td className='py-3 px-4'>{t('nodes.opGroupDesc')}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-bold mb-4'>{t('nodes.tunnelHeading')}</h2>
        <p className='text-muted-foreground mb-4'>{t('nodes.tunnelText')}</p>
        <div className='space-y-4'>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2'>{t('nodes.tunnelForwardHeading')}</h3>
              <p className='text-sm text-muted-foreground'>{t('nodes.tunnelForwardText')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <h3 className='font-semibold mb-2'>{t('nodes.tunnelIndicatorHeading')}</h3>
              <p className='text-sm text-muted-foreground'>{t('nodes.tunnelIndicatorText')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6 text-sm text-muted-foreground'>{t('nodes.tunnelAdminNote')}</CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4'>{t('nodes.notesHeading')}</h2>
        <ul className='space-y-2 text-sm text-muted-foreground'>
          <li>- {t('nodes.note1')}</li>
          <li>- {t('nodes.note2')}</li>
          <li>- {t('nodes.note3')}</li>
          <li>- {t('nodes.note4')}</li>
        </ul>
      </section>
    </XDocLayout>
  )
}
