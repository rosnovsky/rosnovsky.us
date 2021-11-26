/**
 * @jest-environment jsdom
 */
import React from 'react';

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import SubscribeCard from '../../components/Cards/SubscribeCard';
import userEvent from '@testing-library/user-event';

describe('Subscribe Card', () => {
  it('renders Subscribe Card card without crashing', async () => {
    render(<SubscribeCard />);

    await waitForElementToBeRemoved(() =>
      screen.getByText('Subscribers Loading...')
    );

    expect(screen.getByText('666 subscribers – 13 issues')).toBeInTheDocument();
  });

  it('renders Error message', async () => {
    render(<SubscribeCard />);
    const form = screen.getByPlaceholderText('art@rosnovsky.us');
    console.log(userEvent.click(form))

    userEvent.type(form, 'aaa@3333.dsddsd');
    userEvent.click(screen.getByText('Subscribe'));

    // expect(screen.getByTestId('error')).toBeInTheDocument();
  });
});
