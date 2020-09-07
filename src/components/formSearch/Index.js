import React, { Component } from "react";
// propTypes
import PropTypes from 'prop-types';
// antd
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
// store
import Store from "@/stroe/Index";
const { Option } = Select;
class FormSearch extends Component {

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

    // input
    inputElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder}/>
            </Form.Item>
        )
    }
    // input
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
    // select
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
            if(item.type === "Select") { 
                item.options = Store.getState().config[item.optionsKey];
                formList.push(this.selectElem(item));
            }
            if(item.type === "InputNumber") { formList.push(this.inputNumberElem(item)); }
            if(item.type === "Radio") { formList.push(this.radioElem(item)); }
        })
        return formList;
    }

    onSubmit = (value) => {  // 添加、修改
        const searchData = {};
        for(let key in value) {
            if(value[key] !== undefined && value[key] !== "") {
                searchData[key] = value[key]
            }
        }
        this.props.search(searchData)
    }

    render(){
        return (
            <Form layout="inline" ref="form" onFinish={this.onSubmit} initialValues={this.props.formConfig.initValue} {...this.props.formLayout}>
                { this.initFormItem() }
                <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
        )
    }

}

// 校验数据类型
FormSearch.propTypes = {
    formConfig: PropTypes.object
}
// 默认
FormSearch.defaultProps = {
    formConfig: {}
}
export default FormSearch;