import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import md5 from 'md5'
import { userProfile } from './userProfile'
import { validateQueryData } from './validate';

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


const postComment = async (postId, content, user) => {
  const userId = user.sub
  await userProfile(user)
  const { data, error } = await supabase
  .from('comments')
  .upsert(
    { user_id: userId, post_id: postId, comment: content, hash: md5(content)}, { ignoreDuplicates: true } 
  )
  return error ? error : data;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res);
  if(!session) res.status(401).end({"error": "You are not authenticated"});
  if(!session.user.email_verified) res.status(401).end({"error": "Please verify your email first."});

  return validateQueryData(req.query, 'postComment') ? 
  await isCommentUnique(req.query.postId, req.query.content, session.user) ? res.status(200).send(await postComment(req.query.postId, req.query.content, session.user)) : res.status(400).send({"error": 'Comment already exists'}) : res.status(400).send({"error": 'Invalid post comment data'});

})


