import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(
          S.documentList()
            .title('Blog posts')
            .filter('_type == "post"')
            .defaultOrdering([
              { field: 'publishedAt', direction: 'desc' },
              { field: '_createdAt', direction: 'desc' },
            ])
        ),
      S.listItem()
        .title('Hikes')
        .schemaType('hike')
        .child(
          S.documentList()
            .title('Hikes')
            .filter('_type == "hike"')
            .defaultOrdering([{ field: 'hikeDate', direction: 'desc' }])
        ),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentList().title('Pages').filter('_type == "page"')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(
          S.documentList().title('Categories').filter('_type == "category"')
        ),
      S.listItem()
        .title('Videos')
        .schemaType('video')
        .child(S.documentList().title('Videos').filter('_type == "video"')),
      S.divider(),
      S.listItem()
        .title('Books')
        .schemaType('book')
        .child(
          S.documentList()
            .title('Books')
            .filter('_type == "book"')
            .defaultOrdering([
              { field: 'publishedDate', direction: 'desc' },
              { field: '_createdAt', direction: 'desc' },
            ])
        ),
      S.divider(),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(
          S.documentList()
            .title('Person')
            .filter('_type == "person"')
            .defaultOrdering([{ field: 'birthday', direction: 'asc' }])
        ),
      S.listItem()
        .title('Companies')
        .schemaType('company')
        .child(S.documentList().title('Company').filter('_type == "company"')),
      S.listItem()
        .title('Countries')
        .schemaType('country')
        .child(S.documentList().title('Country').filter('_type == "country"')),
      S.listItem()
        .title('Cities')
        .schemaType('city')
        .child(S.documentList().title('City').filter('_type == "city"')),
      S.listItem()
        .title('Travel')
        .child((id) =>
          S.documentList()
            .title('Airlines & Flights')
            .filter('_type == "airline" || _type == "flight"')
        ),
    ]);
