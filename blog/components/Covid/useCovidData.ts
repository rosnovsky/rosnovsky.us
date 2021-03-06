import { useState, useEffect } from 'react'

import useSWR from 'swr'
import type { CovidFetchData } from '../..'

const useCovidData = () => {
  const [loading, setLoading] = useState(true)
  const [today, setToday] = useState(new Date().toISOString())

  useEffect(() => {
    setLoading(false)
  }, [today])

  const fetcher = async (url: string) => {
    const data = await fetch(url)
      .then((result) => {
        return result.json()
      })
      .then((result) => {
        const covidData: CovidFetchData = {
          date: result.covidData[0].date,
          positive: result.covidData[0].confirmed,
          positiveIncrease: result.covidData[0].confirmed_daily,
          death: result.covidData[0].deaths,
          deathIncrease: result.covidData[0].deaths_daily,
          snoDeaths: result.snoData[0].deaths,
          snoDeathsIncrease: result.snoData[0].deaths_daily,
        }
        return covidData
      })
    return data
  }

  const { data, error } = useSWR(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/covid'
      : 'https://rosnovsky.us/api/covid',
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
      refreshWhenOffline: true,
      errorRetryInterval: 600000,
      onError: (err) => {
        console.error(Date.now(), `Failed to fetch Covid Data 🦠`, err)
      },
      shouldRetryOnError: true,
      refreshWhenHidden: true,
      onSuccess: (data) => {
        setToday(
          new Date(data.date).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZoneName: 'short',
          })
        )
      },
    }
  )
  return { data, error, loading, today }
}

export default useCovidData