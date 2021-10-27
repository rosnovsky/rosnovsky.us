// TODO: extract into a separate utility function with methods for visitor notifications, deleted/flagged comments, etc.
import { UserProfile } from '@auth0/nextjs-auth0';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

export const notify = async (type: "new-comment-notification" | "notify_subscriber" | "flagged_comment" | "deleted_comment", content: string, postId: string, postTitle: string, user: UserProfile) => {

  const recipient = ['']
  let subject = ''

  // Setting up Mailgun
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY});
  const DOMAIN = "rosnovsky.us";

  // Selecting the correct subject and recipient based on the type of notification
  switch(type) {
    case 'new-comment-notification':
      recipient.push(process.env.NOTIFY_ME_EMAIL);
      subject = `New comment on ${postTitle}`;
      break;
    case 'notify_subscriber':
      recipient.push(user.email, process.env.NOTIFY_ME_EMAIL);
      subject = `New comment on ${postTitle}`;
      break;
    case 'flagged_comment':
      recipient.push(user.email, process.env.NOTIFY_ME_EMAIL);
      subject = `You flagged a comment on ${postTitle}`;
      break;
    case 'deleted_comment':
      recipient.push(user.email, process.env.NOTIFY_ME_EMAIL);
      subject = `Your comment on ${postTitle} has been deleted`;
      break;
    default:
      recipient.push(process.env.NOTIFY_ME_EMAIL);
      subject = `Rosnovsky Park™ notification`;
  }

// Composing data

  const data = {
    from: "Rosnovsky Park™ <artem@rosnovsky.us>",
    to: recipient,
    subject,
    template: type,
    'h:X-Mailgun-Variables': JSON.stringify({
      "user": user.name,
      "url": `https://rosnovsky.us/blog/${postId}`,
      "postTitle": postTitle,
      "content": content
    })
  }

  return await mg.messages.create(DOMAIN, data);

}
