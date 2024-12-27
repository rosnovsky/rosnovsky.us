import { F as Fragment, _ as __astro_tag_component__, p as createVNode } from './astro/server_COLE3fTq.mjs';
import { $ as $$Image } from './_astro_assets_D6TztbRf.mjs';
import { $ as $$YouTube } from './post_066bZHTl.mjs';
import 'clsx';

const frontmatter = {
  "title": "You don't have to follow a passion",
  "publishDate": "2020-01-23T00:00:00.000Z",
  "description": "Stop reducing people to two-dimensional single-passion beings",
  "category": "Personal",
  "image": {
    "src": "@assets/blog/covers/generic.webp",
    "alt": "Generic blog post cover image"
  },
  "minutesRead": "3 min read"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "bear-with-me",
    "text": "Bear with me 🐻"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "I was driving to work this morning, looking forward to a weekly Q&A with Nico (deep dive into HAR files this week), when I realized that it’s my day off. Whenever we work on weekends, we can then take a day off during the week. Well, today was the day, and I forgot about it."
    }), "\n", createVNode(_components.p, {
      children: ["I’m not entirely sure what it means. Probably, that I’m less organized than I thought previously, or maybe I still don’t think about my work as a ", createVNode(_components.strong, {
        children: "joby-job"
      }), "; I come to work, we hang out tackling things and battling all sorts of uncertainties, figure out stuff together and on our own, recreate apps, reproduce bugs, troubleshoot the unknown, stretch (!), drink coffee and go back home whenever we feel like it to keep doing all these things remotely. (sounds good? Join us, ", createVNode(_components.a, {
        href: "https://jobs.lever.co/auth0?lever-via=KkPp8EXnYD",
        children: "we are hiring"
      }), "!)"]
    }), "\n", createVNode(_components.p, {
      children: ["Is it my passion to do all this? For sure. But is it my ", createVNode(_components.strong, {
        children: "PASSION"
      }), "? Nope. Not by a long shot."]
    }), "\n", createVNode(_components.h2, {
      id: "bear-with-me",
      children: "Bear with me 🐻"
    }), "\n", createVNode(_components.p, {
      children: "I’ve stumbled upon this TED talk a while back. And it hit close to home."
    }), "\n", createVNode($$YouTube, {
      id: "6MBaFL7sCb8",
      className: "mx-auto min-w-full"
    }), "\n", createVNode(_components.p, {
      children: ["I’m turning 38 in a few days. I have no idea what I want to do when I grow up. I will ", createVNode(_components.strong, {
        children: "never"
      }), " become a Navy pilot due to the age limit, but that’s about all the certainty I’ve got."]
    }), "\n", createVNode(_components.p, {
      children: "I’m passionate about a dozen old TV shows (think Scrubs, The Office, 30 Rock, Eureka, etc), dozens of movies (Dogma, Begin Again, Inception La La Land, The Croods, an eclectic mix), flying airplanes (as a passenger and as a pilot), nature and environment, holding hands, making radio shows, walking remote trails alone and staying overnight in a tent, being in love, staring at the mountains and the ocean, hugs, ferries, walking down the beach, coffee, music, bright tattoos, fresh air, coding all sorts of stuff, making friends, shenanigans, long drives, daydreaming, Pacific Northwest, cookies and juicy burgers, sex, frontend conferences, helping people, books, Linkin Park, deep sleep, sunshine and rain, fireplaces, gadgets, EDM, misty pine forests, and probably a hundred other things."
    }), "\n", createVNode(_components.p, {
      children: ["If I try to follow any of my passions to turn it into ", createVNode(_components.strong, {
        children: "the passion"
      }), ", I’d miss out on so many things I enjoy. I don’t want to reconcile what I enjoy passionately with what I do for work, or with who I am. I am all the things I love and all the things I do and say. I guess that’s where I stand on this “follow your passion” nonsense."]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/2020/01/23/you-don-t-have-to-follow-a-passion.mdx";
const file = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2020/01/23/you-don-t-have-to-follow-a-passion.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2020/01/23/you-don-t-have-to-follow-a-passion.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
