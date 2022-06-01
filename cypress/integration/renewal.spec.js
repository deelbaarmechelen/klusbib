/// <reference types=\"Cypress\" />
"use strict";
describe('Renewal', () => {
    let user;
    before(() => {
        // FIXME: should add existing users into database instead of relying on result enrolment tests
        // Remove previously created users and memberships:
        // reset and seed the database prior to every test for run with test environment
        // cy.exec('npm run db:api:test:reset');
        // cy.exec('npm run db:inventory:test:reset');


        // reset and seed the database prior to every test for run with dev environment
        //cy.exec('npm run db:reset && npm run db:migrate && npm run db:seed');
        // cy.exec('npm run db:seed:reset');

        // TODO: trigger sync with inventory
    })

    afterEach(function() {
        // runs after each test in this block
        if (user) {
            cy.getToken().deleteUser(user);
        }
    });

    it.skip('test commands', ()=> {
        cy.getToken().createUser({
            "firstname": "Transfer",
            "lastname": "Confirm",
            "email": "dummy@klusbib.be",
            "address": "Here 123",
            "postal_code": "2800",
            "city": "Mechelen",
            "phone": "+32475123456",
            "registration_number": "00010112377",
            "accept_terms": true,
            "role": "member",
            "webenrolment": true
        }).enrolUser("TRANSFER", true)
            .then((subject) =>{
                user = subject.user;
                console.log(subject);
                console.log(user);
            });
    });

    it('Renew transfer membership', () => {
        cy.getToken().createUser({
            "firstname": "Transfer",
            "lastname": "Confirm",
            "email": "dummy@klusbib.be",
            "address": "Here 123",
            "postal_code": "2800",
            "city": "Mechelen",
            "phone": "+32475123456",
            "registration_number": "00010112377",
            "accept_terms": true,
            "role": "member",
            "webenrolment": true
        }).enrolUser("TRANSFER", true)
            .then((subject) =>{
                user = subject.user;
                console.log(subject);
                console.log(user);
                cy.visit('/#!/profile/' + user.user_id + '?token=' + subject.token)
                cy.get('[data-cy=btn-renew-membership]').click();
                cy.url().should('include', '/lid-worden/renewal');
                cy.get('#btn-confirm')
                    .should('be.disabled');
                cy.get('#payment_mode_transfer').check();
                cy.get('#btn-confirm')
                    .should('not.be.disabled')
                    .click();
                cy.url().should('include', '/lid-worden/confirm');
            });
    });
})