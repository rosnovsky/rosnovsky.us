import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import md5 from 'md5'
import { validateQueryData } from './validate';
import { userProfile } from './userProfile';

const isCommentUnique = async (commentId, content) => {
  const commentHash = md5(content);
  const { data: comment, error } = await supabase
  .from('comments')
  .select('*')
  .eq('id', commentId)

  console.log(comment[0].hash, commentHash, comment[0].hash !== commentHash)

  const isUnique = comment[0].hash !== commentHash;
  
  return isUnique
}

const updateComment= async(commentId, content, user) => {
  await userProfile(user)
const hash = md5(content);
  const { data: comment, error } = await supabase
.from('comments')
.update({ comment: content, edited: true, hash})
.match({ 'id': commentId, 'user_id': user.sub })
if(comment === null) return { error: 'You can only edit your own comments' }
return error ? error : comment;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  
  const session = getSession(req, res);
  if(!session) res.status(401).end({"error": "You are not authenticated"});
  
  return validateQueryData(req.query, 'updateComment') ? await isCommentUnique(req.query.id, req.query.content) ? res.status(200).send(await updateComment(req.query.id, req.query.content, session.user)) : res.status(400).send({"error": 'This exact comment, posted by you, already exists. You sneaky, you!'}) : res.status(400).send({"error": "Invalid comment update data"})
})


