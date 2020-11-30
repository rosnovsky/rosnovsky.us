import React from 'react'
import { ReactTinyLink } from 'react-tiny-link'
import validUrl from 'valid-url'

export const LinkCard = ({ value }) => {
  const validateUrl = url => {
    return validUrl.isUri(value.url) ? true : false
  }

  return (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={4}
      minLine={1}
      url={validateUrl(value.url) ? value.url : 'https://twitter.com'}
      defaultMedia={'https://rosnovsky.us/favicon.png'}
    />
  )
}
