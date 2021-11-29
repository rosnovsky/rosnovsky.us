/**
 * @jest-environment jsdom
 */
import React from 'react';

import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
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

  it('renders Error message', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SubscribeCard />);
    const inputField = getByPlaceholderText('art@rosnovsky.us');
    fireEvent.change(inputField, { target: { value: 'aaa@bbbb.cccc' } });
    fireEvent.click(getByTestId('subscribe-button'));

    await waitFor(() => getByTestId('error'));
  });

  it('renders Success message', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SubscribeCard />);
    const inputField = getByPlaceholderText('art@rosnovsky.us');
    fireEvent.change(inputField, { target: { value: 'artem@rosnovsky.us' } });
    fireEvent.click(getByTestId('subscribe-button'));

    await waitFor(() => getByTestId('success'));
  });
});
