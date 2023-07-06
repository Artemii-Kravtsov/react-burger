import { BASE_URL } from "../constants";
import { THandlers, TResponseSuccess } from "../../utils/types";
import { customFetch } from "../../utils/customFetch";
import { AppDispatch, AppThunk } from "../..";
import { TStore } from "../../utils/types";

/*   экшены   */
export const ORDER_IS_PLACED: 'ORDER_IS_PLACED' = 'ORDER_IS_PLACED';
export const PLACE_AN_ORDER_SUCCESS: 'PLACE_AN_ORDER_SUCCESS' = 'PLACE_AN_ORDER_SUCCESS';
export const PLACE_AN_ORDER_FAILURE: 'PLACE_AN_ORDER_FAILURE' = 'PLACE_AN_ORDER_FAILURE';
export const PLACE_AN_ORDER_IS_FETCHING: 'PLACE_AN_ORDER_IS_FETCHING' = 'PLACE_AN_ORDER_IS_FETCHING';


/*   генераторы экшенов   */
type TSucceeded = {
  (status: boolean): {readonly type: typeof PLACE_AN_ORDER_SUCCESS | typeof PLACE_AN_ORDER_FAILURE}
}
type TIsFetching = {
  (status: boolean): {
    readonly type: typeof PLACE_AN_ORDER_IS_FETCHING;
    readonly status: boolean
  }
}
type TIsPlaced = {
  (ingredients: string[],
   orderId: number,
   name: string): {
    readonly type: typeof ORDER_IS_PLACED;
    readonly ingredients: string[],
    readonly orderId: number,
    readonly name: string
  }
}
export type TOrdersActions = TSucceeded | TIsFetching | TIsPlaced

export const placeAnOrderSucceeded: TSucceeded = (status =true) => {
  return { type: status ? PLACE_AN_ORDER_SUCCESS : PLACE_AN_ORDER_FAILURE };
}
export const placeAnOrderIsFetching: TIsFetching = (status = false) => {
  return { type: PLACE_AN_ORDER_IS_FETCHING, status };
}
export const orderIsPlaced: TIsPlaced = (ingredients, orderId, name) => {
  return { type: ORDER_IS_PLACED, ingredients, orderId, name };
}


/*   функции - экшены   */
type TOrderResponse = TResponseSuccess & {
  order: {number: number};
  name: string;
}
export const placeAnOrder = (constructor: TStore['constructor'],
                             {onSuccess, 
                              onError, 
                              onFinish}: THandlers<TOrderResponse> = {}
                              ) => {
  return function(dispatch: AppDispatch) {
    const bunsId = constructor.buns && constructor.buns._id
    const fillingsId = constructor.filling.map(x => x._id)
    if (!(bunsId && fillingsId.length)) {
        dispatch(placeAnOrderSucceeded(false))
        return
    }
    const payload = {"ingredients": [bunsId, ...fillingsId]}
    
    dispatch(placeAnOrderSucceeded(true))
    dispatch(placeAnOrderIsFetching(true))

    customFetch<TOrderResponse>(BASE_URL + 'orders', {
      method: 'post', 
      body: JSON.stringify(payload),
      onError: (error) => {
          dispatch(placeAnOrderSucceeded(false))
          if (typeof onError === 'function') onError(error)
      },
      onFinish: () => {
          dispatch(placeAnOrderIsFetching(false))
          if (typeof onFinish === 'function') onFinish()
        },
      onSuccess: (data: TOrderResponse) => {
          dispatch(orderIsPlaced(payload.ingredients, 
                  data['order']['number'], 
                  data['name']))
          if (typeof onSuccess === 'function') onSuccess(data)
      }
    })
  }
}