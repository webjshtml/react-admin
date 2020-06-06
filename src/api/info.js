/**
 * 登录接口
 */
export function infoList(data){
    return service.request({
        url: "/login/",
        method: "post",
        data, // 请求类型为 post 时
        // params: data // 请求类型为 get 时
    })
}

/**
 * 登录接口
 */
export function infoDetailed(data){
    return service.request({
        url: "/login/",
        method: "post",
        data, // 请求类型为 post 时
        // params: data // 请求类型为 get 时
    })
}