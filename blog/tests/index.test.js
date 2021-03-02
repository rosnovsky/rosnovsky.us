import { render, screen, fireEvent } from '@testing-library/react'
import Index from '../pages/index'
import useSWR from 'swr'
import React from 'react'

jest.mock('swr')
useSWR.mockReturnValue({ data: [{ data: [] }], error: null })

jest.mock('next/dynamic', () => {
  return jest.fn(() => 'Dynamic')
})

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Index />)
    expect(
      screen.getByRole('heading', { name: 'Welcome to the Rosnovsky Park' })
    ).toBeInTheDocument()
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
})
