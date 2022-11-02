import groq from 'groq';

/* groq */
export const postQuery = groq`
    *[_type == "post" && slug.current == $slug][0] {
      ...,
      _id,
      coverImage {
        ...,
        asset->
      },
      categories[]->{
        title,
        description,
        slug
      },
      socialCardImage {
        asset->},
      references[0...2]->{
        title,
        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
        publishedAt,
        slug,
        categories[]->,
        coverImage {
          ...,
          asset->
        },
        summary
      },
      body[]{
        ...,
        markDefs[]{
          _type == "link" => {
            ...,
          internal->{
            title,
            _type,
            slug
          }
          }
        },
        _type == "video" => {
          title,
          videoFile {
            asset->{
              ...,
              "url": "https://stream.mux.com/" + playbackId
            }
          }
        },
        asset->{...}
      },
      "summaryRaw": pt::text(summary),
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `;

export const blogPostsQuery = groq`
    *[_type == "post"] | order(publishedAt desc)[$startLimit...$endLimit] {
      title,
      coverImage {
        ...,
        asset->
      },
      categories[]->{
        title,
        description,
        slug
      },
      publishedAt,
      summary,
      slug,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      "summaryRaw": pt::text(summary)
    }
  `;

export const totalPostsCountQuery = groq`
    count(*[_type == "post"])
  `;

export const totalCommentsCountQuery = groq`
    count(*[_type == "comment"])
  `;

export const categoriesQuery = groq`
    *[_type == "category"] {
      title,
      description,
      slug
    }
  `;

export const pageQuery = groq`
    *[_type == "page" && slug.current == $slug][0] {
      ...,
      coverImage {
        ...,
        asset->
      },
      body[]{
        asset->{...},
        ...
      },
      "bodyRaw": pt::text(body),
      socialCardImage {
        asset->
      }
    }
  `;

export const categoryPageQuery = groq`
    *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc)[0...15] {
      title,
      coverImage {
        ...,
        asset->
      },
      categories[]->{
        title,
        description,
        slug
      },
      publishedAt,
      summary,
      summaryRaw,
      slug,
      "summaryRaw": pt::text(summary),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `;

export const categoryPostCountQuery = groq`
    count(*[_type == "post" && $slug in categories[]->slug.current])
  `;

export const commentCountQuery = groq`
    count(*[_type == "comment"])
  `;

export const hikeQuery = groq`
    *[_type == "hike" && slug.current == $slug][0] {
      title,
      location,
      coverImage {
        asset->
      }, 
      report->,
      summary,
      difficulty,
      length,
      hikeDate,
      trail,
      elevationGain,
      slug,
      socialCardImage {
        asset->
      }
    }
  `;

export const authorBooksQuery = groq`
    *[_type == "book" && author == $slug] {
      cover {
        asset->
      },
      author,
      publishedDate,
      read,
      rating,
      isbn,
      status,
      pages,
      "estimatedReadingTime": round(pages * 2 / 60)
    }
  `;

export const bookQuery = groq`
    *[_type == "book" && isbn == $slug][0] {
      ...,
      _id,
      cover {
        asset-> {
          url,
          metadata {
            dimensions {
              width,
              height
            },
            lqip
          }
        }
      },
      title,
      author,
      publisher,
      publishedDate,
      summary,
      pages,
      socialCardImage {
        asset->},
      own,
      read,
      status,
      review,
      "estimatedReadingTime": round(pages * 2 / 60)
    }
  `;

export const publisherBooksQuery = groq`
    *[_type == "book" && publisher == $slug] | order(publishedDate desc) {
        cover {
          asset->{
            url,
            metadata {
              dimensions {
                width,
                height
            }, 
            lqip
          }
        }
      },
      title,
      author,
      publisher,
      publishedDate,
      pages,
      status,
      socialCardImage {
        asset->},
      read,
      rating,
      isbn,
      "estimatedReadingTime": round(pages * 2 / 60)
    }
  `;

export const booksQuery = groq`
    *[_type == "book"] | order(publishedDate desc) {
      cover {
        asset->{
          url,
          metadata {
            dimensions {
              height,
              width
            },
            lqip
          }
        }
      },
      isbn,
      publishedDate,
      publisher,
      pages,
      read,
      status,
      title,
      author,
      rating,
      "estimatedReadingTime": round(pages * 2 / 60)
    }
  `;

export const hikesQuery = groq`
    *[_type == "hike"] {
      title,
      location,
      coverImage {
        asset->
      }, 
      report->,
      trail,
      length,
      slug,
      elevationGain
    }
  `;

export const publisherPagePathsQuery = groq`*[_type == "book" && defined(publisher)][].publisher`;
export const authorPagePathsQuery = groq`*[_type == "book"][].author`;
export const categoryPagePathsQuery = groq`*[_type == "post" && categories[]->slug.current == slug.current][].slug.current`;

// Slug paths, refactorable
export const pagePathsQuery = groq`*[_type == $type && defined(slug.current)][].slug.current`;

export const commentQuery = groq`
*[_type == "post" && slug.current == $slug][0] {comments}`;
