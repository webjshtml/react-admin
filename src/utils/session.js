const tokenAdmin = "adminToken";

export function setToken(value){
    sessionStorage.setItem(tokenAdmin, value)
}

export function getToken(){
    return sessionStorage.getItem(tokenAdmin);
}