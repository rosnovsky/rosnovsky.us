import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://rosnovsky.us/", // replace this with your deployed domain
  author: "Art Rosnovsky",
  desc: "I'm Art, software engineer living in the Pacific Norhtwest. I love coding, hiking, and reading.",
  title: "Rosnovsky Park",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 10,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/rosnovsky",
    linkTitle: ` ${SITE.author} on Github`,
    active: true,
  },
  {
    name: "Mastodon",
    href: "https://lounge.town/@rosnovsky",
    linkTitle: `${SITE.author} on Mastodon`,
    active: true,
  },
];
