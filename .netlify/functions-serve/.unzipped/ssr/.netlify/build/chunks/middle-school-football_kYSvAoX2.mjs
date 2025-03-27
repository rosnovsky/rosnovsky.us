import { F as Fragment, _ as __astro_tag_component__, p as createVNode } from './astro/server_DXCePE4i.mjs';
import { Image as $$Image } from './_astro_assets_Be4H0COL.mjs';
import { $ as $$YouTube } from './post_EWyzK18z.mjs';
import 'clsx';

const frontmatter = {
  "title": "Middle School Football",
  "publishDate": "2018-10-21T00:00:00.000Z",
  "description": "School football is such a thrill!",
  "category": "Family",
  "image": {
    "src": "@assets/blog/covers/generic.webp",
    "alt": "Generic blog post cover image"
  },
  "minutesRead": "4 min read"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "some-random-observations",
    "text": "Some random observations"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    blockquote: "blockquote",
    h2: "h2",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "I haven’t been blogging properly in like a decade, and I really miss this sometimes. So here goes."
    }), "\n", createVNode(_components.p, {
      children: "This year my I signed up my son for school football. He’s in his last year of middle school, and had never participated in sports before. He had a encounter with Taekwando years ago, which at that point was more of a daycare then a sport for him. They had all kinds of fun, including belt promotions and demonstrations, but he really struggled with instructions, discipline and so forth. Overall, it was deemed not worth it after almost a year, and our annual contract with the club quietly expired."
    }), "\n", createVNode(_components.p, {
      children: "This year I decided that he’s old enough to actually enjoy a team sport. He’d never been a part of a team outside of occasional group projects at school, and I was wondering if this whole football experience could brighten up he’s social experiences, not that he has any problems socializing at school or otherwise."
    }), "\n", createVNode(_components.p, {
      children: "So, I signed him up for football practice. My expectation and hope was that he will at least move a little after school on occasion, and I hoped that he’d get to run least a little, maybe learn how to throw a ball, perhaps, learn the rules of the game so that watching it would be more enjoyable for him. Remember, I had no clue what this school football is, and thought about it more as of general exercise than an actual playing experience. Boy was I wrong!"
    }), "\n", createVNode(_components.p, {
      children: "First shock was that he actually got a uniform. 3 sets, in fact: for training, for home games, and for away games. Then I discovered that they practice every day, not, like, once or twice a week, as I thought previously. And on top of that, they actually play against other schools, every week, starting with the second week of practice! Say what now?! And so my very never-played-sports-before son is now a football player. He knows his position, know the routes, can actually run them, can catch a ball. He doesn’t really play that much during games against other schools — 5-10 plays tops, but he gets to go on the field, face the opposing team, do the whole routine. And I find it extremely cool! I’ve been to every game he had so far, and some of them were so heated, close, and exciting!"
    }), "\n", createVNode(_components.h2, {
      id: "some-random-observations",
      children: "Some random observations"
    }), "\n", createVNode(_components.p, {
      children: "When a player gets injured, whether he’s from your team or not, every other player on the field takes a knee and waits for the situation to resolve. During this season, I’ve seen this happen three times; none of them were actual injuries, but the whole routine still impressed me nonetheless."
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "As a side note, it’s a contact sport, and as with any sport, there’s always a chance of being hit or fall or twist your ankle; with this being said, it looks like safety is one of the top concern for the coaches and the officials, and the kids are trained to keep other’s safety in mind as well"
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Team building is a big deal."
    }), "\n", createVNode($$YouTube, {
      id: "eU0QK50Tw-s",
      className: "mx-auto min-w-full"
    }), "\n", createVNode(_components.p, {
      children: ["Losing on a play, fumbling a ball, throwing an interception — and immediately moving on to the next play. No fuming, no regrets, no time for that, next play! This is kinda cool, really. Same goes for games lost: yes, it’s an “L”, ", createVNode(_components.strong, {
        children: "go home, do your homework, spend time with your family, see you tomorrow at practice"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Homework, yes. There’s a grade check process in place. If you get below a certain threshold, you are suspend form participation in games (you still can go to practice, though). Vlad did fall below this threshold for a week, and missed a game. He got super motivated to get back in the game and spend that whole week making up for things he failed in class, make-up tests, working on big projects and such."
    }), "\n", createVNode(_components.p, {
      children: "All in all, I think signing him up for football practice was one of the best decisions we made as parents. Not only did he met new friends, had this team experience, ran around quite a bit, learned how to catch a ball, and played some pretty real football games, he also discovered new things about himself as a person and got some extra motivation at school."
    }), "\n", createVNode(_components.p, {
      children: "And the funniest part is that 10 years ago we didn’t know football existed, and it’s only been 4 years since we watched a game for the first time :)"
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

const url = "src/content/blog/2018/10/21/middle-school-football.mdx";
const file = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2018/10/21/middle-school-football.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2018/10/21/middle-school-football.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
