import { setTokenKey, setUsernameKey, logout } from "../Type";
// 方法
import { setToken, setUsername, removeToken, removeUsername } from "@/utils/cookies"
export function setTokenAction(data){
    setToken(data);
    return {
        type: setTokenKey,
        value: data
    }
}
            
export function setUsernameAction(data){
    setUsername(data);
    return {
        type: setUsernameKey,
        value: data
    }
}

export function logoutAction(){
    removeToken();
    removeUsername();
    return {
        type: logout,
        value: ""
    }
}