import React from 'react'
import { icons } from './icons'

interface CovidData {
  type: string
  title: string
  numbers: number
  change: number
}

export default function TotalCases(props) {
  const { type, title, numbers, change }: CovidData = props

  const formatCases: (cases: number) => String = function(cases) {
    if (cases <= 9999) {
      return Intl.NumberFormat().format(cases)
    } else if (cases >= 10000 && cases <= 1010000) {
      return `${(cases / 1000).toFixed(2)} K`
    } else {
      return `${(cases / 1000000).toFixed(2)} MM`
    }
  }

  const changeStatus: (cases: number) => JSX.Element = function(cases) {
    return cases < 0 ? (
      <>
        <div className="ml-1 flex flex-start items-baseline text-sm leading-5 font-semibold text-green-600">
          <svg
            className="self-center flex-shrink-0 h-5 w-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Decreased by</span>
          {formatCases(change)}
        </div>
      </>
    ) : (
      <>
        <div className="ml-1 flex items-baseline text-sm leading-5 font-semibold">
          <svg
            className="self-center flex-shrink-0 h-5 w-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
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
    <div className="overflow-hidden shadow rounded-lg w-full">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-orange-600 rounded-md p-3 md:hidden sm:hidden">
            {icons[type]}
          </div>
          <div className="ml-5 md:mx-auto sm:mx-auto flex-1">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline lg:flex-col sm:flex-col">
                <div className="text-2xl sm:text-xl md:text-xl xl:text-xl leading-6 font-semibold text-gray-900">
                  {formatCases(numbers)}
                </div>
                {changeStatus(change)}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
