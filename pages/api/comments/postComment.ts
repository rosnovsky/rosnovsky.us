import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const postComment = async (postId, content, userId) => {
  const { data, error } = await supabase
  .from('comments')
  .insert(
    { user_id: userId, post_id: postId, comment: content  }
  )
  return error ? error : data;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.
  const session = getSession(req, res);
  console.log(session)

  return res.status(200).send(await postComment(req.query.postId, req.query.content, session.user.sub));
})


