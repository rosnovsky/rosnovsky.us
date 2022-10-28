import { MdDeleteForever } from 'react-icons/md';
import { withDocument } from 'part:@sanity/form-builder';
import {
  useToast,
  Card,
  Text,
  Avatar,
  Button,
  Flex,
  Badge,
  Heading,
  Spinner,
} from '@sanity/ui';
import React from 'react';
import { PortableText } from '@portabletext/react';
import client from 'part:@sanity/base/client';

const sanityClient = client.withConfig({ apiVersion: '2021-10-21' });

const Comments = (props) => {
  const [comments, setComments] = React.useState([]);
  const [inProgress, setInProgress] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    if (!props?.value) {
      setComments([]);
      return;
    }
    setComments(props.value);
  }, [props]);

  if (comments.length < 1) return <div>No comments</div>;

  const deleteComment = async (id: string) => {
    setInProgress(true);
    const commentToRemove = [`comments[_id=="${id}"]`];
    sanityClient
      .patch(props.document._id)
      .unset(commentToRemove)
      .commit()
      .then((res) => {
        sanityClient.delete({
          query: '*[_type == "comment" && _id == $id]',
          params: { id },
        });
        setComments(res.comments);
        toast.push({
          status: 'success',
          title: `Comment deleted 🗑`,
        });
        setInProgress(false);
      })
      .catch((err) => {
        console.error('Delete failed: ', err.message);
        toast.push({
          status: 'error',
          title: `Could not delete comment 😭 ${err.message}`,
        });
        setInProgress(false);
      });
  };

  return comments.map((comment) => (
    <Card padding={4} radius={2} shadow={1} border marginBottom={2}>
      <Flex direction={'column'}>
        <>
          <Flex direction={'row'}>
            <Avatar
              alt={comment.authorName}
              color="green"
              src={comment.authorAvatar}
              size={1}
              style={{ marginRight: '1rem' }}
            />
            <Flex
              style={{ marginBottom: '1em' }}
              direction="column"
              justify={'flex-start'}
            >
              <Flex width={5} style={{ marginBottom: '0.5em' }}>
                <Heading as="h4" size={2}>
                  {comment.authorName.charAt(0).toUpperCase() +
                    comment.authorName.slice(1)}
                  &nbsp;
                </Heading>
                {comment.authorId === 'auth0|60f1f34374a38b006885a17d' && (
                  <Badge tone="positive">Me</Badge>
                )}
              </Flex>
              <Text size={1} style={{ lineHeight: '1.6' }}>
                <a
                  target="_blank"
                  href={`https://rosnovsky.us/blog/${props.document.slug.current}/#${comment._id}`}
                >
                  {new Date(comment.commentDate).toLocaleTimeString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </a>
              </Text>
            </Flex>
          </Flex>
        </>
      </Flex>

      <PortableText value={comment.commentBody} />
      <Button
        style={{ marginTop: '1em' }}
        fontSize={[1, 1, 2]}
        icon={!inProgress ? <MdDeleteForever /> : <Spinner muted />}
        disabled={inProgress}
        padding={[1, 1, 2]}
        text="Delete"
        tone={!inProgress ? 'critical' : 'caution'}
        width={3}
        onClick={() => deleteComment(comment._id)}
      />
    </Card>
  ));
};

export const InputComponent = withDocument(Comments);

export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      readOnly: () => true,
    },
    {
      name: 'authorId',
      title: 'Author ID',
      type: 'string',
      readOnly: () => true,
    },
    {
      name: 'authorEmail',
      title: 'Author Email',
      type: 'string',
      readOnly: () => true,
    },
    {
      name: 'authorAvatar',
      title: 'Author Avatar',
      type: 'url',
      readOnly: () => true,
    },
    {
      name: 'commentDate',
      title: 'Comment date',
      type: 'datetime',
      readOnly: () => true,
    },
    {
      name: 'commentBody',
      title: 'Comment Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'flags',
      title: 'Flags',
      type: 'flags',
    },
  ],
};
