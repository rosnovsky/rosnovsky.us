import Head from 'next/head'
import { GetStaticProps } from 'next'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function Covid() {
  const { data, error } = useSWR(
    'https://api.covidtracking.com/v1/us/current.json',
    fetcher,
    {
      refreshInterval: 3600000
    }
  )

  if (error) return <span>over 220,000</span>
  if (!data) return <span>loading...</span>
  return (
    <div className="text-xl">
      COVID-19 Deaths in the US
      <br />
      <span className="text-2xl font-semibold">
        {new Intl.NumberFormat().format(data[0].death)}
      </span>
    </div>
  )
}

type Keywords = {
  label: string
  value: string
}

type Author = {
  name: string
}

type SiteSettings = {
  title: string
  description: string
  keywords: Keywords[]
  author: Author
}

export default function Home(props) {
  const {
    title,
    description,
    keywords,
    author
  }: SiteSettings = props.siteSettings

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-wrap justify-center">
        <div className="mx-auto text-center">
          <h1 className="text-3xl font-semibold p-14">{title}</h1>
          <Covid />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://rosnovskyus.vercel.app/api/hello')
  const siteSettings: SiteSettings = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      siteSettings
    }
  }
}
