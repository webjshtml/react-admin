import React, { Component } from "react";
// antd
import { Form, Input, Button } from "antd";
class FormCom extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }  

    rules = (item) => {
        let rules = [];
        // 是否必填
        if(item.required) {
            let message = item.message || `${item.label}不能为空`;
            rules.push({ required: true, message })
        }
        if(item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules);
        }
        return rules;
    }

    // input
    inputElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input />
            </Form.Item>
        )
    }

    // input
    selectElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input />
            </Form.Item>
        )
    }
    
    // 初始化
    initFormItem = () => {
        const { formItem } = this.props;
        // 检测是否存在 formItem
        if(!formItem || (formItem && formItem.length === 0)) { return false; }
        // 循环处理
        const formList = []
        formItem.map(item => {
            if(item.type === "Input") {
                formList.push(this.inputElem(item));
            }
            if(item.type === "Select") {
                formList.push(this.selectElem(item));
            }
        })

        return formList;
    }

    onSubmit = (value) => {
        console.log(value)
    }

    render(){
        return (
            <Form ref="form" onFinish={this.onSubmit} initialValues={{ status: true, number: 0}} {...this.state.formLayout}>
                { this.initFormItem() }
                <Form.Item>
                    <Button type="primary" htmlType="submit">确定</Button>
                </Form.Item>
            </Form>
        )
    }

}

export default FormCom;