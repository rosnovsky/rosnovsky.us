import { BiPencil } from 'react-icons/bi'
import { withDocument } from 'part:@sanity/form-builder'
import { Container, Box, Card, Text, Avatar } from '@sanity/ui'
import React from 'react';

function MyInput(props) {
  if (!props.value) return <div>No comments</div>
  console.log(props.value)
  return props.value?.map(comment =>
      <Card padding={4}>
        <Text size={2} style={{lineHeight: '2'}}>{comment.authorName}</Text>
        <Text size={1} style={{lineHeight: '1.6'}}>{new Date(comment.commentDate).toLocaleTimeString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</Text>
      <Text size={1} style={{ lineHeight: '2' }}>{comment.commentBody}</Text>
      <Text size={1} style={{ lineHeight: '1.6' }}><a target='_blank' href={`https://rosnovsky.us/blog/${props.document.slug.current}/#${comment._key}`}>comment</a></Text>
      </Card>
    )
}

export const InputComponent = withDocument(MyInput)

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
      type: 'text',
    },
    {
      name: 'flags',
      title: 'Flags',
      type: 'object',
      fields: [
        {
          name: 'isFlagged',
          title: 'Is flagged',
          type: 'boolean',
        },
        {
          name: 'isHidden',
          title: 'Is hidden',
          type: 'boolean',
        },
        {
          name: 'isEdited',
          title: 'Is edited',
          type: 'boolean',
          readOnly: () => true,
        }
      ]
    }
  ],
};
