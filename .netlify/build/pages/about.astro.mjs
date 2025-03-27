import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, b as renderTransition } from '../chunks/astro/server_COLE3fTq.mjs';
import 'kleur/colors';
import { $ as $$Container, a as $$Layout } from '../chunks/Layout_B-69kDX-.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_D6TztbRf.mjs';
import 'clsx';
import { $ as $$Underline } from '../chunks/Underline_B63ksl2C.mjs';
import { $ as $$Icon } from '../chunks/Icon_C__ULjGf.mjs';
import { $ as $$Button } from '../chunks/Button_VVr1D_bW.mjs';
import { S as SITE } from '../chunks/config_yD4LyyLu.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$AboutGradient = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg width="1068" height="897" viewBox="0 0 1068 897" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 h-full w-full object-cover object-left lg:w-2/3"> <rect width="1068" height="897"></rect> <g opacity="0.3" filter="url(#filter0_f_783_180)"> <path d="M195.029 897H386V437.865L-69.895 741.675L195.029 897Z" fill="#60A5FA" fill-opacity="0.75"></path> <path d="M386 437.865V327H29.6H-208L-69.895 741.675L386 437.865Z" fill="#7DD3FC" fill-opacity="0.8"></path> <path d="M-208 897H195.029L-69.895 741.675L-208 327V897Z" fill="#F0FDFA" fill-opacity="0.5"></path> </g> <defs> <filter id="filter0_f_783_180" x="-808" y="-273" width="1794" height="1770" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend> <feGaussianBlur stdDeviation="300" result="effect1_foregroundBlur_783_180"></feGaussianBlur> </filter> </defs> </svg>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/illustrations/AboutGradient.astro", void 0);

const $$CurvyLines = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg width="229" height="40" viewBox="0 0 229 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute bottom-16 left-0 mt-14 h-8 w-auto -translate-x-1/2 sm:mt-20 sm:h-10"> <g clip-path="url(#clip0_204_150)"> <path d="M1 19L29.4 39L57.7 19L86.1 39L114.5 19L142.8 39L171.2 19L199.6 39L228 19" stroke="#0369A1" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M1 19L29.4 39L57.7 19L86.1 39L114.5 19L142.8 39L171.2 19L199.6 39L228 19" stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M1 1L29.4 21L57.7 1L86.1 21L114.5 1L142.8 21L171.2 1L199.6 21L228 1" stroke="#BAE6FD" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_204_150"> <rect width="229" height="40" fill="white"></rect> </clipPath> </defs> </svg>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/illustrations/CurvyLines.astro", void 0);

const heroImage = new Proxy({"src":"/_astro/portrait-2.ussHbMll.jpg","width":2316,"height":3088,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/portrait-2.jpg";
							}
							
							return target[name];
						}
					});

const $$AboutHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative bg-slate-50/50 dark:bg-slate-900"> ${renderComponent($$result, "AboutGradient", $$AboutGradient, {})} ${renderComponent($$result, "Container", $$Container, { "class": "relative py-16 sm:py-24 lg:py-32" }, { "default": ($$result2) => renderTemplate` <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:mx-0 lg:w-2/3 lg:max-w-none lg:px-8 lg:pr-16"> <h1 class="font-display text-5xl font-semibold text-slate-900 dark:text-slate-100 sm:text-6xl">
Hey,
<span class="relative whitespace-nowrap"> ${renderComponent($$result2, "Underline", $$Underline, {})} <span class="relative">I’m Art</span> </span>${" "}.
</h1> <p class="mt-8 text-lg leading-8 text-slate-700 dark:text-slate-200">
I'm a web developer based in Western Washington. I live about 50 miles
        north of Seattle in a small town called Arlington.
</p> <blockquote class="my-5 pl-5 font-mono italic text-slate-500 dark:text-slate-300">
For a while, I lived in London (not that one, but the one in Ontario,
        Canada) before moving to Vancouver (not that one, but the one in
        Washington; not that Washington, but Washington state). Now I live in
        Arlington (and not the one in Virginia, mind you!)
