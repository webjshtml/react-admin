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
 * 详情
 */
export function Detailed(data){
    return service.request({
        url: "/staff/detailed/",
        method: "post",
        data,
    })
}

/**
 * 禁启用
 */
export function Status(data){
    return service.request({
        url: "/staff/status/",
        method: "post",
        data,
    })
}

/**
 * 编辑
 */
export function Edit(data){
    return service.request({
        url: "/staff/edit/",
        method: "post",
        data,
    })
}

