import constructor from "./constructor";
import { swapConstructorItems,
         addFillingToConstructor,
         removeItemFromConstructor,
         addBunsToConstructor,
         addBlankItemToConstructor,
         removeBlankItemFromConstructor,
         swapWithBlank,
         resetConstructor } from "../actions/constructor";


describe('Редьюсер constructor', () => {
    const item = { 'filling': [0, 1, 2, 3, 4] }
    const item_with_blank = { 'filling': [0, 1, 2, {'_id': '-1', 'price': 0}, 3, 4] }

    it('возвращает начальное состояние при чужом экшене', () => {
      expect(constructor(item, {})).toEqual(item)
    })

    it('swapConstructorItems меняет местами элементы по индексу', () => {
        expect(
            constructor(item, swapConstructorItems(0, 3))
        ).toEqual(
            { 'filling': [3, 1, 2, 0, 4] }
        )
    })

    it('addFillingToConstructor вставляет элемент в массив по индексу', () => {
        expect(
            constructor(item, addFillingToConstructor(777, 2))
        ).toEqual(
            { 'filling': [0, 1, 777, 2, 3, 4] }
        )
    })
    
    it('removeItemFromConstructor удаляет элемент по индексу', () => {
        expect(
            constructor(item, removeItemFromConstructor(3))
        ).toEqual(
            { 'filling': [0, 1, 2, 4] }
        )
    })
    
    it('addBunsToConstructor добавляет булки в стор', () => {
        expect(
            constructor(item, addBunsToConstructor(777))
        ).toEqual(
            { 'filling': [0, 1, 2, 3, 4], 'buns': 777 }
        )
    })
    
    it('addBlankItemToConstructor добавляет пустой ингредиент в стор', () => {
        expect(
            constructor(item, addBlankItemToConstructor(3))
        ).toEqual(
            item_with_blank
        )
    })
    
    it('removeBlankItemFromConstructor удаляет пустой ингредиент из стора', () => {
        expect(
            constructor(item_with_blank, removeBlankItemFromConstructor())
        ).toEqual(
            item
        )
    })
    
    it('swapWithBlank заменяет в сторе пустой ингредиент на переданный', () => {
        const args = {item: 3}
        expect(
            constructor(item_with_blank, swapWithBlank(777))
        ).toEqual(
            { 'filling': [0, 1, 2, 777, 3, 4] }
        )
    })

    it('resetConstructor приводит стор к первоначальному состоянию', () => {
        expect(
            constructor(item, resetConstructor())
        ).toEqual(
            {'buns': undefined, 'filling': []}
        )
    })
})
