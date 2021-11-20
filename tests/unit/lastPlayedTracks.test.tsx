/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom';
import TopTracks from '../../components/TopTracks';
import userEvent from '@testing-library/user-event';

describe('Last Played Tracks', () => {
  it('renders without crashing', async () => {
    render(<TopTracks />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading Songs...'));
    expect(screen.getByText('Go Big or Go Home')).toBeInTheDocument();
  });

  it('accessible by keyboard', async () => {
    render(<TopTracks />);

    userEvent.tab();
    userEvent.tab();
    expect(screen.getByText('Go Big or Go Home')).toHaveFocus();
  });
});
