import { TConstructorItem } from "../../utils/types";


/*   экшены   */
export const SWAP_WITH_BLANK = 'SWAP_WITH_BLANK';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';
export const SWAP_CONSTRUCTOR_ITEMS = 'SWAP_CONSTRUCTOR_ITEMS';
export const ADD_BUNS_TO_CONSTRUCTOR = 'ADD_BUNS_TO_CONSTRUCTOR';
export const ADD_FILLING_TO_CONSTRUCTOR = 'ADD_FILLING_TO_CONSTRUCTOR';
export const REMOVE_ITEM_FROM_CONSTRUCTOR = 'REMOVE_ITEM_FROM_CONSTRUCTOR';
export const ADD_BLANK_ITEM_TO_CONSTRUCTOR = 'ADD_BLANK_ITEM_TO_CONSTRUCTOR';
export const REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR = 'REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR';


/*   генераторы экшенов   */
export function swapConstructorItems(dragIndex: number, hoverIndex: number) {
  return { type: SWAP_CONSTRUCTOR_ITEMS, dragIndex, hoverIndex };
}
export function addFillingToConstructor(item: TConstructorItem, index: number = 0) {
  return { type: ADD_FILLING_TO_CONSTRUCTOR, item, index };
}
export function removeItemFromConstructor(index: number) {
  return { type: REMOVE_ITEM_FROM_CONSTRUCTOR, index };
}
export function addBunsToConstructor(item: TConstructorItem) {
  return { type: ADD_BUNS_TO_CONSTRUCTOR, item };
}
export function addBlankItemToConstructor(index: number = 0) {
  return { type: ADD_BLANK_ITEM_TO_CONSTRUCTOR, index };
}
export function removeBlankItemFromConstructor() {
  return { type: REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR };
}
export function swapWithBlank(item: TConstructorItem) {
  return { type: SWAP_WITH_BLANK, item };
}
export function resetConstructor() {
  return { type: RESET_CONSTRUCTOR }
}