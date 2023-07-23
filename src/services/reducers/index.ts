import browsedIngredient from './browsed-ingredient'; 
import ingredients from './ingredients';
import constructor from './constructor';
import profile from './profile';
import {browsedOrder, orders} from './orders';
import feed from './ws-feed';
import { TStore } from '../../utils/types';
import { TBrowsedIngredientActions } from '../actions/browsed-ingredient';
import { TOrdersActions } from '../actions/orders';
import { TProfileActions } from '../actions/profile';
import { TConstrunctorActions } from '../actions/constructor';
import { TIngredientsActions } from '../actions/ingredients';
import { TWSFeedActions } from '../actions/ws-feed';
import { TWSOrdersActions } from '../actions/ws-orders';


export const initialState: TStore = {
    'browsedIngredient': undefined,                 // объект текущего просматриваемого ингредиента
    'browsedOrder': undefined,                      // объект текущего просматриваемого заказа
    'feed': {wsConnected: false,                    // лента заказов
             orders: []},
    'orders': {isFetching: false, 
               fetchingSuccess: true, 
               lastOrderId: undefined,
               wsConnected: false,
               orders: []},                         // объект созданного заказа и заказы пользователя
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


export type TAnyAction = ReturnType<TBrowsedIngredientActions 
                                     | TOrdersActions 
                                     | TProfileActions 
                                     | TConstrunctorActions 
                                     | TIngredientsActions
                                     | TWSFeedActions
                                     | TWSOrdersActions >

export const rootReducer = (state: TStore = initialState, 
                            action: TAnyAction,
                            ): TStore => ({
    feed: feed(state.feed, action),
    orders: orders(state.orders, action),
    profile: profile(state.profile, action),
    ingredients: ingredients(state.ingredients, action),
    constructor: constructor(state.constructor, action),
    browsedOrder: browsedOrder(state.browsedOrder, action),
    browsedIngredient: browsedIngredient(state.browsedIngredient, action),
})