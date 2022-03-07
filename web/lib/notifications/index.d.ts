import type { UserProfile } from '@auth0/nextjs-auth0';

interface NotifyOptions {
  user: UserProfile;
  postId: string;
  content: string;
  type: 'new-comment-notification'
  | 'notify_subscriber'
  | 'flagged_comment'
  | 'deleted_comment'
  | 'new-post-notification';
  postTitle: string;
}
