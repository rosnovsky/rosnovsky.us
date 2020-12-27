import React from 'react'
import ReactTinyLink from 'react-tiny-link'
import validUrl from 'valid-url'

const LinkCard = ({ value }) => {
  const validateUrl = url => {
    return validUrl.isUri(value.url) ? true : false
  }

  return (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={4}
      minLine={1}
      proxyUrl={''}
      url={validateUrl(value?.url) ? value.url : 'https://twitter.com/rosnovsky'}
      defaultMedia={'https://rosnovsky.us/favicon.png'}
    />
  )
}

export default LinkCard
