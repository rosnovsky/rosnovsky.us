import Link from 'next/link';
import useSWR from 'swr';
import { PostComment } from '../..';
import Comment from './Comment';

export default function Comments({
  comments,
  postId,
  postTitle,
}: {
  postId: string;
  postTitle: string | null;
  comments: PostComment[];
}) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url =
    process.env.NODE_ENV === 'test'
      ? 'https://rosnovsky.us/api/comments/getComments?id=test'
      : `/api/comments/getComments?id=${postId}`;
  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const sortComments = (comments: PostComment[]) => {
    return comments.sort((a, b) => {
      return a.published_at > b.published_at ? -1 : 1;
    });
  };

  const sortedComments = data ? sortComments(data) : sortComments(comments);

  return (
    <div className="my-10 w-full">
      <div className="text-right dark:text-white">
        ℹ{' '}
        <Link href="/blog/dynamic-comments-for-a-static-website" passHref>
          <span className="text-xs text-black hover:underline cursor-pointer dark:text-white">
            How these comments work
          </span>
        </Link>
      </div>
      {sortedComments
        .filter((comment) => comment.deleted !== true)
        .map((comment) => (
          <Comment
            key={comment.id}
            postComment={comment}
            postId={postId}
            postTitle={postTitle}
          />
        ))}
    </div>
  );
}
