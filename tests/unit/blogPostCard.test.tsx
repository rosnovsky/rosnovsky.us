/**
 * @jest-environment jsdom
 */
import React from 'react'

import {
  render,
  screen
} from '@testing-library/react';
import '@testing-library/jest-dom'
import BlogPostCard from '../../components/Blog/BlogPost';

describe('Blog Post Card', () => {

  it('renders Blog Post card without crashing', async () => {
    const fixture = {
      title: 'test',
      summary: 'summary',
      slug: 'test',
      publishedAt: '2020-01-01',

    }
    render(
      <BlogPostCard {...fixture} />
    )

    expect(screen.getByText('summary')).toBeInTheDocument();
  });
})
