import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, f as addAttribute } from './astro/server_DXCePE4i.mjs';
import 'clsx';

const $$Astro = createAstro("https://rosnovsky.us");
const $$Underline = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Underline;
  const { class: className, ...attrs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="249" height="22" viewBox="0 0 249 22" fill="currentColor"${spreadAttributes(attrs)}${addAttribute([
    className ? className : "absolute left-0 top-2/3 h-[0.6em] w-full fill-emerald-200/75"
  ], "class:list")}${spreadAttributes(attrs)}> <path d="M247.564 18.5807C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97395 208.996 8.57031 200.846 7.46093C186.542 5.51302 172.169 4.08854 157.79 3.01562C126.033 0.645827 94.0929 0.0338481 62.3387 2.36979C42.1785 3.85416 22.008 5.90885 2.32917 10.8463C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7083C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0807 99.2274 10.6719 118.484 10.9557C142.604 11.3125 166.719 12.8333 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0807 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5807Z"></path> </svg>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/illustrations/Underline.astro", void 0);

export { $$Underline as $ };
