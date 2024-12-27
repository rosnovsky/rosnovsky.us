import { F as Fragment, _ as __astro_tag_component__, p as createVNode } from './astro/server_COLE3fTq.mjs';
import { $ as $$Image } from './_astro_assets_D6TztbRf.mjs';
import { $ as $$YouTube } from './post_066bZHTl.mjs';
import 'clsx';

const frontmatter = {
  "title": "Saturday Helicopter Fun @ Seaside",
  "publishDate": "2013-08-26T00:00:00.000Z",
  "description": "A quick review of my experience with **Seaside Helicopters **and where I ended up flying with them just once.",
  "category": "Travel",
  "image": {
    "src": "@assets/blog/covers/generic.webp",
    "alt": "Generic blog post cover image"
  },
  "minutesRead": "2 min read"
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    blockquote: "blockquote",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["Oh, there’s a funny story here. So, this one is from the time when we just moved to America from Canada and decided to treat ourselves to a helicopter ride. Apparently, helicopter rides are ", createVNode(_components.strong, {
        children: "expensive"
      }), ". A 15-minute ride for a family of 3 cost us a few hundred dollars. Well, I thought it was ridiculous and an outrage, and decided to go to take some piloting lessons to be able to take my family on such trips whenever I want, 5-10 times cheaper. It didn’t work out exactly the way I wanted, but I did indeed had a great time flying with them in Nevada and along the Columbia River."]
    }), "\n", createVNode(_components.p, {
      children: "Here’s a video from this historic helicopter ride along the Oregon coast."
    }), "\n", createVNode($$YouTube, {
      id: "rpSmobOhiVQ",
      className: "mx-auto min-w-full"
    }), "\n", createVNode(_components.p, {
      children: "Seaside Helicopters is one of the only companies offering helicopter tours along the Pacific coast in Oregon. They are based off of a small amusement park just east of Seaside. You can’t really miss them: there’s a billboard, and their helicopter idling by the side of the road, hard to miss as well. The service they provide is professional, courteous, and focused on safety. For example, your weight might prevent you from taking the tour (I don’t remember exactly, but it’s something like 250 lbs tops per person). The weather could prevent you from flying as well, but being a pilot myself (albeit a student pilot), I really like this saying:"
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: createVNode(_components.strong, {
          children: "All takeoffs are optional, all landings are mandatory"
        })
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Basically, you’re 100% in control to take off or not. However, if you make a bad choice and fly in poor conditions, you will land, one way or the other. We were lucky, and the weather was amazing for our booking date, so we enjoyed the tour a lot. Pilots comment on what you see, point out where things are, and give you a certain freedom to decide where to go and what to see. All in all, we enjoyed the experience, even though, as I mentioned before, it cost us something in the ballpark of $300 for a 15-minute tour for two adults and a child."
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

const url = "src/content/blog/2013/08/26/seaside-helicopters.mdx";
const file = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2013/08/26/seaside-helicopters.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2013/08/26/seaside-helicopters.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
