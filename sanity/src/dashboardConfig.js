export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/rosnovsky/sanity-gatsby-blog',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://rosnovsky.us', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    },
    {
      name: 'document-chart',
      options: { types: ['post', 'page', 'sanity.imageAsset'] },
      layout: { width: 'full' }
    }
  ]
}
