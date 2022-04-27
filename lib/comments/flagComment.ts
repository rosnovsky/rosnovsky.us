import { UserProfile } from '@auth0/nextjs-auth0';
import { notify } from '@lib/notifications/notify';
import { supabase } from '@lib/supabase';
import { PostComment } from 'index';

export const flagComment = async ({ id, operation, content, postId, postTitle, user }: { id: PostComment['id'], operation: 'flag' | 'unflag', content: string, postId: string, postTitle: string, user: UserProfile }) => {

  const { data, error } = await supabase
    .from('comments')
    .update({ edited: false, flagged: operation === 'flag' ? true : false })
    .match({ id: id });
  if (operation === 'flag') { await notify({ type: 'flagged_comment', content, postId, postTitle, user }) }

  return error ? error : data
}
