import axios from "axios";
// antd
import { message } from "antd";
// cookies
import { getToken, getUsername } from "./cookies";
//第一步，创建实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
});


// 第二步，请求拦截（请求头）
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 Token, Username
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 第三步，响应拦截（响应头）
service.interceptors.response.use(function (response) {  // http状态为200
    // 对响应数据做点什么
    const data = response.data;
    if(data.resCode !== 0) { // resCode不成功
        message.info(data.message); // 全局的错误拦截提示
        // 可以针对某些 resCode 值，进行业务逻辑处理
        if(data.resCode === 1023) { 
            alert(11111)
        }
        return Promise.reject(response)
    } else { // resCode成功
        return response;
    }
}, function (error) {  // http 状态不为200
    // const data = error.request;
    // 对响应错误做点什么
    return Promise.reject(error.request);
});

export default service;