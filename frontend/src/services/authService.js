import jwtDecode from "jwt-decode";

const tokenKey = "token";

const uiLogin = (jwt) => {
    localStorage.setItem(tokenKey, jwt);
}

const uiLogout = () => {
    localStorage.removeItem(tokenKey);
}

const getJWT = () => {
    return localStorage.getItem(tokenKey);
}

const getCurrentUser = () => {
    try {
        const jwt = getJWT();
        return jwtDecode(jwt);
    } catch (e) {
        return null;
    }
}

const authService = {
    uiLogin,
    uiLogout,
    getJWT,
    getCurrentUser,
}

export default authService;