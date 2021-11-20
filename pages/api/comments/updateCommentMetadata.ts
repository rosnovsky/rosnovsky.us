import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  withApiAuthRequired,
  getSession,
  UserProfile,
} from '@auth0/nextjs-auth0';
import { validateQueryData } from './validate';
import { userProfile } from './userProfile';

const updateCommentMetadata = async (
  commentId: string,
  deleted: string,
  edited: string,
  flagged: string,
  user: UserProfile
) => {
  await userProfile(user);
  const { data: comment, error } = await supabase
    .from('comments')
    .update({ flagged: flagged, deleted: deleted, edited: edited })
    .match({ id: commentId, user_id: user.sub });
  return error ? error : comment;
};

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  if (!session) res.status(401).end({ error: 'You are not authenticated' });

  try {
    if (validateQueryData(req.query, 'updateCommentMetadata')) {
      return res
        .status(200)
        .send(
          await updateCommentMetadata(
            req.query.id as string,
            req.query.deleted as string,
            req.query.edited as string,
            req.query.flagged as string,
            session.user
          )
        );
    }
    return res.status(400).send({ error: 'Invalid update comment metadata' });
  } catch (error) {
    return res.status(400).send({
      error: error.message || 'Invalid operation',
      hint: 'Valid operations: getComments(postID), getComment(commentID), getCommentsByUserId(userID), getCommentsByDate(date), postComment(userID, postID, comment), updateComment(commentID, comment), updateCommentMetadata(metadata)',
    });
  }
});
