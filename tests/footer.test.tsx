/**
 * @jest-environment jsdom
 */
import React from 'react'

import {
  render,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom'
import StatusIndicator from '@components/StatusIndicator';
import { setupServer } from 'msw/node'
import { DefaultRequestBody, rest } from 'msw'
import { MySwrConfig } from '@components/Utils/SWRConfig';

const server = setupServer(
  beforeEach(async () => {
    rest.get<DefaultRequestBody>('/api/status', (req, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({ "status": "ok" })
      )
    })
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())



describe('Footer', () => {
  beforeEach(async () => {
    customRender(
      <StatusIndicator />
    )
  })
  it('renders Footer without crashing', () => {
    const status = screen.getByTestId('status-indicator')
    expect(status).toHaveAttribute('data-status', 'up')
  });
});

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <MySwrConfig swrConfig={{ dedupingInterval: 0 }}>
      {children}
    </MySwrConfig>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });
