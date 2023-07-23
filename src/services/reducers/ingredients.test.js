import { getIngredientsSucceeded, getIngredientsIsFetching, storeIngredients } from "../actions/ingredients";
import ingredient from "./ingredients";


describe('Редьюсер ingredients', () => {
    const item = {'test': 'test', fetchingSuccess: false}

    it('возвращает начальное состояние при чужом экшене', () => {
        expect(
            ingredient(item, {})
        ).toEqual(item)
    })

    it('getIngredientsSucceeded записывает переданный статус в стор', () => {
        expect(
            ingredient(item, getIngredientsSucceeded(true))
        ).toEqual(
            {'test': 'test', fetchingSuccess: true}
        )
    })

    it('getIngredientsIsFetching записывает переданный статус в стор', () => {
        expect(
            ingredient(item, getIngredientsIsFetching(false))
        ).toEqual(
            {'test': 'test', fetchingSuccess: false, isFetching: false}
        )
    })

    it('storeIngredients помещает значение аргумента в стор', () => {
        expect(
            ingredient(item, storeIngredients(777))
        ).toEqual(
            {'test': 'test', fetchingSuccess: false, ingredients: 777}
        )
    })
})
