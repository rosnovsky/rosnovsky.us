import { NotifyOptions } from '.';
import { selectSubject } from './notificationSubjects';

import { mg, DOMAIN } from './mailgunClient';

export const notify = async ({ type, user, postId, postTitle, content }: NotifyOptions) => {
  const recipient = [user.email!, process.env.NOTIFY_ME_EMAIL!];

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
      content: content
    })
  };

  return await mg.messages.create(DOMAIN, data);
};
