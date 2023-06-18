import { BASE_URL } from "../services/constants";
import { afterFetch } from "./after-fetch";
import { getCookie } from "./cookies";
import { saveTokens } from "./tokens";


export const refreshToken = () => {
    const token = localStorage.getItem('refreshToken')
    const promise = fetch(BASE_URL + 'auth/token', {
              method: 'post',
              body: JSON.stringify({ token }),
              headers: {'Accept': 'application/json', 
                        'Content-Type': 'application/json'}
    })
    return afterFetch(promise, {onSuccess: (data) => saveTokens(data)})
   }



// export function fetchWithRefresh(url, options={}) {
//     function onError(error) {
//         if (error.message !== 'invalid token') {
//             console.log(error)
//             return Promise.reject(error);
//         }

//         return refreshToken().then(fetchWithRefresh(url, options))
//     }
//     options.headers.authorization = getCookie('accessToken')
//     const promise = fetch(url, options)
//     return afterFetch(promise, {onError})
// }


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };
  

export const fetchWithRefresh = async (url, options) => {
    try {
        options.headers.authorization = getCookie('accessToken')
        const res = await fetch(url, options);
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            await refreshToken();
            options.headers.authorization = getCookie('accessToken')
            const res = await fetch(url, options);
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};