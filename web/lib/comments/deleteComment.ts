import { UserProfile } from '@auth0/nextjs-auth0';
import { notify } from '@lib/notifications/notify';
import { supabase } from '@lib/supabase';

export const deleteComment = async ({
  commentId,
  postId,
  user,
  content,
  postTitle,
}: {
  commentId: string;
  user: UserProfile;
  postId: string;
  content: string;
  postTitle: string;
}) => {
  const { data, error } = await supabase
    .from('comments')
    .update({ edited: true, deleted: true })
    .match({ id: commentId, user_id: user.sub });
  await notify({ type: 'deleted_comment', postId, user, content, postTitle });

  return error ? error : data;
};
