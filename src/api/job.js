import service from "../../src/utils/request";

/**
 * 添加
 */
export function Add(data){
    return service.request({
        url: "/job/add/",
        method: "post",
        data,
    })
}

/**
 * 列表
 */
export function GetList(data){
    return service.request({
        url: data.url,
        method: "post",
        data,
    })
}

/**
 * 详情
 */
export function Detailed(data){
    return service.request({
        url: "/job/detailed/",
        method: "post",
        data,
    })
}

/**
<<<<<<< HEAD
 * 禁启用
=======
 * 详情
>>>>>>> d98af0f9bdda13ff3ca971646c4c6a092aa5fb90
 */
export function Status(data){
    return service.request({
        url: "/job/status/",
        method: "post",
        data,
    })
<<<<<<< HEAD
}
=======
}
>>>>>>> d98af0f9bdda13ff3ca971646c4c6a092aa5fb90