</blockquote> <p class="mt-8 text-lg leading-8 text-slate-700 dark:text-slate-200">
After short gigs at Intel, AT&T, and Microsoft, I ended up at <a class="underline" href="https://auth0.com/">Auth0</a> (acquired by Okta in May 2021). I worked there in a couple of different
        roles, the latest one being \`Software Engineer\`. I've built Auth0's enterprise
        customer onboarding program, surrounding internal and external tooling, a
        bunch of high-profile customer facing features, and more. I was laid off
        in February 2024.
</p> <p class="mt-8 text-lg leading-8 text-slate-700 dark:text-slate-200">
Feel free to connect with me on <a href="https://lounge.town/@rosnovsky" class="underline">Mastodon</a> or <a href="https://github.com/rosnovsky" class="underline">Github</a>.
</p> <blockquote class="my-5 pl-5 font-mono italic text-slate-500 dark:text-slate-300">
For the longest time, I'd been a podcaster. In my previous life, I even
        was a minor radio celebrity, worked as a television producer and
        correspondent, and have done a bunch of front-line reporting from
        terrorist attacks, riots, and hostage situations. Yet here we are.
</blockquote> <p class="mt-16 text-right font-cursive text-3xl text-slate-700 dark:text-slate-300">
Art Rosnovsky
</p> </div> ` })} <div class="relative h-96 w-full md:h-[600px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/3"> ${renderComponent($$result, "Image", $$Image, { "src": heroImage, "alt": "", "class": "absolute inset-0 h-full w-full object-cover object-top dark:brightness-50", "loading": "lazy" })} ${renderComponent($$result, "CurvyLines", $$CurvyLines, {})} </div> </section>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/AboutHero.astro", void 0);

const intel = new Proxy({"src":"/_astro/intel.CVBQXCVZ.svg","width":388,"height":151,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/logos/intel.svg";
							}
							
							return target[name];
						}
					});

const att = new Proxy({"src":"/_astro/att.CDK0n5kp.svg","width":800,"height":800,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/logos/att.svg";
							}
							
							return target[name];
						}
					});

const microsoft = new Proxy({"src":"/_astro/microsoft.CMM5-R_I.svg","width":286,"height":286,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/logos/microsoft.svg";
							}
							
							return target[name];
						}
					});

const auth0 = new Proxy({"src":"/_astro/auth0.C1wfz-JO.svg","width":512,"height":512,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/logos/auth0.svg";
							}
							
							return target[name];
						}
					});

const beyondid = new Proxy({"src":"/_astro/beyondid.BKEDZM3b.png","width":150,"height":150,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/logos/beyondid.png";
							}
							
							return target[name];
						}
					});

const logo = new Proxy({"src":"/_astro/parallel-decorations.f5FywAdG.svg","width":229,"height":40,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/parallel-decorations.svg";
							}
							
							return target[name];
						}
					});

