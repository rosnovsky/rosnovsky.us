import Comment from '@components/Comments/Comment';

const Comments = ({ postComments, resolvedUsers }) => {
  return (
    postComments &&
    postComments.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        user={resolvedUsers.find(
          (user) => user.data.user_id === comment.user_id
        )}
      />
    ))
  );
};

export default Comments;
