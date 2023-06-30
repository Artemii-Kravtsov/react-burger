import { BASE_URL } from "../constants";
import { customFetch } from "../../utils/customFetch";
import { saveTokens, clearTokens } from "../../utils/tokens";
import { THandlers, 
         TUserProfile, 
         TActionFunc, 
         TResponseSuccess, 
         TResponseMessage } from "../../utils/types";


/*   экшены   */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';


/*   генераторы экшенов   */
export function loggedIn({email, name}: {email: string, name: string}) {
    return { type: LOGIN, email, name };
}
export function loggedOut() {
    return { type: LOGOUT };
}
export function setUser({email, name}: {email: string, name: string}) {
    return { type: SET_USER, email, name };
}


type TUserInfo = {
    user: {email: string, name: string};
}

type TTokens = {
    accessToken: string;
    refreshToken: string;
}

/*   функции - экшены   */
type TLogInResponse = TResponseSuccess & TUserInfo & TTokens
export const logIn = (email: string, 
                      password: string, 
                      {onError, 
                       onSuccess, 
                       onFinish}: THandlers<TLogInResponse> = {}
                      ): TActionFunc => {
    return function(dispatch) {
        function onSuccessFinal(data: TLogInResponse): void {
            dispatch(loggedIn(data['user']))
            saveTokens(data)
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        customFetch<TLogInResponse>(BASE_URL + 'auth/login', {
                    method: 'post', 
                    body: JSON.stringify({email, password}),
                    onSuccess: onSuccessFinal,
                    onError, 
                    onFinish})
    }
  }


type TLogOutResponse = TResponseSuccess & TResponseMessage
export const logOut = ({onError,
                        onSuccess, 
                        onFinish}: THandlers<TLogOutResponse> = {}
                        ): TActionFunc => {
    return function(dispatch) {
        function onSuccessFinal(data: TLogOutResponse): void {
            dispatch(loggedOut())
            clearTokens()
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        const token = localStorage.getItem('refreshToken')
        customFetch<TLogOutResponse>(BASE_URL + 'auth/logout', {
                    method: 'post', 
                    body: JSON.stringify({ token }),
                    onSuccess: onSuccessFinal,
                    onError, 
                    onFinish})
    }
}


type TRegisterResponse = TResponseSuccess & TUserInfo & TTokens
export const register = ({email,
                          password, 
                          name}: TUserProfile,
                         {onSuccess, 
                          onError, 
                          onFinish}: THandlers<TRegisterResponse> = {}
                          ): TActionFunc => {
    return function(dispatch) {
        function onSuccessFinal(data: TRegisterResponse): void {
            dispatch(loggedIn(data['user']))
            saveTokens(data)
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        customFetch<TRegisterResponse>(BASE_URL + 'auth/register', {
                    method: 'post', 
                    body: JSON.stringify({email, password, name}),
                    onSuccess: onSuccessFinal,
                    onError, 
                    onFinish})
    }
}


type TGetUserResponse = TResponseSuccess & TUserInfo
export const getUser = ({onSuccess,
                         onFinish}: THandlers<TGetUserResponse> = {}
                         ): TActionFunc => {
    return function(dispatch) {
        function onSuccessFinal(data: TGetUserResponse) {
            dispatch(loggedIn(data['user']))
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        customFetch<TGetUserResponse>(BASE_URL + 'auth/user', {
                    method: 'get',
                    onFinish,
                    onError: () => undefined, 
                    onSuccess: onSuccessFinal,
                    withRefresh: true}) 
        }
}


type TEditUserResponse = TResponseSuccess & TUserInfo
export const editUser = (payload: Partial<TUserProfile>, 
                         {onSuccess, 
                          onError, 
                          onFinish}: THandlers<TEditUserResponse> = {}
                         ): TActionFunc => {
    return function(dispatch) {
        function onSuccessFinal(data: TEditUserResponse) {
            dispatch(setUser(data['user']))
            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        }
        customFetch<TEditUserResponse>(BASE_URL + 'auth/user', {
                    method: 'PATCH',
                    body: JSON.stringify(payload),
                    onSuccess: onSuccessFinal,
                    onFinish,
                    onError,
                    withRefresh: true}) 
        }
}