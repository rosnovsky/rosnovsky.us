import React from 'react'
// import { ReactTinyLink } from 'react-tiny-link'
import loadable from '@loadable/component'

const ReactTinyLink = loadable(() => import('react-tiny-link'))

const PreviewCard = props => {
  return ReactTinyLink ? (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={3}
      minLine={2}
      // loadSecureUrl={true}
      url={props.url}
    />
  ) : (
    <div>{props.url}</div>
  )
}

export default PreviewCard
