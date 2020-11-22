import React from 'react'
// import { GatsbyImage as Img } from 'gatsby-plugin-image/compat'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { imageUrlFor } from '../../utils/imageUrl'
import { buildImageObj } from '../../utils/helpers'

export default props => {
  if (!props.node || !props.node.asset || !props.node.asset._id) {
    return null
  }

  if (props.node.asset.extension === 'gif') {
    return (
      <figure>
        <img
          srcSet={props.node.asset.url}
          alt={props.nodealt}
          loading="lazy"
          className="w-full"
        />
        <figcaption>{props.node.caption}</figcaption>
      </figure>
    )
  }

  const data = useStaticQuery(graphql`
    query MyQuery {
      allSanityImageAsset {
        edges {
          node {
            id
            fluid(maxWidth: 800) {
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
