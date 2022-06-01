/// <reference types="Cypress" />
"use strict";

let token;

describe('User admin', () => {
    before(() => {
        // Remove previously created users and memberships:
        // reset and seed the database prior to every test for run with test environment
        cy.exec('npm run db:api:test:reset');
        cy.exec('npm run db:inventory:test:reset');

        // reset and seed the database prior to every test for run with dev environment
        //cy.exec('npm run db:reset && npm run db:migrate && npm run db:seed');
        // cy.exec('npm run db:seed:reset');

        // TODO: trigger sync with inventory
    })
    beforeEach(() => {
        cy.request({
            url: Cypress.env('apiUrl') + '/token',
            method: 'POST',
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password')
            },
            body: ["tools.all", "users.all", "reservations.all", "consumers.all"]
        }).its('body').then((res) => {
            token = res.token
            // now that we have a token, we can visit the profile page
            // note: we need to visit the page to properly load $httpProvider.interceptors for request, which sets the Bearer authorisation header
            cy.visit('/#!/profile/1?token=' + token);
        });
    });

    it('confirm transfer enrolment', () => {
        // arrange
        // enrol user with transfer payment mode
        let user;
        cy.request({
            url: Cypress.env('apiUrl') + '/users',
            method: 'POST',
            auth: {
                bearer: token
            },
            body: {
                "firstname":"Transfer",
                "lastname":"Confirm",
                "email":"transfer.confirm@klusbib.be",
                "address":"Here 123",
                "postal_code":"2800",
                "city":"Mechelen",
                "phone":"+32475123456",
                "registration_number":"00010112377",
                "accept_terms":true,
                "role":"member",
                "webenrolment":true
            }
        }).its('body').then((body) => {
            console.log(body);
            user = body;
            cy.request({
                url: Cypress.env('apiUrl') + '/enrolment',
                method: 'POST',
                auth: {
                    bearer: token
                },
                body: {
                    "userId": user.user_id,
                    "orderId": user.user_id + "_20200920120002",
                    "paymentMode": "TRANSFER",
                    "paymentState": "OPEN"
                }
            })
        }).then(() => {
            // act
            cy.visit('/#!/user-admin');
            cy.get('#edit-user-' + user.user_id).click();
            cy.get('#edit-payment-mode').should('have.value',"TRANSFER");
            cy.get('#edit-state').should('have.value',"CHECK_PAYMENT");
            cy.get('#confirmation-payment-mode').select("TRANSFER");
            cy.get('#btn-confirm-payment').should('be.enabled').click();

            // assert
            cy.contains("Email bericht verzonden met bevestiging inschrijving/verlenging");
        })

    });
    it('confirm stroom enrolment', () => {
        // arrange
        // enrol user with transfer payment mode
        let user;
        cy.request({
            url: Cypress.env('apiUrl') + '/users',
            method: 'POST',
            auth: {
                bearer: token
            },
            body: {
                "firstname":"Stroom",
                "lastname":"Confirm",
                "email":"stroom.confirm@klusbib.be",
                "address":"Her 123",
                "postal_code":"2800",
                "city":"Mechelen",
                "phone":"+32475123456",
                "registration_number":"00010112377",
                "accept_terms":true,
                "role":"member",
                "webenrolment":true
            }
        }).its('body').then((body) => {
            console.log(body);
            user = body;
            cy.request({
                url: Cypress.env('apiUrl') + '/enrolment',
                method: 'POST',
                auth: {
                    bearer: token
                },
                body: {
                    "userId": user.user_id,
                    "orderId": user.user_id + "_20200920120002",
                    "paymentMode": "STROOM",
                    "paymentState": "OPEN"
                }
            })
        }).then(() => {
            // act
            cy.visit('/#!/user-admin');
            cy.get('#edit-user-' + user.user_id).click();
            cy.get('#edit-payment-mode').should('have.value',"STROOM");
            cy.get('#edit-state').should('have.value',"CHECK_PAYMENT");
            cy.get('#confirmation-payment-mode').select("STROOM");
            cy.get('#btn-confirm-payment').should('be.enabled').click();

            // assert
            cy.contains("Email bericht verzonden met bevestiging inschrijving/verlenging");
        })

    });
});
