import { Author, Genre, Publisher } from 'index'
import { TopTenCard } from '../Cards/TopTenCard'

type TopTenProps = {
  allAuthors: Author[]
  allPublishers: Publisher[],
  allGenres: Genre[]
}

export const TopTen = ({ allAuthors, allPublishers, allGenres }: TopTenProps) => {
  return (<div className='mb-xl'>
    <div className="my-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
      <TopTenCard data={allAuthors} />
      <TopTenCard data={allPublishers} />
      <TopTenCard data={allGenres} />
    </div>
  </div>
  )
}
