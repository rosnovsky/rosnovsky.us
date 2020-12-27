import React, { useState, useEffect } from 'react'
import CasesCard from './CovidCard'
import Container from '../container'
import useSWR from 'swr'

interface CovidFetchData {
  positive: number
  positiveIncrease: number
  death: number
  deathIncrease: number
  hospitalizedCurrently: number
  hospitalizedIncrease: number
}

export const Loading = () => {
  return (
    <div className="border-b border-accent-2 bg-black text-white">
      <Container>
        <div className="flex py-2 text-center text-sm">
          <div className="w-full text-lg">
            <div className="">
              <div className="flex flex-col xl:flex-row mx-auto lg:flex-row justify-between xs:mx-10 sm:mx-10 md:mx-10">
                <CasesCard
                  numbers={9000000}
                  change={125000}
                  title="🇺🇸 COVID Cases"
                />
                <CasesCard numbers={130000} change={1300} title="Dead" />
                <CasesCard numbers={50000} change={3400} title="In Hospitals" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function Covid() {
  const fetcher = async (url: string) => {
    const data = await fetch(url, {
      method: 'GET',
    })
      .then((result) => {
        return result.json()
      })
      .then((data) => {
        const massagedData = {
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
    }
  )

  if (error) return <span>over 220,000</span>
  if (!data) return <Loading />

  return (
    <div className="border-b border-accent-2 bg-black text-white">
      <Container>
        <div className="flex py-2 text-center text-sm">
          <div className="w-full text-lg">
            <div className="">
              <div className="flex flex-col xl:flex-row mx-auto lg:flex-row justify-between xs:mx-10 sm:mx-10 md:mx-10">
                <CasesCard
                  numbers={data.positive}
                  change={data.positiveIncrease}
                  title="🇺🇸 COVID Cases"
                />
                <CasesCard
                  numbers={data.death}
                  change={data.deathIncrease}
                  title="Dead"
                />
                <CasesCard
                  numbers={data.hospitalizedCurrently}
                  change={data.hospitalizedIncrease}
                  title="In Hospitals"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
