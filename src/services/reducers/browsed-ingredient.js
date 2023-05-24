import {ADD_BROWSED_INGREDIENT, REMOVE_BROWSED_INGREDIENT} from '../actions/browsed-ingredient'


const browsedIngredient = (state, action) => {
    switch (action.type) {
        case ADD_BROWSED_INGREDIENT:
            return action.item
        case REMOVE_BROWSED_INGREDIENT:
            return new Object()
        default:
            return state
    }
}

export default browsedIngredient