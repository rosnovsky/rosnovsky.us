/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogLayout from '../../layouts/blogLayout';
import { FrontMatter } from '../../index';
import { UserProvider } from '@auth0/nextjs-auth0';
import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from '../../components/Utils/MDXComponents';

const frontMatter: FrontMatter = {
  title: 'test title',
  summary: 'summary',
  slug: 'test',
  cover: 'img.jpg',
  publishedAt: '2021-11-11',
  readingTime: { text: '10' },
  wordCount: 100
};

const mdxSource = {
  compiledSource:
    'var g=Object.defineProperty,u=Object.defineProperties;var m=Object.getOwnPropertyDescriptors;var i=Object.getOwnPropertySymbols;var r=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var h=(e,t,o)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,a=(e,t)=>{for(var o in t||(t={}))r.call(t,o)&&h(e,o,t[o]);if(i)for(var o of i(t))l.call(t,o)&&h(e,o,t[o]);return e},p=(e,t)=>u(e,m(t));var s=(e,t)=>{var o={};for(var n in e)r.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&i)for(var n of i(e))t.indexOf(n)<0&&l.call(e,n)&&(o[n]=e[n]);return o};const makeShortcode=e=>function(o){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),mdx("div",a({},o))},ImageWithAlt=makeShortcode("ImageWithAlt"),layoutProps={},MDXLayout="wrapper";function MDXContent(o){var n=o,{components:e}=n,t=s(n,["components"]);return mdx(MDXLayout,p(a(a({},layoutProps),t),{components:e,mdxType:"MDXLayout"}),mdx("p",null,"For the longest time I\'ve been blogging into the void. I appreciate those of you actually reading this, but by and large there are very few people who came here to read my stuff. Arguably, it\'s not too profound or deep or insightful, so it\'s totaly fine; it\'s obscure by design, I guess."),mdx("p",null,"And yet, it\'s still ",mdx("a",a({parentName:"p"},{href:"/blog/developer-support-observations"}),"writing")," in public. And ",mdx("a",a({parentName:"p"},{href:"/blog/alt-text"}),"coding")," in public. And I\'ve been working on comments to make it possible for you to leave whatever feedback you may have. However, recently I started journaling in private, just for myself. And on paper, with a pen. Like an animal."),mdx(ImageWithAlt,{path:"journaling/journaling0008.jpg",width:"1000",height:"634",mdxType:"ImageWithAlt"}),mdx("p",null,"There\'s something truly liberating in writing for noone. I forgot how it feels; I used to keep a journal in high school, but then life happened and I\'ve never got back to journaling since. There was a few months of Bullet Journaling, but it ended when I broke my leg."),mdx("p",null,"This time, I\'ve been transitioning into more mindful work and life. As a part of this transition, I\'ve been moving away from many digital tools that I\'ve been using for years towards their analog analogs (see what I did here?) I\'m running a paper-only to-do list, I track time with a physical timer, I\'m taking meeting notes in a notepad, I\'m planning work on paper, and finally, I\'m keeping a journal. I\'ll talk about all these other things sometime later, but for now, I\'m going to focus on the journal."),mdx("h2",a({},{id:"journal"}),"Journal"),mdx("p",null,`I\'ve got like a dozen different notebooks, notepads, journals and composition books. I wanted to make this habit last, and knowing myself well enough, I knew that I had to try everything that I may potentially like before settling on one "perfect" journal. `),mdx("p",null,"Meet Leuchtturm1917 ",mdx("a",a({parentName:"p"},{href:"https://www.leuchtturm1917.us/notebook-composition-b5-ruled-softcover-121-numbered-pages-emerald.html"}),"Composition Notebook")," B5 (soft cover)."),mdx(ImageWithAlt,{path:"journaling/journaling0007.jpg",caption:"Classic Leuchtturm1917 B5 Composition Book in soft cover",width:"1000",height:"634",mdxType:"ImageWithAlt"}),mdx(ImageWithAlt,{path:"journaling/journaling0001.jpg",width:"1000",height:"634",mdxType:"ImageWithAlt"}),mdx("p",null,"It\'s fantastically simple and plain, nothing fancy, really. But I love it. So much so that I\'ve got two more - for the future."),mdx("p",null,"The pages are nice and clean with a hint of creame (they are not bright white, which is great). They are ruled, numbered, and have a space for the date/topic. The pages are also great for fountain pens, they allow very little bleeding and are very easy to write on. Two string bookmarks to keep things easily accessible is another nice feature of this Leuchtturm1917. Finally, the cover is soft but thick enough to protect the journal. There\'s also, of course, a pocket at the end cover."),mdx(ImageWithAlt,{path:"journaling/journaling0006.jpg",width:"1000",height:"634",mdxType:"ImageWithAlt"}),mdx("h2",a({},{id:"pens"}),"Pens"),mdx("p",null,\'Pens have been an obsession for me for a very long time. I have been using fountain pens - my favorites - for a while now. For this "project" I bought a few "special" pens, \',mdx("a",a({parentName:"p"},{href:"https://www.jetpens.com/Pilot-Cavalier-Fountain-Pen-Metallic-Pearl-White-Medium-Nib/pd/22744"}),"Pilot Cavaliers")," (extra fine, fine and medium nibs). "),mdx(ImageWithAlt,{path:"journaling/journaling0003.jpg",width:"1000",height:"634",mdxType:"ImageWithAlt"}),mdx(ImageWithAlt,{path:"journaling/journaling0010.jpg",caption:"Pilot Cavalier, Fine nib",width:"1000",height:"634",mdxType:"ImageWithAlt"}),mdx("p",null,"I don\'t have an explaination why I prefer fontain pens, but they are just so satisfying to write with! You could use different ink with the same pen, refills are cheap, and there\'s a lot of variety. Anyhow, this is what it looks like (featureing iPhone 13 Pro\'s macro mode)"),mdx(ImageWithAlt,{path:"journaling/journaling0004.jpg",width:"1000",height:"634",mdxType:"ImageWithAlt"}),mdx("h2",a({},{id:"hp-sprocket"}),"HP Sprocket"),mdx(ImageWithAlt,{path:"journaling/journaling0002.jpg",width:"1000",height:"634",mdxType:"ImageWithAlt"}),mdx("p",null,"Finally, I\'m using something to make my journal a bit more lively than it would otherwise be. I\'ve got a tiny ",mdx("a",a({parentName:"p"},{href:"https://sprocketprinters.com"}),"HP Sprocket")," printer to feature little pictures along with the text. It looks really nice, and certainly adds some color to the journal."),mdx(ImageWithAlt,{alt:"Moving in",path:"journaling/journaling0009.gif",width:"400",height:"300",caption:"HP Sprocket",mdxType:"ImageWithAlt"}),mdx("p",null,"Overall, these past few month of private journaling were incredible. It\'s ",mdx("em",{parentName:"p"},"thinking on paper")," as Leuchtturm1917 put it. And I know, I know, it\'s no big deal for a lot of people, but for me it\'s been a very calming, meditation-like experience, that helped eliviate a lot of pent-up anxiety, get my thoughts an feelings in order (and in a very tangible way), got me more mindful and present. I love it!"))}MDXContent.isMDXComponent=!0;\n',
  scope: {}
};

describe('Blog Post', () => {
  it('renders Blog Post without crashing', async () => {
    render(
      <UserProvider>
        <BlogLayout frontMatter={frontMatter}>
          <MDXRemote
            {...mdxSource}
            components={{
              ...MDXComponents
            }}
          />
        </BlogLayout>
      </UserProvider>
    );

    expect(screen.getByText('test title')).toBeInTheDocument();
  });
});
