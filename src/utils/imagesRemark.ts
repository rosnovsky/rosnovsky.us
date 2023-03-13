import { visit } from 'unist-util-visit'
import { Picture } from 'astro-imagetools/components'

function transformer(ast: any) {
  visit(ast, 'image', visitor)

  function visitor(node: any) {
    const data = node.data || (node.data = {})
    const props = data.hProperties || (data.hProperties = {})
    let src = node.url
    const alt = node.alt

    const skipSrcSet = ['.gif', '.svg'].some(ext => src.includes(ext))

    let newNode = null
    newNode = {
      type: 'html',
      value: `<img src=${src} alt="${alt}" />`
    }

    Object.assign(node, newNode)
  }
}

function images() {
  return transformer
}

export default images
