import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateQueryData } from './validate';

const getCommentsByUserId = async (userId) => {
  const { data: userComments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('user_id', userId)
  return error ? error : userComments;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return validateQueryData(req.query, 'getCommentsByUserId') ? res.status(200).send(await getCommentsByUserId(req.query.userId)) : res.status(400).send('Invalid get comments by user ID data');
}

