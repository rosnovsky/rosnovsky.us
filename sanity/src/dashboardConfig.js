export default {
  widgets: [
    {
      name: 'document-list', 
      options: {
        title: 'Last edited posts', 
        order: '_updatedAt desc', 
        types: ['post']
      }
    }
  ]
}
