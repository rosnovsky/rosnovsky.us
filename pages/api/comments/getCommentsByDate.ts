import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

const getCommentsByDate = async(date) => {
  const { data: comments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('published_at', date)
  return error ? error : comments;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.

  return res.status(200).send(await getCommentsByDate(req.query.date));
}

