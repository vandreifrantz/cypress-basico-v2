Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Vandrei')
        cy.get('#lastName').type('Frantz')
        cy.get('#email').type('vandrei.alexandre@totvs.com.br')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
})