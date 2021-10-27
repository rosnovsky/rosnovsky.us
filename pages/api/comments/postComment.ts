import { supabase } from '../../../lib/supabase';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, UserProfile } from '@auth0/nextjs-auth0';
import md5 from 'md5'
import { userProfile } from './userProfile'
import { validateQueryData } from './validate';
import { PostComment } from '../../../index'

// TODO: extract into a separate utility function with methods for visitor notifications, deleted/flagged comments, etc.
const notify = async (content: string, postId: string, postTitle: string, userName: string) => {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY});
  const DOMAIN = "rosnovsky.us";

  const data = {
    from: "Rosnovsky Park™ <artem@rosnovsky.us>",
    to: "artem@rosnovsky.us",
    subject: "New comment!",
    template: "new-comment-notification",
    'h:X-Mailgun-Variables': JSON.stringify({
      "user": userName,
      "url": `https://rosnovsky.us/blog/${postId}`,
      "postTitle": postTitle,
      "content": content
    })
  }

  return await mg.messages.create(DOMAIN, data);

}

const isCommentUnique = async (postId: string, content: string, user) => {
  const commentHash = md5(content);
  const { data, error }: { data: PostComment[], error: any } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)

  // check if the comment is unique (matching comment content hash, userId and postId)
  const commentsByUserId = data.filter(comment => comment.user_id === user.sub);

  const isUnique = commentsByUserId.every(comment => comment.hash !== commentHash);

  return isUnique
}

const published_at = new Date().toISOString();

const postComment = async (postId: string, postTitle: string, content: string, user: UserProfile) => {
  await userProfile(user)
  const { data, error }: { data: PostComment[], error: any } = await supabase
    .from('comments')
    .upsert(
      { published_at, user_id: user.sub, post_id: escape(postId), comment: content, hash: md5(escape(content)) }, { ignoreDuplicates: true }
    )
  const response = await supabase
    .from('users')
    .upsert(
      { user_id: user.sub, name: user.name, email: user.email, email_verified: user.email_verified, picture: user.picture, nickname: user.nickname }, { ignoreDuplicates: true }
    )
  console.log("Mailgun", await notify(content, postId, postTitle, user.name))
  return error ? error : data;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res);

  if (!session) res.status(401).end({ "error": "You are not authenticated" });
  if (!session.user.email_verified) res.status(401).end({ "error": "Please verify your email first." });

  const { postId, content, postTitle } = JSON.parse(req.body)

  return validateQueryData(JSON.parse(req.body), 'postComment') ?
    await isCommentUnique(postId, content, session.user)
      ? res.status(200).send(await postComment(postId, postTitle, content, session.user))
      : res.status(400).send({ "error": 'Comment already exists' })
    : res.status(400).send({ "error": 'Invalid post comment data?' });

})


