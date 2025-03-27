import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, s as spreadAttributes, g as renderSlot } from './astro/server_DXCePE4i.mjs';
import 'clsx';

const $$Astro = createAstro("https://rosnovsky.us");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { variant = "primary", href, class: className, ...attrs } = Astro2.props;
  const variantStyles = {
    primaryClassName: "bg-slate-900 text-white hover:bg-emerald-800",
    secondaryClassName: "text-slate-900 shadow-sm shadow-emerald-100/50 ring-1 ring-slate-100 hover:bg-slate-200/60 hover:shadow-emerald-100/50 bg-slate-100/80",
    primaryOnDarkClassName: "bg-white hover:bg-emerald-50 text-slate-700"
  };
  const defaultClassName = "inline-flex items-center rounded-full gap-2.5 justify-center px-7 py-3 text-md font-semibold leading-none outline-offset-2 transition-all duration-200 ease-in-out active:transition-none";
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([
    defaultClassName,
    variantStyles[`${variant}ClassName`],
    className
  ], "class:list")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</a>` : renderTemplate`<button${addAttribute([
    defaultClassName,
    variantStyles[`${variant}ClassName`],
    className
  ], "class:list")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/Button.astro", void 0);

export { $$Button as $ };
