import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  withApiAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0';
import {SanityClient} from '@/lib/Sanity'
import { notify } from '@/lib/notifications/notify';
import { NextApiRequest, NextApiResponse } from 'next/types';

export const comments = router({
  post: publicProcedure
    .input(z.object({
      postId: z.string(),
      commentContent: z.string(),
      postTitle: z.string(),
      user: z.object({
      name: z.string(),
      picture: z.string(),
      email: z.string(),
      sub: z.string(),
      }),
    }).required())
    .mutation(async ({ input, ctx }) => {
      console.log(ctx)
        const postedComment = withApiAuthRequired(async function (
          req: NextApiRequest,
          res: NextApiResponse
        ) {
          console.log("here")
          const session = getSession(req, res);
          if (!session) {
            throw new Error('Error: user not found');
          }
          if (session && !session.user.email_verified)
            throw new Error('Error: email not verified');
          console.log(session.user)
          const { postId, commentContent, postTitle, user } = input;
          const comment = {
            _type: 'comment',
            authorName: user.name || user.email,
            authorAvatar: user.picture,
            authorEmail: user.email,
            authorId: user.sub,
            commentDate: new Date().toISOString(),
            commentBody: commentContent,
            flags: { isFlagged: false, isHidden: false, isEdited: false },
          };
          const newComment = await SanityClient.create(comment).then(async (res) => {
            return await SanityClient

              .patch(postId)
              .setIfMissing({ comments: [] })
              .append('comments', [res])
              .commit()
              .then((newComment) => {
                notify({
                  type: 'new-comment-notification',
                  content: comment.commentBody,
                  postId,
                  postTitle,
                  user,
                });
                console.log('new comment posted');
                return newComment;
              })
              
              .catch((err) => {
                console.error('Oh no, the update failed: ', err.message);
                return err;
              });
          });
          return newComment;
        });
    })
  
});
