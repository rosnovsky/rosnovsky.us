/**
 * @jest-environment jsdom
 */
import React from 'react'

import {
  render,
  screen
} from '@testing-library/react';
import '@testing-library/jest-dom'
import ProjectCard from '../components/Cards/ProjectCard';

describe('Project Card', () => {

  it('renders Project Card card without crashing', async () => {
    const fixture = {
      title: 'test',
      description: 'summary',
      icon: 'react',
      href: '/test',

    }
    render(
      <ProjectCard {...fixture} />
    )

    expect(screen.getByText('summary')).toBeInTheDocument();
  });
})
