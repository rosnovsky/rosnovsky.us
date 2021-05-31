import Container from '../components/Container';
import Subscribe from '../components/Cards/SubscribeCard';
import NewsletterLink from '../components/NewsletterLink';
import { getAllFilesFrontMatter } from '../lib/mdx';

export default function Newsletter({ newsletters }) {
  return (
    <Container
      title="Newsletter – Art Rosnovsky"
      description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Newsletter
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          My newsletter provides a behind-the-scenes look into what I'm working
          on and writing about. I frequently share some of my favorite articles
          I've read, as well as anything fascinating about technology.
        </p>
        <Subscribe />
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          Archive
        </h3>
        <div className="prose dark:prose-dark">
          <ul>
            {newsletters
              .sort(
                (a, b) =>
                  Number(new Date(b.publishedAt)) -
                  Number(new Date(a.publishedAt))
              )
              .map((frontMatter) => (
                <NewsletterLink key={frontMatter.title} {...frontMatter} />
              ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const newsletters = await getAllFilesFrontMatter('newsletter');

  return { props: { newsletters } };
}
