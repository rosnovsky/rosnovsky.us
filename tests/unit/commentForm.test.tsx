/**
 * @jest-environment jsdom
 */

import React from 'react'

import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom'
import { CommentForm } from '../../components/Utils/CommentForm'
import { UserProvider } from '@auth0/nextjs-auth0';

describe('Comment Form', () => {
  it('renders Comment From without crashing', async () => {

    render(
      <UserProvider><CommentForm postId="test" postTitle="Test Title" /></UserProvider>
    )

    expect(screen.getByText('Add a new comment')).toBeInTheDocument();
  });
})
