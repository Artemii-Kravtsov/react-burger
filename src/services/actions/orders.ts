import { BASE_URL } from "../constants";
import { THandlers, TActionFuncWithState, TResponseSuccess } from "../../utils/types";
import { customFetch } from "../../utils/customFetch";

/*   экшены   */
export const ORDER_IS_PLACED = 'ORDER_IS_PLACED';
export const PLACE_AN_ORDER_SUCCESS = 'PLACE_AN_ORDER_SUCCESS';
export const PLACE_AN_ORDER_FAILURE = 'PLACE_AN_ORDER_FAILURE';
export const PLACE_AN_ORDER_IS_FETCHING = 'PLACE_AN_ORDER_IS_FETCHING';


/*   генераторы экшенов   */
export function placeAnOrderSucceeded(status: boolean =true) {
  return { type: status ? PLACE_AN_ORDER_SUCCESS : PLACE_AN_ORDER_FAILURE };
}
export function placeAnOrderIsFetching(status: boolean = false) {
  return { type: PLACE_AN_ORDER_IS_FETCHING, status };
}
export function orderIsPlaced(ingredients: string[], orderId: number, name: string) {
  return { type: ORDER_IS_PLACED, ingredients, orderId, name };
}


/*   функции - экшены   */
type TOrderResponse = TResponseSuccess & {
  order: {number: number};
  name: string;
}
export const placeAnOrder = ({onSuccess, 
                              onError, 
                              onFinish}: THandlers<TOrderResponse> = {}
                              ): TActionFuncWithState => {
  return function(dispatch, getState) {
    const constructor = getState().constructor
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