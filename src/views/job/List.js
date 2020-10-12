import React, { Component, Fragment } from "react";
// 
import { Link } from "react-router-dom";
// antd
import { Button, Switch, message } from "antd";
// api
import { Status } from "@api/department";
// table 组件
import TableComponent from "@c/tableData/Index";
// Store
import Store from "@/stroe/Index";
// action
import { addStatus, uploadStatus } from "@/stroe/action/Config";
class DepartmentList extends Component {
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
                url: "jobList",
                checkbox: true,
                thead: [
                    { 
                        title: "职位名称", 
                        dataIndex: "jobName", 
                        key: "jobName"
                    },
                    { 
                        title: "部门名称", 
                        dataIndex: "name", 
                        key: "name"
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
                        title: "操作", 
                        dataIndex: "operation", 
                        key: "operation", 
                        width: 215,
                        render: (text, rowData) => {
                            return (
                                <div className="inline-button">
                                    <Button type="primary">
                                        <Link to={{ pathname: '/index/job/add', state:{ id: rowData.jobId}}}>编辑</Link>
                                    </Button>
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
                ]
            },
            // 表的数据
            data: []
        };
    }
    /** 生命周期挂载完成 */
    componentDidMount(){
        Store.subscribe(() =>
            console.log(Store.getState())
        );

        Store.dispatch(addStatus({
            label: "所有",
            value: "all"
        }))

        // Store.dispatch(uploadStatus("aaaaa", false))
    }
    // 获取子组件实例
    getChildRef = (ref) => {
        this.tableComponent = ref; // 存储子组件
    }
    
    /** 禁启用 */
    onHandlerSwitch(data){
        if(!data.status) { return false; }
        if(this.state.flag) { return false; }
        const requestData = {
            id: data.id,
            status: data.status === "1" ? false : true
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
                <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig} />
            </Fragment>
        )
    }
}
export default DepartmentList;