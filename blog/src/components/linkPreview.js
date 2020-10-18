import React from 'react'
import { ReactTinyLink } from 'react-tiny-link'

const PreviewCard = props => {
  return (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={3}
      minLine={2}
      // loadSecureUrl={true}
      url={props.url}
    />
  )
}

export default PreviewCard
