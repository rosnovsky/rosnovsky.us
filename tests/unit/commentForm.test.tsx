/**
 * @jest-environment jsdom
 */

import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CommentForm } from '../../components/Utils/CommentForm';
import { UserProvider } from '@auth0/nextjs-auth0';
import Comments from '../../components/Cards/Comments';
import { PostComment } from '../..';
import userEvent from '@testing-library/user-event';

const comments: PostComment[] = [
  {
    id: '1',
    post_id: 'test',
    comment: 'Test comment',
    flagged: false,
    edited: false,
    deleted: false,
    published_at: '',
    user_id: '1',
    hash: '@@@',
  },
  {
    id: '2',
    post_id: 'test-2',
    comment: 'Test comment 2',
    flagged: false,
    edited: false,
    deleted: false,
    published_at: '',
    user_id: '1',
    hash: '@@@',
  },
];

describe('Comment Form', () => {
  it('renders Comment From without crashing', async () => {
    render(
      <UserProvider>
        <CommentForm postId="test" postTitle="Test Title" />
      </UserProvider>
    );

    expect(screen.getByText('Add a new comment')).toBeInTheDocument();
  });

  it('submitting comments work ', async () => {
    render(
      <UserProvider>
        <CommentForm postId="test" postTitle="Test Title" />
        <Comments postId="test" postTitle="Test" comments={comments} />
      </UserProvider>
    );
    screen.debug()

    const commentForm = screen.getByPlaceholderText('Type Your Comment');
    commentForm.setAttribute('value', 'jjjddddeek');
    const submitButton = screen.getByText('Post Comment');
    userEvent.tab()
    submitButton.click()

    await waitFor(() => screen.getByPlaceholderText('Type Your Comment'));
  });
});
