new Proxy({"src":"/_astro/react.BghDNlos.svg","width":23,"height":20,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/logos/icons/react.svg";
							}
							
							return target[name];
						}
					});

new Proxy({"src":"/_astro/tailwindcss.BKegfLqO.png","width":33,"height":20,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/logos/icons/tailwindcss.png";
							}
							
							return target[name];
						}
					});

const typescript = new Proxy({"src":"/_astro/typescript.D8jqc83h.svg","width":512,"height":512,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/images/logos/icons/typescript.svg";
							}
							
							return target[name];
						}
					});

const SITE = {
  website: "https://rosnovsky.us",
  author: "Art Rosnovsky",
  description: "Blog by Art Rosnovsky, a software engineer, about technology, hiking, books, movies, and other things.",
  title: "Rosnovsky Park™",
  ogImage: "jane-og.png",
  postsPerPage: 9,
  projectsPerPage: 3
};
const SOCIALS = [
  {
    name: "mail",
    href: "mailto:job@rosnovsky.us",
    label: "Email me",
    ariaLabel: "Send email",
    showInHero: false
  },
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/rosnovsky/",
    label: "LinkedIn",
    ariaLabel: "Follow on LinkedIn",
    showInHero: true
  },
  {
    name: "github",
    href: "https://github.com/rosnovsky",
    label: "Github",
    ariaLabel: "Follow on Github",
    showInHero: true
  },
  {
    name: "mastodon",
    href: "https://lounge.town/@rosnovsky",
    label: "Mastodon",
    ariaLabel: "Follow on Mastodon",
    showInHero: true
  },
  {
    name: "bluesky",
    href: "https://bsky.app/profile/rosnovsky.us",
    label: "Bluesky",
    ariaLabel: "Follow on Bluesky",
    showInHero: true
  },
  {
    name: "rss",
    href: "/feed/feed.xml",
    label: "RSS",
    ariaLabel: "RSS Feed",
    showInHero: true
  }
];

export { SITE as S, SOCIALS as a, typescript as t };
