export default {
  name: 'alert',
  type: 'document',
  title: 'Top Alert',
  __experimental_actions: ['update', /* 'create',  'delete', */ 'publish'],
  fields: [
    {
      title: 'Active?',
      name: 'active',
      description: 'Is this Alert active?',
      type: 'boolean'
    },
    {
      name: 'message',
      type: 'string',
      title: 'Alert message',
      validation: Rule => Rule.required().min(10).max(40)
    },
    {
      name: 'alertLink',
      type: 'url',
      title: 'Alert Link',
      validation: Rule => Rule.uri({allowRelative: true})
    },
    {
      title: 'Internal?',
      name: 'internal',
      description: 'Is this an internal link?',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'message',
      subtitle: 'url'
    },
  }
}
