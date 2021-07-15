import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const updateCommentMetadata = async(commentId, deleted, edited, flagged, userId) => {
const { data: comment, error } = await supabase
.from('comments')
.update({ flagged: flagged, deleted: deleted, edited: edited})
.match({ 'id': commentId, 'user_id': userId })
return error ? error : comment;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.
  const session = getSession(req, res);
  console.log(session)
  try {
  return res.status(200).send(await updateCommentMetadata(req.query.id, req.query.deleted, req.query.edited, req.query.flagged, session.user.sub));
  } catch (error) {
    return res.status(400).send({ error: error.message || 'Invalid operation', hint: 'Valid operations: getComments(postID), getComment(commentID), getCommentsByUserId(userID), getCommentsByDate(date), postComment(userID, postID, comment), updateComment(commentID, comment), updateCommentMetadata(metadata)' });
  }
})



