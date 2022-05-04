import { supabase } from '@lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateQueryData } from '@lib/comments/validate';
import validator from 'validator';

const getCommentsByDate = async (date: string) => {
  const validDate = validator.toDate(date);
  if (validDate === null) {
    return;
  }
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('published_at', validDate.toUTCString());
  return error ? error : comments;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return validateQueryData(req.query, 'getCommentsByDate')
    ? res.status(200).end(await getCommentsByDate(req.query.date as string))
    : res.status(400).end('Invalid get comments by date data');
}
