import { PostComment } from 'index';
import md5 from 'md5';

/**
 * Checks whether an updated comment is unique. Compares comment hash with those stored in the database
 * @param commentId the id of the comment being updated
 * @param content updated comment content
 **/
export const isCommentUnique = async (
  commentId: PostComment['id'],
  content: PostComment['comment']
) => {
  const commentHash = md5(encodeURIComponent(content));
  // const { data: comment, error } = await supabase
  //   .from('comments')
  //   .select('*')
  //   .eq('id', commentId);

  // const isUnique = comment![0].hash !== commentHash;

  // return error ? error : isUnique;
};
