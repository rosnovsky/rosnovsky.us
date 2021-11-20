/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Comments from '../../components/Cards/Comments';
import { PostComment } from '../..';
import { UserProvider } from '@auth0/nextjs-auth0';

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
    hash: '@@@'
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
    hash: '@@@'
  }
];

describe('Comments', () => {
  it('renders blog comments card without crashing', async () => {
    render(
      <UserProvider>
        <Comments postId="test" postTitle="Test Title" comments={comments} />
      </UserProvider>
    );
    screen.debug();

    expect(screen.getByText('Test comment 2')).toBeInTheDocument();
  });
});
