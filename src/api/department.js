import service from "../../src/utils/request";

/**
 * 添加
 */
export function DepartmentAddApi(data){
    return service.request({
        url: "/department/add/",
        method: "post",
        data,
    })
}

/**
 * 列表
 */
export function GetList(data){
    return service.request({
        url: "/department/list/",
        method: "post",
        data,
    })
}

/**
 * 删除
 */
export function Delete(data){
    return service.request({
        url: "/department/delete/",
        method: "post",
        data,
    })
}