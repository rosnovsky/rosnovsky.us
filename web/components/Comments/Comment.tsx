const Comment = ({ comment, user }) => {
  return (
    <div className="flex justify-start my-10 py-5 border-b border-r">
      <div className="w-28 h-28">
        <img
          src={user.data.picture as string}
          className="rounded-full"
          alt={user.data.nickname as string}
        />
      </div>
      <div className="text-left flex flex-col ml-5 mb-2 mt-2">
        <div className="mb-0 font-semibold">{user.data.nickname}</div>
        <div className="mb-2 text-xs text-gray-500 prose prose-lg">
          {new Date(comment.published_at).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        <div>{comment.comment}</div>
      </div>
    </div>
  );
};

export default Comment;
