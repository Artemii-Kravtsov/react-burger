import { TIngredient } from "../../utils/types";

/*   экшены   */
export const ADD_BROWSED_INGREDIENT: 'ADD_BROWSED_INGREDIENT' = 'ADD_BROWSED_INGREDIENT';
export const REMOVE_BROWSED_INGREDIENT: 'REMOVE_BROWSED_INGREDIENT' = 'REMOVE_BROWSED_INGREDIENT';


/*   генераторы экшенов   */
type TaddBrowsedIngredient = {
  (item: TIngredient): {
    readonly type: typeof ADD_BROWSED_INGREDIENT;
    readonly item: TIngredient;
  }
}
type TremoveBrowsedIngredient = {
  (): {readonly type: typeof REMOVE_BROWSED_INGREDIENT}
}

export type TBrowsedIngredientActions = TaddBrowsedIngredient | TremoveBrowsedIngredient

export const addBrowsedIngredient: TaddBrowsedIngredient = (item) => {
  return { type: ADD_BROWSED_INGREDIENT, item };
}
export const removeBrowsedIngredient: TremoveBrowsedIngredient = () => {
  return { type: REMOVE_BROWSED_INGREDIENT };
}