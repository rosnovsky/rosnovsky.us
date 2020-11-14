export default {
  widgets: [
    {name: 'structure-menu'},
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
                  buildHookId: '5f8fc6eeaa543988d34f77ba',
                  title: 'Sanity Studio',
                  name: 'rosnovskyus-studio',
                  apiId: 'df019fc5-ea9e-471e-ae92-5687f77f396d'
                },
                {
                  buildHookId: '5f8fc72cca7daf8a10215636',
                  title: 'Rosnovsky Park Website',
                  name: 'rosnovskyus',
                  apiId: '70ed6fd0-72ad-40bd-a20c-eb4902d0f8b1'
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
          {title: 'Frontend', value: 'https://rosnovskyus.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    },
    {
      name: 'document-chart',
      options: {types: ['post', 'author', 'sanity.imageAsset']},
      layout: {width: 'full'}
    }
  ]
}
