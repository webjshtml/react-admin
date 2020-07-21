import cookies from "react-cookies";

const token = "adminToken";
const user = "username";

// 存储token
export function setToken(value){
    cookies.save(token, value);
}
export function getToken(){
    return cookies.load(token);
}

// 存储用户名
export function setUsername(value){
    cookies.save(user, value);
}
export function getUsername(){
    return cookies.load(user);
}