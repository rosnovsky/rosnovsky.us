import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

const getComment = async (commentId) => {
  const { data: comment, error } = await supabase
  .from('comments')
  .select('*')
  .eq('id', commentId)
  return error ? error : comment;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.

  return res.status(200).send(await getComment(req.query.commentId))
}

