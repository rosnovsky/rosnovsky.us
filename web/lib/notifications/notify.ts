import { NotifyOptions } from '.';
import { selectSubject } from './notificationSubjects';
import BlocksToHTML from '@sanity/block-content-to-html';

import { mg, DOMAIN } from './mailgunClient';

export const notify = async ({
  type,
  user,
  postId,
  postTitle,
  content,
}: NotifyOptions) => {
  if (!user?.email || !type || !postId || !postTitle || !content)
    throw new Error('Not enough information to fire off a notification');
  const recipient = [user.email, process.env.NOTIFY_ME_EMAIL];

  // TODO: abstract away fetching post/comment data

  const data = {
    from: 'Rosnovsky Park™ <artem@rosnovsky.us>',
    to: recipient,
    subject: `${selectSubject(type)} ${postTitle}`,
    template: type,
    'h:X-Mailgun-Variables': JSON.stringify({
      user: user.name,
      url: `https://rosnovsky.us/blog/${postId}`,
      postTitle: postTitle,
      content: BlocksToHTML({ blocks: content }),
    }),
  };

  return await mg.messages.create(DOMAIN, data);
};
