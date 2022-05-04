import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { validateQueryData } from '@lib/comments/validate';
import { isCommentUnique } from '@lib/comments/isCommentUnique';
import { updateComment } from '@lib/comments/updateComment';

export default withApiAuthRequired(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = getSession(req, res);
    if (!session) {
      throw new Error('Error: user not found');
    }
    const { id } = JSON.parse(req.body);

    if (validateQueryData(req.body, 'updateComment')) {
      if (await isCommentUnique(id, req.body.content)) {
        res
          .status(200)
          .end(await updateComment(id, req.body.content, session.user));
      } else {
        res.status(400).end({
          error:
            'This exact comment, posted by you, already exists. You sneaky, you!',
        });
      }
    }
  } catch (error) {
    res.status(401).end({ error: 'You are not authenticated' });
  }
});
