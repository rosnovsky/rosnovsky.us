import { NextApiRequest, NextApiResponse } from 'next';
import {
  withApiAuthRequired,
  getSession,
  UserProfile,
} from '@auth0/nextjs-auth0';
import sanityClient from '@sanity/client';
// import userProfile  from './getUserProfile';
// import { notify } from '@lib/notifications/notify';

const client = sanityClient({
  projectId: 'n3o7a5dl',
  dataset: 'prod',
  apiVersion: '2021-10-21',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const postComment = async ({
  postId,
  commentContent,
  // postTitle,
  user,
}: {
  postId: string;
  commentContent: string;
  postTitle: string;
  user: UserProfile;
}) => {
  const comment = {
    _type: 'comment',
    authorName: user.nickname || user.name || user.email,
    authorAvatar: user.picture,
    authorEmail: user.email,
    authorId: user.sub,
    commentDate: new Date().toISOString(),
    commentBody: commentContent,
    flags: { isFlagged: false, isHidden: false, isEdited: false },
  };

  client.create(comment).then((res) => {
    client
      .patch(postId)
      .setIfMissing({ comments: [] })
      .append('comments', [res])
      .commit()
      .then((newComment) => {
        // notify({
        //   type: 'new-comment-notification',
        //   content,
        //   postId,
        //   postTitle,
        //   user,
        // });
        return newComment;
      })
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message);
      });
  });
};

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
      return res
        .status(200)
        .send(await postComment({ postId, postTitle, commentContent, user }));
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
