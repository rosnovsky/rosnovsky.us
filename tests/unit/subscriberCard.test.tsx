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
import SubscribeCard from '../../components/Cards/SubscribeCard';

describe('Subscribe Card', () => {
  it('renders Subscribe Card card without crashing', async () => {
    render(<SubscribeCard />);

    await waitForElementToBeRemoved(() =>
      screen.getByText('Subscribers Loading...')
    );

    expect(screen.getByText('666 subscribers – 13 issues')).toBeInTheDocument();
  });
});
