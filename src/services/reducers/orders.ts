import { PLACE_AN_ORDER_IS_FETCHING, 
         PLACE_AN_ORDER_SUCCESS,
         PLACE_AN_ORDER_FAILURE,
         ORDER_IS_PLACED,
         SET_BROWSED_ORDER,
         REMOVE_BROWSED_ORDER } from '../actions/orders'
import { WS_ORDERS_CONNECTION_SUCCESS,
         WS_ORDERS_CONNECTION_ERROR,
         WS_ORDERS_CONNECTION_CLOSED,
         WS_ORDERS_GET_MESSAGE } from '../actions/ws-orders';
import { TAnyAction } from '.'
import { TStore } from '../../utils/types'



const browsedOrder = (state: TStore['browsedOrder'], 
                      action: TAnyAction
                      ): TStore['browsedOrder'] => {
    switch (action.type) {
        case SET_BROWSED_ORDER:
            return action.order
        case REMOVE_BROWSED_ORDER:
            return undefined
        default:
            return state
    }
}


const orders = (state: TStore['orders'], 
                action: TAnyAction
                ): TStore['orders'] => {
    switch (action.type) {
        
        case ORDER_IS_PLACED:
            return {...state, lastOrderId: action.orderId}
        case PLACE_AN_ORDER_SUCCESS:
            return {...state, fetchingSuccess: true}
        case PLACE_AN_ORDER_FAILURE:
            return {...state, fetchingSuccess: false}
        case PLACE_AN_ORDER_IS_FETCHING:
            return {...state, 
                    isFetching: action.status, 
                    lastOrderId: action.status ? undefined : state.lastOrderId}

        case WS_ORDERS_CONNECTION_CLOSED:
            return {...state, error: undefined, wsConnected: false}
        case WS_ORDERS_CONNECTION_ERROR:
          return {...state, error: action.error, wsConnected: false}
        case WS_ORDERS_CONNECTION_SUCCESS:
          return {...state, error: undefined, wsConnected: true}
        case WS_ORDERS_GET_MESSAGE:
          const orders = action.orders
          orders.reverse()
          return {...state, orders}

        default:
            return state
    }
}

export {orders, browsedOrder}