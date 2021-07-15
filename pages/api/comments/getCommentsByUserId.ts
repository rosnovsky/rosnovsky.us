import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

const getCommentsByUserId = async (userId) => {
  const { data: userComments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('user_id', userId)
  return error ? error : userComments;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.

  return res.status(200).send(await getCommentsByUserId(req.query.userId));
}

