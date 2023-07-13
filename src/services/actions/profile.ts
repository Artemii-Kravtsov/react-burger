import { BASE_URL } from "../constants";
import { customFetch } from "../../utils/customFetch";
import { saveTokens, clearTokens } from "../../utils/tokens";
import { THandlers, 
         TUserProfile,
         TResponseSuccess, 
         TResponseMessage } from "../../utils/types";
import { AppDispatch, AppThunk } from "../..";


/*   экшены   */
export const LOGIN: 'LOGIN' = 'LOGIN';
export const LOGOUT: 'LOGOUT' = 'LOGOUT';
export const SET_USER: 'SET_USER' = 'SET_USER';



/*   генераторы экшенов   */
type TUserInfoContent = {
    readonly email: string;
    readonly name: string;
}
type TLoggedIn<UserData> = {
    (a: UserData): UserData & {
        readonly type: typeof LOGIN;
    }
}
type TLoggedOut = {
    (): {readonly type: typeof LOGOUT;}
}
type TSetUser<UserData> = {
    (a: UserData): UserData & {
        readonly type: typeof SET_USER;
    }
}
type TUserInfo = Record<'user', TUserInfoContent>;

type TTokens = {
    accessToken: string;
    refreshToken: string;
}

export type TProfileActions = TLoggedIn<TUserInfoContent> | TSetUser<TUserInfoContent> | TLoggedOut

export const loggedIn: TLoggedIn<TUserInfoContent> = ({email, name}) => {
    return { type: LOGIN, email, name };
}
export const loggedOut: TLoggedOut = () => {
    return { type: LOGOUT };
}
export const setUser: TSetUser<TUserInfoContent> = ({email, name}) => {
    return { type: SET_USER, email, name };
}


/*   функции - экшены   */
type TLogInResponse = TResponseSuccess & TUserInfo & TTokens
export const logIn = (email: string, 
                      password: string, 
                      {onError, 
                       onSuccess, 
                       onFinish}: THandlers<TLogInResponse> = {}
                      ) => {
    return function(dispatch: AppDispatch) {
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
                        ) => {
    return function(dispatch: AppDispatch) {
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
                          ) => {
    return function(dispatch: AppDispatch) {
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
                         ) => {
    return function(dispatch: AppDispatch) {
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
                         ) => {
    return function(dispatch: AppDispatch) {
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