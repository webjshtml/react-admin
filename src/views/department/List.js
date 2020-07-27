import React, { Component, Fragment } from "react";
// antd
import { Form, Input, Button, Table, Switch, message } from "antd";
// api
import { GetList, Delete } from "@api/department";
class DepartmentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            // 请求参数
            pageNumber: 1,
            pageSize: 10,
            keyWork: "",
            // 复选框数据
            selectedRowKeys: [],
            // 表头
            columns: [
                { title: "部门名称", dataIndex: "name", key: "name" },
                { 
                    title: "禁启用", 
                    dataIndex: "status", 
                    key: "status",
                    render: (text, rowData) => {
                        return <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status === "1" ? true : false} />
                    }
                },
                { title: "人员数量", dataIndex: "number", key: "number" },
                { 
                    title: "操作", 
                    dataIndex: "operation", 
                    key: "operation", 
                    width: 215,
                    render: (text, rowData) => {
                        return (
                            <div className="inline-button">
                                <Button type="primary">编辑</Button>
                                <Button onClick={() => this.onHandlerDelete(rowData.id)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            // 表的数据
            data: []
        };
    }
    /** 生命周期挂载完成 */
    componentDidMount(){
        this.loadDada();
    }
    /** 获取列表数据 */
    loadDada = () => {
        const { pageNumber, pageSize, keyWork } = this.state;
        const requestData = {
            pageNumber: pageNumber,
            pageSize: pageSize,
        }
        if(keyWork) { requestData.name = keyWork; }
        GetList(requestData).then(response => {
            const responseData = response.data.data; // 数据
            if(responseData.data) {  // 返回一个 null
                this.setState({
                    data: responseData.data
                })
            }
        })   
    }
    /** 搜索 */
    onFinish = (value) => {
        this.setState({
            keyWork: value.name,
            pageNumber: 1,
            pageSize: 10,
        })
        // 请求数据
        this.loadDada();
    }
    /** 删除 */
    onHandlerDelete = (id) => {
        if(!id) { return false; }
        Delete({id}).then(response => {
            message.info(response.data.message);
            // 请求数据
            this.loadDada();
        })
    }
    /** 复选框 */
    onCheckebox = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }
    render(){
        const { columns, data } = this.state;
        const rowSelection = {
            onChange: this.onCheckebox
        }
        return (
            <Fragment>
                <Form layout="inline" onFinish={this.onFinish}>
                    <Form.Item label="部门名称" name="name">
                        <Input placeholder="请输入部门名称" />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <div className="table-wrap">
                    <Table rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={data} bordered></Table>
                </div>
            </Fragment>
        )
    }
}
export default DepartmentList;