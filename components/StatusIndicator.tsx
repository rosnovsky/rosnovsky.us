import ExternalLink from './ExternalLink'
import useSWR from 'swr'
import fetch from 'isomorphic-fetch'
const fetcher = async (url: string) => await fetch(url).then(res => res.json())

const url = process.env.NODE_ENV === 'test' ? 'https://rosnovsky.us/api/status' : '/api/status'

const StatusIndicator = () => {
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>Status Loading...</div>

  return (
    <ExternalLink testid="status" href="https://status.rosnovsky.us">
      <svg className="inline-block mr-2" height="10" width="10">
        <circle cx="5" cy="5" r="5" fill={!data || error ? "red" : data.status === "up" ? "green" : "red"} />
      </svg>

      <span data-testid="status-indicator" data-status={!data ? "Loading..." : error ? "error" : data.status === "up" ? "up" : "down"}>Status</span>

    </ExternalLink>
  )
}

export default StatusIndicator
