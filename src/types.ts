export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
};

export type SocialObjects = {
  name: SocialMedia;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type SocialIcons = {
  [social in SocialMedia]: string;
};

export type SocialMedia =
  | "Github"
  | "LinkedIn"
  | "Mail"
  | "GitLab"
  | "Steam"
  | "Mastodon";

// Mastodon post types
type Account = {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  bot: boolean;
  discoverable: boolean;
  group: boolean;
  created_at: string;
  note: string;
  url: string;
  uri: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  last_status_at: string;
  noindex: boolean;
  emojis: any[]; // Adjust if you have a specific type for emojis
  roles: any[]; // Specify the type if you have a structure for roles
  fields: any[]; // Specify the type if you have a structure for fields
};

type Tag = {
  name: string;
  url: string;
};

type Card = {
  url: string;
  title: string;
  description: string;
  language: string;
  type: string;
  author_name: string;
  author_url: string;
  provider_name: string;
  provider_url: string;
  html: string;
  width: number;
  height: number;
  image: string;
  image_description: string;
  embed_url: string;
  blurhash: string;
  published_at: string | null;
};

export type MastodonPost = {
  id: string;
  created_at: string;
  in_reply_to_id: string | null;
  in_reply_to_account_id: string | null;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  edited_at: string | null;
  content: string;
  reblog: any | null; // Specify the type if you have a structure for reblog
  application: {
    name: string;
    website: string;
  };
  account: Account;
  media_attachments: any[]; // Specify the type if you have a structure for media attachments
  mentions: any[]; // Specify the type if you have a structure for mentions
  tags: Tag[];
  emojis: any[]; // Adjust if you have a specific type for emojis
  card: Card | null;
  poll: any | null; // Specify the type if you have a structure for poll
};
