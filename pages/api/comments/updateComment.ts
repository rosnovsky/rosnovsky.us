import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import md5 from 'md5'

const isCommentUnique = async (postId, content, user) => {
  const commentHash = md5(content);
  const userId = user.sub
  const { data, error } = await supabase
  .from('comments')
  .select('*')
  .eq('post_id', postId)

  // check if the comment is unique (matching comment content hash, userId and postId)
  const commentsByUserId = data.filter(comment => comment.user_id === userId);
  
  const isUnique = commentsByUserId.every(comment => comment.hash !== commentHash);
  
  return isUnique
}

const updateComment= async(commentId, content, userId) => {
const { data: comment, error } = await supabase
.from('comments')
.update({ comment: content, edited: true})
.match({ 'id': commentId, 'user_id': userId })
return error ? error : comment;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.
  const session = getSession(req, res);
  
  return await isCommentUnique(req.query.id, req.query.content, session.user.sub) ? res.status(200).send(await updateComment(req.query.id, req.query.content, session.user.sub)) : res.status(400).send({"error": 'This exact comment, posted by you, already exists. You sneaky, you!'});
})


