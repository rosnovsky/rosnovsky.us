import React from 'react'
import Img from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

export default props => {
  if (!props.node || !props.node.asset || !props.node.asset._id) {
    return null
  }

  const data = useStaticQuery(graphql`
    query MyQuery {
      allSanityImageAsset {
        edges {
          node {
            id
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  `)

  const gatsbyImage = data.allSanityImageAsset.edges.filter(
    image => image.node.id === props.node.asset._id
  )

  return (
    <figure>
      <Img fluid={gatsbyImage[0].node.fluid} alt={props.node.alt} />
      <figcaption>{props.node.caption}</figcaption>
    </figure>
  )
}
