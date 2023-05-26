import browsedIngredient from './browsed-ingredient'; 
import ingredients from './ingredients';
import constructor from './constructor';
import orders from './orders';


const initialState = {
    'browsedIngredient': {},                        // объект текущего просматриваемого ингредиента
    'orders': {isFetching: false, 
               fetchingSuccess: true, 
               orders: []},                         // объект созданного заказа
    'ingredients': {isFetching: false, 
                    fetchingSuccess: true, 
                    ingredients: {'Булки': [], 
                                  'Соусы': [], 
                                  'Начинки': []}},  // список всех полученных ингредиентов
    'constructor': {buns: {}, 
                    filling: []}                    // список всех ингредиентов в текущем конструкторе бургера
}

export const rootReducer = (state=initialState, action) => ({
    orders: orders(state.orders, action),
    ingredients: ingredients(state.ingredients, action),
    constructor: constructor(state.constructor, action),
    browsedIngredient: browsedIngredient(state.browsedIngredient, action),
})