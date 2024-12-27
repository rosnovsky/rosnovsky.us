import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, f as addAttribute } from '../chunks/astro/server_COLE3fTq.mjs';
import 'kleur/colors';
import { $ as $$Container, a as $$Layout } from '../chunks/Layout_CKuX3dl7.mjs';
import 'clsx';
import { $ as $$Underline } from '../chunks/Underline_B63ksl2C.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { a as SOCIALS, t as typescript, S as SITE } from '../chunks/config_yD4LyyLu.mjs';
import { $ as $$Icon } from '../chunks/Icon_Dq2hKnsC.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_D6TztbRf.mjs';
import { $ as $$BlogGrid } from '../chunks/BlogGrid_CcpcPGrW.mjs';
import { g as getSortedPosts } from '../chunks/posts_-IYf2ASY.mjs';
export { renderers } from '../renderers.mjs';

const $$HeroGradient = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg width="1728" height="894" viewBox="0 0 1728 894" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute inset-x-0 top-56 w-auto lg:inset-y-0"> <g clip-path="url(#clip0_8_95)"> <g opacity="0.6" filter="url(#filter0_f_8_95)"> <path d="M201.4 582.997H330V342.155L23 501.52L201.4 582.997Z" fill="#60A5FA" fill-opacity="0.45"></path> <path d="M330 342.155V284H90H-70L23 501.52L330 342.155Z" fill="#7DD3FC" fill-opacity="0.8"></path> <path d="M-70 582.997H201.4L23 501.52L-70 284V582.997Z" fill="#F0FDFA" fill-opacity="0.5"></path> </g> </g> <defs> <filter id="filter0_f_8_95" x="-370" y="-16" width="1000" height="898.997" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_8_95"></feGaussianBlur> </filter> <clipPath id="clip0_8_95"> <rect width="1728" height="894" fill="white"></rect> </clipPath> </defs> </svg>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/illustrations/HeroGradient.astro", void 0);

const getMusicData = async () => {
  try {
    const response = await fetch("https://rosnovsky.us/api/now-playing");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching music data:", error);
    return null;
  }
};
const getAlbumArtUrl = (path) => {
  const baseUrl = "https://music.rosnovsky.us";
  return new URL(path, baseUrl).toString();
};
function LastPlayedSong() {
  const [currentMusic, setCurrentMusic] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const data = await getMusicData();
      setCurrentMusic(data);
    };
    getData();
    return () => {
      setCurrentMusic(null);
    };
  }, []);
  if (!currentMusic) {
    return /* @__PURE__ */ jsxs("div", { className: "absolute left-12 top-full inline-flex h-12 w-max -translate-y-6 items-center justify-center gap-3.5 rounded-2xl bg-white/90 px-8 text-sm font-semibold text-slate-700 shadow-lg shadow-emerald-100/50 ring-1 ring-slate-900/5 backdrop-blur-md dark:bg-slate-950/30 dark:text-slate-400 dark:shadow-emerald-950/50 dark:ring-slate-100/5 md:left-0 md:-translate-x-20 md:-translate-y-24 lg:-left-3 lg:-translate-y-24 lg:px-10 xl:-left-6 xl:-translate-x-28 xl:-translate-y-32", children: [
      /* @__PURE__ */ jsx("img", { src: "/react.svg", alt: "", className: "h-6 w-auto" }),
      "🔥🔥🔥"
    ] });
  }
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "https://music.rosnovsky.us",
      "aria-label": `Now playing: ${currentMusic.title} by ${currentMusic.grandparentTitle}`,
      children: /* @__PURE__ */ jsxs("div", { className: "absolute left-12 top-full flex h-24 w-max -translate-y-6 rounded-2xl bg-white/90 text-sm font-semibold text-slate-700 shadow-lg shadow-emerald-100/50 ring-1 ring-slate-900/5 backdrop-blur-md dark:bg-slate-950/30 dark:text-slate-400 dark:shadow-emerald-950/50 dark:ring-slate-100/5 md:left-0 md:top-[580px] md:-translate-x-20 md:-translate-y-24 lg:-left-3 lg:-translate-y-24 xl:-left-6 xl:-translate-x-28 xl:-translate-y-32", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-24 items-center rounded-l-2xl", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: "-rotate-180 px-2 text-[11px] font-thin tracking-wide text-yellow-900/70 dark:text-yellow-100/80",
            style: { writingMode: "vertical-lr" },
            "aria-hidden": "true",
            children: "LAST PLAYED"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center gap-3.5 px-8 lg:px-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: getAlbumArtUrl(currentMusic.albumArt),
              alt: `Album art for ${currentMusic.title}`,
              className: "h-12 w-12 rounded-lg",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate text-sm font-semibold", children: currentMusic.title }),
            /* @__PURE__ */ jsx("span", { className: "truncate text-xs text-slate-500 dark:text-slate-200", children: currentMusic.grandparentTitle })
          ] })
        ] }) })
      ] })
    }
  );
}

