import { BASE_URL } from "../services/constants";
import { afterFetch } from "./after-fetch";
import { getCookie } from "./cookies";
import { saveTokens } from "./tokens";


export const refreshToken = (initialFetch) => {
    function onSuccess(data) {
        saveTokens(data)
        return initialFetch()
    }
    const token = localStorage.getItem('refreshToken')
    const promise = fetch(BASE_URL + 'auth/token', {
              method: 'post',
              body: JSON.stringify({ token }),
              headers: {'Accept': 'application/json', 
                        'Content-Type': 'application/json'}
    })
    return afterFetch(promise, {onSuccess})
   }



export function fetchWithRefresh(url, options={}) {
    function onError(error) {
        if (error.message !== 'jwt expired') {
            return Promise.reject(error);
        }
        return refreshToken(() => fetchWithRefresh(url, options))
    }
    options.headers.authorization = getCookie('accessToken')
    const promise = fetch(url, options)
    return afterFetch(promise, {onError})
}