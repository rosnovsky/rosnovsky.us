import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { validateQueryData } from '@lib/comments/validate';
import { flagComment } from '@lib/comments/flagComment';

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  if (!session)
    return res.status(401).end({ error: 'You are not authenticated' });
  const { id, postId, content, postTitle, operation } = JSON.parse(req.body);

  if (validateQueryData(req.body, 'flagComment')) {
    return res.status(200).send(
      await flagComment({
        id,
        postId,
        user: session.user,
        content,
        postTitle,
        operation,
      })
    );
  }

  return res.status(400).send({ error: 'Invalid comment update data' });
});
