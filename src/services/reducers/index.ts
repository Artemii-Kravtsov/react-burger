import browsedIngredient from './browsed-ingredient'; 
import ingredients from './ingredients';
import constructor from './constructor';
import profile from './profile';
import orders from './orders';
import { TStore } from '../../utils/types';
import { TBrowsedIngredientActions } from '../actions/browsed-ingredient';
import { TOrdersActions } from '../actions/orders';
import { TProfileActions } from '../actions/profile';
import { TConstrunctorActions } from '../actions/constructor';
import { TIngredientsActions } from '../actions/ingredients';


const initialState: TStore = {
    'browsedIngredient': undefined,                 // объект текущего просматриваемого ингредиента
    'orders': {isFetching: false, 
               fetchingSuccess: true, 
               orders: []},                         // объект созданного заказа
    'ingredients': {isFetching: false, 
                    fetchingSuccess: true, 
                    ingredients: {'Булки': [], 
                                  'Соусы': [], 
                                  'Начинки': []}},  // список всех полученных ингредиентов
    'constructor': {buns: undefined, 
                    filling: []},                   // список всех ингредиентов в текущем конструкторе бургера
    'profile': {loggedIn: false, 
                name: undefined, 
                email: undefined},                  // данные профиля пользователя
}


export type TAnyActionFunc = TBrowsedIngredientActions 
                              | TOrdersActions 
                              | TProfileActions 
                              | TConstrunctorActions 
                              | TIngredientsActions

export type TAnyAction = ReturnType<TAnyActionFunc>

export const rootReducer = (state: TStore = initialState, 
                            action: TAnyAction,
                            ): TStore => ({
    orders: orders(state.orders, action),
    profile: profile(state.profile, action),
    ingredients: ingredients(state.ingredients, action),
    constructor: constructor(state.constructor, action),
    browsedIngredient: browsedIngredient(state.browsedIngredient, action),
})