import { BASE_URL } from "../constants";

/*   экшены   */
export const GET_INGREDIENTS_IS_FETCHING = 'GET_INGREDIENTS_IS_FETCHING';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_FAILURE';
export const STORE_INGREDIENTS = 'STORE_INGREDIENTS';


/*   генераторы экшенов   */
export function getIngredientsSucceeded(status=true) {
  return { type: status ? GET_INGREDIENTS_SUCCESS : GET_INGREDIENTS_FAILURE };
}
export function getIngredientsIsFetching(status=false) {
  return { type: GET_INGREDIENTS_IS_FETCHING, status };
}
export function storeIngredients(ingredients) {
  return { type: STORE_INGREDIENTS, ingredients };
}


/*   функции - экшены   */
export function getIngredients({onSuccess=()=>undefined, onError=()=>undefined, onFinish=()=>undefined}) {
  return function(dispatch) {

    dispatch(getIngredientsSucceeded(true))
    dispatch(getIngredientsIsFetching(true))

    fetch(BASE_URL + 'ingredients')
    .then((response) => {
        if (response.ok) return response.json()
        return Promise.reject(response.status)
    })
    .then((data) => {
        if (data['success'] !== true) {
            return Promise.reject(JSON.stringify(data).substring(0, 500))
        }
        dispatch(storeIngredients({
          'Булки': data.data.filter((x) => x.type === 'bun'), 
          'Соусы': data.data.filter((x) => x.type === 'sauce'),
          'Начинки': data.data.filter((x) => x.type === 'main')
        }))
    })
    .finally(() => {
        dispatch(getIngredientsIsFetching(false))
    })
    .then(() => {
        if (typeof onSuccess === 'function') {
            onSuccess()
        }
    })
    .catch((error) => {
        dispatch(getIngredientsSucceeded(false))
        if (typeof onError === 'function') {
            onError(error)
        }
    })

    onFinish()

  }
}