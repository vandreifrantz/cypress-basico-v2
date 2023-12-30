/// <reference types="Cypress" />

describe('Login - Totvs CRM', function() {
    beforeEach(function() {
        cy.visit('https://totvscrm.app/login?redirectUrl=/')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Login - TOTVS CRM')
    })

    it('Senha errada', function() {
        cy.get('#loginForm-input-username').type('vandrei@teste.com.br')
        cy.get('#loginForm-input-password').type('555555')
        cy.get('#loginForm-input-tenant').type('produto')
        cy.get('#loginForm-button-login > .mdl-button__ripple-container').click()
        cy.get('#error-user-input-password').should('be.visible')
    })

    it('Empresa Inválida', function() {
        cy.get('#loginForm-input-username').type('vandrei@teste.com.br')
        cy.get('#loginForm-input-password').type('1478963')
        cy.get('#loginForm-input-tenant').type('teste')
        cy.get('#loginForm-button-login > .mdl-button__ripple-container').click()
        cy.get('.snackbar__error > .mdl-snackbar__text').should('be.visible')
    })

    it('Login com sucesso', function() {
        cy.get('#loginForm-input-username').type('vandrei@teste.com.br')
        cy.get('#loginForm-input-password').type('1478963')
        cy.get('#loginForm-input-tenant').type('produto')
        cy.get('#loginForm-button-login > .mdl-button__ripple-container').click()
    })
})

describe('Cadastro de lead - Totvs CRM', function() {

    it('Gravando um lead - campos obrigatórios', function() {
        cy.wait(7000)
        cy.visit('https://totvscrm.app/customer/leads/form',)
        cy.wait(4000)
        cy.get('#lead-form-main-information-input-name').type('Lead 1205')
        cy.get('#lead-form-saveOrConfirm-button > .mdl-button__ripple-container').click()
        cy.get('.bx-snackbar-content').should('be.visible')
        cy.get('#lead-form-main-information-input-name').should('have.value', 'Lead 1205')
    })

    it('Validando campos obrigatórios', function() {
        cy.visit('https://totvscrm.app/login?redirectUrl=/')
        cy.get('#loginForm-input-username').type('vandrei@teste.com.br')
        cy.get('#loginForm-input-password').type('1478963')
        cy.get('#loginForm-input-tenant').type('produto')
        cy.get('#loginForm-button-login > .mdl-button__ripple-container').click()
        cy.wait(7000)
        cy.visit('https://totvscrm.app/customer/leads/form',)
        cy.wait(3000)
        cy.get('#lead-form-saveOrConfirm-button > .mdl-button__ripple-container').click()
        cy.get('#error-lead-form-main-information-input-name > span').should('be.visible')
        cy.get('.bx-snackbar-content').should('be.visible')
        cy.get('#lead-form-main-information-input-name').should('have.value', '')
    })
})