import React from 'react'
import validUrl from 'valid-url'

const LinkCard = ({ value }) => {
  const validateUrl = url => {
    return validUrl.isUri(value.url) ? true : false
  }

  return null
}

export default LinkCard
