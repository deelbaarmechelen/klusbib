/// <reference types="Cypress" />
describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Scans navigation bar', () => {
        cy.contains("Over ons").click()
        cy.contains("Waar").click()
        cy.contains("Contact").click()
        cy.contains("FAQ").click()
        cy.contains("Lid worden").click()
        cy.contains("Inventaris").click()
        cy.contains("Inloggen").click()
    })
})