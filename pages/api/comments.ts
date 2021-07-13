import { supabase } from '../../lib/supabase';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

const getComments = async (postId) => {
  const { data: comments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('post_id', postId)
  return error ? error : comments;
}

const getComment = async (commentId) => {
  const { data: comment, error } = await supabase
  .from('comments')
  .select('*')
  .eq('id', commentId)
  return error ? error : comment;
}

const getCommentsByUserId = async (userId) => {
  const { data: userComments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('user_id', userId)
  return error ? error : userComments;
}

const getCommentsByDate = async(date) => {
  const { data: comments, error } = await supabase
  .from('comments')
  .select('*')
  .eq('published_at', date)
  return error ? error : comments;
}

const updateCommentMetadata = async(commentId, deleted, edited, flagged) => {
  const { data: comment, error } = await supabase
  .from('comments')
  .update({ flagged: flagged, deleted: deleted, edited: edited})
  .match({ 'id': commentId })
  return error ? error : comment;
}

const postComment = () => {}

const flagComment = () => {}

const deleteComment = () => {}

const comments = async (req: VercelRequest, res: VercelResponse) => {

  const operation = req.query.operation;

  if(operation === 'getComments') {
    res.status(200).send({comments: await getComments(req.query.postId)})
  }

  if(operation === 'getComment') {
    res.status(200).send({comment: await getComment(req.query.commentId)})
    return;
  }

  if(operation === 'getCommentsByUserId') {
    res.status(200).send({comments: await getCommentsByUserId(req.query.userId)})
    return;
  }

  if(operation === 'getCommentsByDate') {
    res.status(200).send({comments: await getCommentsByDate(req.query.date)})
    return;
  }

  if(operation === 'updateCommentMetadata') {
    res.status(200).send({comment: await updateCommentMetadata(req.query.commentId, req.query.deleted, req.query.edited, req.query.flagged)})
  return;
  }

    res.status(400).end({"error": "invalid operation"});
}

export default comments
