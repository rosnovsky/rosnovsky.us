import { supabase } from '../../lib/supabase';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// GETTING COMMENTS //

// Get all comments for a given post
const getComments = async (postId) => {
  const { data: comments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('post_id', postId)
  return error ? error : comments
}

// Get a specific comment by its ID
const getComment = async (commentId) => {
  const { data: comment, error } = await supabase
  .from('comments')
  .select('*')
  .eq('id', commentId)
  return error ? error : comment;
}

// Get all comments posted by a specific user by their user ID
const getCommentsByUserId = async (userId) => {
  const { data: userComments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('user_id', userId)
  return error ? error : userComments;
}

// Get all comments by publication date
const getCommentsByDate = async(date) => {
  const { data: comments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('published_at', date)
  return error ? error : comments;
}

// UPDATING COMMENTS //
// TODO: PROTECT!!!
// Update specific comment metadata. Used to delete, flag, and mark comments as edited (?)
const updateCommentMetadata = async(commentId, deleted, edited, flagged) => {
  const { data: comment, error } = await supabase
  .from('comments')
  .update({ flagged: flagged, deleted: deleted, edited: edited})
  .match({ 'id': commentId })
  return error ? error : comment;
}

// Update comment content
const updateComment = async(commentId, content) => {
  const { data: comment, error } = await supabase
  .from('comments')
  .update({ comment: content, edited: true })
  .match({ 'id': commentId })
  return error ? error : comment;
}

// POSTING COMMENTS //
// TODO: PROTECT!!!

// Post a comment
const postComment = async (postId, content, userId) => {
  const { data, error } = await supabase
  .from('comments')
  .insert(
    { user_id: userId, post_id: postId, comment: content  }
  )
  return error ? error : data;
}


// Vercel serverless function
export default withApiAuthRequired(async function comments(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle errors, validation, etc.
  const operation = req.query.operation;
  const session = getSession(req, res);
  console.log(session)

  switch (operation) {
    case 'getComments':
      return res.status(200).send(await getComments(req.query.postId))

    case 'getComment':
      return res.status(200).send(await getComment(req.query.commentId));
    case 'getCommentsByUserId':
      return res.status(200).send(await getCommentsByUserId(req.query.userId));
    case 'getCommentsByDate':
      return res.status(200).send(await getCommentsByDate(req.query.date));
    case 'postComment':
      return res.status(200).send(await postComment(req.query.postId, req.query.content, req.query.userId));
    case 'updateComment':
      return res.status(200).send(await updateComment(req.query.commentId, req.query.content));
    case 'updateCommentMetadata':
      return res.status(200).send(await updateCommentMetadata(req.query.commentId, req.query.deleted, req.query.edited, req.query.flagged));
    default:
      return res.status(400).send({ error: 'Invalid operation', hint: 'Valid operations: getComments(postID), getComment(commentID), getCommentsByUserId(userID), getCommentsByDate(date), postComment(userID, postID, comment), updateComment(commentID, comment), updateCommentMetadata(metadata)' });
  }
})
