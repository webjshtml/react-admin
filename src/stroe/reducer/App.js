import { setTokenKey, setUsernameKey } from "../Type";
import { getToken, getUsername } from "@/utils/cookies"
// 全局配置
const app = {
    token: "" || getToken(),       // 登录后存储了 token 和 username
    username: "" || getUsername()
}

// config Reducer
const configReducer = function(state = app, action) {
    switch(action.type){
        // token
        case setTokenKey: {
            return {
                ...state,
                token: action.value,
            }
        }
        // username
        case setUsernameKey: {
            return {
                ...state,
                username: action.value,
            }
        }
        default:
            return state;
    }



    // if(action.type === configUploadStatus) {
    //     const stateData = JSON.parse(JSON.stringify(state));
    //     const data = stateData.status.filter(item => item.value === action.payload.value)
    //     data[0].label = action.payload.label
    //     return stateData;
    // }

    // return state;

    // return state;
}

export default configReducer;