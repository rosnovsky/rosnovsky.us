import Container from '../Layout/container'
import CasesCard from './CovidCard'

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
            numbers={600}
            change={0}
            title="🇺🇸 Died in Snohomish county"
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

export default Loading
