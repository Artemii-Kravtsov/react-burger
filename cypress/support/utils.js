export function getIngredient(group_idx, idx) {
    return cy.get(`#root main section:first-child \
                              > section \
                              > div:nth-child(${group_idx*2}) \ 
                              > article:nth-child(${idx})`)
  }
  
export function moveToConstructor(alias, destination, options={}) {
    const { missclick=false, position='bottom' } = options
    
    cy.get(alias).trigger('dragstart')
    if (!missclick) {
      cy.get(destination)
        .trigger('dragenter', position)
        .trigger('drop', position)
    } else {
      cy.get(alias).trigger('dragenter').trigger('drop')
    }
  }