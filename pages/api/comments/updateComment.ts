import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { validateQueryData } from '../../../lib/comments/validate';
import { isCommentUnique } from '@lib/comments/isCommentUnique';
import { updateComment } from '@lib/comments/updateComment';

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getSession(req, res);
  if (!session) res.status(401).end({ error: 'You are not authenticated' });
  const { id } = JSON.parse(req.body);

  if (validateQueryData(req.body, 'updateComment')) {
    if (await isCommentUnique(id, req.body.content)) {
      return res
        .status(200)
        .send(await updateComment(id, req.body.content, session!.user));
    }
    return res.status(400).send({
      error:
        'This exact comment, posted by you, already exists. You sneaky, you!',
    });
  }
  return res.status(400).send({ error: 'Invalid comment update data' });
});
