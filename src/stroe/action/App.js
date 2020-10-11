import { setTokenKey, setUsernameKey } from "../Type";
// 方法
import { setToken, setUsername } from "@/utils/cookies"
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