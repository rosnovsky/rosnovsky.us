import { UserProfile } from "@auth0/nextjs-auth0"

export type PictureDescription = {
  description: {
    tags: string[]
    captions:
    {
      text: string
      confidence: number
    }[]
  },
  requestId: string
  metadata: {
    height: number,
    width: number,
    format: string
  },
  modelVersion: string
}

type CommentAuthor = {
  user?: UserProfile,
  verified?: boolean,
  regular?: boolean,
  comments?: number
}

type CommentDate = {
  date: string,
  dateUTC: string,
  postedAt: Date
}

type CommentStatus = {
  approved: boolean,
  published: 'draft' | 'published',
  flagged?: 'spam' | 'offensive' | 'other',
}

type PostComment = {
  id: string,
  user_id: string
  published_at: string
  comment: string
  deleted: boolean
  flagged: boolean
  edited: boolean
  post_id: string
  hash: string
}

interface Status {
  data: {
    id: string
    type: string
    attributes: {
      url: string
      pronounceable_name: string
      monitor_type: string
      monitor_group_id?: string,
      last_checked_at: string
      status: "up" | "maintenance" | "validating" | "down" | "paused" | "pending"
      policy_id?: string
      required_keyword?: string
      verify_ssl: boolean
      check_frequency: number
      call: boolean
      sms: boolean
      email: boolean
      push: boolean
      team_wait: boolean
      http_method: "get" | "post"
      request_timeout: number
      recovery_period: number
      request_headers: string[]
      request_body: string
      follow_redirects: boolean
      remember_cookies: boolean
      paused_at?: string
      created_at: string
      updated_at: string
      ssl_expiration: string
      domain_expiration: string
      regions: string[]
      port: number
      confirmation_period: number
    },
    relationships: {
      policy: {
        data: string
      }
    }
  }
}

