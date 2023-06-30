import { BASE_URL } from "../constants";
import { THandlers, TActionFunc, TResponseSuccess, TIngredient,TIngredientGroup } from "../../utils/types";
import { customFetch } from "../../utils/customFetch";


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
export function storeIngredients(ingredients: Record<TIngredientGroup, TIngredient[]>) {
  return { type: STORE_INGREDIENTS, ingredients };
}


/*   функции - экшены   */
type TGetIngredientsResponse = TResponseSuccess & {
  data: TIngredient[]
}
export function getIngredients({onSuccess, 
                                onError, 
                                onFinish}: THandlers<TGetIngredientsResponse>
                                ): TActionFunc {
  return function(dispatch) {

    dispatch(getIngredientsSucceeded(true))
    dispatch(getIngredientsIsFetching(true))

    customFetch<TGetIngredientsResponse>(BASE_URL + 'ingredients', {
      onError: (error) => {
          dispatch(getIngredientsSucceeded(false))
          if (typeof onError === 'function') onError(error)
      },
      onFinish: () => {
          dispatch(getIngredientsIsFetching(false))
          if (typeof onFinish === 'function') onFinish()
        },
      onSuccess: (data: TGetIngredientsResponse) => {
          if (typeof onSuccess === 'function') onSuccess(data)
          console.log(data)
          dispatch(storeIngredients({
            'Булки': data.data.filter((x) => x.type === 'bun'), 
            'Соусы': data.data.filter((x) => x.type === 'sauce'),
            'Начинки': data.data.filter((x) => x.type === 'main')
          }))
      }
    })
  }
}