import { TConstructorItem } from "../../utils/types";


/*   экшены   */
export const SWAP_WITH_BLANK: 'SWAP_WITH_BLANK' = 'SWAP_WITH_BLANK';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';
export const SWAP_CONSTRUCTOR_ITEMS: 'SWAP_CONSTRUCTOR_ITEMS' = 'SWAP_CONSTRUCTOR_ITEMS';
export const ADD_BUNS_TO_CONSTRUCTOR: 'ADD_BUNS_TO_CONSTRUCTOR' = 'ADD_BUNS_TO_CONSTRUCTOR';
export const ADD_FILLING_TO_CONSTRUCTOR: 'ADD_FILLING_TO_CONSTRUCTOR' = 'ADD_FILLING_TO_CONSTRUCTOR';
export const REMOVE_ITEM_FROM_CONSTRUCTOR: 'REMOVE_ITEM_FROM_CONSTRUCTOR' = 'REMOVE_ITEM_FROM_CONSTRUCTOR';
export const ADD_BLANK_ITEM_TO_CONSTRUCTOR: 'ADD_BLANK_ITEM_TO_CONSTRUCTOR' = 'ADD_BLANK_ITEM_TO_CONSTRUCTOR';
export const REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR: 'REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR' = 'REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR';


/*   генераторы экшенов   */
type TswapConstructorItems = {
  (dragIndex: number, 
   hoverIndex: number): {
    readonly type: typeof SWAP_CONSTRUCTOR_ITEMS;
    dragIndex: number;
    hoverIndex: number;
  }
}
type TaddFillingToConstructor = {
  (item: TConstructorItem, 
   index?: number): {
    readonly type: typeof ADD_FILLING_TO_CONSTRUCTOR;
    item: TConstructorItem;
    index: number;
  }
}
type TremoveItemFromConstructor = {
  (index: number): {
    readonly type: typeof REMOVE_ITEM_FROM_CONSTRUCTOR;
    index: number;
  }
}
type TaddBunsToConstructor = {
  (item: TConstructorItem): {
    readonly type: typeof ADD_BUNS_TO_CONSTRUCTOR;
    item: TConstructorItem;
  }
}
type TaddBlankItemToConstructor = {
  (index: number): {
    readonly type: typeof ADD_BLANK_ITEM_TO_CONSTRUCTOR;
    index: number;
  }
}
type TremoveBlankItemFromConstructor = {
  (): {readonly type: typeof REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR;}
}

type TswapWithBlank = {
  (item: TConstructorItem): {
    readonly type: typeof SWAP_WITH_BLANK;
    item: TConstructorItem;
  }
}
type TresetConstructor = {
  (): {readonly type: typeof RESET_CONSTRUCTOR;}
}

export type TConstrunctorActions = TswapConstructorItems
                                   | TaddFillingToConstructor
                                   | TremoveItemFromConstructor
                                   | TaddBunsToConstructor
                                   | TaddBlankItemToConstructor
                                   | TremoveBlankItemFromConstructor
                                   | TswapWithBlank
                                   | TresetConstructor

export const swapConstructorItems: TswapConstructorItems = (dragIndex, hoverIndex) => {
  return { type: SWAP_CONSTRUCTOR_ITEMS, dragIndex, hoverIndex };
}
export const addFillingToConstructor: TaddFillingToConstructor = (item, index = 0) => {
  return { type: ADD_FILLING_TO_CONSTRUCTOR, item, index };
}
export const removeItemFromConstructor: TremoveItemFromConstructor = (index) => {
  return { type: REMOVE_ITEM_FROM_CONSTRUCTOR, index };
}
export const addBunsToConstructor: TaddBunsToConstructor = (item) => {
  return { type: ADD_BUNS_TO_CONSTRUCTOR, item };
}
export const addBlankItemToConstructor: TaddBlankItemToConstructor = (index = 0) => {
  return { type: ADD_BLANK_ITEM_TO_CONSTRUCTOR, index };
}
export const removeBlankItemFromConstructor: TremoveBlankItemFromConstructor = () => {
  return { type: REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR };
}
export const swapWithBlank: TswapWithBlank = (item) => {
  return { type: SWAP_WITH_BLANK, item };
}
export const resetConstructor: TresetConstructor = () => {
  return { type: RESET_CONSTRUCTOR }
}