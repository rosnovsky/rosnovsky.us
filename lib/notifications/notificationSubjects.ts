import { NotifyOptions } from '.';

export const selectSubject = (type: NotifyOptions['type']) => {

  switch (type) {
    case 'new-comment-notification' || 'notify_subscriber':
      return "New comment on "
    case 'flagged_comment':
      return `You flagged a comment on `;
    case 'deleted_comment':
      return `Your comment has been deleted`;
    default:
      return `Rosnovsky Park™ notification`;
  }
}