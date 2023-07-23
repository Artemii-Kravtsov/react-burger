describe('модальные окна с описанием ингредиента', function() {
    const baseUrl = Cypress.config('baseUrl')
  
    beforeEach(function() {
      cy.visit('/');
      cy.viewport(1000, 1000)
    });

    it('открываются', function() {
      cy.get('#root main article:first').click()
      cy.url().should('include', 'ingredients')
      cy.contains('Детали ингредиента');
      cy.get('#react-modals main h2 svg').click()
      cy.url().should('eq', baseUrl)
    });
  
    it('содержат верную информацию', function() {
      cy.get('#root main article').each((art, idx) => {
          // if (idx > 5) return
          cy.wrap(art).click()
          cy.get('#react-modals main ul li p')
            .as('ingredient_data')
            .should('have.length', 4)
            .each((li) => {
              cy.wrap(li).should('include', /^[\d\.]+$/)
          })
          cy.get('#react-modals main h2 svg').click()
      });
    });

});