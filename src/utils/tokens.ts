import { setCookie } from "./cookies";


export const saveTokens = ({refreshToken, 
                            accessToken}: 
                                {refreshToken: string, 
                                 accessToken: string}): void => {
setCookie('accessToken', accessToken, {path: '/', samesite: 'lax'});
localStorage.setItem('refreshToken', refreshToken);
}


export const clearTokens = (): void => {
    setCookie('accessToken', '', {path: '/', 'max-age': -1});
    localStorage.removeItem('refreshToken');
}