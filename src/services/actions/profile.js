import { BASE_URL } from "../constants";
import { afterFetch } from "../../utils/after-fetch";
import { saveTokens, clearTokens } from "../../utils/tokens";
import { fetchWithRefresh } from "../../utils/fetch-with-refresh";

/*   экшены   */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';


/*   генераторы экшенов   */
export function loggedIn({email, name}) {
    return { type: LOGIN, email, name };
}
export function loggedOut() {
    return { type: LOGOUT };
}
export function setUser({email, name}) {
    return { type: SET_USER, email, name };
}


/*   функции - экшены   */
export function logIn(email, 
                      password, 
                      {onError, 
                       onSuccess, 
                       onFinish} = {}) {
    return function(dispatch) {
        function onSuccessFinal(data) {
            dispatch(loggedIn(data['user']))
            saveTokens(data)
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        const promise = fetch(BASE_URL + 'auth/login', {
                 method: 'post', 
                 body: JSON.stringify({email, password}),
                 headers: {'Accept': 'application/json', 
                           'Content-Type': 'application/json'}
        })
        afterFetch(promise, 
                   {onError, 
                    onFinish,
                    onSuccess: onSuccessFinal})
    }
  }


export function logOut({onError,
                        onSuccess, 
                        onFinish} = {}) {
    return function(dispatch) {
        function onSuccessFinal(data) {
            dispatch(loggedOut())
            clearTokens()
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        const token = localStorage.getItem('refreshToken')
        const promise = fetchWithRefresh(BASE_URL + 'auth/logout', {
            method: 'post', 
            body: JSON.stringify({ token }),
            headers: {'Accept': 'application/json', 
                      'Content-Type': 'application/json'}
        })
        afterFetch(promise, 
                   {onError, 
                    onFinish,
                    onSuccess: onSuccessFinal})
    }
}


export function register({email,
                          password, 
                          name},
                         {onSuccess, 
                          onError, 
                          onFinish} = {}) {
    return function(dispatch) {
        function onSuccessFinal(data) {
            dispatch(loggedIn(data['user']))
            saveTokens(data)
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        const promise = fetch(BASE_URL + 'auth/register', {
                method: 'post', 
                body: JSON.stringify({email, password, name}),
                headers: {'Accept': 'application/json', 
                          'Content-Type': 'application/json'}
        })
        afterFetch(promise, 
                   {onError, 
                    onFinish,
                    onSuccess: onSuccessFinal})
    }
}


export function getUser({onSuccess, 
                         onError, 
                         onFinish} = {}) {
    return function(dispatch) {
        function onSuccessFinal(data) {
            dispatch(loggedIn(data['user']))
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        const promise = fetchWithRefresh(BASE_URL + 'auth/user', {
                    method: 'get',
                    headers: {'Accept': 'application/json', 
                              'Content-Type': 'application/json'}
        })
        afterFetch(promise, 
                   {onFinish,
                    onError: () => undefined, 
                    onSuccess: onSuccessFinal}) 
        }
}


export function editUser(payload, 
                         {onSuccess, 
                          onError, 
                          onFinish}={}) {
    return function(dispatch) {
        function onSuccessFinal(data) {
            dispatch(setUser(data['user']))
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        
        const promise = fetchWithRefresh(BASE_URL + 'auth/user', {
                    method: 'PATCH',
                    data: JSON.stringify(payload),
                    headers: {'Accept': 'application/json', 
                              'Content-Type': 'application/json'}
        })
        afterFetch(promise, 
                   {onFinish,
                    onError, 
                    onSuccess: onSuccessFinal}) 
        }
}