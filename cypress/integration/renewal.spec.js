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

<<<<<<< HEAD
    it.skip('test commands', ()=> {
=======
    it('test commands', ()=> {
>>>>>>> production
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

    it.only('Renew regular membership', () => {
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
            });
        // Note: not possible to test any further as a third party is involved.
        //       Disabling websecurity allows to proceed, but not to click on any links
        // cy.get('.grid-button-mistercash')
        //     .click();
        // cy.url().should('include', 'www.mollie.com/paymentscreen/testmode');
        // cy.get('[type="radio"]').first().next().check();
        // cy.get('.form__button')
        //     .click();

        //cy.url().should('include', '/lid-worden/confirm');
    });
    it('Starts transfer membership', () => {
        cy.get('#firstname')
            .type('Transfer')
            .should('have.value', 'Transfer');
        cy.get('#lastname').type('User');
        cy.get('#email').type('transfer@klusbib.be');
        cy.get('#address').type('Here 123');
        cy.get('#postal_code').type('2800');
        cy.get('#city').type('Mechelen');
        cy.get('#phone').type('0475123456');
        // Compute registration number check digit with 'echo (97- (intval('2'.'000101001') % 97) );'
        cy.get('#registration_number').type('00010100105');
        cy.get('#accept_terms').check();
        cy.get('#btn-enrolment')
            .should('not.be.disabled')
            .click();
        cy.url().should('include', '/lid-worden/payment');
        cy.get('#btn-confirm')
            .should('be.disabled');
        cy.get('#payment_mode_transfer').check();
        cy.get('#btn-confirm')
            .should('not.be.disabled')
            .click();
        cy.wait(4000); // wait for server to process enrolment
        cy.url().should('include', '/lid-worden/confirm');
    })
    it('Starts stroom membership', () => {
        cy.get('#firstname')
            .type('Stroom')
            .should('have.value', 'Stroom');
        cy.get('#lastname').type('User');
        cy.get('#email').type('stroom@klusbib.be');
        cy.get('#address').type('Here 123');
        cy.get('#postal_code').type('2800');
        cy.get('#city').type('Mechelen');
        cy.get('#phone').type('0475123456');
        // Compute registration number check digit with 'echo (97- (intval('2'.'000101001') % 97) );'
        cy.get('#registration_number').type('00010100105');
        cy.get('#accept_terms').check();
        cy.get('#btn-enrolment')
            .should('not.be.disabled')
            .click();
        cy.url().should('include', '/lid-worden/payment');
        cy.get('#btn-confirm')
            .should('be.disabled');
        cy.get('#payment_mode_stroom').check();
        cy.get('#btn-confirm')
            .should('not.be.disabled')
            .click();
        cy.wait(4000); // wait for server to process enrolment
        cy.url().should('include', '/lid-worden/confirm');
    })
})