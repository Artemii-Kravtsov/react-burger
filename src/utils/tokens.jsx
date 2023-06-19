import { setCookie } from "./cookies";


export const saveTokens = ({refreshToken, accessToken}) => {
    setCookie('accessToken', accessToken, {path: '/', samesite: 'lax'});
    localStorage.setItem('refreshToken', refreshToken);
}


export const clearTokens = () => {
    setCookie('accessToken', '', {path: '/', 'max-age': -1});
    localStorage.removeItem('refreshToken');
}