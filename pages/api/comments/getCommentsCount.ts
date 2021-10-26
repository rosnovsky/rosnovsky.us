import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, UserProfile } from '@auth0/nextjs-auth0';
import userProfile from './userProfile';


const getCommentsCount = async () => {
  const { data: comments, error } = await supabase
  .from('comments')
  .select('*')
  return error ? error : comments.length
}

export default async function (req: NextApiRequest, res: NextApiResponse) {

  return res.status(200).send({totalComments: await getCommentsCount()})} 
