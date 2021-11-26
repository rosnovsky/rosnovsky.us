import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

const getCommentsCount = async () => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .eq('deleted', false);
  return error ? error : comments!.length;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send({ totalComments: await getCommentsCount() });
}
