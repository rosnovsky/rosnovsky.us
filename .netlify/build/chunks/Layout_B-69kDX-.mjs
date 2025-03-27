import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, f as addAttribute, s as spreadAttributes, g as renderSlot, F as Fragment, e as renderScript, h as renderHead, b as renderTransition } from './astro/server_COLE3fTq.mjs';
import 'kleur/colors';
/* empty css                          */
import { $ as $$Image } from './_astro_assets_D6TztbRf.mjs';
import 'clsx';
import { $ as $$Icon } from './Icon_C__ULjGf.mjs';
import { a as SOCIALS, S as SITE } from './config_yD4LyyLu.mjs';
/* empty css                         */

const logo = new Proxy({"src":"/_astro/apple-touch-icon.BrA-X6SP.png","width":180,"height":180,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/apple-touch-icon.png";
							}
							
							return target[name];
						}
					});

const logoIcon = new Proxy({"src":"/_astro/favicon-32x32.36YDpWUG.png","width":32,"height":32,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/favicon-32x32.png";
							}
							
							return target[name];
						}
					});

const $$Astro$4 = createAstro("https://rosnovsky.us");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Header;
  const pathname = Astro2.url.pathname.replace(/(?<=.)\/$/, "");
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" }
    // { label: 'Projects', href: '/projects' },
    // { label: 'Contact', href: '/contact' },
  ];
  return renderTemplate`${maybeRenderHead()}<header class="h-24 border-b border-slate-200/80 bg-white text-slate-800 dark:border-slate-900/20 dark:bg-slate-950 dark:text-slate-200"> <div class="mx-auto flex h-full w-full max-w-screen-xl items-center px-5 sm:px-6 lg:px-8"> <nav class="relative z-50 flex min-w-full items-center justify-between"> <!-- Logo --> <div class="flex shrink-0 items-center"> <a href="/" aria-label="Home" class="flex flex-shrink-0 items-center"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "", "class": "h-8 w-auto sm:h-9 md:hidden lg:block lg:h-10", "loading": "eager" })} ${renderComponent($$result, "Image", $$Image, { "src": logoIcon, "alt": "", "class": "hidden h-8 w-auto md:block lg:hidden", "loading": "eager" })} <h1 class="ml-5 text-xl font-bold">Rosnovsky Park</h1> </a> </div> <!-- Desktop navigation links --> <div class="hidden items-center md:flex md:space-x-6 lg:space-x-8"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute([
    'relative duration-200 after:absolute after:-bottom-2.5 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-slate-900 after:opacity-0 after:content-[""]',
    pathname === link.href ? "font-semibold text-slate-900 after:opacity-100 dark:text-slate-200" : "font-medium text-slate-700 hover:text-slate-900 hover:after:opacity-25 dark:text-slate-400 dark:hover:text-slate-200"
  ], "class:list")}${addAttribute(pathname, "data-pathname")}> ${link.label} </a>`)} </div> <div class="flex items-center md:hidden"> <!-- Mobile menu button --> <div class="ml-4 md:hidden" x-data="{ mobileMenuOpen: false }"> <button class="group relative z-50 flex cursor-pointer items-center justify-center rounded-full bg-slate-100/80 p-3 shadow-sm shadow-emerald-100/50 ring-1 ring-slate-900/5 transition duration-300 ease-in-out hover:bg-slate-200/60 focus:outline-none dark:bg-slate-900/20 dark:shadow-emerald-900/50 dark:ring-slate-100/5 md:hidden" aria-label="Toggle Navigation" @click="mobileMenuOpen=!mobileMenuOpen"> <span class="relative h-3.5 w-4 transform transition duration-500 ease-in-out"> <span class="absolute block h-0.5 rotate-0 transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900 dark:bg-slate-300" :class="mobileMenuOpen ? 'top-1.5 left-1/2 w-0': 'top-0 left-0 w-full'"></span> <span class="absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900 dark:bg-slate-300" :class="mobileMenuOpen ? 'rotate-45': 'rotate-0'"></span> <span class="absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900 dark:bg-slate-300" :class="mobileMenuOpen ? '-rotate-45': 'rotate-0'"></span> <span class="absolute block h-0.5 rotate-0 transform rounded-full bg-slate-700 opacity-100 transition-all duration-300 ease-in-out group-hover:bg-slate-900 dark:bg-slate-300" :class="mobileMenuOpen ? 'top-1.5 left-1/2 w-0': 'left-0 top-3 w-full'"></span> </span> </button> <!-- Mobile menu container --> <div class="md:hidden"> <!-- Background dark overlay when mobile menu is open --> <div x-show="mobileMenuOpen" x-transition:enter="duration-200 ease-out" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="duration-150 ease-in" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="fixed inset-0 z-20 bg-slate-900 bg-opacity-50" style="display: none"></div> <!-- Mobile menu popover --> <div x-show="mobileMenuOpen" x-transition:enter="duration-300 ease-out" x-transition:enter-start="opacity-0 scale-90" x-transition:enter-end="opacity-100 scale-100" x-transition:leave="duration-200 ease-in" x-transition:leave-start="opacity-100 scale-100" x-transition:leave-end="opacity-0 scale-90" class="absolute inset-x-0 top-full z-30 mt-4 origin-top overflow-hidden rounded-2xl bg-slate-50 px-6 py-7 shadow-xl shadow-emerald-100/40 ring-1 ring-slate-900/5 dark:bg-slate-900 dark:shadow-emerald-900/60 dark:ring-slate-100/5" style="display: none" @click.away="mobileMenuOpen = false"> <div> <!-- Mobile menu links --> <div class="flex flex-col space-y-4"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="block text-base font-semibold text-slate-700 duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"> ${link.label} </a>`)} <!-- Dropdown library list --> <!-- <ul
                      style="display: none"
                      class="z-20 space-y-4 px-3"
                      x-show.transition="open"
                    >
                      {
                        pages.map((link) => (
                          <li class="mt-4">
                            <a
                              href={link.href}
                              class="block text-md font-medium text-slate-700 transition duration-200 ease-in-out hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-200"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))
                      }
                    </ul> --> </div> </div> </div> </div> </div> </div> </nav> </div> </header>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/Header.astro", void 0);

const $$Astro$3 = createAstro("https://rosnovsky.us");
const $$Container = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Container;
  const { class: className, ...attrs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-8", className], "class:list")}${spreadAttributes(attrs)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/Container.astro", void 0);

const $$Astro$2 = createAstro("https://rosnovsky.us");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  const { newsletter = false } = Astro2.props;
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    // { label: 'Projects', href: '/projects' },
    { label: "Blog", href: "/blog" }
    // { label: 'Contact', href: '/contact' },
  ];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute([newsletter && "pt-12 sm:pt-16"], "class:list")}> ${newsletter && renderTemplate`<div class="relative"> <div class="absolute inset-x-0 bottom-0 h-1/2 bg-slate-900"></div> <div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"> <div class="relative overflow-hidden rounded-2xl bg-emerald-700 px-5 py-12 dark:bg-emerald-300 sm:px-16 lg:py-14"> <div class="absolute inset-0 h-full w-full bg-emerald-400 object-cover object-right dark:bg-emerald-600"></div> <div class="relative flex w-full flex-col items-center lg:flex-row"> <div class="max-w-2xl text-center lg:pr-4 lg:text-left"> <h3 class="font-display text-4xl font-semibold text-white dark:text-slate-900 sm:text-5xl">
