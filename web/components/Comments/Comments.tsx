import Comment from '@components/Comments/Comment';

const Comments = ({ comments }) => {
  if (!comments) return null;
  if (comments?.length === 0) return <div className="mt-5">No Comments</div>;
  return comments.map((comment) => (
    <Comment key={comment._id} comment={comment} />
  ));
};

export default Comments;
