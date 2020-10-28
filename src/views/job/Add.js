import React, { Component, Fragment } from "react";
// antd
import { message, Select } from "antd";
// API
import { Add, Detailed } from "@/api/job";
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// 组件
import FormCom from "@c/form/Index";
const { Option } = Select;
class DepartmentAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            id: this.props.location.state ? this.props.location.state.id : "",
            // select
            select: [
                { value: 10, label: "研发部"},
                { value: 11, label: "行政部"}
            ],
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
                    type: "Slot",
                    label: "部门", 
                    name: "parentId", 
                    required: true,
                    slotName: "department",
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
        this.getSelectList();
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
    // 请求数据
    getSelectList = () => {
        const data = {
            url: requestUrl["getDepartmentList"]
        }
        // 不存在 url 时，阻止
        if(!data.url) { return false; }
        // 接口
        requestData(data).then(response => {
            this.setState({
                select: response.data.data.data
            })
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
                <FormCom formItem={this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig}>
                    {/** 插槽 */}
                    <Select ref="department">
                        {
                            this.state.select && this.state.select.map(elem => {
                                return <Option value={elem.id} key={elem.id}>{elem.name}</Option>
                            })
                        }
                    </Select>
                </FormCom>
                {
                /**
                 * 1、插槽没有元素的情况，this.props.children 获取的是 undefault。
                 * 2、只有一个元素的情况，就是一个 object 对象。
                 * 3、多个的情况下，就是 Array 数组对象。
                 * 
                 * this.props.children 获取所有
                 */
                 }
          </Fragment>
        )
    }
}
export default DepartmentAdd;