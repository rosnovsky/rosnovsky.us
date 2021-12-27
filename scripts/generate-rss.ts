const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generate() {
  const feed = new RSS({
    title: 'Art Rosnovsky',
    site_url: 'https://rosnovsky.us',
    feed_url: 'https://rosnovsky.us/feed.xml'
  });

  const posts = await fs.readdir(path.join(__dirname, '..', 'posts', 'blog'))
  const parsedPosts = posts.map(async (name) => {
    const content = await fs.readFile(
      path.join(__dirname, '..', 'posts', 'blog', name)
    );
    return { post: await matter(content), slug: name };
  })

  await Promise.all(
    parsedPosts.map(async (post) => {
      const actualPost = await post;

      feed.item({
        title: actualPost.post.data.title,
        url: 'https://rosnovsky.us/blog/' + actualPost.slug.replace(/\.mdx?/, ''),
        date: actualPost.post.data.publishedAt,
        description: actualPost.post.data.summary
      });
    })
  );

  feed.items = feed.items.sort((postA, postB) => {
    return Date.parse(postB.date) < Date.parse(postA.date) ? -1 : 1
  });

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
