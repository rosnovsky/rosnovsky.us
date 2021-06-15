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
  verified: boolean,
  regular: boolean,
  comments: number
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
  author: CommentAuthor 
  postedAt: CommentDate
  content: string
  status: CommentStatus 
}
