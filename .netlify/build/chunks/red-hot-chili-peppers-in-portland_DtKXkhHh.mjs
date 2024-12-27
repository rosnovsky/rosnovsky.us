import { F as Fragment, _ as __astro_tag_component__, p as createVNode } from './astro/server_COLE3fTq.mjs';
import { $ as $$Image } from './_astro_assets_D6TztbRf.mjs';
import { $ as $$YouTube } from './post_066bZHTl.mjs';
import 'clsx';

const frontmatter = {
  "title": "Red Hot Chili Peppers in Portland",
  "publishDate": "2017-03-17T00:00:00.000Z",
  "description": "RHCP!",
  "category": "Music",
  "image": {
    "src": "@assets/blog/covers/generic.webp",
    "alt": "Generic blog post cover image"
  },
  "minutesRead": "1 min read"
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "We went to this show almost by accident. We bought our tickets when doors were already open, and Portland’s Moda Center was half-full. One of the best concerts I’ve been to!"
    }), "\n", createVNode($$YouTube, {
      id: "ALI08HHUZXQ",
      className: "mx-auto min-w-full"
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

const url = "src/content/blog/2017/03/17/red-hot-chili-peppers-in-portland.mdx";
const file = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2017/03/17/red-hot-chili-peppers-in-portland.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2017/03/17/red-hot-chili-peppers-in-portland.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
