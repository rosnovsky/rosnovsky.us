import React from 'react'

interface CovidData {
  title: string
  numbers: number
  change: number
}

export default function TotalCases(props: CovidData) {
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
        <div className="flex my-auto ml-1 items-center text-sm font-semibold">
          <svg
            className="self-center flex-shrink-1 h-5 w-4 text-red-500"
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
    <div className="flex items-center text-center mx-auto">
      {title}:&nbsp; <span className="font-bold">{formatCases(numbers)}</span>
      {changeStatus(change)}
    </div>
  )
}
