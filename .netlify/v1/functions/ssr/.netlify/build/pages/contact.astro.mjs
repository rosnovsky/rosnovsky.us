import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, g as renderSlot, a as renderComponent, s as spreadAttributes } from '../chunks/astro/server_COLE3fTq.mjs';
import 'kleur/colors';
import { $ as $$Image } from '../chunks/_astro_assets_D6TztbRf.mjs';
import { $ as $$Icon } from '../chunks/Icon_C__ULjGf.mjs';
import { S as SITE } from '../chunks/config_yD4LyyLu.mjs';
import { a as $$Layout } from '../chunks/Layout_B-69kDX-.mjs';
import 'clsx';
import { $ as $$Button } from '../chunks/Button_VVr1D_bW.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro("https://rosnovsky.us");
const $$Label = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Label;
  const { name, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-between text-md leading-6"> <label${addAttribute(name, "for")} class="block font-medium text-slate-900"> ${renderSlot($$result, $$slots["default"])} </label> ${description && renderTemplate`<p${addAttribute(`${name}-description`, "id")} class="text-slate-500/80"> ${description} </p>`} </div>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/contact/Label.astro", void 0);

const $$Astro$1 = createAstro("https://rosnovsky.us");
const $$TextField = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TextField;
  const {
    label,
    name,
    description,
    rows = 5,
    elementType = "input",
    className,
    ...attrs
  } = Astro2.props;
  const inputClasses = "block w-full px-4 py-4 leading-4 transition-colors duration-200 ease-in-out border-0 shadow-sm rounded-xl bg-slate-50 text-md text-slate-900 shadow-emerald-100/50 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 hover:bg-white focus:border-0 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-600/60";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(className, "class")}> ${label && renderTemplate`${renderComponent($$result, "Label", $$Label, { "name": name, "description": description }, { "default": ($$result2) => renderTemplate`${label}` })}`} <div class="mt-2"> ${elementType === "textarea" ? renderTemplate`<textarea${addAttribute(name, "id")}${addAttribute(name, "name")}${addAttribute(rows, "rows")}${addAttribute(inputClasses, "class")}${spreadAttributes(attrs)}></textarea>` : renderTemplate`<input${addAttribute(name, "id")}${addAttribute(name, "name")}${addAttribute(inputClasses, "class")}${spreadAttributes(attrs)}>`} </div> </div>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/contact/TextField.astro", void 0);

const $$Astro = createAstro("https://rosnovsky.us");
const $$CheckboxField = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CheckboxField;
  const { label, name, ...attrs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex items-start"> <div class="flex h-6 items-center"> <input${addAttribute(name, "id")}${addAttribute(name, "name")} type="checkbox" class="h-4 w-4 rounded border-slate-300/80 bg-slate-50 text-emerald-600 shadow-sm shadow-emerald-100/50 focus:outline-none focus:ring-transparent"${spreadAttributes(attrs)}> </div> <div class="ml-3 text-sm leading-6"> <label${addAttribute(name, "for")} class="text-slate-700"> ${label} </label> </div> </div>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/contact/CheckboxField.astro", void 0);

const $$ContactForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<form action="#" method="POST" class="mt-10"> <div class="space-y-7"> ${renderComponent($$result, "TextField", $$TextField, { "label": "Name", "name": "name", "auto-complete": "name", "placeholder": "Jane Doe" })} ${renderComponent($$result, "TextField", $$TextField, { "label": "Email", "name": "email", "type": "email", "auto-complete": "email", "placeholder": "foobar@email.com" })} ${renderComponent($$result, "TextField", $$TextField, { "label": "Phone", "name": "phone", "type": "tel", "auto-complete": "tel", "aria-describedby": "phone-description", "placeholder": "+1 (800) 123-4567", "description": "Optional" })} ${renderComponent($$result, "TextField", $$TextField, { "label": "Message", "name": "message", "elementType": "textarea", "aria-describedby": "message-description", "placeholder": "Tell me a little bit about your project...", "description": "Max 500 characters" })} <fieldset> <legend class="block text-md font-medium leading-6 text-slate-900">
Expected services
</legend> <div class="mt-4 space-y-3"> ${renderComponent($$result, "CheckboxField", $$CheckboxField, { "label": "Web development", "name": "web-development" })} ${renderComponent($$result, "CheckboxField", $$CheckboxField, { "label": "Web design", "name": "web-design" })} ${renderComponent($$result, "CheckboxField", $$CheckboxField, { "label": "Consulting", "name": "consulting" })} ${renderComponent($$result, "CheckboxField", $$CheckboxField, { "label": "Other", "name": "other" })} </div> </fieldset> </div> <div class="mt-10 border-t border-slate-200 pt-8"> ${renderComponent($$result, "Button", $$Button, { "type": "submit", "class": "w-full !text-base sm:!text-lg" }, { "default": ($$result2) => renderTemplate`
Get started
` })} </div> </form>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/contact/ContactForm.astro", void 0);

