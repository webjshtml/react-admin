import React, { Component, Fragment } from "react";
// antd
import { message } from "antd";
// API
import { Add, Detailed, Edit } from "@/api/staff";
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// 组件
import FormCom from "@c/form/Index";
// 默认数据
import { nation, face, education } from "@/js/data";
// 检验
import { validate_phone } from "@/utils/validate";
// 日期转换
import moment from 'moment';
class StaffAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            id: this.props.location.state ? this.props.location.state.id : "",
            // 职员的职位状态
            job_status: "",
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
                    status: "",
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
                    type: "Column",
                    label: "个人信息"
                },
                { 
                    type: "Input",
                    label: "姓名", 
                    name: "name", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请输入姓名"
                },
                { 
                    type: "Radio",
                    label: "性别", 
                    name: "sex", 
                    required: true,
                    options: [
                        { label: "男", value: true },
                        { label: "女", value: false },
                    ]
                },
                { 
                    type: "Input",
                    label: "身份证", 
                    name: "card_id", 
                    required: true,
                    placeholder: "请输入身份证"
                },
                { 
                    type: "Upload",
                    label: "头像", 
                    request: true,
                    name: "face_img", 
                    message: "请上传头像"
                },
                
                { 
                    type: "Date",
                    label: "出生年月", 
                    name: "birthday",
                    format: "YYYY/MM",
                    mode: "month",
                    required: true
                },
                { 
                    type: "Input",
                    label: "手机号", 
                    name: "phone",
                    required: true,
                    placeholder: "请输入11位数字的手机号",
                    rules: [
                        () => ({
                            validator(rule, value) {
                                // 验证手机号
                                // let regPhone = /^1[3456789]\d{9}$/;  // 1 3 713746864  ^首位字符是什么，$结束字符是什么  \d代表数字  11位手机号
                                if (validate_phone(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('手机号格式有误');
                            },
                        })
                    ]
                },
                { 
                    type: "Select",
                    label: "民族", 
                    name: "nation",
                    required: true,
                    options: nation,
                    placeholder: "请输入11位数字的手机号"
                },
                { 
                    type: "Select",
                    label: "政治面貌", 
                    name: "political",
                    required: true,
                    options: face,
                    placeholder: "请输入11位数字的手机号"
                },
                { 
                    type: "Input",
                    label: "毕业院校", 
                    name: "school",
                    required: true
                },
                { 
                    type: "Select",
                    label: "学历", 
                    name: "education",
                    required: true,
                    options: education
                },
                { 
                    type: "Input",
                    label: "专业", 
                    name: "major",
                    required: true
                },
                { 
                    type: "Upload",
                    label: "毕业证", 
                    name: "diploma_img", 
                    required: true,
                    message: "请上传毕业证"
                },
                { 
                    type: "Input",
                    label: "微信号", 
                    name: "wechat",
                    required: true
                },
                { 
                    type: "Input",
                    label: "邮箱", 
                    name: "email",
                    required: true
                },
                {
                    type: "Column",
                    label: "就职信息"
                },
                { 
                    type: "SelectComponent",
                    label: "部门", 
                    url: "getDepartmentList",
                    name: "departmen_id",
                    propsKey: {
                        label: "name",
                        value: "id"
                    },
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请选择邮箱"
                },
                { 
                    type: "SelectComponent",
                    label: "职位", 
                    url: "jobListAll",
                    name: "job_id",
                    propsKey: {
                        label: "jobName",
                        value: "jobId"
                    },
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请选择邮箱"
                },
                { 
                    type: "FormItemInline",
                    label: "职员状态", 
                    name: "name", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请输入姓名",
                    col_label: 2,
                    col_control: 22,
                    inline_item: [
                        { 
                            type: "Date",
                            label: "入职时间", 
                            name: "job_entry_date", 
                            required: true, 
                            style: { width: "100%" },
                            placeholder: "请输入姓名",
                            col: 3
                        },
                        { 
                            type: "Date",
                            label: "转正时间", 
                            name: "job_formal_date", 
                            required: true, 
                            style: { width: "100%" },
                            placeholder: "请输入姓名",
                            col: 3
                        },
                        { 
                            type: "Date",
                            label: "离职时间", 
                            name: "job_quit_date", 
                            required: true, 
                            style: { width: "100%" },
                            placeholder: "请输入姓名",
                            col: 3
                        }
                    ]
                },
                { 
                    type: "Input",
                    label: "公司邮箱", 
                    name: "company_email",
                    required: true,
                    placeholder: "请输入邮箱"
                },
                { 
                    type: "Editor",
                    label: "描述", 
                    name: "introduce", 
                    required: true, 
                    placeholder: "请输入描述内容"
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
                }
            ]
        };
    }

    componentDidMount(){
        this.state.id && this.getDetailed();
    }

    getDetailed = () => {
        Detailed({id: this.state.id}).then(response => {

            const data = response.data.data;
            // 日期处理
            const basisDate = {
                birthday: data.birthday ? moment(data.birthday) : null,
                job_entry_date: data.job_entry_date ? moment(data.job_entry_date) : null,
                job_formal_date: data.job_formal_date ? moment(data.job_formal_date) : null,
                job_quit_date: data.job_quit_date ? moment(data.job_quit_date) : null,
            }

            this.setState({
                formConfig: {
                    ...this.state.formConfig,
                    setFieldValue: {...data, ...basisDate},
                    url: "staffEdit",
                    editKey: "staff_id"
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
        // 日期转换
        requestData.birthday = new Date(requestData.birthday);
        requestData.job_entry_date = new Date(requestData.job_entry_date);
        requestData.job_formal_date = new Date(requestData.job_formal_date);
        requestData.job_quit_date = new Date(requestData.job_quit_date);
        
        Edit(requestData).then(response => {
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

    /** 获取富文本内容 */
    handleEditorChange = (value) => {
        console.log(value)
    }

    render(){
        return (
            <Fragment>
                <FormCom formItem={this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig} submit={this.onHandlerSubmit}></FormCom>
          </Fragment>
        )
    }
}
export default StaffAdd;