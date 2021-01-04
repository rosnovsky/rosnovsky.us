const OpenGraph = ({
  title,
  subtitle,
  category,
  date,
  coverImage,
}: {
  title: string
  subtitle: string
  category: string
  date: string
  url?: string
  coverImage: string
}) => {
  const bgUrl = `url('${coverImage}?blur=80')`
  return (
    <div className="m-0 flex w-full">
      <div
        className="relative border-1 bg-white bg-opacity-40 bg-transparent w-full"
        style={{
          backgroundImage: bgUrl,
          backgroundRepeat: 'no-repat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
        }}
      >
        <main className="flex-col bg-opacity-70 w-full p-20 bg-white">
          <h3 className="text-red-900 font-bold font-mono text-xl w-96">
            {category || 'No category'}
          </h3>
          <h1 className="text-7xl leading-tight font-black h-32  mt-7">
            {title || 'No Title'}
          </h1>
          <p className="prose text-3xl leading-relaxed mt-16 mb-10  h-32">
            {subtitle}
          </p>
          <div className="flex mt-18 justify-between">
            <p className="prose text-3xl text-red-900 font-semibold font-mono">
              {date || 'No date'}
            </p>
            <p className="font-mono text-3xl font-bold underline text-red-900 ">
              rosnovsky.us
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default OpenGraph

export async function getServerSideProps(params: any) {
  const {
    title = 'No Title',
    category = 'No Categories',
    date = 'No Date',
    coverImage = 'No Cover',
    subtitle = 'No Subtitle',
  } = params.query
  return {
    props: {
      title,
      subtitle,
      category,
      date,
      coverImage,
    },
  }
}
