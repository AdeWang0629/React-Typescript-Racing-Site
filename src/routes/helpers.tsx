import Cookies from "universal-cookie";

export const setToken =  (token: any) => {
    const cookies = new Cookies();
    cookies.set('token', token, {path: '/'}); // token is the
}

export const getToken = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    return token;
}

export const removeToken = () => {
    const cookies = new Cookies();
    cookies.remove('token');
}

export const setUserToken =  (user: any) => {
    const cookies = new Cookies();
    cookies.set('usertoken', user, {path: '/'}); // token is the
}

export const getUserToken = () => {
    const cookies = new Cookies();
    const token = cookies.get('usertoken');
    return token;
}

export const removeUserToken = () => {
    const cookies = new Cookies();
    cookies.remove('usertoken');
}
