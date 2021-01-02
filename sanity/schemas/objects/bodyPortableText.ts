import {FaExternalLinkAlt, FaLink, FaRegAddressCard} from 'react-icons/fa'

export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' }
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' }
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External link',
            icon: FaExternalLinkAlt,
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL'
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean'
              },
              {
                title: 'Fathom Goal',
                name: 'fathom',
                description: 'Fathom goal tracking code',
                type: 'object',
                fields: [
                  {
                    title: 'Goal ID',
                    type: 'string',
                    name: 'goalId',
                    description: 'Default is X9Y2BWVS'
                  },
                  {
                    title: 'Goal value in $$$',
                    type: 'number',
                    name: 'goalValue',
                  }
                ]
              }
            ],
            preview: {
              select: {
                href: 'href',
                title: 'object.title'
              }

            }
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            icon: FaLink,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'post' },
                ]
              }
            ]
          }
        ]
      },
      of: [{ type: 'authorReference' }]
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'mainImage',
      options: { hotspot: true }
    },
    {
      name: 'code',
      title: 'Code editor',
      description: 'Code editor',
      type: 'code'
    },
    {
      type: 'youtube'
    },

    {
      name: 'linkCard',
      title: 'Link Preview Card',
      description: 'Link Preview Card',
      type: 'linkCard',
      icon: FaRegAddressCard,
      preview: {
        select: {
          title: 'linkCard.url',
        }
      }
    },
  ]
}
