import { render, screen, fireEvent } from '@testing-library/react'
import Index from '../pages/index'
import useSWR from 'swr'
import React from 'react'

jest.mock('swr')
useSWR.mockReturnValue({ data: [{ data: [] }], error: null })

jest.mock('next/dynamic', () => {
  return jest.fn(() => 'Dynamic')
})

jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />)

const post = {
  _id: '1',
  title: 'Test',
  socialCard: {
    title: 'Test',
    subtitle: 'Test',
  },
  slug: {
    current: 'test',
  },
  categories: [
    {
      title: 'Test',
      slug: {
        current: 'Test',
      },
    },
  ],
  publishedAt: '2017-01-01',
  excerpt: [{ _key: 'ce58b5efaeb9', _type: 'block' }],
  featured: false,
  mainImage: {
    alt: 'DDD',
    caption: 'DDD',
    asset: {
      metadata: {
        dimensions: {
          aspectRatio: 0.75,
          width: 1000,
          height: 2000,
        },
        lqip: 'data',
      },
      url: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    },
  },
}

const menuItems = [{ title: 'Test Page', slug: { current: 'test' } }]

describe('Home Page', () => {
  it('renders a Test post without crashing', async () => {
    render(
      <Index
        posts={[post]}
        alert={{
          active: true,
          message: 'Alert Message',
          alertLink: 'https://cnn.com',
          internal: true,
        }}
        menuItems={menuItems}
      />
    )
    expect(screen.getByRole('link', { name: 'Test' })).toBeInTheDocument()
  })

  it('Shows "No Posts" message when no posts on the page', async () => {
    render(<Index />)
    expect(await screen.getByText('No Posts.')).toBeInTheDocument
  })

  it('Correct copyright year', async () => {
    render(<Index />)
    expect(
      await screen.getByText(`© 2003-${new Date().getFullYear()} Art Rosnovsky`)
    ).toBeInTheDocument
  })

  it('has COVID component', async () => {
    render(<Index />)
    expect(await screen.getByRole(`link`, { name: 'CovidTracking' }))
      .toBeInTheDocument
  })
})
