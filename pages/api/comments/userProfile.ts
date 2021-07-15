import { supabase } from '../../../lib/supabase';
import { getSession, UserProfile, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export const userProfile = async (user: UserProfile) => {
  if(!user) {throw new Error('user profile not found');}
  const {given_name, nickname, sub, family_name, name, picture, email, email_verified} = user
  
  const { data, error } = await supabase
  .from('users')
  .upsert(
    { user_id: sub, given_name,
    family_name,
    nickname,
    name,
    picture,
    email,
    email_verified}, {onConflict: 'user_id', ignoreDuplicates: true}
  )
  
  return error ? error : data;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res);
  return res.status(200).send(session)
})
