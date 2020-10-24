import React, { Component, Fragment } from "react";
// antd
import { message } from "antd";
// API
import { Add, Detailed } from "@/api/job";
// 组件
import FormCom from "@c/form/Index";
class DepartmentAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            id: this.props.location.state ? this.props.location.state.id : "",
            formConfig: {
                url: "jobAdd",
                editKey: "",
                initValue: {
                    number: 0,
                    status: true,
                    parentId: ""
                },
                setFieldValue: {},
                formatFormKey: "parentId"
            },
            formLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 20 }
            },
            formItem: [
                { 
                    type: "SelectComponent",
                    label: "部门", 
                    name: "parentId", 
                    required: true,
                    url: "getDepartmentList", 
                    propsKey: {
                        value: "id",
                        label: "name"
                    },
                    style: { width: "200px" },
                    placeholder: "请选择部门"
                },
                { 
                    type: "Input",
                    label: "职位名称", 
                    name: "jobName", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请输入职位名称"
                },
                { 
                    type: "Radio",
                    label: "禁启用", 
                    name: "status", 
                    required: true,
                    options: [
                        { label: "禁用", value: false },
                        { label: "启用", value: true },
                    ]
                },
                { 
                    type: "Input",
                    label: "描述", 
                    name: "content", 
                    required: true, 
                    placeholder: "请输入描述内容"
                }
            ]
        };
    }

    componentDidMount(){
        this.state.id && this.getDetailed();
    }

    getDetailed = () => {
        Detailed({id: this.state.id}).then(response => {
            console.log(response.data.data)
            this.setState({
                formConfig: {
                    ...this.state.formConfig,
                    setFieldValue: response.data.data,
                    url: "jobEdit",
                    editKey: "jobId"
                }
            })
            // this.refs.form.setFieldsValue(response.data.data);
        })
    }
    /** 编辑信息 */
    onHandlerEdit = (value) => {
        const requestData = value;
        requestData.id = this.state.id;
        // Edit(requestData).then(response => {
        //     const data = response.data;
        //     message.info(data.message)
        //     this.setState({
        //         loading: false
        //     })
        // }).catch(error => {
        //     this.setState({
        //         loading: false
        //     })
        // })
    }
    /** 添加信息 */
    onHandlerAdd = (value) => {
        const requestData = value;
        Add(requestData).then(response => {
            const data = response.data;
            message.info(data.message)
            this.setState({
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }
    /** 提交表单 */
    onHandlerSubmit = (value) => {
        this.state.id ? this.onHandlerEdit(value) : this.onHandlerAdd(value);
    }

    render(){
        return (
            <Fragment>
                {/* <FormCom formItem={this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig} submit={this.onHandlerSubmit} /> */}
                <FormCom formItem={this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig} />
          </Fragment>
        )
    }
}
export default DepartmentAdd;