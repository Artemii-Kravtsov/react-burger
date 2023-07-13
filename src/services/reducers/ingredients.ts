import { GET_INGREDIENTS_IS_FETCHING, 
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILURE,
         STORE_INGREDIENTS } from '../actions/ingredients'
import { TAnyAction } from '.'
import { TStore } from '../../utils/types'


const ingredient = (state: TStore['ingredients'], 
                    action: TAnyAction
                    ): TStore['ingredients'] => {
switch (action.type) {
   case STORE_INGREDIENTS:
       return {...state, ingredients: action.ingredients}
   case GET_INGREDIENTS_SUCCESS:
       return {...state, fetchingSuccess: true}
   case GET_INGREDIENTS_FAILURE:
       return {...state, fetchingSuccess: false}
   case GET_INGREDIENTS_IS_FETCHING:
       return {...state, isFetching: action.status}
   default:
       return state
}
}

export default ingredient
