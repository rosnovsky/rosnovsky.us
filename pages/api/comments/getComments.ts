import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

const getComments = async (postId) => {
  const { data: comments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('post_id', postId)
  return error ? error : comments
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.

  return res.status(200).send(await getComments(req.query.postId))
}
