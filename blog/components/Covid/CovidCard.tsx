import React from 'react'
import { CovidData } from '../..'

export default function CovidCard(props: CovidData) {
  const { title, numbers, change }: CovidData = props

  const formatCases: (cases: number) => String = function (cases) {
    if (cases <= 9999) {
      return Intl.NumberFormat().format(cases)
    } else if (cases >= 10000 && cases <= 1010000) {
      return `${(cases / 1000).toFixed(2)} K`
    } else {
      return `${(cases / 1000000).toFixed(2)} M`
    }
  }

  const changeStatus: (cases: number) => JSX.Element = function (cases) {
    return cases <= 0 ? (
      <>
        <div className="ml-1 flex flex-start items-baseline text-sm leading-5 font-bold text-green-800">
          <span className="sr-only">No change</span>
          🎉 {formatCases(change)}
        </div>
      </>
    ) : (
      <>
        <div className="flex my-auto ml-1 items-center text-sm font-bold">
          <svg
            className="self-center flex-shrink-1 h-5 w-4 text-red-800"
            fill="currentColor"
            viewBox="7 0 10 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Increased by</span>
          {formatCases(change)}
        </div>
      </>
    )
  }

  return (
    <div className="border-t border-gray-200 md:border-0 md:border-l">
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="text-base leading-6 font-body font-normal text-gray-900">
            {title}
          </dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex items-baseline text-2xl leading-8 font-semibold text-red-900">
              <span>{formatCases(numbers)}</span>
            </div>
            <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-gray-100 text-red-800 md:mt-2 lg:mt-0">
              <span className="ml-1">{changeStatus(change)}</span>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  )
}
