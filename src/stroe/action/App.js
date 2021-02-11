import { setTokenKey, setUsernameKey, logout, router, login } from "../Type";
// 方法
import { setToken, setUsername, removeToken, removeUsername } from "@/utils/cookies";
// API
import { Login } from "../../api/account";
import { getUserRole } from "../../api/user";
// 路由
import Router from "../../router/index";

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

export function updateRouter(data){
    return {
        type: router,
        value: data
    }
}

// 路由权限判断
export function hasPermission(role, router){
    if(router.role && router.role.length > 0) {
        return role.some(elem => router.role.indexOf(elem) >= 0);
    }
}

// 登录逻辑
export const accountLoginAction = (data) => dispatch => {
    // return new Promise((resolve, reject) => {
    //     Login(data).then(response => {
    //         const data = response.data.data;
    //         dispatch(setTokenAction(data.token));
    //         dispatch(setUsernameAction(data.username));
    //         reject();
    //     }).catch(error => {
    
    //     })
    // })
    return dispatch({
        type: login,
        payload: new Promise((resolve, reject) => {
            Login(data).then(response => {
                const data = response.data.data;
                dispatch(setTokenAction(data.token));
                dispatch(setUsernameAction(data.username));
                resolve();
            }).catch(error => {
        
            })
        })
    })
    // return Login(data).then(response => {
    //     const data = response.data.data;
    //     dispatch(setTokenAction(data.token));
    //     dispatch(setUsernameAction(data.username));
    // }).catch(error => {

    // })
}

// 获取用户角色
export const getUserRoleAction = () => dispatch => {
    return getUserRole().then(response => {
        const data = response.data.data;
        // 角色 
        const role = data.role.split(",");
        // // 存储路由
        let routerArray = [];
        if(role.includes("admin")) {
            routerArray = Router;
        }else{
            routerArray = Router.filter((item) => {
                // 第一层
                if(hasPermission(role, item)) {
                    if(item.child && item.child.length > 0) {
                        item.child = item.child.filter((child) => {
                            if(hasPermission(role, child)) {
                                return child;
                            }
                            return false;
                        })
                        return item;
                    }
                    return item;
                }
                return false;
            })
        }
        dispatch(updateRouter(routerArray));
    }).catch(error => {

    })
}