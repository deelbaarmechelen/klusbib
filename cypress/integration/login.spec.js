/// <reference types="Cypress" />
"use strict";
describe('Login', () => {
    beforeEach(() => {
        cy.visit('/#!/signin');
    });

    it('Login a fake user', () => {
        cy.get('#email')
          .type('fake@email.com')
          .should('have.value', 'fake@email.com');

        cy.get('#password')
            .type(Cypress.env('password'));
        cy.get("#login").click();
        cy.get(".alert").should('contain', 'Ongeldig login of paswoord');
        // cy.contains('Ongeldig login of paswoord')
        expect(true).to.equal(true)
    });
    it('Login a valid user', () => {
        cy.contains("Inloggen").click();
        cy.get('#email')
            .type(Cypress.env('username'))
            .should('have.value', Cypress.env('username'));

        cy.get('#password')
            .type(Cypress.env('password'));
        cy.get("#login").click();
        cy.url().should('include', '/#!/profile');
    });
    it('Login with wrong password', () => {
        cy.contains("Inloggen").click();
        cy.get('#email')
            .type(Cypress.env('username'))
            .should('have.value', Cypress.env('username'));

        cy.get('#password')
            .type('wrong');
        cy.get("#login").click();
    });
    it('logs in programmatically without using the UI', function () {

        // programmatically log us in without needing the UI
        let token;
        cy.request({
            url : Cypress.env('apiUrl') + '/token',
            method: 'POST',
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password')
            },
            body: ["tools.all", "users.all", "reservations.all", "consumers.all"]
        }).its('body').then((res) => {
            token = res.token
            window.localStorage.setItem('ngStorage-token', token);
            // now that we have a token, we can visit the profile page
            cy.visit('/#!/profile/1?token=' + token)
              .should(() => {
                  expect(localStorage.getItem('ngStorage-token')).not.to.be.null;
                  expect(localStorage.getItem('ngStorage-token')).to.equal(token);
            });

            // cy.visit('/#!/user-admin');

            // UI should reflect this user being logged in
            cy.get('#email').should('have.value', Cypress.env('username'));
        });
    });
});