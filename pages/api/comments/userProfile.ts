import { supabase } from '../../../lib/supabase';
import { UserProfile } from '@auth0/nextjs-auth0';

export const userProfile = async (user: UserProfile) => {
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

