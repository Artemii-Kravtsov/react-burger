import browsedIngredient from './browsed-ingredient'; 
import ingredients from './ingredients';
import constructor from './constructor';
import order from './order';


const initialState = {
    'order': [],                                 // объект созданного заказа
    'ingredients': [],                           // список всех полученных ингредиентов
    'browsedIngredient': {},                     // объект текущего просматриваемого ингредиента
    'constructor': {'buns': {}, 'filling': []}   // список всех ингредиентов в текущем конструкторе бургера
}

export const rootReducer = (state=initialState, action) => ({
    order: order(state.order, action),
    ingredients: ingredients(state.ingredients, action),
    constructor: constructor(state.constructor, action),
    browsedIngredient: browsedIngredient(state.browsedIngredient, action),
})