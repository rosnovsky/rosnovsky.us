import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

const userProfile = async (user) => {
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
    email_verified}, {onConflict: 'user_id'}
  )
  return error ? error : data;
}

const checkProfile = withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.
  const session = getSession(req, res);
  console.log(session)
  
  return res.status(200).send(await userProfile(session.user));
})

export default checkProfile;

