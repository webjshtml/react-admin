import service from "../../src/utils/request";

/**
 * 获取角色权限 
 */
export function GetRoles(data = {}){
    return service.request({
        url: "/role/",
        method: "post",
        data
    })
}