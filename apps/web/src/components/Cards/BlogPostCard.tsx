import { Card } from '@/components/Card';
import { formatDate } from '@/lib/helpers';
import { BlogPost } from 'index';

const stopwatch = <svg role="img" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" aria-labelledby="stopwatchIconTitle" stroke="rgb(20 184 166)" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="rgb(20 184 166)"> <title id="stopwatchIconTitle">Stopwatch</title> <circle cx="12" cy="13" r="8" /> <path d="M12 9L12 13M18 7L20 5M15 2L9 2" /> </svg>


export const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card className="" as="article">
      <Card.Title href={`/blog/${post.slug.current}`}>
        {post.title}
      </Card.Title>
      <Card.Eyebrow className="" as="time" dateTime={post.publishedAt} decorate>
        {formatDate(post.publishedAt)}&nbsp; {stopwatch} &nbsp;{post.estimatedReadingTime} min read
      </Card.Eyebrow>
      <Card.Description>{post.summaryRaw}</Card.Description>
      <Card.Cta>Read post</Card.Cta>
    </Card>
  );
};
