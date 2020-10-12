import React, { Component } from "react";
// propTypes
import PropTypes from 'prop-types';
// API 
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// components
import SelectComponent from "../select/Index";
// antd
import { Form, Input, Button, Select, InputNumber, Radio, message } from "antd";

const { Option } = Select;

class FormCom extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            mesPreix: {
                "Input": "请输入",
                "Radio": "请选择",
                "Select": "请选择"
            }
        }
    }  

    componentWillReceiveProps({ formConfig }){
        this.refs.form.setFieldsValue(formConfig.setFieldValue)
    }
    // 校验规则 
    rules = (item) => {
        // state
        const { mesPreix } = this.state;
        let rules = [];
        // 是否必填
        if(item.required) {
            let message = item.message || `${mesPreix[item.type]}${item.label}`; // 请输入xxxxx，请选择xxxxxx
            rules.push({ required: true, message })
        }
        if(item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules);
        }
        return rules;
    }
    // selcctComponent 校验方法
    validatorSelect = (rule, value) => {
        if(!value || !value[rule.field]) {
            return Promise.reject("选项不能为空");
        }
        return Promise.resolve();
        

    }

    // input
    inputElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder}/>
            </Form.Item>
        )
    }
    // inputNumber
    inputNumberElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber min={item.min} max={item.max} />
            </Form.Item>
        )
    }
    // select
    selectElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Select style={item.style} placeholder={item.placeholder}>
                    {
                        item.options && item.options.map(elem => {
                            return <Option value={elem.value} key={elem.value}>{elem.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }
    // SelectComponent
    SelectComponent = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, {validator: this.validatorSelect}]}>
                <SelectComponent url={item.url} propsKey={item.propsKey} name={item.name}  />
            </Form.Item>
        )
    }
    // radio
    radioElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Radio.Group>
                    {
                        item.options && item.options.map(elem => {
                            return <Radio value={elem.value} key={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
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
            if(item.type === "Input") { formList.push(this.inputElem(item)); }
            if(item.type === "Select") { formList.push(this.selectElem(item)); }
            if(item.type === "SelectComponent") { formList.push(this.SelectComponent(item)); }
            if(item.type === "InputNumber") { formList.push(this.inputNumberElem(item)); }
            if(item.type === "Radio") { formList.push(this.radioElem(item)); }
        })
        return formList;
    }

    onSubmit = (value) => {  // 添加、修改
        // 传入的 submit
        if(this.props.submit) {
            this.props.submit(value);
            return false;
        }
        // 数据格式化
        const formatFormKey = this.props.formConfig.formatFormKey;
        if(formatFormKey && value[formatFormKey]) {
            const dataKey = value[formatFormKey]; // 临时存储指定 key 数据
            delete value.parentId                 // 删除指定的 key
            value = Object.assign(value, dataKey) // 浅拷贝并合JSON对象
        }
        // 请求参数
        const data = {
            url: requestUrl[this.props.formConfig.url],
            data: value
        }
        this.setState({ loading: true })
        requestData(data).then(response => {
            const responseData = response.data;
            // 提示
            message.info(responseData.message)
            // 取消按钮加载
            this.setState({ loading: false })
        }).catch(error => {
            // 取消按钮加载
            this.setState({ loading: false })
        })
    }

    render(){
        return (
            <Form ref="form" onFinish={this.onSubmit} initialValues={this.props.formConfig.initValue} {...this.props.formLayout}>
                { this.initFormItem() }
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button>
                </Form.Item>
            </Form>
        )
    }

}
// 校验数据类型
FormCom.propTypes = {
    formConfig: PropTypes.object
}
// 默认
FormCom.defaultProps = {
    formConfig: {}
}
export default FormCom;