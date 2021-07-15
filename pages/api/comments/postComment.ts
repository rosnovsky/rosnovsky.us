import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import md5 from 'md5'

const isCommentUnique = async (postId, content, userId) => {
  const commentHash = md5(content);
  const { data, error } = await supabase
  .from('comments')
  .select('*')
  .eq('post_id', postId)

  // check if the comment is unique (matching comment content hash, userId and postId)
  const commentsByUserId = data.filter(comment => comment.user_id === userId);
  const isUnique = commentsByUserId.every(comment => comment.hash !== commentHash);
  return isUnique
}


const postComment = async (postId, content, userId) => {
  const { data, error } = await supabase
  .from('comments')
  .insert(
    { user_id: userId, post_id: postId, comment: content, hash: md5(content)}, 
  )
  return error ? error : data;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.
  const session = getSession(req, res);
  console.log(session)

  return isCommentUnique(req.query.postId, req.body.content, session.user.sub) ? res.status(200).send(await postComment(req.query.postId, req.query.content, session.user.sub)) : res.status(400).send('Comment already exists');

})


