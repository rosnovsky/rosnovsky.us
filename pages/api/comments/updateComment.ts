import { supabase } from '../../../lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, UserProfile } from '@auth0/nextjs-auth0';
import md5 from 'md5'
import { validateQueryData } from './validate';
import { userProfile } from './userProfile';
import { PostComment } from '../../..';
import escape from 'validator/lib/escape';

/**
 * Checks whether an updated comment is unique. Compares comment hash with those stored in the database
 * @param commentId the id of the comment being updated
 * @param content updated comment content
 **/
const isCommentUnique = async (commentId: PostComment['id'], content: PostComment['comment']) => {
  const commentHash = md5(escape(content));
  const { data: comment, error } = await supabase
    .from('comments')
    .select('*')
    .eq('id', commentId)

  const isUnique = comment[0].hash !== commentHash;

  return isUnique
}

/**
  Update comment content. Sets `edited` to true.
  commentId commentId in uuid format
  @param content comment content in text format
  @param user user data returned from Auth0's `getSession()`
**/
const updateComment = async (commentId: PostComment['id'], content: PostComment['comment'], user: UserProfile) => {
  // Creating or updating user profile. Since comments rely on a user and we don't want to sync user profiles explicitly, we'll just update the user profile here if it exists, or create it if it doesn't. In theory, by this point (user attempts to update comment) we should have a user profile.
  await userProfile(user)

  // We are using comment content hash to validate comment's uniqueness.
  const hash = md5(escape(content));

  const { data: comment, error } = await supabase
    .from('comments')
    .update({ comment: escape(content), edited: true, hash })
    .match({ 'id': commentId, 'user_id': user.sub })
  if (comment === null) return { error: 'You can only edit your own comments' }
  return error ? error : comment;
}

const updateFlags = async (id: PostComment['id'], user: UserProfile) => {
  const { data, error } = await supabase
      .from('flags')
      .insert({ comment_id: id, user_id: user.sub })
      return error ? error : data;
}

export default withApiAuthRequired(async function (req: NextApiRequest, res: NextApiResponse) {

  const session = getSession(req, res);
  if (!session) res.status(401).end({ "error": "You are not authenticated" });
  const { id, operation } = JSON.parse(req.body)

  if (operation === 'delete') {
    const { data, error } = await supabase
      .from('comments')
      .update({ edited: true, deleted: true })
      .match({ 'id': id, 'user_id': session.user.sub })
    return error ? res.status(400).send(data) : res.status(200).send(data);
  }

  if (operation === 'flag') {
    const { data, error } = await supabase
      .from('comments')
      .update({ edited: true, flagged: true})
      .match({ 'id': id })
    updateFlags(id, session.user)
      
    return error ? res.status(400).send(data) : res.status(200).send(data);
  }

  return validateQueryData(req.body, 'updateComment') ? await isCommentUnique(id, req.body.content) ? res.status(200).send(await updateComment(id, req.body.content, session.user)) : res.status(400).send({ "error": 'This exact comment, posted by you, already exists. You sneaky, you!' }) : res.status(400).send({ "error": "Invalid comment update data" })
})


