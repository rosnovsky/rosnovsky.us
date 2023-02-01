import { UserProfile } from '@auth0/nextjs-auth0';
import { client } from './comments';
import { notify } from '../notifications/notify';

type Comment = {
  postId: string;
  commentContent: string;
  postTitle: string;
  user: UserProfile;
};

export const postComment = async ({postId, commentContent, postTitle, user}: Comment) => {
  const comment = {
    _type: 'comment',
    authorName: user.name || user.nickname || user.email,
    authorAvatar: user.picture,
    authorEmail: user.email,
    authorId: user.sub,
    commentDate: new Date().toISOString(),
    commentBody: commentContent,
    flags: { isFlagged: false, isHidden: false, isEdited: false },
  };

  const newComment = await client.create(comment).then(async (res) => {
    return await client
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
};
