import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import md5 from 'md5'
import { userProfile } from './userProfile'

const isCommentUnique = async (postId, content, user) => {
  const commentHash = md5(content);
  const userId = user.sub
  console.log("🚀 ~ file: postComment.ts ~ line 10 ~ isCommentUnique ~ userId", userId)
  const { data, error } = await supabase
  .from('comments')
  .select('*')
  .eq('post_id', postId)

  // check if the comment is unique (matching comment content hash, userId and postId)
  const commentsByUserId = data.filter(comment => comment.user_id === userId);

  console.log("🚀 ~ file: postComment.ts ~ line 17 ~ isCommentUnique ~ commentsByUserId", commentsByUserId)
  
  const isUnique = commentsByUserId.every(comment => comment.hash !== commentHash);

  console.log("🚀 ~ file: postComment.ts ~ line 21 ~ isCommentUnique ~ isUnique", isUnique)
  
  return isUnique
}


const postComment = async (postId, content, user) => {
  const userId = user.sub
  await userProfile(user)
  const { data, error } = await supabase
  .from('comments')
  .upsert(
    { user_id: userId, post_id: postId, comment: content, hash: md5(content)}, { onConflict: 'user_id', ignoreDuplicates: true } 
  )
  console.log("🚀 ~ file: postComment.ts ~ line 34 ~ postComment ~ data", data)
  return error ? error : data;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.
  const session = getSession(req, res);

  return await isCommentUnique(req.query.postId, req.query.content, session.user) ? res.status(200).send(await postComment(req.query.postId, req.query.content, session.user)) : res.status(400).send('Comment already exists');

})


