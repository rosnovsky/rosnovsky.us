import React, { useState, useEffect } from 'react'
import CasesCard from './CasesCard'

interface CovidFetchData {
  totalCases: number
  totalCasesChange: number
  death: number
  deathChange: number
  hospitalized: number
  hospitalizedChange: number
}

export default function Covid() {
  const [cases, setCases] = useState<CovidFetchData>({
    totalCases: 8200000,
    totalCasesChange: 70000,
    death: 220000,
    deathChange: 400,
    hospitalized: 42000,
    hospitalizedChange: 1500
  })
  const [lastModified, setLastModified] = useState<string>()

  useEffect(() => {
    const fetchCases = async () => {
      const currentTotals: Record<string, Number> = await fetch(
        `https://api.covidtracking.com/v1/us/current.json`,
        {
          method: 'GET'
        }
      )
        .then(result => {
          return result.json()
        })
        .then(data => {
          const massagedData: CovidFetchData = {
            totalCases: data[0].positive,
            totalCasesChange: data[0].positiveIncrease,
            death: data[0].death,
            deathChange: data[0].deathIncrease,
            hospitalized: data[0].hospitalizedCurrently,
            hospitalizedChange: data[0].hospitalizedIncrease
          }
          setCases(massagedData)
          setLastModified(
            new Intl.RelativeTimeFormat().format(
              Math.ceil(
                (Date.parse(data[0].lastModified) - Date.now()) /
                  (1000 * 60 * 60 * 24)
              ),
              'day'
            )
          )
          return data
        })
      return currentTotals
    }

    fetchCases()
  }, [])

  return (
    <div className="xs:mx-5 lg:w-4/5 mx-auto sm:mx-5 md:mx-5 mb-10 xl:w-full">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mt-10">
        COVID-19: US Stats
      </h3>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        <CasesCard
          numbers={cases.totalCases}
          change={cases.totalCasesChange}
          type="infected"
          title="Total Cases"
        />

        <CasesCard
          numbers={cases.death}
          change={cases.deathChange}
          type="death"
          title="Total Deaths"
        />

        <CasesCard
          numbers={cases.hospitalized}
          change={cases.hospitalizedChange}
          type="hospitalized"
          title="Currently Hospitalized"
        />
      </div>
      <div className="text-right text-xs text-gray-400 mt-5 ">
        Updated {lastModified} <br className="md:hidden lg:hidden xl:hidden" />
        by{' '}
        <a
          className="underline"
          href="https://covidtracking.com"
          target="_blank"
        >
          The COVID Tracking Project
        </a>
        .
      </div>
    </div>
  )
}