const heroPortrait = new Proxy({"src":"/_astro/hero-portrait.B1bOgj2S.jpg","width":1536,"height":2048,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/hero-portrait.jpg";
							}
							
							return target[name];
						}
					});

const nodejs = new Proxy({"src":"/_astro/nodejs.DiAEIhnG.svg","width":2270,"height":2500,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/logos/icons/nodejs.svg";
							}
							
							return target[name];
						}
					});

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden py-20 lg:py-24"> ${renderComponent($$result, "HeroGradient", $$HeroGradient, {})} ${renderComponent($$result, "Container", $$Container, { "class": "relative z-10 grid items-center gap-16 lg:grid-cols-2 lg:gap-8" }, { "default": ($$result2) => renderTemplate` <div class="mx-auto flex max-w-2xl flex-col items-center lg:items-start"> <h1 class="text-center font-display text-5xl font-semibold text-slate-900 dark:text-slate-200 sm:text-6xl lg:text-left"> <span class="relative"> ${renderComponent($$result2, "Underline", $$Underline, {})} <span class="relative">Welcome!</span> </span>
Happy to see you here.
</h1> <p class="mt-6 text-center text-lg leading-8 text-slate-700 dark:text-slate-200 lg:text-left">
Listen, we need to talk. Or maybe we don't. In any case, I write about
        web development, hiking, and random hobbies I pick up every now and
        then.