const $$WorkExperience = createComponent(($$result, $$props, $$slots) => {
  const companies = [
    {
      name: "Intel",
      dates: "Dec 2016 - Apr 2017",
      description: "Implemented Intel's new Product Catalog. Fun little gig, met a bunch of cool people!",
      logo: intel
    },
    {
      name: "AT&T",
      dates: "Apr 2017 - Sep 2018",
      description: "Worked on the MyServices team, mostly fixing issues with myServices on the web and in the mobile app. Fun times!",
      logo: att
    },
    {
      name: "Transmark Logistics",
      dates: "Dec 2018 - Apr 2019",
      description: "Built a new internal real-time shipment and resources tracking and processing system. It was a blast!",
      logo
    },
    {
      name: "Microsoft",
      dates: "Apr 2019 - Oct 2019",
      description: "Built an internal search tool (backend and interface) for the Customer Experience team. Learned a ton about Microsoft stack, and also a bit of C#. Loved it!",
      logo: microsoft
    },
    {
      name: "Auth0",
      dates: "Dec 2019 - Apr 2024",
      description: "Built a bunch of internal tools and a few customer-facing ones. Also, I got to work on the Auth0 Dashboard, which was a blast! I learned a ton about security and identity management as well. Enjoyed it a lot!",
      logo: auth0
    },
    {
      name: "BeyondID",
      dates: "Apr 2024 - Present",
      description: "Helping businesses secure their digital assets and protect their employees. Been super fun so far!",
      logo: beyondid
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-x-clip bg-white py-16 dark:bg-slate-900 sm:py-24 lg:py-32"> ${renderComponent($$result, "Container", $$Container, { "class": "relative" }, { "default": ($$result2) => renderTemplate` <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"> <div> <h2 class="font-display text-4xl font-semibold text-slate-900 dark:text-slate-100 sm:text-5xl">
My career
<span class="relative whitespace-nowrap"> <svg xmlns="http://www.w3.org/2000/svg" width="167" height="24" viewBox="0 0 167 24" fill="currentColor" class="absolute left-0 top-2/3 h-[0.6em] w-full fill-emerald-200/75 dark:fill-emerald-800/75"> <g clip-path="url(#clip0_257_225)"> <path d="M166.409 20.2699C162.515 14.571 156.265 13.9119 151.392 12.4829C145.948 10.8807 140.484 9.3494 135.006 8.13918C125.391 6.01418 115.729 4.4602 106.064 3.28974C84.7177 0.704517 63.2477 0.036903 41.9031 2.5852C28.3517 4.20452 14.7934 6.44599 1.5656 11.8324C-0.0104672 12.4744 0.139137 16.0057 1.8074 16.0454C14.8056 16.3522 27.8194 13.7897 40.8089 12.9346C53.7392 12.088 66.6991 11.642 79.6433 11.9517C95.8562 12.3409 112.066 14 128.2 16.9261C134.407 18.0511 140.617 19.2017 146.812 20.5369C153.167 21.9062 159.481 24 165.873 22.6278C166.506 22.4943 166.988 21.1164 166.409 20.2699Z"></path> </g> <defs> <clipPath id="clip0_257_225"> <rect width="167" height="24" fill="white"></rect> </clipPath> </defs> </svg> <span class="relative text-emerald-700">journey</span> </span>
so far
</h2> <p class="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
I've been around Web Development for over a decade now. I've worked
          with a bunch of different technologies and stacks, and I've had the
          pleasure of working with some amazing people. Here's a quick overview
          of my career so far.
</p> ${renderComponent($$result2, "Button", $$Button, { "href": "#", "class": "mt-10", "variant": "secondary" }, { "default": ($$result3) => renderTemplate`
Download Resume
${renderComponent($$result3, "Icon", $$Icon, { "name": "download-2", "class": "h-[18px] w-[18px] text-slate-600 dark:text-slate-400" })} ` })} </div> <ol class="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 [counter-reset:section] sm:grid-cols-2 lg:gap-y-16"> ${companies.map((company) => renderTemplate`<li class="relative [counter-increment:section] before:absolute before:-top-7 before:right-0 before:font-mono before:text-9xl before:font-black before:leading-none before:text-slate-50 before:content-[counter(section,decimal-leading-zero)] dark:before:text-slate-950/20"> <div> <div class="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-50 via-slate-50 to-emerald-50 ring-1 ring-slate-900/5 dark:bg-gradient-to-br dark:from-emerald-950 dark:via-slate-950 dark:to-emerald-950 dark:ring-slate-100/5"> ${renderComponent($$result2, "Image", $$Image, { "src": company.logo, "alt": company.name, "width": 20, "height": 20, "loading": "eager" })} </div> <p class="text-sm font-medium text-emerald-700 dark:text-emerald-300"> ${company.dates} </p> <p class="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-slate-100"> ${company.name} </p> </div> <p class="mt-3 text-base leading-7 text-slate-700 dark:text-slate-300"> ${company.description} </p> </li>`)} <li class="relative mt-3 flex h-fit items-center font-writing text-2xl tracking-wide text-slate-600 dark:text-slate-400 sm:left-14 sm:top-6 sm:mt-0 sm:block sm:text-[27px] md:left-20"></li> <li class="relative mt-3 flex h-fit items-center font-writing text-2xl tracking-wide text-slate-600 dark:text-slate-400 sm:left-14 sm:top-6 sm:mt-0 sm:block sm:text-[27px] md:left-20"> <svg xmlns="http://www.w3.org/2000/svg" width="124" height="121" viewBox="0 0 124 121" fill="none" class="relative -left-8 h-auto w-24 translate-y-2 rotate-90 -scale-y-100 transform text-slate-600 dark:text-slate-300 sm:w-32 sm:scale-100"> <g clip-path="url(#clip0_257_335)"> <path d="M101.672 26.3321C96.8237 38.134 92.186 44.0573 79.0339 44.4141C70.6979 44.6403 60.8529 42.694 53.4527 38.7688C49.1632 36.4936 56.8633 35.9887 58.3238 36.046C75.2213 36.7084 91.469 47.7751 94.8076 64.9225C96.9834 76.0979 88.4245 81.9067 78.6041 84.1752C63.6278 87.6349 47.752 81.2525 36.0397 72.0991C32.1436 69.0541 19.8172 60.5149 22.0934 54.2698C23.9793 49.0954 31.7507 55.0061 34.018 56.9118C37.2506 59.6288 44.0244 65.7437 43.9149 70.3449C43.7576 76.9438 32.7995 78.0771 28.2217 77.7848C19.5283 77.2298 10.3327 73.6012 2.05876 71.0225C1.4496 70.8325 5.37871 69.9759 6.06477 69.8198C8.02976 69.3721 9.72632 68.1441 11.7325 67.8657C13.2208 67.6592 21.2769 68.287 16.2554 69.947C14.4855 70.532 2.71379 69.3189 2.58655 69.7453C2.06535 71.4868 10.2182 79.8642 11.7371 81.4008C15.3955 85.1003 14.5874 73.4626 14.2296 71.9325" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> </g> <defs> <clipPath id="clip0_257_335"> <rect width="106" height="67" fill="white" transform="matrix(-0.748497 0.663138 0.663138 0.748497 79.3407 0)"></rect> </clipPath> </defs> </svg> <span class="inline-block w-52 max-w-[240px] transform sm:w-auto sm:-rotate-12">
I'm here at the moment
</span> </li> </ol> </div> ` })} </section>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/WorkExperience.astro", void 0);

const $$SquareWithOverlayedLines = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="80" height="79" viewBox="0 0 80 79" fill="none" class="absolute left-0 top-8 scale-75 sm:-left-4 sm:top-11 sm:scale-100"> <g clip-path="url(#clip0_253_8)"> <path d="M80 18.6138H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 23.9209H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 29.3069H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 34.6929H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 40.0792H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 45.3859H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 50.7723H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 56.1583H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 61.5447H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 66.8513H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 72.2377H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M80 77.6237H20.9109" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> <path d="M61.9059 61.507V0.6752H1.07428V61.507H61.9059Z" stroke="#BAE6FD" stroke-miterlimit="10"></path> <path d="M61.9059 61.507V0.6752H1.07428V61.507H61.9059Z" stroke="#0369A1" stroke-opacity="0.2" stroke-miterlimit="10"></path> </g> <defs> <clipPath id="clip0_253_8"> <rect width="80" height="78.4158" fill="white" transform="matrix(-1 0 0 -1 80 78.4158)"></rect> </clipPath> </defs> </svg>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/illustrations/SquareWithOverlayedLines.astro", void 0);

const $$DashPattern = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="190" height="180" viewBox="0 0 190 180" fill="none" class="absolute -bottom-20 -right-20 h-44 w-44"> <g clip-path="url(#clip0_253_45)"> <path d="M150.567 128.664L157.691 121.466" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M126.488 153.583L139.547 140.243" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M127.834 131.469L176.327 81.1082" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M103.079 157.091L112.911 146.74" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M142.062 95.6753L184.792 51.4535" stroke="#BAE6FD" stroke-opacity="0.95" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M142.062 95.6753L184.792 51.4535" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M77.6277 162.359L123.068 115.157" stroke="#BAE6FD" stroke-opacity="0.95" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M77.6277 162.359L123.068 115.157" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M92.7031 125.688L167.989 47.7732" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M61.5034 157.976L77.4424 141.48" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M134.23 61.6403L152.377 43.036" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22.8296 177.105L115.242 81.4667" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M76.2266 100.774L166.604 7.24091" stroke="#BAE6FD" stroke-opacity="0.95" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M76.2266 100.774L166.604 7.24091" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M36.3792 142.012L57.4051 120.252" stroke="#BAE6FD" stroke-opacity="0.95" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M36.3792 142.012L57.4051 120.252" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M73.1582 82.8795L131.488 22.5132" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.6411 144.474L56.7103 99.9007" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M100.614 33.5686L131.136 1.98228" stroke="#BAE6FD" stroke-opacity="0.95" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M100.614 33.5686L131.136 1.98228" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19.3926 117.626L78.3978 56.3851" stroke="#BAE6FD" stroke-opacity="0.95" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19.3926 117.626L78.3978 56.3851" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M50.4067 64.4586L91.6108 21.8161" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3.60767 112.891L34.2987 81.1289" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M66.3306 26.91L82.4421 10.4116" stroke="#BAE6FD" stroke-opacity="0.95" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M66.3306 26.91L82.4421 10.4116" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.4917 87.8014L48.19 45.8579" stroke="#BAE6FD" stroke-opacity="0.95" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.4917 87.8014L48.19 45.8579" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M37.4919 35.8599L47.3266 25.6818" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.1963 53.7595L26.9788 46.7402" stroke="#0369A1" stroke-opacity="0.2" stroke-width="1.1533" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_253_45"> <rect width="176" height="186.353" fill="white" transform="translate(3.01904 179.171) rotate(-90.9829)"></rect> </clipPath> </defs> </svg>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/illustrations/DashPattern.astro", void 0);

const workstationImage1 = new Proxy({"src":"/_astro/workstation-01.D-WuZ_KK.jpg","width":4032,"height":2268,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/workstation-01.jpg";
							}
							
							return target[name];
						}
					});

const workstationImage2 = new Proxy({"src":"/_astro/workstation-02.BRpTjPVm.jpg","width":2268,"height":4032,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/workstation-02.jpg";
							}
							
							return target[name];
						}
					});

const $$Workstation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="overflow-hidden bg-slate-50 py-16 dark:bg-slate-950 sm:py-24 lg:py-32"> ${renderComponent($$result, "Container", $$Container, {}, { "default": ($$result2) => renderTemplate` <div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center"> <div> <div class="mx-auto max-w-2xl lg:mx-0"> <h2 class="font-display text-4xl font-semibold text-slate-900 dark:text-slate-100 sm:text-5xl">
A tour of my gadgets and workstation
</h2> <p class="mt-6 max-w-lg text-lg leading-8 text-slate-700 dark:text-slate-300">
I run Linux on my laptop, desktop, and home server. I use a
            mechanical keyboard, and a 32-inch 4K monitor. I also have an iPad,
            iPhone, a Garmin watch, and a Steam Deck. Sometimes I post about my
            experiences with these gadgets and my setup on my Mastodon account.
</p> ${renderComponent($$result2, "Button", $$Button, { "href": "https://lounge.town/@rosnovsky", "class": "mt-10 gap-x-3.5 bg-slate-200/75 dark:bg-slate-800/75 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-700 dark:hover:ring-slate-400", "variant": "secondary" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "name": "mastodon", "class": "h-4 w-4 text-emerald-500" })}
Follow me on Mastodon
` })} </div> </div> <div class="relative mx-auto w-full max-w-xl pb-24 lg:mx-0 lg:max-w-none"> ${renderComponent($$result2, "SquareWithOverlayedLines", $$SquareWithOverlayedLines, {})} <div class="relative ml-auto w-4/5"> ${renderComponent($$result2, "DashPattern", $$DashPattern, {})} <div class="aspect-h-5 aspect-w-6"> ${renderComponent($$result2, "Image", $$Image, { "src": workstationImage1, "alt": "Workstation setup", "class": "h-full w-full rounded-2xl object-cover object-center" })} </div> </div> <div class="absolute bottom-0 left-0 w-1/2"> <div class="aspect-h-1 aspect-w-1"> ${renderComponent($$result2, "Image", $$Image, { "src": workstationImage2, "alt": "Keyboard and mouse", "class": "h-full w-full rounded-2xl object-cover object-center" })} </div> </div> </div> </div> ` })} </section>`;
}, "/home/rosnovsky/code/rosnovsky.us/src/components/Workstation.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `About | ${SITE.title}`, "description": "Software Engineer, recovering imposter. I read more than I hike.", "data-astro-transition-scope": renderTransition($$result, "3n5aekqc", "", "about") }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AboutHero", $$AboutHero, {})} ${renderComponent($$result2, "WorkExperience", $$WorkExperience, {})} ${renderComponent($$result2, "Workstation", $$Workstation, {})}   ` })}`;
}, "/home/rosnovsky/code/rosnovsky.us/src/pages/about.astro", "self");

const $$file = "/home/rosnovsky/code/rosnovsky.us/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
