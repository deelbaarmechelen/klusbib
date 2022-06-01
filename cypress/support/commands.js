// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const dayjs = require('dayjs');

Cypress.Commands.add('getToken', (a, b) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/token',
        method: 'POST',
        auth: {
            username: Cypress.env('username'),
            password: Cypress.env('password')
        },
        body: ["tools.all", "users.all", "reservations.all", "consumers.all"]
    }).its('body').then((res) => {
        return { 'token' : res.token };
    });
});

Cypress.Commands.add('createUser', { prevSubject: true }, (subject, user) => {
      cy.request({
            url: Cypress.env('apiUrl') + '/users',
            method: 'POST',
            auth: {
                bearer: subject.token
            },
            body: user
        }).its('body')
            .then((body) => {
                subject.user = body; // enrich subject with created user
                return subject;
        });
});

Cypress.Commands.add('deleteUser', { prevSubject: true }, (subject, user) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/users/' + user.user_id,
        method: 'DELETE',
        auth: {
            bearer: subject.token
        }
    }).its('body')
        .then((body) => {
            console.log(body);
            subject.user = body; // enrich subject with created user
            return subject;
        });
});

// expects subject to contain a user and a token
Cypress.Commands.add('enrolUser', {
    prevSubject: true
}, (subject, paymentMode, paymentCompleted) => {
    let user = subject.user;
    cy.request({
        url: Cypress.env('apiUrl') + '/enrolment',
        method: 'POST',
        auth: {
            bearer: subject.token
        },
        body: {
            "userId": user.user_id,
            "orderId": user.user_id + dayjs().format('YYYYMMDDhhmmss'),
            "paymentMode": paymentMode,
            "paymentCompleted": paymentCompleted
        }
    }).its('body').then((resp) => {
        return subject;
    })
});