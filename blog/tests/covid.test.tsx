import { render, screen } from '@testing-library/react'
import Covid from '../components/Covid/CovidTracker'
import useSWR from 'swr'
import React from 'react'

jest.mock('swr')

jest.mock('next/dynamic', () => {
  return jest.fn(() => 'Dynamic')
})

describe('Covid Component', () => {
  it('renders without crashing', async () => {
    // @ts-expect-error
    useSWR.mockReturnValue({
      data: {
        date: '20210111',
        positive: 100000,
        positiveIncrease: 20000,
        death: 300,
        deathIncrease: 400,
        hospitalizedCurrently: 500,
        hospitalizedIncrease: -600,
      },
      error: null,
    })
    render(<Covid />)
    expect(screen.getByText('400')).toBeInTheDocument
  })

  it('handles errors', async () => {
    // @ts-expect-error
    useSWR.mockReturnValue({
      data: {
        date: '20210111',
        positive: 100000,
        positiveIncrease: 20000,
        death: 300,
        deathIncrease: 400,
        snoDeaths: 600,
        snoDeathsIncrease: 0,
      },
      error: 'null',
    })
    render(<Covid />)
    expect(screen.queryByText('400')).not.toBeInTheDocument()
  })

  it('handles empty data', async () => {
    // @ts-expect-error
    useSWR.mockReturnValue({
      data: null,
      error: null,
    })
    render(<Covid />)
    expect(screen.queryByText('400')).not.toBeInTheDocument()
  })

  it('handles empty data', async () => {
    // @ts-expect-error
    useSWR.mockReturnValue({ data: null, error: 'test' })
    render(<Covid />)
    expect(screen.queryByText('450000')).toBeInTheDocument
  })
})
