import { UserProfile } from '@auth0/nextjs-auth0';
import { supabase } from '@lib/supabase';
import { PostComment } from 'index';
import md5 from 'md5';
import { userProfile } from '@api/comments/userProfile';

/**
  Update comment content. Sets `edited` to true.
  commentId commentId in uuid format
  @param content comment content in text format
  @param user user data returned from Auth0's `getSession()`
**/
export const updateComment = async (
  commentId: PostComment['id'],
  content: PostComment['comment'],
  user: UserProfile
) => {
  // Creating or updating user profile. Since comments rely on a user and we don't want to sync user profiles explicitly, we'll just update the user profile here if it exists, or create it if it doesn't. In theory, by this point (user attempts to update comment) we should have a user profile.
  await userProfile(user);

  // We are using comment content hash to validate comment's uniqueness.
  const hash = md5(escape(content));

  const { data: comment, error } = await supabase
    .from('comments')
    .update({ comment: escape(content), edited: true, hash })
    .match({ id: commentId, user_id: user.sub });
  if (comment === null) return { error: 'You can only edit your own comments' };

  return error ? error : comment;
};