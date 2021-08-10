/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import App from '@pages/index';
import { UserProvider } from '@auth0/nextjs-auth0';
import * as nextRouter from 'next/router';

//@ts-expect-error
nextRouter.useRouter = jest.fn();
//@ts-expect-error
nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

describe('App', () => {
    it('renders without crashing', () => {
        render(<UserProvider><App /></UserProvider>);
        expect(
            screen.getByRole('heading', { name: 'Rosnovsky Park™' })
        ).toBeInTheDocument();
    });
});
