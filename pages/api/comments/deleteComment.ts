import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { validateQueryData } from '../../../lib/comments/validate';
import { deleteComment } from '@lib/comments/deleteComment';

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);

  if (!session) res.status(401).end({ error: 'You are not authenticated' });
  if (!session!.user.email_verified)
    res.status(401).end({ error: 'Please verify your email first.' });

  const { id, postId, content, postTitle } = JSON.parse(req.body);

  if (validateQueryData(JSON.parse(req.body), 'deleteComment')) {
    try {
      return res.status(200).send(
        await deleteComment({
          commentId: id,
          postId,
          user: session!.user,
          content,
          postTitle,
        })
      );
    } catch (error: any) {
      res
        .status(400)
        .send({ error: "Couldn't delete :(", message: error.message });
    }
  }
});
