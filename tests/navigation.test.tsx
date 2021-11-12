/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, getByText, getByTestId, getByLabelText } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Navigation from '@components/Navigation';
import { UserProvider } from '@auth0/nextjs-auth0';


describe('Navigation', () => {
    it('renders Navigation without crashing', () => {
        const { getByLabelText } = render(<UserProvider><Navigation /></UserProvider>)

        const darkModeToggleBtn = getByLabelText("Toggle Dark Mode")

        expect(darkModeToggleBtn).toBeInTheDocument()
    });

    it('can be operated with the keyboard', () => {
        render(<UserProvider><Navigation /></UserProvider>)

        const btnWrapper = screen.getByTestId('toggle-btn')
        const skipToContent = screen.getByText('Skip to content')

        const Home = screen.getByTitle('Home').childNodes[0]

        const Blog = screen.getByTitle('Blog').childNodes[0]

        const Stats = screen.getByTitle('Stats').childNodes[0]

        const About = screen.getByTitle('About').childNodes[0]

        const Login = screen.getByTitle('Login').childNodes[0]

        userEvent.tab()
        expect(skipToContent).toHaveFocus()

        userEvent.tab()
        expect(btnWrapper).toHaveFocus()

        userEvent.click(btnWrapper)
        expect(btnWrapper).toHaveAttribute('data-status', 'light')

        userEvent.tab()
        expect(Home).toHaveFocus()

        userEvent.tab()
        expect(Blog).toHaveFocus()

        userEvent.tab()
        expect(Stats).toHaveFocus()

        userEvent.tab()
        expect(About).toHaveFocus()

        userEvent.tab()
        expect(Login).toHaveFocus()

    })
});
