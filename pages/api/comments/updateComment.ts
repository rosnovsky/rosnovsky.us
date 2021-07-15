import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const updateComment= async(commentId, content, userId) => {
const { data: comment, error } = await supabase
.from('comments')
.update({ comment: content})
.match({ 'id': commentId, 'user_id': userId })
return error ? error : comment;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.
  const session = getSession(req, res);
  console.log(session)
  return res.status(200).send(await updateComment(req.query.id, req.query.content, session.user.sub));
})


