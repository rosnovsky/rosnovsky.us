import { supabase } from '../../../lib/supabase';
import { getSession, UserProfile, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

/**
  Update or create user profile
  @api {post} /api/comments/userProfile Update or create user profile
  @param user user data returned from Auth0's `getSession()`
**/ 
export const userProfile = async (user: UserProfile) => {
  if(!user) {throw new Error('user profile not found');}
  const {given_name, nickname, sub, family_name, name, picture, email, email_verified} = user

  /**
   * Gets user profile from the database
  **/
  const userExists = await supabase
  .from('users')
  .select('*')
  .eq('user_id', user.sub)
  
  /**
   * Updates user profile in the database
  **/
  async function updateUser() {
    console.log("UPDATING USER: " + user.sub)
    const {given_name, nickname, sub, family_name, name, picture, email, email_verified } = user
    const { data, error} = await supabase
    .from('users')
    .update({given_name,
      family_name,
      nickname,
      name,
      picture,
      email,
      email_verified })
      .match({'user_id': sub})
    
    return error ? error : data;
  }
  /**
   * Creates user profile in the database
  **/
  async function createUser() {
    console.log("CREATING USER: " + user.email)
    const { data, error } = await supabase
    .from('users')
    .upsert(
      { user_id: sub, 
        given_name,
        family_name,
        nickname,
        name,
        picture,
        email,
        email_verified
      }, 
      {
        onConflict: 'user_id', 
        ignoreDuplicates: true
      }
    )
    
    return error ? error : data;
  }
  
  userExists ? await updateUser() : await createUser();
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res);

  if(session) {await userProfile(session.user); return res.status(200).send(session)}
  if(!session && !req.query.user_id) return res.status(400).send({error: "400", message: 'Neither current session nor user_id were found'})

  const {data, error} = await supabase
  .from('users')
  .select('*')
  .eq('user_id', req.query.user_id)
  .single()

  return res.status(200).send({"user": {name: data.name, given_name: data.given_name, family_name: data.family_name, email_verified: data.email_verified, picture: data.picture, nickname: data.nickname}});
}
