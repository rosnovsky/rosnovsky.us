/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from '../../components/Cards/ProjectCard';

describe('Project Card', () => {
  it('renders React Project Card card without crashing', async () => {
    const fixture = {
      title: 'test',
      description: 'summary',
      icon: 'react',
      href: '/test',
    };
    render(<ProjectCard {...fixture} />);

    expect(screen.getByText('summary')).toBeInTheDocument();
  });

  it('renders Site Project Card card without crashing', async () => {
    const fixture = {
      title: 'test',
      description: 'summary',
      icon: 'site',
      href: '/test',
    };
    render(<ProjectCard {...fixture} />);

    expect(screen.getByText('summary')).toBeInTheDocument();
  });

  it('renders Github Project Card card without crashing', async () => {
    const fixture = {
      title: 'test',
      description: 'summary',
      icon: 'ts',
      href: '/test',
    };
    render(<ProjectCard {...fixture} />);

    expect(screen.getByText('summary')).toBeInTheDocument();
  });
  it('registers Fathom event on click', async () => {
    // This is not something users are aware of but I want the coverage here!

    const fixture = {
      title: 'test',
      description: 'summary',
      icon: 'react',
      href: '/test',
    };
    const card = render(<ProjectCard {...fixture} />);
    card.getByTestId('project-card').click();
  });
});
