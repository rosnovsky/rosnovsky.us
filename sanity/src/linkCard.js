import React, { useEffect, useState } from 'react'

export default function LinkCard({ value }) {
  const [data, setData] = useState()

  useEffect(() => {
    const response = async () => {
      let url = `https://rosnovskyus.netlify.app/.netlify/functions/metascraper?url=${value.url}`
      let response = await fetch(url, { method: 'GET', mode: 'cors' })
        .then(response => response.json())
        .then(data => {
          setData(data.message.title)
          return data
        })
        .then(data => console.warn(data))

      return response
    }
    console.warn(response())
  }, [])
  return <p>{data}</p>
}