const image = new Proxy({"src":"/_astro/contact.D9HYWQf0.jpg","width":879,"height":587,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/contact.jpg";
							}
							
							return target[name];
						}
					});

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const contactMethods = [
    {
      icon: "mail",
      title: "Email me",
      description: "I will usually email you back within an hour",
      href: "mailto:hey@janedoe.com",
      linkText: "hey@janedoe.com"
    },
    {
      icon: "phone",
      title: "Call me",
      description: "I\u2019m available weekdays from 9AM to 5PM",
      href: "tel:+13234567891",
      linkText: "+1 (323) 456-7891"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Contact me | ${SITE.title}`, "description": "Whether you're looking to kickstart a new web project or simply want to say hi, feel free to get in touch." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative overflow-hidden"> <div class="mx-auto max-w-screen-xl"> <div class="lg:columns-2 lg:gap-8"> <div class="relative bg-slate-50 px-5 py-16 sm:px-6 sm:py-24 lg:col-span-6 lg:rounded-br-[64px] lg:px-8 lg:pt-32 2xl:pl-0"> <div class="absolute inset-y-0 -left-full hidden w-full bg-slate-50 lg:block"></div> <div class="relative mx-auto max-w-2xl lg:mx-0 lg:max-w-none"> <h2 class="font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-[40px] lg:leading-tight xl:text-5xl xl:leading-tight">
How can I help you? Let’s get in touch<span class="ml-4 sm:ml-6">👋</span> </h2> <div class="aspect-h-2 aspect-w-3 mt-12 sm:mt-16"> ${renderComponent($$result2, "Image", $$Image, { "src": image, "alt": "", "class": "h-full w-full rounded-3xl object-cover xl:left-16" })} </div> <div class="relative mt-14 h-fit w-fit font-writing text-2xl tracking-wide text-slate-600 sm:mt-20 sm:text-[27px]"> <span class="inline-block w-52 max-w-[220px] transform sm:w-auto sm:-rotate-6">
You can <span class="text-emerald-700">reach me</span> at the following
</span> <svg xmlns="http://www.w3.org/2000/svg" width="124" height="121" viewBox="0 0 124 121" fill="none" class="absolute -right-16 top-4 h-24 w-auto -rotate-90 transform text-slate-600 sm:-right-20 sm:-top-1 sm:translate-y-2 sm:rotate-[-100deg]"> <g clip-path="url(#clip0_257_335)"> <path d="M101.672 26.3321C96.8237 38.134 92.186 44.0573 79.0339 44.4141C70.6979 44.6403 60.8529 42.694 53.4527 38.7688C49.1632 36.4936 56.8633 35.9887 58.3238 36.046C75.2213 36.7084 91.469 47.7751 94.8076 64.9225C96.9834 76.0979 88.4245 81.9067 78.6041 84.1752C63.6278 87.6349 47.752 81.2525 36.0397 72.0991C32.1436 69.0541 19.8172 60.5149 22.0934 54.2698C23.9793 49.0954 31.7507 55.0061 34.018 56.9118C37.2506 59.6288 44.0244 65.7437 43.9149 70.3449C43.7576 76.9438 32.7995 78.0771 28.2217 77.7848C19.5283 77.2298 10.3327 73.6012 2.05876 71.0225C1.4496 70.8325 5.37871 69.9759 6.06477 69.8198C8.02976 69.3721 9.72632 68.1441 11.7325 67.8657C13.2208 67.6592 21.2769 68.287 16.2554 69.947C14.4855 70.532 2.71379 69.3189 2.58655 69.7453C2.06535 71.4868 10.2182 79.8642 11.7371 81.4008C15.3955 85.1003 14.5874 73.4626 14.2296 71.9325" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"></path> </g> <defs> <clipPath id="clip0_257_335"> <rect width="106" height="67" fill="white" transform="matrix(-0.748497 0.663138 0.663138 0.748497 79.3407 0)"></rect> </clipPath> </defs> </svg> </div> <div class="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-2 sm:gap-6 xl:gap-8"> ${contactMethods.map((contactMethod) => renderTemplate`<div class="flex gap-[18px]"> ${renderComponent($$result2, "Icon", $$Icon, { "name": contactMethod.icon, "stroke-width": "1.75", "class": "h-6 w-6 shrink-0 text-emerald-600" })} <div class="sm:pt-0.5"> <p class="font-display text-lg text-slate-900"> ${contactMethod.title} </p> <p class="mt-1.5 text-base text-slate-600 sm:mt-2"> ${contactMethod.description} </p> <a${addAttribute(contactMethod.href, "href")} class="mt-5 inline-block text-emerald-700 duration-200 ease-in-out hover:text-emerald-600 sm:mt-6"> ${contactMethod.linkText} </a> </div> </div>`)} </div> </div> </div> <div class="px-5 py-16 sm:px-6 sm:py-24 lg:col-span-6 lg:pl-0 lg:pr-8 lg:pt-32 xl:col-span-5 xl:col-start-8 2xl:pr-0"> <div class="mx-auto max-w-lg lg:mr-0"> <h3 class="font-display text-3xl font-semibold text-slate-900">
Fill our the form below to get started
</h3> <p class="mt-4 text-lg text-slate-600">
Turkish cortado mazagran skinny macchiato espresso trade medium
              aromatic.
</p> ${renderComponent($$result2, "ContactForm", $$ContactForm, {})} </div> </div> </div> </div> </section> ` })}`;
}, "/home/rosnovsky/code/rosnovsky.us/src/pages/contact.astro", void 0);

const $$file = "/home/rosnovsky/code/rosnovsky.us/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
