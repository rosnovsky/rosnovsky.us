/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Track from '../../components/Track';

describe('Now Playing', () => {
  it('renders Now Playing component without crashing', async () => {
    const fixture = {
      track: {
        albumImageUrl:
          'https://i.scdn.co/image/ab67616d0000b273f8f9c9f9d8f9c9f9c9f9c9f9',
        title: 'The Best of The Doors',
        artist: 'The Doors',
        songUrl: 'https://open.spotify.com/track/3wY7lqYqQZ7QZqQZqQZqQ'
      }
    };
    render(<Track {...fixture} />);

    expect(screen.getByText(/The Best of The Doors/i)).toBeInTheDocument();
  });
});
