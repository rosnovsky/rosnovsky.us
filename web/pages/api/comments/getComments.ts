import { supabase } from '@lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateQueryData } from '@lib/comments/validate';

const getComments = async (postId: string) => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId);
  return error ? error : comments;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  validateQueryData(req.query, 'getComments')
    ? res.status(200).send(await getComments(req.query.id))
    : res.status(400).send('Invalid get comments data');
}