</p> <div class="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:justify-start"> <div class="flex gap-3 sm:gap-4"> ${SOCIALS.filter((social) => social.showInHero).map((socialLink) => renderTemplate`<a${addAttribute(socialLink.href, "href")}${addAttribute(socialLink.ariaLabel, "aria-label")} class="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 duration-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-950"> ${renderComponent($$result2, "Icon", $$Icon, { "name": socialLink.name, "class": "h-4 w-4 fill-slate-600 transition group-hover:fill-slate-700 dark:fill-slate-400 dark:group-hover:fill-slate-300" })} </a>`)} </div> </div> </div> <div class="mx-auto w-full max-w-lg lg:mr-0"> <div class="aspect-h-5 aspect-w-4 relative rounded-2xl bg-slate-50 dark:bg-slate-950"> ${renderComponent($$result2, "Image", $$Image, { "class": "h-full w-full rounded-2xl object-cover object-center", "src": heroPortrait, "alt": "" })} <div> <div class="absolute hidden w-max md:left-full md:top-16 md:block lg:-left-28 lg:-top-8 2xl:left-full 2xl:top-16"> <span class="inline-block transform font-writing text-2xl tracking-wide text-slate-600 dark:text-slate-300 md:rotate-[16deg] lg:translate-x-6 lg:rotate-[-18deg] 2xl:rotate-12">
Hey, I'm Art!
</span> <svg xmlns="http://www.w3.org/2000/svg" width="103" height="102" viewBox="0 0 103 102" fill="none" class="h-auto w-28 text-slate-600 dark:text-slate-300 md:-translate-x-1/2 md:-translate-y-6 md:rotate-0 lg:-translate-y-3 lg:translate-x-3/4 lg:rotate-12 lg:-scale-x-100 2xl:-translate-x-1/2 2xl:-translate-y-6 2xl:rotate-0 2xl:scale-x-100"> <g> <path d="M100.676 26.5417C93.9574 46.1137 83.3723 65.5204 62.3048 74.1115C51.0557 78.6989 36.7215 76.3709 36.7673 62.5332C36.7985 53.1087 42.243 38.3844 53.849 37.3949C66.6654 36.3021 46.8111 57.0334 44.2548 58.8791C32.2897 67.5184 20.2216 71.4112 5.76428 74.151C0.348605 75.1774 3.24474 76.5966 6.85897 77.2296C9.99484 77.7788 13.5771 78.3248 16.755 78.0657C17.7243 77.9867 11.502 77.2793 10.5148 77.213C6.28171 76.9284 1.40658 76.4418 2.9682 71.2948C3.21916 70.4678 6.25335 62.9691 7.53037 63.112C8.19484 63.1864 9.21134 68.8129 9.5344 69.5548C11.6329 74.3731 14.1134 76.5032 19.3253 77.6737" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> </g> </svg> </div> <div class="absolute -top-6 right-12 inline-flex h-12 w-max items-center justify-center gap-3.5 rounded-2xl bg-white/90 px-8 text-sm font-semibold text-slate-700 shadow-lg shadow-emerald-100/50 ring-1 ring-slate-900/5 backdrop-blur-md dark:bg-slate-950/30 dark:text-slate-400 dark:shadow-emerald-950/50 dark:ring-slate-100/5 md:-left-28 md:top-14 lg:-top-6 lg:left-44 lg:px-10 2xl:-left-24 2xl:top-14"> ${renderComponent($$result2, "Image", $$Image, { "src": typescript, "alt": "", "class": "h-auto w-4" })}❤️❤️❤️
</div> ${renderComponent($$result2, "LastPlayedSong", LastPlayedSong, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/LastPlayedSong", "client:component-export": "default" })} <div class="absolute top-[250px] hidden h-12 w-max items-center justify-center gap-3.5 rounded-2xl bg-white/90 px-8 text-sm font-semibold text-slate-700 shadow-lg shadow-emerald-100/50 ring-1 ring-slate-900/5 backdrop-blur-md dark:bg-slate-950/50 dark:text-slate-400 dark:shadow-emerald-950/50 dark:ring-slate-100/5 md:left-full md:inline-flex md:-translate-x-32 lg:left-48 lg:hidden lg:px-10 2xl:left-full 2xl:inline-flex 2xl:-translate-x-28"> ${renderComponent($$result2, "Image", $$Image, { "src": nodejs, "alt": "", "class": "h-auto w-7" })} <span class="">🎉🎉🎉</span> </div> </div> </div> </div> ` })} </section>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/Hero.astro", void 0);

const $$FeaturedPosts = createComponent(async ($$result, $$props, $$slots) => {
  const featuredPosts = (await getSortedPosts()).slice(0, 9);
  return renderTemplate`${maybeRenderHead()}<section class="overflow-hidden bg-white py-16 dark:bg-slate-900 sm:pt-24 lg:pt-28"> ${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` <h2 class="mx-auto max-w-2xl text-center font-display text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-200 sm:text-5xl sm:leading-tight"> <span class="relative whitespace-nowrap"> ${renderComponent($$result2, "Underline", $$Underline, {})} <span class="relative text-emerald-700 dark:text-emerald-400">Latest</span> </span>
posts from the blog
</h2> ${renderComponent($$result2, "BlogGrid", $$BlogGrid, { "posts": featuredPosts, "featured": true })} ` })} </section>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/blog/FeaturedPosts.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Software Engineer, recovering imposter. I read more than I hike. | ${SITE.title}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "FeaturedPosts", $$FeaturedPosts, {})}      ` })}`;
}, "/home/rosnovsky/code/rosnovsky.us/src/pages/index.astro", void 0);

const $$file = "/home/rosnovsky/code/rosnovsky.us/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
