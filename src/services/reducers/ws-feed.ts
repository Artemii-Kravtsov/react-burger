import { WS_FEED_CONNECTION_SUCCESS,
         WS_FEED_CONNECTION_ERROR,
         WS_FEED_CONNECTION_CLOSED,
         WS_FEED_GET_MESSAGE } from '../actions/ws-feed';
import { TAnyAction } from '.'
import { TStore } from '../../utils/types'


const feed = (state: TStore['feed'], 
              action: TAnyAction
              ): TStore['feed'] => {
switch (action.type) {
   case WS_FEED_CONNECTION_CLOSED:
       const { total, totalToday, ...newState } = state 
       return {...newState, 
               error: undefined, 
               wsConnected: false, 
               orders: []}
   case WS_FEED_CONNECTION_ERROR:
       return {...state, error: action.error, wsConnected: false}
   case WS_FEED_CONNECTION_SUCCESS:
       return {...state, error: undefined, wsConnected: true}
   case WS_FEED_GET_MESSAGE:
       return {...state, orders: action.orders, 
                         total: action.total, 
                         totalToday: action.totalToday}
   default:
       return state
}
}

export default feed