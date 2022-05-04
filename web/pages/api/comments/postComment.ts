import { supabase } from '@lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  withApiAuthRequired,
  getSession,
  UserProfile,
} from '@auth0/nextjs-auth0';
import md5 from 'md5';
import { userProfile } from './userProfile';
import { notify } from '@lib/notifications/notify';
import { validateQueryData } from '@lib/comments/validate';

const isCommentUnique = async (postId: string, content: string, user) => {
  const commentHash = md5(content);
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId);

  if (error) {
    return error;
  } else if (data) {
    // check if the comment is unique (matching comment content hash, userId and postId)
    const commentsByUserId = data.filter(
      (comment) => comment.user_id === user.sub
    );

    const isUnique = commentsByUserId.every(
      (comment) => comment.hash !== commentHash
    );
    return isUnique;
  }
};

const published_at = new Date().toISOString();

const postComment = async (
  postId: string,
  postTitle: string,
  content: string,
  user: UserProfile
) => {
  await userProfile(user);
  const { data, error } = await supabase.from('comments').upsert(
    {
      published_at,
      user_id: user.sub,
      post_id: escape(postId),
      comment: content,
      hash: md5(escape(content)),
    },
    { ignoreDuplicates: true }
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // FIXME: I honestly can't recall why this is here.
  // const response = await supabase.from('users').upsert(
  //   {
  //     user_id: user.sub,
  //     name: user.name,
  //     email: user.email,
  //     email_verified: user.email_verified,
  //     picture: user.picture,
  //     nickname: user.nickname,
  //   },
  //   { ignoreDuplicates: true }
  // );
  await notify({
    type: 'new-comment-notification',
    content,
    postId,
    postTitle,
    user,
  });
  return error ? error : data;
};

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = getSession(req, res);
    if (!session) {
      throw new Error('Error: user not found');
    }

    if (session && !session.user.email_verified)
      res.status(401).end({ error: 'Please verify your email first.' });

    const { postId, content, postTitle } = JSON.parse(req.body);

    if (validateQueryData(JSON.parse(req.body), 'postComment')) {
      try {
        const isUnique = await isCommentUnique(postId, content, session.user);
        if (!isUnique)
          return res.status(400).send({ error: 'Comment already exists' });
        return res
          .status(200)
          .send(await postComment(postId, postTitle, content, session.user));
      } catch (e: any) {
        res
          .status(400)
          .send({ error: 'Invalid post comment data?', message: e.message });
      }
    }
  } catch (error) {
    res.status(400).end({ error: 'Invalid post comment data' });
  }
});
