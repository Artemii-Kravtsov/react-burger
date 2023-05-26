import {ADD_FILLING_TO_CONSTRUCTOR, 
        SWAP_CONSTRUCTOR_ITEMS, 
        SWAP_WITH_BLANK,
        ADD_BUNS_TO_CONSTRUCTOR,
        REMOVE_ITEM_FROM_CONSTRUCTOR, 
        ADD_BLANK_ITEM_TO_CONSTRUCTOR,
        REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR} from '../actions/constructor'

const constructor = (state, action) => {
    const filling = [...state.filling]
    switch (action.type) {
        case SWAP_CONSTRUCTOR_ITEMS:
            const {dragIndex, hoverIndex} = action
            const dragItem = filling[dragIndex]
            const hoverItem = filling[hoverIndex]
            filling[dragIndex] = hoverItem
            filling[hoverIndex] = dragItem
            return {...state, filling}
        case SWAP_WITH_BLANK:
            const blankIdx = filling.map(x => x['_id'] === -1).indexOf(true)
            if (blankIdx === -1) return
            filling[blankIdx] = action.item
            return {...state, filling}
        case REMOVE_ITEM_FROM_CONSTRUCTOR:
            filling.splice(action.index, 1)
            return {...state, filling}
        case ADD_BLANK_ITEM_TO_CONSTRUCTOR:
            filling.splice(action.index, 0, {'_id': -1, 'price': 0})
            return {...state, filling}
        case REMOVE_BLANK_ITEM_FROM_CONSTRUCTOR:
            return {...state, 'filling': filling.filter(x => x['_id'] !== -1)}
        case ADD_BUNS_TO_CONSTRUCTOR:
            return {...state, 'buns': action.item}
        case ADD_FILLING_TO_CONSTRUCTOR:
            const {item, index} = action
            filling.splice(index, 0, item)
            return {...state, filling}      
        default:
            return state
    }
}

export default constructor



// Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients.
// Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
// Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
// Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
// Получение и обновление номера заказа в модальном окне OrderDetails.