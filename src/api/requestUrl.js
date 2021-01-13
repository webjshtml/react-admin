const requestUrl = {
    // departmen
    "departmentList": "/department/list/",           // 列表，有分页
    "getDepartmentList": "/department/departmentList/",           // 列表，无分页
    "departmentListDelete": "/department/delete/",   // 删除
    "departmentAdd": "/department/add/",             // 添加
    "departmentEdit": "/department/edit/",           // 编辑
    // job
    "jobList": "/job/list/",           // 列表
    "jobListAll": "/job/listAll/",           // 列表
    "jobAdd": "/job/add/",             // 添加
    "jobEdit": "/job/edit/",
    "jobListDelete": "/job/delete/",    // 职位删除
    // 职员
    "staffList": "/staff/list/",
    "staffListDelete": "/staff/delete/",  // 职员删除
    // 用户
    "userList": "/user/list/"

}
export default requestUrl;

/**
 * 添加职位
 * jobName: ""
 * status: ""
 * content: ""
 * parentId: ""
 */