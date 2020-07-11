// 建立上下文件关系
const files = require.context("../../views/", true, /\.js$/); // 第一个参数：目录，第二参数：是否查找子级目录，第三参数：指定查找到文件
// 声明组件对象
const components = [];
// 循环文件
files.keys().map((key) => {
    // 过滤 index、login
    if(key.includes("./index/") || key.includes("./login/")) { return false; }
    // 分割字符串
    const splitFilesName = key.split(".");
    const jsonObj = {};
    // path
    const path = `/index${splitFilesName[1].toLowerCase()}`;
    // component
    const component = files(key).default;
    // 写入对象
    jsonObj.path = path;
    jsonObj.component = component;
    components.push(jsonObj);
})
export default components;