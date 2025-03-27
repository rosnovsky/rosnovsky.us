import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, b as renderTransition, a as renderComponent } from './astro/server_DXCePE4i.mjs';
import 'kleur/colors';
import { s as slugify } from './slugs_CqsLKNIA.mjs';
import { a as $$Icon } from './Layout_DlWymJ4s.mjs';
import { Picture as $$Picture } from './_astro_assets_Be4H0COL.mjs';
/* empty css                         */

const $$Astro$1 = createAstro("https://rosnovsky.us");
const $$PostItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostItem;
  async function getPostData(post2) {
    const { remarkPluginFrontmatter } = await post2.render();
    const fileName = post2.slug.split("/").pop();
    return {
      ...post2.data,
      path: `/blog/${post2.slug}`,
      minutesRead: remarkPluginFrontmatter.minutesRead,
      slug: fileName
    };
  }
  const post = await getPostData(Astro2.props.post);
  const categorySlug = slugify(post.category);
  return renderTemplate`${maybeRenderHead()}<post class="flex flex-col items-start justify-between rounded-2xl bg-slate-50 shadow-sm shadow-emerald-100/50 ring-1 ring-slate-100 dark:bg-slate-950 dark:shadow-emerald-900/50 dark:ring-slate-900"${addAttribute(post.slug, "data-attr")}${addAttribute(renderTransition($$result, "vyykbvqn", "", post.slug), "data-astro-transition-scope")}> <div class="w-full px-4 pt-4"> <a${addAttribute(`Read ${post.title}`, "aria-label")}${addAttribute(`/blog/${post.slug}`, "href")} class="group aspect-h-9 aspect-w-16 relative block w-full overflow-hidden rounded-xl md:aspect-h-2 md:aspect-w-3"> ${renderComponent($$result, "Picture", $$Picture, { "src": post.image.src, "alt": post.image.alt, "class": "h-64 w-full rounded-xl bg-slate-100 object-cover transition duration-300 group-hover:scale-105", "width": 475, "loading": "lazy", "data-astro-transition-scope": renderTransition($$result, "sdkshudx", "", `${post.slug}-image`) })} <div class="absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5 dark:ring-slate-100/5"></div> </a> </div> <div class="group relative flex flex-1 flex-col px-5 pb-10 pt-8 xl:px-7"> <a${addAttribute(`/blog/${categorySlug}#posts`, "href")} class="hover:dark:text0-emerald-200 group relative z-10 flex min-h-12 items-center gap-2.5 text-md text-emerald-700 transition duration-200 ease-in-out hover:text-emerald-600 dark:text-emerald-300"> ${renderComponent($$result, "Icon", $$Icon, { "name": categorySlug, "class": "h-4 w-4 text-emerald-600 dark:text-emerald-400" })} ${post.category} </a> <div class="flex-1"> <h3 class="mt-4 font-display text-xl font-medium leading-normal text-slate-900 decoration-slate-400 transition duration-200 ease-in-out group-hover:text-emerald-900 dark:text-slate-100 dark:decoration-slate-600 dark:group-hover:text-emerald-300"> <a${addAttribute(`/blog/${post.slug}`, "href")}> <span class="absolute inset-0"></span> ${post.title} </a> </h3> <p class="mt-3.5 line-clamp-4 text-md leading-7 text-slate-700 dark:text-slate-300"> ${post.description} </p> </div> <div class="mt-8 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400"> <span class="flex items-center gap-1.5"> ${renderComponent($$result, "Icon", $$Icon, { "name": "calendar", "class": "h-5 w-5 text-slate-400 dark:text-slate-600", "stroke-width": "1.75" })} <!-- Convert post.publishDate to string --> <time${addAttribute(post.publishDate.toISOString(), "datetime")}> ${post.publishDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })} </time> </span> <span class="flex items-center gap-1.5"> ${renderComponent($$result, "Icon", $$Icon, { "name": "clock", "class": "h-5 w-5 text-slate-400 dark:text-slate-600", "stroke-width": "1.75" })} ${post.minutesRead} </span> </div> </div> </post>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/blog/PostItem.astro", "self");

const $$Astro = createAstro("https://rosnovsky.us");
const $$BlogGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogGrid;
  const { posts, featured = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative mx-auto mt-14 grid max-w-lg gap-8 sm:mt-16 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-6 xl:gap-x-6 xl:gap-y-8"> ${featured && renderTemplate`<div class="absolute -top-20 hidden gap-6 lg:-left-4 xl:flex 2xl:-left-24"> <span class="inline-block -rotate-12 transform font-writing text-2xl tracking-wide text-slate-600 dark:text-slate-400">
Read this${" "} <span class="text-emerald-800 dark:text-emerald-300">first</span>!
</span> <svg viewBox="0 0 85 29" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative -left-1 top-2 h-auto w-16 rotate-45 -scale-100 transform text-slate-600 dark:text-slate-400"> <path d="M84.1428 1.12604C68.4579 15.0432 48.2728 24.8484 26.7076 22.7737C20.393 22.1662 13.251 19.5041 7.51 16.6647C6.29685 16.0646 5.19832 15.2656 4.08583 14.4969C3.06981 13.7949 4.95423 22.296 5.12047 23.2959C6.89794 33.9863 5.2443 22.4385 4.04146 18.4653C3.10796 15.3818 1.13626 12.2911 0.701068 9.07517C0.350636 6.4856 5.49948 7.02736 7.26614 6.8582C9.08258 6.68426 20.8214 3.77937 19.2507 7.81152C16.4328 15.0458 10.9147 19.889 6.01223 25.5572" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></path> </svg> </div>`} ${posts.map(async (post) => renderTemplate`${renderComponent($$result, "PostItem", $$PostItem, { "post": post })}`)} </div>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/blog/BlogGrid.astro", void 0);

export { $$BlogGrid as $ };
