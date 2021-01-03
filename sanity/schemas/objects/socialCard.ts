export default {
  name: 'socialCard',
  type: 'object',
  title: 'Social Card',
  description: 'Things that appear on an Open Graph and social cards.',
  fields: [
    {
      name: "title",
      type: "string",
      title: "Social Card Title",
      validation: Rule => Rule.required().max(50)
    },
    {
      name: "subtitle",
      type: "string",
      title: "Social Card subtitle",
      validation: Rule => Rule.required().max(140)
    }
  ]
}
