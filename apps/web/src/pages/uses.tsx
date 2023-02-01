import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { GetStaticProps } from 'next/types'
import { SanityDocument } from '@sanity/client'
import { PortableText } from '@portabletext/react'
import sanityClient from '@/lib/sanityClient'
import { Meta } from '@/components/Meta'

type ToolProps = {
  title: string
  href?: string
  children?: React.ReactNode
}

interface Hardware extends SanityDocument {
  make: string
  model: string
  year: number
  description: string
  type: 'laptop' | 'desktop' | 'tablet' | 'phone' | 'eReader' | 'other'
}

function ToolsSection({ children, ...props }) {
  return (
    <Section title="" {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }: ToolProps) {
  return (
    <Card className="">
      <Card.Title href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses(props) {
  const { tools, apps } = props

  return (
    <>
      <Meta description="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff." slug={{ current: '/uses' }} type="website" title='Uses | Art Rosnovsky' />
      <SimpleLayout
        title="Software I use, gadgets I love, and other things I recommend."
        intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
      >
        <div className="space-y-20">
          <ToolsSection title="Hardware">
            {tools?.map((tool) => (
              <Tool key={tool._id} title={`${tool.make} ${tool.model} (${tool.year})`} href={tool.link}>
                <PortableText value={tool.description} />
              </Tool>
            ))}
          </ToolsSection>
          <ToolsSection title="Software" id="software">
            {apps?.map((tool) => (
              <Tool key={tool._id} title={`${tool.name}`} href={tool.site}>
                <PortableText value={tool.description} />
              </Tool>
            ))}
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const tools: Hardware[] = await sanityClient.fetch(`*[_type == "hardware"] {...} | order(year desc)`)
  const apps = await sanityClient.fetch(`*[_type == "software"] {...}`)

  return {
    props: {
      tools,
      apps
    },
    revalidate: 120,
  };
}
