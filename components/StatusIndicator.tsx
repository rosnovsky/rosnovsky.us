import ExternalLink from './ExternalLink'
import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then(res => res.json())

const StatusIndicator = () => {
  const { data, error } = useSWR('/api/status', fetcher)

  console.log(data, error)

  return (
    <ExternalLink href="https://status.rosnovsky.us">
      <svg className="inline-block mr-2" height="10" width="10">
        <circle cx="5" cy="5" r="5" fill={!data || error ? "red" : data.status === "up" ? "green" : "red"} />
      </svg>
      <span data-testid="status-indicator" data-status={!data || error ? "error" : data.status === "up" ? "up" : "down"}>Status</span>
    </ExternalLink>
  )
}

export default StatusIndicator