Subscribe to my newsletter
</h3> <p class="mx-auto mt-4 max-w-lg text-lg text-emerald-50 dark:text-emerald-950 lg:mx-0 lg:mt-6">
Join 10,000+ designers and get creative site breakdowns,
                  design musings and tips every Monday.
</p> </div> <form action="#" method="post" class="relative mt-10 w-full max-w-lg lg:mt-0"> <input type="email" class="dark:palceholder-emerald-900/90 h-14 w-full rounded-full border-0 bg-white/10 py-3.5 pl-5 pr-32 text-sm leading-5 text-emerald-50 placeholder-emerald-100/90 outline-none ring-1 ring-white/25 backdrop-blur duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/30 dark:bg-slate-950/10 dark:ring-slate-950/25 dark:focus:ring-slate-950/30 sm:pl-6" required placeholder="Enter your email" auto-complete="email"> <button type="submit" class="absolute right-1.5 top-1.5 inline-flex h-11 items-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-emerald-50 outline-none transition duration-200 ease-in-out hover:bg-emerald-800 focus:outline-none sm:px-7 sm:text-md">
Subscribe
</button> </form> </div> </div> </div> </div>`} <footer class="overflow-hidden bg-slate-950 pb-8 pt-20 text-slate-50 sm:pb-12 sm:pt-24 lg:pt-32"> ${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` <div class="mx-auto grid max-w-xl items-center gap-5 lg:mx-0 lg:max-w-none lg:grid-cols-12 lg:gap-12 xl:gap-20"> <div class="lg:col-span-7"> <h3 class="text-center font-display text-3xl font-semibold text-slate-100 dark:text-slate-50 sm:text-5xl lg:max-w-xl lg:text-left">
It costs nothing to be kind.
</h3> </div> <div class="flex flex-col items-center lg:col-span-5 lg:items-start"> <p class="text-center text-lg text-slate-50 lg:max-w-sm lg:text-left">
Everything is so expensive these days. But kindness is free. So is
            being an asshole. Choose wisely.
