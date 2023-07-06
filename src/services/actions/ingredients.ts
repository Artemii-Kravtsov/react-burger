import { BASE_URL } from "../constants";
import { THandlers, TResponseSuccess, TIngredient, TIngredientGroup } from "../../utils/types";
import { customFetch } from "../../utils/customFetch";
import { AppThunk, AppDispatch } from "../..";

/*   экшены   */
export const GET_INGREDIENTS_IS_FETCHING: 'GET_INGREDIENTS_IS_FETCHING' = 'GET_INGREDIENTS_IS_FETCHING';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILURE: 'GET_INGREDIENTS_FAILURE' = 'GET_INGREDIENTS_FAILURE';
export const STORE_INGREDIENTS: 'STORE_INGREDIENTS' = 'STORE_INGREDIENTS';


/*   генераторы экшенов   */
type TSucceeded = {
  (status: boolean): {readonly type: typeof GET_INGREDIENTS_SUCCESS | typeof GET_INGREDIENTS_FAILURE}
}
type TIsFetching = {
  (status: boolean): {
    readonly type: typeof GET_INGREDIENTS_IS_FETCHING;
    readonly status: boolean
  }
}
type TStoreIngredients = {
  (ingredients: Record<TIngredientGroup, TIngredient[]>): {
    readonly type: typeof STORE_INGREDIENTS;
    readonly ingredients: Record<TIngredientGroup, TIngredient[]>
  }
}
export type TIngredientsActions = TStoreIngredients | TIsFetching | TSucceeded

export const getIngredientsSucceeded: TSucceeded = (status=true) => {
  return { type: status ? GET_INGREDIENTS_SUCCESS : GET_INGREDIENTS_FAILURE };
}
export const getIngredientsIsFetching: TIsFetching = (status=false) => {
  return { type: GET_INGREDIENTS_IS_FETCHING, status };
}
export const storeIngredients: TStoreIngredients = (ingredients) => {
  return { type: STORE_INGREDIENTS, ingredients };
}


/*   функции - экшены   */
type TGetIngredientsResponse = TResponseSuccess & {
  data: TIngredient[]
}
export const getIngredients = ({onSuccess, 
                                onError, 
                                onFinish}: THandlers<TGetIngredientsResponse>
                                ) => {
  return function(dispatch: AppDispatch) {

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
          dispatch(storeIngredients({
            'Булки': data.data.filter((x) => x.type === 'bun'), 
            'Соусы': data.data.filter((x) => x.type === 'sauce'),
            'Начинки': data.data.filter((x) => x.type === 'main')
          }))
      }
    })
  }
}