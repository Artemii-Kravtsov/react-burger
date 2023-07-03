import { LOGOUT, LOGIN, SET_USER } from '../actions/profile'
import { TAnyAction } from '.'
import { TStore } from '../../utils/types'


const profile = (state: TStore['profile'],
                 action: TAnyAction
                 ): TStore['profile'] => {
    switch (action.type) {
        case LOGIN:
            return {loggedIn: true, name: action.name, email: action.email}
        case LOGOUT:
            return {loggedIn: false, name: undefined, email: undefined}
        case SET_USER:
            return {...state, name: action.name, email: action.email}
        default:
            return state
    }
}

export default profile
