import Comments from '@components/Comments/Comments';
import CommentEditor from '@components/Comments/Editor';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export const PostComments = ({ post, setCommentStatus, setStatusMessage }) => {
  const { user } = useUser();
  return (
    <div className="w-full text-center mx-auto">
      <h2 className="text-3xl font-bold mb-3">Comments</h2>
      <div className="max-w-3xl min-w-3xl mx-auto py-3">
        {user ? (
          <CommentEditor
            postId={post._id}
            postTitle={post.title}
            setCommentStatus={setCommentStatus}
            setStatusMessage={setStatusMessage}
          />
        ) : (
          <Link href={`/api/auth/login?returnTo=/blog/${post.slug.current}`}>
            Login to comment
          </Link>
        )}
        <Comments slug={post.slug.current} />
      </div>
    </div>
  );
};
