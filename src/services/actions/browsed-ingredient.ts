import { TIngredient } from "../../utils/types";

/*   экшены   */
export const ADD_BROWSED_INGREDIENT = 'ADD_BROWSED_INGREDIENT';
export const REMOVE_BROWSED_INGREDIENT = 'REMOVE_BROWSED_INGREDIENT';


/*   генераторы экшенов   */
export function addBrowsedIngredient(item: TIngredient) {
  return { type: ADD_BROWSED_INGREDIENT, item };
}
export function removeBrowsedIngredient() {
  return { type: REMOVE_BROWSED_INGREDIENT };
}