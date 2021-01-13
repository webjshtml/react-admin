import React, { Component } from "react";
// ant
import { Modal } from "antd";
// 组件
import FormCom from "@c/form/Index";
// 检验
import { validate_phone } from "@/utils/validate";
class UserModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
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
                labelCol: { span: 4 },
                wrapperCol: { span: 20 }
            },
            formItem: [
                { 
                    type: "Input",
                    label: "用户名", 
                    name: "username", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请输入邮箱"
                },
                { 
                    type: "Input",
                    label: "密码", 
                    name: "password", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请输入密码"
                },
                { 
                    type: "Input",
                    label: "确认密码", 
                    name: "passwords", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请再次输入密码"
                },
                { 
                    type: "Input",
                    label: "真实姓名", 
                    name: "truename", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请输入真实姓名"
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
        this.props.onRef(this);
    }

    visibleModal = (status) => {
        this.setState({
            isModalVisible: status
        })
    }

    handleOk = () => {

    }
    handleCancel = () => {
        this.visibleModal(false);
    }

    render(){
        return (
            <Modal title="新增用户" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <FormCom formItem={this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig} submitButton={false}></FormCom>
            </Modal>
        )
    }
}
export default UserModal;