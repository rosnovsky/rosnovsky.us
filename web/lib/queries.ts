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
      references[]->{
        title,
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

export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;

export const commentQuery = groq`*[_type == "post" && slug.current == $slug][0] {comments}`;

export const indexPagePostsQuery = groq`
    *[_type == "post"] | order(publishedAt desc)[0...$pagePostsLimit] {
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
