import Container from '../Layout/container'
import CovidCard from './CovidCard'

export default function Covid({ data }: any) {
  return (
    <Container>
      <div className="relative max-w-7xl font-body mx-auto pt-5 pb-10">
        <div className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow md:grid-cols-3">
          <CovidCard
            numbers={data.positive}
            change={data.positiveIncrease}
            title="🇺🇸 Total COVID-19 Cases"
          />
          <CovidCard
            numbers={data.death}
            change={data.deathIncrease}
            title="🇺🇸 Died of Covid-19"
          />
          <CovidCard
            numbers={data.snoDeaths}
            change={data.snoDeathsIncrease}
            title="🇺🇸 Died in Snohomish County"
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
          as of{' '}
          {new Date(data.date).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZoneName: 'short',
          })}
        </p>
      </div>
    </Container>
  )
}
