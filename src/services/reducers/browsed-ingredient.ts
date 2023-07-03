import {ADD_BROWSED_INGREDIENT, REMOVE_BROWSED_INGREDIENT} from '../actions/browsed-ingredient'
import { TStore } from '../../utils/types'
import { TAnyAction } from '.'


const browsedIngredient = (state: TStore["browsedIngredient"], 
                           action: TAnyAction
                           ): TStore["browsedIngredient"] => {
    switch (action.type) {
        case ADD_BROWSED_INGREDIENT:
            return action.item
        case REMOVE_BROWSED_INGREDIENT:
            return undefined
        default:
            return state
    }
}

export default browsedIngredient