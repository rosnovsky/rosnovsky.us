import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, UserProfile } from '@auth0/nextjs-auth0';
import md5 from 'md5'
import { userProfile } from './userProfile'
import { validateQueryData } from './validate';
import { PostComment } from '../../../index'

const isCommentUnique = async (postId: string, content: string, userId) => {
  const commentHash = md5(content);
  const { data, error }: {data: PostComment[], error: any} = await supabase
  .from('comments')
  .select('*')
  .eq('post_id', postId)

  // check if the comment is unique (matching comment content hash, userId and postId)
  const commentsByUserId = data.filter(comment => comment.user_id === userId);
  
  const isUnique = commentsByUserId.every(comment => comment.hash !== commentHash);
  
  return isUnique
}

const postComment = async (postId: string, content: string, user: UserProfile) => {
  await userProfile(user)
  const { data, error }: {data: PostComment[], error: any} = await supabase
  .from('comments')
  .upsert(
    { user_id: user.sub, post_id: escape(postId), comment: content, hash: md5(escape(content))}, { ignoreDuplicates: true } 
  )
  return error ? error : data;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res);

  if(!session) res.status(401).end({"error": "You are not authenticated"});
  if(!session.user.email_verified) res.status(401).end({"error": "Please verify your email first."});

  return validateQueryData(req.body, 'postComment') ? 
    await isCommentUnique(req.body.postId, req.body.content, session.user) 
    ? res.status(200).send(await postComment(req.body.postId, req.body.content, session.user)) 
    : res.status(400).send({"error": 'Comment already exists'}) 
  : res.status(400).send({"error": 'Invalid post comment data?'});

})


