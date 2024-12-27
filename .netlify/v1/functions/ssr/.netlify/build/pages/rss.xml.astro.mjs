import rss from '@astrojs/rss';
import { g as getSortedPosts } from '../chunks/posts_-IYf2ASY.mjs';
import { S as SITE } from '../chunks/config_yD4LyyLu.mjs';
export { renderers } from '../renderers.mjs';

async function GET() {
  const posts = await getSortedPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.website,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`
    }))
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
