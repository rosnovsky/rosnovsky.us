import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { validateQueryData } from './validate';

const updateCommentMetadata = async(commentId, deleted, edited, flagged, userId) => {
const { data: comment, error } = await supabase
.from('comments')
.update({ flagged: flagged, deleted: deleted, edited: edited})
.match({ 'id': commentId, 'user_id': userId })
return error ? error : comment;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res);
  if(!session) res.status(401).end({"error": "You are not authenticated"});
  
  try {
    return validateQueryData(req.query, 'updateCommentMetadata') ? res.status(200).send(await updateCommentMetadata(req.query.id, req.query.deleted, req.query.edited, req.query.flagged, session.user.sub)) : res.status(400).send({"error": "Invalid update comment metadata"})
  } catch (error) {
    return res.status(400).send({ error: error.message || 'Invalid operation', hint: 'Valid operations: getComments(postID), getComment(commentID), getCommentsByUserId(userID), getCommentsByDate(date), postComment(userID, postID, comment), updateComment(commentID, comment), updateCommentMetadata(metadata)' });
  }
})