</p> <div class="mt-16 grid w-full max-w-sm grid-cols-2 gap-3.5 sm:max-w-none sm:grid-cols-3 lg:mt-8 lg:gap-2.5 xl:gap-3.5"> ${SOCIALS.map((socialLink) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <a class="flex items-center justify-center gap-2.5 rounded-full border border-slate-600/90 py-2.5 text-sm text-slate-50 duration-200 ease-in-out hover:bg-slate-800 hover:text-white lg:gap-2 xl:gap-2.5"${addAttribute(socialLink.href, "href")}> ${renderComponent($$result3, "Icon", $$Icon, { "name": socialLink.name, "class": "h-4 w-4 shrink-0 text-slate-200 duration-200 ease-in-out group-hover:fill-slate-100" })} ${socialLink.label} </a> ` })}`)} </div> </div> </div> <hr class="mb-6 mt-12 h-px w-full border-slate-600/90 sm:mb-10 sm:mt-16"> <div class="flex flex-col items-center justify-between md:flex-row"> <div class="flex items-center gap-6"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="text-base font-medium text-slate-300 duration-200 ease-in-out hover:text-white"> ${link.label} </a>`)} </div> <p class="mt-8 text-base text-slate-400/90 md:mt-0">
© 2003-${(/* @__PURE__ */ new Date()).getFullYear()} Art Rosnovsky. All rights reserved.
</p> </div> ` })} </footer> </section>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro("https://rosnovsky.us");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/rosnovsky/code/rosnovsky.us/node_modules/.pnpm/astro@5.1.1_@types+node@22.10.2_jiti@2.4.2_rollup@4.29.1_typescript@5.7.2_yaml@2.6.1/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/rosnovsky/code/rosnovsky.us/node_modules/.pnpm/astro@5.1.1_@types+node@22.10.2_jiti@2.4.2_rollup@4.29.1_typescript@5.7.2_yaml@2.6.1/node_modules/astro/components/ClientRouter.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://rosnovsky.us");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = SITE.title,
    author = SITE.author,
    description = SITE.description,
    ogImage = SITE.ogImage,
    canonicalURL = new URL(Astro2.url.pathname.replace(/\/$/, ""), Astro2.site).href
  } = Astro2.props;
  const socialImageURL = new URL(ogImage ?? SITE.ogImage, Astro2.url.origin).href;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="canonical"', '><meta name="generator"', '><link rel="icon" type="image/x-icon" href="/favicon.ico"><!-- General Meta Tags --><title>', '</title><meta name="title"', '><meta name="description"', '><meta name="author"', '><link rel="sitemap" href="/sitemap-index.xml"><!-- Open Graph / Facebook --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:site_name" content="Rosnovsky Park\u2122"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', ">", "", '</head> <body class="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200"> ', " ", " ", ` <script>
  document.addEventListener('astro:page-load', () => {
    const theme = (() => {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('theme')
      ) {
        return localStorage.getItem('theme');
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    })();

    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    window.localStorage.setItem('theme', theme);

    const handleToggleClick = () => {
      const element = document.documentElement;
      element.classList.toggle('dark');

      const isDark = element.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // document
    //   .getElementById("themeToggle")
    //   .addEventListener("click", handleToggleClick);
  });
<\/script></body></html>`])), addAttribute(canonicalURL, "href"), addAttribute(Astro2.generator, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(author, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(canonicalURL, "content"), addAttribute(socialImageURL, "content"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(socialImageURL, "content"), renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-transition-scope": renderTransition($$result, "coppatqy", "fade", "") }), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/home/rosnovsky/code/rosnovsky.us/src/layouts/Layout.astro", "self");

export { $$Container as $, $$Layout as a };
