import Container from '../Layout/container'
import CasesCard from './CovidCard'

const Loading = ({ loading }: any) => {
  return (
    <Container>
      <div className="relative max-w-7xl mx-auto pt-5 pb-10">
        <div className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow md:grid-cols-3">
          <CasesCard
            numbers={30000000}
            change={100000}
            title="🇺🇸 Total COVID-19 Cases"
            loading={loading}
          />
          <CasesCard
            numbers={450000}
            change={4000}
            title="🇺🇸 Died of Covid-19"
            loading={loading}
          />
          <CasesCard
            numbers={600}
            change={0}
            title="🇺🇸 Died in Snohomish county"
            loading={loading}
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
          as of {new Date().toLocaleString('en-US')}
        </p>
      </div>
    </Container>
  )
}

export default Loading
