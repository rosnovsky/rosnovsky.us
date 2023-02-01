import { NextApiRequest, NextApiResponse } from 'next';
import {
  withApiAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0';
import sanityClient from '@sanity/client';
import { postComment } from './postComment';

export const client = sanityClient({
  projectId: 'n3o7a5dl',
  dataset: 'prod',
  apiVersion: '2021-10-21',
  token: process.env.SANITY_TOKEN,
  useCdn: process.env.NODE_ENV === 'production' ? true : false,
});

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = getSession(req, res);
    if (!session) {
      throw new Error('Error: user not found');
    }

    if (session && !session.user.email_verified)
      res.status(401).end({ error: 'Please verify your email first.' });

    const { postId, commentContent, postTitle } = JSON.parse(req.body);
    const user = session.user;

    try {
      const newComment = await postComment({
        postId,
        postTitle,
        commentContent,
        user,
      });
      res.status(200).send({
        updatedPostComments: newComment.comments,
      });
    } catch (e: any) {
      res
        .status(400)
        .send({ error: 'Invalid post comment data', message: e.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong', error });
  }
});
