import { supabase } from '@lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateQueryData } from '@lib/comments/validate';
import validator from 'validator';

const getCommentsByDate = async (date: string) => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    // @ts-expect-error ts-migrate(2339) FIXME: Date may be null... Yet it can't, you Typescript. Remove this comment to see the full error message
    .eq('published_at', validator.toDate(date).toUTCString());
  return error ? error : comments;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return validateQueryData(req.query, 'getCommentsByDate')
    ? res.status(200).send(await getCommentsByDate(req.query.date as string))
    : res.status(400).send('Invalid get comments by date data');
}
