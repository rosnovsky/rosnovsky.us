import { Author, Publisher } from 'index'
import { TopTenCard } from '../Cards/TopTenCard'

type TopTenProps = {
  allAuthors: Author[]
  allPublishers: Publisher[]
}

export const TopTen = ({ allAuthors, allPublishers }: TopTenProps) => {
  return (<div className='mb-10 flex w-full flex-wrap justify-between '>
    <TopTenCard data={allAuthors} />
    <TopTenCard data={allPublishers} />
    {/* <TopTenCard data={allGenres} /> */}
  </div>
  )
}
