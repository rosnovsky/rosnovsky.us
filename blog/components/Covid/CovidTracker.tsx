import useCovidData from './useCovidData'
import Container from '../Layout/container'
import CasesCard from './CovidCard'
import Loading from './Loading'

export default function Covid() {
  const { data, error, loading, today } = useCovidData()

  if (error) return <Loading error={error} />

  if (!data) return <Loading loading={!data} />

  return (
    <Container>
      <div className="relative max-w-7xl font-body mx-auto pt-5 pb-10">
        <div className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow md:grid-cols-3">
          <CasesCard
            numbers={data.positive}
            change={data.positiveIncrease}
            title="🇺🇸 Total COVID-19 Cases"
            loading={loading}
            error={error}
          />
          <CasesCard
            numbers={data.death}
            change={data.deathIncrease}
            title="🇺🇸 Died of Covid-19"
            loading={loading}
            error={error}
          />
          <CasesCard
            numbers={data.snoDeaths}
            change={data.snoDeathsIncrease}
            title="🇺🇸 Died in Snohomish County"
            loading={loading}
            error={error}
          />
        </div>
        <p className="text-sm  text-gray-600 mt-2 text-right">
          Data by{' '}
          <a
            href="https://coronavirus.jhu.edu/map.html"
            title="John Hopkins University"
          >
            JHU
          </a>{' '}
          as of {today}
        </p>
      </div>
    </Container>
  )
}
