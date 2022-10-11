import { Card } from '@/components/Card';
import { formatDate } from '@/lib/formatDate';
import { BlogPost } from 'index';


export const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card className="" as="article">
      <Card.Title href={`/blog/${post.slug.current}`}>
        {post.title}
      </Card.Title>
      <Card.Eyebrow className="" as="time" dateTime={post.publishedAt} decorate>
        {formatDate(post.publishedAt)} ⏲️ {post.estimatedReadingTime} min read
      </Card.Eyebrow>
      <Card.Description>{post.summaryRaw}</Card.Description>
      <Card.Cta>Read post</Card.Cta>
    </Card>
  );
};
