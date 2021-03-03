import { render, screen } from '@testing-library/react'
import Code from '../components/PortableText/Code'
import InternalLink from '../components/PortableText/InternalLink'

const codeBlock = {
  language: 'typescript',
  code: '<div>Test Code</div>',
}

const internalLinkBlock = {
  mark: { reference: { _ref: '9be06d26-5be3-44e0-9787-083ec9dc9702' } },
  children: ['link text'],
}

describe('Portable Text', () => {
  it('Code Serializer', async () => {
    render(<Code node={codeBlock} />)
    expect(screen.getByText('<div>Test Code</div>')).toBeInTheDocument
  })

  it('Internal Link', async () => {
    render(
      <InternalLink
        mark={internalLinkBlock.mark}
        children={internalLinkBlock.children}
      />
    )
    expect(screen.getByText('link text')).toBeInTheDocument
  })
})
