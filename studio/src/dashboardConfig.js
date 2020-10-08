export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f7e714a57425b7781765385',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-blog-studio-xa6c8zbe',
                  apiId: '0d34e106-24e9-4ec0-ad36-baabd97b5477'
                },
                {
                  buildHookId: '5f7e714a1d71b776d0e77dcd',
                  title: 'Blog Website',
                  name: 'sanity-gatsby-blog-web-m3s8t9e5',
                  apiId: 'ea2e2a49-8177-4e31-b5f8-c49f0e39c536'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/rosnovsky/sanity-gatsby-blog',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://sanity-gatsby-blog-web-m3s8t9e5.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
