import { render, screen, act } from '@testing-library/react'
import Index from '../pages/index'
import useSWR from 'swr'

jest.mock('swr')
useSWR.mockReturnValue({ data: [{ data: [] }], error: null })

jest.mock('next/dynamic', () => {
  return jest.fn(() => 'Dynamic')
})

describe('INDEX', () => {
  it('renders without crashing', () => {
    render(<Index />)
    expect(
      screen.getByRole('heading', { name: 'Welcome to the Rosnovsky Park' })
    ).toBeInTheDocument()
  })
})
