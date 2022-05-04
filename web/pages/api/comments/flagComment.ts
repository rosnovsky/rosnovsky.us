import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { validateQueryData } from '@lib/comments/validate';
import { flagComment } from '@lib/comments/flagComment';

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = getSession(req, res);
    if (!session) {
      throw new Error('Error: user not found');
    }
    const { id, postId, content, postTitle, operation } = JSON.parse(req.body);

    if (validateQueryData(req.body, 'flagComment')) {
      res.status(200).end(
        await flagComment({
          id,
          postId,
          user: session.user,
          content,
          postTitle,
          operation,
        })
      );
    } else {
      throw new Error('Error: invalid flag comment data');
    }
  } catch (error) {
    res.status(400).end({ error: 'Invalid comment update data' });
  }
});
