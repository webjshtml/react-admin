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