import { resetConstructor } from "./constructor";
import { BASE_URL } from "../constants";

/*   экшены   */
export const ORDER_IS_PLACED = 'ORDER_IS_PLACED';
export const PLACE_AN_ORDER_SUCCESS = 'PLACE_AN_ORDER_SUCCESS';
export const PLACE_AN_ORDER_FAILURE = 'PLACE_AN_ORDER_FAILURE';
export const PLACE_AN_ORDER_IS_FETCHING = 'PLACE_AN_ORDER_IS_FETCHING';


/*   генераторы экшенов   */
export function placeAnOrderSucceeded(status=true) {
  return { type: status ? PLACE_AN_ORDER_SUCCESS : PLACE_AN_ORDER_FAILURE };
}
export function placeAnOrderIsFetching(status=false) {
  return { type: PLACE_AN_ORDER_IS_FETCHING, status };
}
export function orderIsPlaced(ingredients, orderId) {
  return { type: ORDER_IS_PLACED, ingredients, orderId };
}


/*   функции - экшены   */
export function placeAnOrder({onSuccess=()=>undefined, onError=()=>undefined, onFinish=()=>undefined}) {
  return function(dispatch, getState) {
    const bunsId = getState().constructor.buns._id
    const fillingsId = getState().constructor.filling.map(x => x._id)
    const payload = {"ingredients": [bunsId, ...fillingsId]}

    if (!(bunsId && fillingsId.length)) {
        dispatch(placeAnOrderSucceeded(false))
        onError()
        return
    }

    dispatch(placeAnOrderSucceeded(true))
    dispatch(placeAnOrderIsFetching(true))

    fetch(BASE_URL + 'orders', {method: 'post', body: JSON.stringify(payload),
                                headers: {'Accept': 'application/json', 
                                          'Content-Type': 'application/json'}})
    .then((response) => {
        if (response.ok) return response.json()
        return Promise.reject(response.status)
    })
    .then((data) => {
        if (data['success'] !== true) {
            return Promise.reject(JSON.stringify(data).substring(0, 500))
        }
        // dispatch(resetConstructor())
        dispatch(orderIsPlaced(payload.ingredients, data['order']['number']))
    })
    .finally(() => {
        dispatch(placeAnOrderIsFetching(false))
    })
    .then(() => {
        if (typeof onSuccess === 'function') onSuccess()
    })
    .catch((error) => {
        dispatch(placeAnOrderSucceeded(false))
        if (typeof onError === 'function') onError(error)
    })

    onFinish()

  }
}