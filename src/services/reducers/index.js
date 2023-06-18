import browsedIngredient from './browsed-ingredient'; 
import ingredients from './ingredients';
import constructor from './constructor';
import profile from './profile';
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
                    filling: []},                   // список всех ингредиентов в текущем конструкторе бургера
    'profile': {loggedIn: false, 
                name: undefined, 
                email: undefined},                  // данные профиля пользователя
}

export const rootReducer = (state=initialState, action) => ({
    orders: orders(state.orders, action),
    profile: profile(state.profile, action),
    ingredients: ingredients(state.ingredients, action),
    constructor: constructor(state.constructor, action),
    browsedIngredient: browsedIngredient(state.browsedIngredient, action),
})