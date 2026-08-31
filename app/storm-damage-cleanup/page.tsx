import type { Metadata } from 'next'
import { ServicePage } from '@/components/ServicePage'
import { JsonLd } from '@/components/JsonLd'
import { SERVICE_BY_SLUG } from '@/content/services'
import { pageMeta } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema'

const service = SERVICE_BY_SLUG['storm-damage-cleanup']

export const metadata: Metadata = pageMeta({
  title: service.metaTitle,
  description: service.description,
  path: `/${service.slug}`,
})

export default function Page() {
  const faq = faqSchema(service.faqs)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: service.noun, path: `/${service.slug}` },
        ])}
      />
      <JsonLd data={serviceSchema(service)} />
      {faq && <JsonLd data={faq} />}
      <ServicePage service={service} />
    </>
  )
}
