import { getIngredient, moveToConstructor } from "../support/utils"



describe('оформление заказа', function() {
    const button = '#root main section:nth-child(2) button'
    const constructorArea = '#root main section:nth-child(2) > ul'
    const baseUrl = Cypress.config('baseUrl')


    beforeEach(function() {
      cy.visit('/');
      cy.viewport(1000, 1000)
    });


    it('кнопка неактивна, когда конструктор не заполнен', function() {

      cy.get(button).should('be.disabled')
      getIngredient(1, 2).as('bun')

      moveToConstructor('@bun', constructorArea)
      cy.get(button).should('be.disabled')
      cy.url().should('eq', baseUrl)

      getIngredient(2, 2).as('sause')
      moveToConstructor('@sause', constructorArea)
      cy.get(button).should('not.be.disabled')

    });
  

    it('переадресует неавторизованного пользователя на страницу логина', function() {

      getIngredient(1, 2).as('bun')
      getIngredient(2, 2).as('sause')
      moveToConstructor('@bun', constructorArea)
      moveToConstructor('@sause', constructorArea)

      cy.get(button).click()
      cy.url().should('eq', baseUrl + 'login')

    });


    it('после авторизации возвращает со страницы логина на открытое модальное окно', function() {

      getIngredient(1, 2).as('bun')
      getIngredient(2, 2).as('sause')
      moveToConstructor('@bun', constructorArea)
      moveToConstructor('@sause', constructorArea)

      cy.get(button).click()
      cy.url().should('eq', baseUrl + 'login')
      cy.contains('Вход')

      cy.get('input[name="email"]').type('temati9797@yandex.ru')
      cy.get('input[name="password"]').type('zvezdo4ka')
      cy.get('button').should('not.be.disabled').click()

      cy.url().should('eq', baseUrl + 'profile/orders')
      cy.get('#react-modals').contains('Формируем заказ')

      cy.get('#react-modals h3', {timeout: 20000}).as('orderId')
      cy.get('@orderId').should('include', /^\d{1,6}$/)
      cy.get('#react-modals').contains('Ваш заказ начали готовить')
      cy.get('#react-modals main h2 svg').click()
      cy.url().should('eq', baseUrl)

    });


  });