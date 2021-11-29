/**
 * @jest-environment jsdom
 */
import React from 'react'

import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom'
import CommentsCount from '../components/metrics/CommentsCount';

describe('Metric Card', () => {

  it('renders Metric Card without crashing', async () => {

    render(
      <CommentsCount />
    )
    await waitForElementToBeRemoved(() => screen.getByText('...'))
    expect(screen.getByText('666')).toBeInTheDocument();
  });
})
