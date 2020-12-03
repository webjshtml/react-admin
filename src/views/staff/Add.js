import React, { Component, Fragment } from "react";
// antd
import { message, Row, Col, Radio, DatePicker } from "antd";
// API
import { Add, Detailed } from "@/api/job";
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// 组件
import FormCom from "@c/form/Index";
// 配置日期语言
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
// 默认数据
import { nation, face, education } from "@/js/data";
// 检验
import { validate_phone } from "@/utils/validate";
class StaffAdd extends Component {
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
                    name: "a1", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请输入姓名"
                },
                { 
                    type: "Radio",
                    label: "性别", 
                    name: "a2", 
                    required: true,
                    options: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ]
                },
                { 
                    type: "Input",
                    label: "身份证", 
                    name: "a3", 
                    required: true,
                    placeholder: "请输入身份证"
                },
                { 
                    type: "Upload",
                    label: "头像", 
                    name: "b3", 
                    required: true,
                    message: "请上传头像"
                },
                { 
                    type: "Date",
                    label: "出生年月", 
                    name: "a4",
                    format: "YYYY/MM",
                    mode: "month",
                    required: true
                },
                { 
                    type: "Input",
                    label: "手机号", 
                    name: "a5",
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
                    name: "a6",
                    required: true,
                    options: nation,
                    placeholder: "请输入11位数字的手机号"
                },
                { 
                    type: "Select",
                    label: "政治面貌", 
                    name: "a7",
                    required: true,
                    options: face,
                    placeholder: "请输入11位数字的手机号"
                },
                { 
                    type: "Input",
                    label: "毕业院校", 
                    name: "a8",
                    required: true
                },
                { 
                    type: "Select",
                    label: "学历", 
                    name: "a9",
                    required: true,
                    options: education
                },
                { 
                    type: "Input",
                    label: "专业", 
                    name: "a10",
                    required: true
                },
                { 
                    type: "Input",
                    label: "微信号", 
                    name: "a11",
                    required: true
                },
                { 
                    type: "Input",
                    label: "邮箱", 
                    name: "a12",
                    required: true
                },
                {
                    type: "Column",
                    label: "就职信息"
                },
                { 
                    type: "Select",
                    label: "职位", 
                    name: "a13",
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请选择邮箱"
                },
                { 
                    type: "Slot",
                    label: "职位状态", 
                    name: "a14", 
                    slotName: "jobStatus",
                },
                { 
                    type: "Input",
                    label: "公司邮箱", 
                    name: "a15",
                    required: true,
                    placeholder: "请输入邮箱"
                },
                { 
                    type: "Input",
                    label: "描述", 
                    name: "a16", 
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
                    <div ref="jobStatus">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <Radio>在职</Radio>
                            <div className="spacing-15"></div>
                            <DatePicker locale={locale} format="YYYY/MM/DD" />
                        </Col>
                        <Col className="gutter-row" span={4}>
                        <Radio>休假</Radio>
                            <div className="spacing-15"></div>
                            <DatePicker locale={locale} format="YYYY/MM/DD" />
                        </Col>
                        <Col className="gutter-row" span={4}>
                        <Radio>离职</Radio>
                            <div className="spacing-15"></div>
                            <DatePicker locale={locale} format="YYYY/MM/DD" />
                        </Col>
                    </Row>
                    </div>
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
export default StaffAdd;