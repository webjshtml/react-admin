import service from "../../src/utils/request";

/**
 * 添加
 */
export function UserAdd(data){
    return service.request({
        url: "/user/add/",
        method: "post",
        data,
    })
}

/**
 * 详情
 */
export function UserDetailed(data){
    return service.request({
        url: "/user/detailed/",
        method: "post",
        data,
    })
}
