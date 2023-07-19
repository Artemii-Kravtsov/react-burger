import browsedIngredient from "./browsed-ingredient";
import { addBrowsedIngredient, removeBrowsedIngredient } from "../actions/browsed-ingredient";


describe('Редьюсер browsedIngredient', () => {
    const item = {'test': 'test'}

    it('возвращает начальное состояние при чужом экшене', () => {
      expect(browsedIngredient(item, {})).toEqual(item)
    })

    it('addBrowsedIngredient записывает переданный аргумент в стор', () => {
        expect(browsedIngredient(undefined, addBrowsedIngredient(item))).toEqual(item)
    })

    it('removeBrowsedIngredient очищает стор', () => {
        expect(browsedIngredient(item, removeBrowsedIngredient())).toEqual(undefined)
    })
})
