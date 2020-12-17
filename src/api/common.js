import service from "../../src/utils/request";
/**
 * 列表
 */
export function TableList(params){
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data
    })
}

/**
 * 删除列表
 */
export function TableDelete(params){
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data
    })
}

/**
 * 公用API
 */
export function requestData(params){
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data || {}
    })
}

/**
 * 七牛云token
 */
export function UploadToken(data){
    return service.request({
        url: "/uploadIToken/",
        method: "post",
        data
    })
}

/**
 * 富文本图片上传
 */
export function Upload(data){
    return service.request({
        url: "/upload/",
        method: "post",
        data
    })
}