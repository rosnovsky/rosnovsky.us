import userEvent from '@testing-library/user-event';

export { }

context('Home Page', () => {
    it('has no accessibility violations on load', () => {
        cy.visit(`http://localhost:3000`);
        cy.injectAxe();
        // @ts-expect-error
        cy.checkA11y(null, {
            includedImpacts: ['critical']
        });
    })
    it('has correct title', () => {
        cy.get('h1').should('contain', 'Rosnovsky Park™');
    });
    it('has 5 main menu items', () => {
        cy.get('[data-test="menu-item"]').should('have.length', 5);
    })
    it('all 5 main menu work', () => {
        cy.get('[aria-label="Home"]').click();
        cy.url().should('include', '/');

        cy.get('[aria-label="Blog"]').click();
        cy.url().should('include', '/blog');
        cy.get('[aria-label="Home"]').click();

        cy.get('[aria-label="About"]').click();
        cy.url().should('include', '/about');
        cy.get('[aria-label="Home"]').click();

        cy.get('[aria-label="Stats"]').click();
        cy.url().should('include', '/stats');
        cy.get('[aria-label="Home"]').click();

        // Figure out how we test Auth0 here
        // cy.get('[aria-label="Login"]').click();
        // cy.url().should('include', 'https://auth.rosnovsky.us/u/login/identifier');
        // cy.go('back');

    })
    it('has dark mode toggle working', () => {
        cy.get('html').should('have.class', 'dark');
        cy.get('[data-testid="toggle-btn"]').click();
        cy.get('html').should('have.class', 'light');
        cy.get('[data-testid="toggle-btn"]').click();
        cy.get('html').should('have.class', 'dark');
    })

    it('has Featured Posts', () => {
        cy.get('[aria-label="Featured Posts"]').should('have.length', 1);
        userEvent.tab()
    })

    it('has Featured Projects', () => { })

    it('has Subscribe card', () => { })

    it('has Last Played widget', () => { })


    it('has correct footer', () => { })
    it('has Status indicator', () => { })

    it('has correct copyright', () => { })

    it('has correct social media links', () => { })

    it('has Stillaguamish Land acknowledgement', () => { })




});



