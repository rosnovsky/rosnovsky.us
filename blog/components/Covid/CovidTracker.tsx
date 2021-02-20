import React, { useState, useEffect } from 'react'
import CasesCard from './CovidCard'
import Container from '../Layout/container'
import useSWR from 'swr'
import { CovidFetchData } from '../..'

const Loading = () => {
  return (
    <Container>
      <div className="relative max-w-7xl mx-auto pt-5 pb-10">
        <div className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow md:grid-cols-3">
          <CasesCard
            numbers={30000000}
            change={100000}
            title="🇺🇸 Total COVID-19 Cases"
          />
          <CasesCard
            numbers={450000}
            change={4000}
            title="🇺🇸 Died of Covid-19"
          />
          <CasesCard
            numbers={100000}
            change={-1000}
            title="🇺🇸 In Hospitals with Covid now"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 text-right">
          Data by{' '}
          <a
            className="underline"
            href="https://covidtracking.com"
            target="_blank"
            rel="noopener"
          >
            CovidTracking
          </a>{' '}
          Project as of{' '}
          {new Date(Date.now()).toLocaleString('us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </Container>
  )
}

export default function Covid() {
  const [yesterdayHospitalizations, setYesterdayHospitalizations] = useState(0)
  const [loading, setLoading] = useState(true)
  const [today, setToday] = useState([2021, 0, 28])

  const fetcher = async (url: string) => {
    const data = await fetch(url, {
      method: 'GET',
    })
      .then((result) => {
        return result.json()
      })
      .then((data) => {
        const massagedData: CovidFetchData = {
          date: data[0].date,
          positive: data[0].positive,
          positiveIncrease: data[0].positiveIncrease,
          death: data[0].death,
          deathIncrease: data[0].deathIncrease,
          hospitalizedCurrently: data[0].hospitalizedCurrently,
          hospitalizedIncrease: data[0].hospitalizedIncrease,
        }
        return massagedData
      })
    return data
  }

  const { data, error } = useSWR(
    'https://api.covidtracking.com/v1/us/current.json',
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
        const date = data.date.toString()

        const todayArray: number[] = [
          Number(date.slice(0, 4)),
          Number(date.slice(4, 6)),
          Number(date.slice(6, 8)),
        ]

        setToday(todayArray)
        const yesterdayDate = new Date(
          todayArray[0],
          todayArray[1] - 1,
          todayArray[2]
        )
        yesterdayDate.setDate(yesterdayDate.getDate() - 1)

        const yesterday = `${yesterdayDate.getFullYear().toString()}${
          yesterdayDate.getMonth() > 9
            ? yesterdayDate.getMonth().toString()
            : `0${yesterdayDate.getMonth() + 1}`
        }${
          yesterdayDate.getDate() > 9
            ? yesterdayDate.getDate().toString()
            : `0${yesterdayDate.getDate()}`
        }`

        const yesterdayUrl = `https://api.covidtracking.com/v1/us/${yesterday}.json`

        const yesterdayData = fetch(yesterdayUrl)
          .then((response) => response.json())
          .then((data) => data.hospitalizedCurrently)
          .then((data) => {
            setYesterdayHospitalizations(data)
            setLoading(false)
          })
      },
    }
  )

  if (error) return <span>over 220,000</span>
  if (!data) return <Loading />

  return (
    <Container>
      <div className="relative max-w-7xl font-body mx-auto pt-5 pb-10">
        <div className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow md:grid-cols-3">
          <CasesCard
            numbers={loading ? 30000000 : data.positive}
            change={loading ? 100000 : data.positiveIncrease}
            title="🇺🇸 Total COVID-19 Cases"
          />
          <CasesCard
            numbers={loading ? 450000 : data.death}
            change={loading ? 4000 : data.deathIncrease}
            title="🇺🇸 Died of Covid-19"
          />
          <CasesCard
            numbers={loading ? 100000 : data.hospitalizedCurrently}
            change={
              loading
                ? -1000
                : -yesterdayHospitalizations + data.hospitalizedCurrently
            }
            title="🇺🇸 In Hospitals with Covid now"
          />
        </div>
        <p className="text-sm  text-gray-600 mt-2 text-right">
          Data by{' '}
          <a
            className="underline"
            href="https://covidtracking.com"
            target="_blank"
            rel="noopener"
          >
            CovidTracking
          </a>{' '}
          Project as of{' '}
          {new Date(today[0], today[1] - 1, today[2]).toLocaleString('us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </Container>
  )
}
