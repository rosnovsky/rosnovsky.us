/**
 * @jest-environment jsdom
 */
import React from 'react'

import {
  render,
  screen, waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from '@components/Footer';
import userEvent from '@testing-library/user-event';

describe('Footer', () => {

  it('renders Footer without crashing', async () => {
    render(
      <Footer />
    )
    await waitForElementToBeRemoved(() => screen.getByText('Status Loading...')
    )

    const status = screen.getByTestId('status-indicator')

    expect(status).toHaveAttribute('data-status', 'up')
  });

  it('links accessible by keyboard', async () => {
    render(
      <Footer />
    )

    userEvent.tab()
    expect(screen.getByText('Home')).toHaveFocus()

    userEvent.tab()
    expect(screen.getByText('About')).toHaveFocus()

    userEvent.tab()
    expect(screen.getByText(/Twitter/i)).toHaveFocus()

    userEvent.tab()
    expect(screen.getByText(/Github/i)).toHaveFocus()

    userEvent.tab()
    expect(screen.getByTestId('status')).toHaveFocus()

    userEvent.tab()
    expect(screen.getByText('Land Acknowledgment')).toHaveFocus()

  });
})
