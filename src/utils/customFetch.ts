import { BASE_URL } from "../services/constants";
import { getCookie } from "./cookies";
import { saveTokens } from "./tokens";
import { THandlers } from "./types";


class TokenExpiryError {
    prototype = Object.create(Error.prototype)
}


type TInputObject<T> = THandlers<T> 
                       & Omit<RequestInit, 'headers'> 
                       & {'headers'?: Record<string, string>}
                       & {withRefresh?: boolean}



export async function customFetch <T>(url: string, 
                                      {onError,
                                       onSuccess, 
                                       onFinish,
                                       withRefresh,
                                       ...fetchOptions
                                       }: TInputObject<T> = {withRefresh: false}
                                       ): Promise<T | undefined> {
    const options: RequestInit & {'headers': Record<string, string>} = {
        ...fetchOptions, 
        headers: {...fetchOptions.headers, 
                  'Accept': 'application/json', 
                  'Content-Type': 'application/json'}
    }
    if (withRefresh) {
        options.headers['Authorization'] = getCookie('accessToken') || ''
    }
    try {
        const response = await (await fetch(url, options)).json()
        if (!Object.keys(response).includes('success') || !response['success']) {
                if (response.message === "jwt expired") {
                    throw new TokenExpiryError()
                } else {
                    throw new Error(response)
                }
            }
        if (typeof onSuccess === 'function') {
            onSuccess(response)
        }
        return response
    } catch (error) {
        if ( error instanceof TokenExpiryError ) {
            const token = localStorage.getItem('refreshToken')
            await customFetch(BASE_URL + 'auth/token', 
                              {method: 'post',
                               body: JSON.stringify({ token }),
                               onError: () => undefined,
                               onSuccess: saveTokens})
            return await customFetch(url, 
                                     {onError, 
                                      onSuccess, 
                                      onFinish, 
                                      ...fetchOptions})
        } else {
            if (typeof onError === 'function') {
                onError(error as Error)
                return
            } else {
                throw error
            }
        }
    } finally {
        if (typeof onFinish === 'function') {
            onFinish()
        }
    }
}