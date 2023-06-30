import { PLACE_AN_ORDER_IS_FETCHING, 
         PLACE_AN_ORDER_SUCCESS,
         PLACE_AN_ORDER_FAILURE,
         ORDER_IS_PLACED } from '../actions/orders'

const orders = (state, action) => {
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
