import React, { useState, useEffect } from 'react'
import CasesCard from './CovidCard'
import Container from '../Containers/container'
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
      method: 'GET'
    })
      .then(result => {
        return result.json()
      })
      .then(data => {
        const massagedData = {
          positive: data[0].positive,
          positiveIncrease: data[0].positiveIncrease,
          death: data[0].death,
          deathIncrease: data[0].deathIncrease,
          hospitalizedCurrently: data[0].hospitalizedCurrently,
          hospitalizedIncrease: data[0].hospitalizedIncrease
        }
        return massagedData
      })
    return data
  }

  const { data, error } = useSWR(
    'https://api.covidtracking.com/v1/us/current.json',
    fetcher,
    {
      refreshInterval: 60000
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

// interface CovidFetchData {
//   totalCases: number
//   totalCasesChange: number
//   death: number
//   deathChange: number
//   hospitalized: number
//   hospitalizedChange: number
// }

// export default function Covid() {
//   const [cases, setCases] = useState<CovidFetchData>({
//     totalCases: 8200000,
//     totalCasesChange: 70000,
//     death: 220000,
//     deathChange: 400,
//     hospitalized: 42000,
//     hospitalizedChange: 1500
//   })
//   const [lastModified, setLastModified] = useState<string>()

//   useEffect(() => {
//     // TODO: Catch and handle errors
//     const fetchCases = async () => {
//       const currentTotals: Record<string, Number> = await fetch(
//         `https://api.covidtracking.com/v1/us/current.json`,
//         {
//           method: 'GET'
//         }
//       )
//         .then(result => {
//           return result.json()
//         })
//         .then(data => {
//           const massagedData: CovidFetchData = {
//             totalCases: data[0].positive,
//             totalCasesChange: data[0].positiveIncrease,
//             death: data[0].death,
//             deathChange: data[0].deathIncrease,
//             hospitalized: data[0].hospitalizedCurrently,
//             hospitalizedChange: data[0].hospitalizedIncrease
//           }
//           setCases(massagedData)
//           setLastModified(
//             new Intl.RelativeTimeFormat().format(
//               Math.ceil(
//                 (Date.parse(data[0].lastModified) - Date.now()) /
//                   (1000 * 60 * 60 * 24)
//               ),
//               'day'
//             )
//           )
//           return data
//         })
//       return currentTotals
//     }

//     fetchCases()
//   }, [])

//   return (
//     <div className="xs:mx-5 lg:w-4/5 mx-auto sm:mx-5 md:mx-5 mb-10 xl:w-full">
//       <h3 className="text-lg leading-6 font-medium text-gray-900 mt-10">
//         COVID-19: US Stats
//       </h3>

//       <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
//         <CasesCard
//           numbers={cases.totalCases}
//           change={cases.totalCasesChange}
//           type="infected"
//           title="Total Cases"
//         />

//         <CasesCard
//           numbers={cases.death}
//           change={cases.deathChange}
//           type="death"
//           title="Total Deaths"
//         />

//         <CasesCard
//           numbers={cases.hospitalized}
//           change={cases.hospitalizedChange}
//           type="hospitalized"
//           title="Currently Hospitalized"
//         />
//       </div>
//       <div className="text-right text-xs text-gray-400 mt-5 ">
//         Updated {lastModified} <br className="md:hidden lg:hidden xl:hidden" />
//         by{' '}
//         <a
//           className="underline"
//           href="https://covidtracking.com"
//           target="_blank"
//         >
//           The COVID Tracking Project
//         </a>
//         .
//       </div>
//     </div>
//   )
// }
