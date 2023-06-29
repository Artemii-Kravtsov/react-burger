import { LOGOUT, LOGIN, SET_USER } from '../actions/profile'

const profile = (state, action) => {
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