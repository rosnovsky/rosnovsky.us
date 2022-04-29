import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import Footer from '@components/Footer';
import { NavBar } from '@components/NavBar';
import sanityClient from '../../lib/sanityClient';
import { localDate, PortableTextComponents, urlFor } from 'lib/helpers';
import type { BlogPost } from 'index';
import Link from 'next/link';

type Props = {
  post: BlogPost;
};

const Post = ({ post }: Props) => {
  if (!post) return <div>Nope.</div>;
  const { publishedAt, title, summary, coverImage, categories, body } = post;

  return (
    <div className="">
      <section className="relative bg-coolGray-50 overflow-hidden">
        <div className="bg-transparent">
          <NavBar />
          <section
            className="py-16 md:py-24 bg-white"
            style={{
              backgroundImage: `url('/flex-ui-assets/elements/pattern-white.svg')`,
              backgroundPosition: 'center top',
            }}
          >
            <div className="container px-4 mx-auto">
              <div className="md:max-w-2xl mx-auto mb-12 text-center">
                <div className="flex items-center justify-center">
                  <p className="inline-block text-blue-600 font-medium">
                    {localDate(publishedAt)}
                  </p>
                  <span className="mx-1 text-blue-500">•</span>
                  <p className="inline-block text-blue-400 font-medium">
                    3 minute read
                  </p>
                </div>
                <h2 className="mb-4 mt-3 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                  {title}
                </h2>
                <p className="mb-6 text-lg md:text-xl font-medium text-coolGray-500">
                  <PortableText value={summary} />
                </p>
                {categories &&
                  categories.map((category) => (
                    <div
                      key={category.title}
                      className="inline-block py-1 px-3 mr-2 text-xs leading-5 text-blue-500 font-medium uppercase bg-blue-100 rounded-full shadow-sm"
                    >
                      <Link href={`/category/${category.slug.current}`}>
                        {category.title}
                      </Link>
                    </div>
                  ))}
              </div>
              <div className="mb-10 mx-auto max-w-max overflow-hidden rounded-lg">
                <Image
                  src={urlFor(coverImage).url()}
                  placeholder="blur"
                  blurDataURL={coverImage.asset.metadata.lqip}
                  width={coverImage.asset.metadata.dimensions.width}
                  height={coverImage.asset.metadata.dimensions.height}
                  objectFit="cover"
                />
              </div>
              <div className="prose prose-xl md:max-w-3xl mx-auto">
                <PortableText
                  value={body}
                  components={PortableTextComponents}
                />
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </section>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const post = await sanityClient.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      ...,
      coverImage {
        ...,
        asset->
      },
      categories[]->{
        title,
        description,
        slug
      },
      references[]->{
        title,
        publishedAt,
        slug,
        coverImage,
        summary
      },
      body[]{
        asset->{...},
        ...
      }
    }
  `,
    { slug }
  );

  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default Post;
