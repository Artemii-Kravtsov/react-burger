import { PLACE_AN_ORDER_IS_FETCHING, 
         PLACE_AN_ORDER_SUCCESS,
         PLACE_AN_ORDER_FAILURE,
         ORDER_IS_PLACED } from '../actions/orders'
import { TAnyAction } from '.'
import { TStore } from '../../utils/types'


const orders = (state: TStore['orders'], 
                action: TAnyAction
                ): TStore['orders'] => {
    switch (action.type) {
        case ORDER_IS_PLACED:
            const orders = [...state.orders]
            orders.push({name: action.name, 
                         orderId: action.orderId, 
                         ingredients: action.ingredients})
            return {...state, orders}
        case PLACE_AN_ORDER_SUCCESS:
            return {...state, fetchingSuccess: true}
        case PLACE_AN_ORDER_FAILURE:
            return {...state, fetchingSuccess: false}
        case PLACE_AN_ORDER_IS_FETCHING:
            return {...state, isFetching: action.status}
        default:
            return state
    }
}

export default orders
