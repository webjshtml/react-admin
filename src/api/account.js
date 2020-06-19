import service from "../../src/utils/request";

/**
 * 登录接口
 */
export function Login(data){
    return service.request({
        url: "/login/",
        method: "post",
        data, // 请求类型为 post 时
        // params: data // 请求类型为 get 时
    })
}

/**
 * 注册接口
 */
export function Register(data){
    return service.request({
        url: "/register/",
        method: "post",
        data, // 请求类型为 post 时
    })
}

/**
 * 获取验证码
 */
export function GetCode(data){
    return service.request({
        url: "/getSms/",
        method: "post",
        data, // 请求类型为 post 时
    })
}