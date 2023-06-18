import { setCookie } from "./cookies";


export const saveTokens = ({refreshToken, accessToken}) => {
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}


export const clearTokens = () => {
    setCookie('accessToken', '');
    localStorage.removeItem('refreshToken');
}