import { supabase } from '@lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateQueryData } from '@lib/comments/validate';

export const getCommentsByUserId = async (userId: string) => {
  const { data: userComments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('user_id', userId);
  return error ? error : userComments;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (validateQueryData(req.query, 'getCommentsByUserId')) {
    res.status(200).send(await getCommentsByUserId(req.query.userId as string));
  }
  return res.status(400).send('Invalid get comments by user ID data');
}
