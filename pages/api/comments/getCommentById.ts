import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateQueryData } from '../../../lib/comments/validate';

const getComment = async (commentId) => {
  const { data: comment, error } = await supabase
    .from('comments')
    .select('*')
    .eq('id', commentId);
  return error ? error : comment;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return validateQueryData(req.query, 'getCommentById')
    ? res.status(200).send(await getComment(req.query.commentId))
    : res.status(400).send('Invalid get comment by ID data');
}
