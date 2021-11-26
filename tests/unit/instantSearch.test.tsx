/**
 * @jest-environment jsdom
 */
import React from 'react';

import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { InstantSearch } from '../../components/InstantSearch';

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  keyPhrases: string;
}

const posts: BlogPost[] = [
  {
    title: 'Test Blog Post',
    summary: 'summary',
    slug: 'test',
    publishedAt: '2020-01-01',
    keyPhrases: '1',
  },
  {
    title: 'test',
    summary: 'summary',
    slug: 'test',
    publishedAt: '2020-01-01',
    keyPhrases: '2',
  },
];

describe('Instant Search', () => {
  it('renders Instant Search without crashing', async () => {
    render(<InstantSearch posts={posts} />);
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
  });

  it('returns search results', async () => {
    render(<InstantSearch posts={posts} />);
    const inputField = screen.getByPlaceholderText(
      'Disabled in dev, may fix later'
    );
    fireEvent.change(inputField, { target: { value: 'Test' } });

    await waitFor(() => screen.getByText('Test Blog Post'));
  });
});
