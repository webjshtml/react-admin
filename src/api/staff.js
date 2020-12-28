import service from "../../src/utils/request";

/**
 * 添加
 */
export function Add(data){
    return service.request({
        url: "/staff/add/",
        method: "post",
        data,
    })
}

/**
 * 添加
 */
export function Detailed(data){
    return service.request({
        url: "/staff/add/",
        method: "post",
        data,
    })
}