import { getIngredient, moveToConstructor } from "../support/utils"


describe('конструктор', function() {
  const constructorArea = '#root main section:nth-child(2) > ul'
  const bunsNames = '#root main section:nth-child(2) > div span.constructor-element__text'
  const counterDiv = 'div.counter'

  beforeEach(function() {
    cy.visit('/')
    cy.viewport(1000, 1000)
  });

  it('булки перетаскиваются верно', function() {
    getIngredient(1, 1).as('bun_tmp')
    getIngredient(1, 2).as('bun')

    moveToConstructor('@bun_tmp', constructorArea)
    moveToConstructor('@bun', constructorArea)

    cy.get('@bun_tmp').find(counterDiv).should('not.exist')
    cy.get('@bun').find(counterDiv).should('contain', '2')
    
    cy.get('@bun')
      .find('> p.text')
      .invoke('text')
      .then((text) => {
        cy.get(bunsNames)
          .should('have.length', 2)
          .then((buns) => {
            cy.wrap(buns).first().should('contain', text + ' (верх)')
            cy.wrap(buns).last().should('contain', text + ' (низ)')
          })
      })
  });  

  it('начинка перетаскивается верно', function() {

    getIngredient(2, 1).as('sause')
    getIngredient(3, 1).as('filling')
    getIngredient(3, 2).as('filling_tmp')

    moveToConstructor('@sause', constructorArea)
    moveToConstructor('@sause', constructorArea)
    moveToConstructor('@filling', constructorArea)
    moveToConstructor('@filling_tmp', constructorArea)

    cy.get(constructorArea).find('> li')
      .should('have.length', 4)
      .then((x) => {
        cy.wrap(x).last().find('svg').last().click()
        cy.wrap(x).should('have.length', 3)
      })

    cy.get('@sause').find(counterDiv).should('contain', '2')
    cy.get('@filling').find(counterDiv).should('contain', '1')
    cy.get('@filling_tmp').find(counterDiv).should('not.exist')
  });


  it('ингредиенты не перетаскиваются при мисскликах', function() {

    getIngredient(1, 2).as('bun')
    getIngredient(2, 1).as('sause')
    getIngredient(3, 1).as('filling')
  
    moveToConstructor('@bun', constructorArea, {missclick: true}) 
    moveToConstructor('@sause', constructorArea, {missclick: true})
    moveToConstructor('@filling', constructorArea)

    cy.get(constructorArea).find('> li').should('have.length', 1)
    cy.get(bunsNames).each((x) => cy.wrap(x).should('contain', 'Перетащите булки'))
    cy.get('@sause').find(counterDiv).should('not.exist')
    cy.get('@bun').find(counterDiv).should('not.exist')

  });  


  it('место ингредиента в конструкторе зависит от того, где случился mouse-up', function() {

    getIngredient(2, 1).as('sause')
    getIngredient(3, 1).as('filling')
  
    moveToConstructor('@sause', constructorArea)
    moveToConstructor('@filling', constructorArea, {'position': 'top'})
    moveToConstructor('@filling', constructorArea, {'position': 'bottom'})

    cy.get('@filling')
      .find('> p.text')
      .invoke('text')
      .then((fillingName) => {
        cy.get(constructorArea)
          .find('li')
          .then((lis) => {
            cy.wrap(lis).first().should('contain', fillingName)
            cy.wrap(lis).last().should('contain', fillingName)
          })
      })
  })


  it('работает перетаскивание ингредиентов внутри конструктора', function() {

    getIngredient(2, 1).as('sause')
    getIngredient(3, 1).as('filling')
  
    moveToConstructor('@filling', constructorArea)
    moveToConstructor('@sause', constructorArea)


    cy.get(constructorArea).find('li:first-child > span').as('dragIcon')
    moveToConstructor('@dragIcon', constructorArea, {'position': 'bottom'})

    cy.get('@filling')
      .find('> p.text')
      .invoke('text')
      .then((fillingName) => {
        cy.get(constructorArea)
          .find('li')
          .last()
          .should('contain', fillingName)
      })
  })  


});