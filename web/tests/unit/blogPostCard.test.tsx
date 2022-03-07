/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPostCard from '../../components/Blog/BlogPost';
import { BlogPost } from 'index';

describe('Blog Post Card', () => {
  it('renders Blog Post card without crashing', async () => {
    const fixture: BlogPost = {
      title: 'Test Blog Post',
      summary: 'summary',
      slug: 'test',
      publishedAt: '2020-01-01',
      keyPhrases: '1',
      frontMatter: {
        readingTime: {
          text: '1 min read',
        },
      },
    };
    render(<BlogPostCard {...fixture} />);

    expect(screen.getByText('summary')).toBeInTheDocument();
  });
});
