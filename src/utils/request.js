import axios from "axios";

//第一步，创建实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
});



// 第二步，请求拦截
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



// 第三步，响应拦截
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;