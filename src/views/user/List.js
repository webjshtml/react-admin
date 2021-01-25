import React, { Component, Fragment } from "react";
// antd
import { Button, Switch, message } from "antd";
// api
import { Status } from "@api/user";
// table 组件
import TableComponent from "@c/tableData/Index";
import UserModal from "./components/UserModal";
class StaffList extends Component {
    constructor(props){
        super(props);
        this.state = {
            // id
            id: "",
            // flag
            flag: false,
            // 请求参数
            pageNumber: 1,
            pageSize: 10,
            keyWork: "",
            // 表头
            tableConfig: {
                url: "userList",
                checkbox: true,
                thead: [
                    { 
                        title: "用户名", 
                        dataIndex: "username", 
                        key: "username"
                    },
                    { 
                        title: "真实姓名", 
                        dataIndex: "truename", 
                        key: "truename"
                    },
                    { 
                        title: "手机号", 
                        dataIndex: "phone", 
                        key: "phone"
                    },
                    { 
                        title: "禁启用", 
                        dataIndex: "status", 
                        key: "status",
                        render: (status, rowData) => {
                            return <Switch onChange={() => this.onHandlerSwitch(rowData)} loading={rowData.id === this.state.id} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={status} />
                        }
                    },
                    { 
                        title: "权限", 
                        dataIndex: "role_str", 
                        key: "role_str"
                    },
                    { 
                        title: "操作", 
                        dataIndex: "operation", 
                        key: "operation", 
                        width: 215,
                        render: (text, rowData) => {
                            return (
                                <div className="inline-button">
                                    <Button type="primary" onClick={() => this.userModal({status: true, user_id: rowData.id})}>编辑</Button>
                                    <Button onClick={() => this.delete(rowData.id)}>删除</Button>
                                    {/* 
                                        在父组件获取子组件的实例
                                        1、在子组件调用父组件方法，并把子组件实例传回给父组件，（已经存储了子组件的实例）
                                        2、通过实例调用子组件的方法
                                    */}
                                </div>
                            )
                        }
                    }
                ],
                formItem: [
                    { 
                        type: "Input",
                        label: "部门名称", 
                        name: "name", 
                        placeholder: "请输入部门名称"
                    },
                    { 
                        type: "Select",
                        label: "禁启用", 
                        name: "status", 
                        placeholder: "请选择",
                        style: { width: "100px" },
                        optionsKey: "status"
                    },
                ],
                formSearchCol: 18,
                formRightCol: 6,
            },
            // 表的数据
            data: []
        };
    }
    /** 生命周期挂载完成 */
    componentDidMount(){}

    // 获取子组件实例
    getChildRef = (ref) => {
        this.tableComponent = ref; // 存储子组件
    }
    // 获取弹窗子组件实例
    getUserModalRef = (ref) => { this.child = ref }
    // 显示弹窗
    userModal = (data) => {
        this.child.visibleModal(data);
    }
    
    /** 禁启用 */
    onHandlerSwitch(data){
        if(this.state.flag) { return false; }
        const requestData = {
            id: data.id,
            status: !data.status
        }
        // 第一种做法，用组件本身异步
        this.setState({id: data.id}) 
        // 第二种做法，自己做的开关
        // this.setState({flag: true}) 
        Status(requestData).then(response => {
            message.info(response.data.message);
            this.setState({id: ""})
            // this.setState({flag: false}) 
        }).catch(error => {
            this.setState({id: ""})
            // this.setState({flag: false}) 
        })
    }
    /** 删除 */
    delete = (id) => {
        this.tableComponent.onHandlerDelete(id)
    }
    render(){
        return (
            <Fragment>
                <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig}>
                    <Button type="primary" ref="userAdd" onClick={() => this.userModal({ status: true })}>新增用户</Button>
                </TableComponent>
                <UserModal onRef={this.getUserModalRef} />
            </Fragment>
        )
    }
}
export default StaffList;