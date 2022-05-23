import type { UserProfile } from '@auth0/nextjs-auth0';
import type { SanityDocument, Block } from '@sanity/types';
import { SanityDocument, SanityImageAssetDocument } from '@sanity/client';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AZURE_TEXT_ANALYTICS_SUBSCRIPTION_KEY: string;
      NEXT_PUBLIC_FATHOM_SITE_ID: string;
      MAILGUN_KEY: string;
      NOTIFY_ME_EMAIL: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_SUPABASE_SERVICE_KEY: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export type AppleMusicTrack = {
  data: {
    id: string;
    type: string;
    href: string;
    attributes: {
      previews: {
        url: string;
      };

      artwork: {
        width: number;
        height: number;
        url: string;
        bgColor: string;
        textColor1: string;
        textColor2: string;
        textColor3: string;
        textColor4: string;
      };
      artistName: string;
      url: string;
      isrc: string;
      releaseDate: string;
      discNumber: number;
      genreNames: string[];
      durationInMillis: number;
      name: string;
      hasLyrics: boolean;
      albumName: string;
      playParams: {
        id: string;
        kind: string;
        isLibrary: boolean;
        reporting: boolean;
      };
      trackNumber: number;
      composerName: string;
    };
    url: string;
  }[];
};

export interface BlogPost extends SanityDocument {
  slug: { current: string };
  title: string;
  summary: Block[];
  publishedAt: string;
  coverImage: SanityImageAssetDocument;
  body: Block[];
  summaryRaw: string;
  bodyRaw: string;
  estimatedReadingTime: number;
  location: {
    lat: number;
    lng: number;
  };
  categories: {
    title: string;
    description: Block[] | string;
    slug: { current: string };
  }[];
}

export interface Page extends SanityDocument {
  title: string;
  slug: { current: string };
  body: Block[];
  bodyRaw: string;
  coverImage: SanityImageAssetDocument;
  location: {
    lat: number;
    lng: number;
  };
}

export type PictureDescription = {
  description: {
    tags: string[];
    captions: {
      text: string;
      confidence: number;
    }[];
  };
  requestId: string;
  metadata: {
    height: number;
    width: number;
    format: string;
  };
  modelVersion: string;
};

export interface FrontMatter {
  cover: string;
  publishedAt: string;
  readingTime: { text: string };
  slug: string;
  summary: string;
  title: string;
  wordCount: number;
}

export type CommentAuthor = {
  user?: UserProfile;
  verified?: boolean;
  regular?: boolean;
  comments?: number;
};

export type CommentDate = {
  date: string;
  dateUTC: string;
  postedAt: Date;
};

export type CommentStatus = {
  approved: boolean;
  published: 'draft' | 'published';
  flagged?: 'spam' | 'offensive' | 'other';
};

export type PostComment = {
  id: string;
  user_id: string;
  published_at: string;
  comment: string;
  deleted: boolean;
  flagged: boolean;
  edited: boolean;
  post_id: string;
  hash: string;
};

export interface Status {
  data: {
    id: string;
    type: string;
    attributes: {
      url: string;
      pronounceable_name: string;
      monitor_type: string;
      monitor_group_id?: string;
      last_checked_at: string;
      status:
        | 'up'
        | 'maintenance'
        | 'validating'
        | 'down'
        | 'paused'
        | 'pending';
      policy_id?: string;
      required_keyword?: string;
      verify_ssl: boolean;
      check_frequency: number;
      call: boolean;
      sms: boolean;
      email: boolean;
      push: boolean;
      team_wait: boolean;
      http_method: 'get' | 'post';
      request_timeout: number;
      recovery_period: number;
      request_headers: string[];
      request_body: string;
      follow_redirects: boolean;
      remember_cookies: boolean;
      paused_at?: string;
      created_at: string;
      updated_at: string;
      ssl_expiration: string;
      domain_expiration: string;
      regions: string[];
      port: number;
      confirmation_period: number;
    };
    relationships: {
      policy: {
        data: string;
      };
    };
  };
}

interface SiteMetadata {
  title?: string;
  url: string;
  publisher?: string;
  image?: string;
  logo?: string;
  description?: string;
}
