import { initialState } from ".";
import { rootReducer } from ".";


describe('Корневой редьюсер', () => {

    it('возвращает начальное состояние', () => {
      expect(rootReducer(undefined, {})).toEqual(initialState)
    })

    it('состояние стора не изменяется когда приходит неизвестный экшен', () => {
      expect(rootReducer(initialState, {})).toEqual(initialState)
    })

})
