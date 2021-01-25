import React, { Component } from "react";
// propTypes
import PropTypes from 'prop-types';
// API 
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// components
import SelectComponent from "../select/Index";
import UploadComponent from "../upload/Index";
import EditorComponent from "../editor/Index";
// antd
import { Form, Input, Button, Select, InputNumber, Radio, message, DatePicker, Row, Col } from "antd";
// 配置日期语言
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;

class FormCom extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            mesPreix: {
                "Input": "请输入",
                "Editor": "请输入",
                "Radio": "请选择",
                "Select": "请选择",
                "SelectComponent": "请选择",
                "Date":  "请选择",
                "Upload": "请上传"
            }
        }
        this.form = React.createRef();
    }  

    componentDidMount(){
        this.props.onRef && this.props.onRef(this);
    }

    componentWillReceiveProps({ formConfig }){ 
        this.form.current.setFieldsValue(formConfig.setFieldValue)
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
    validatorComponents = (rule, value) => {
        if(value) { return Promise.resolve(); }
        return Promise.reject("");
    }

    /** 失去焦点 */
    blurEvent = (e) => {
        this.props.onBlur && this.props.onBlur(e);
    }

    // input
    inputElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules} validateTrigger={item.trigger || ['onChange']} shouldUpdate={ item.upload_field || false}>
                <Input type={item.value_type || "text"} style={item.style} placeholder={item.placeholder} onBlur={item.blurEvent && this.blurEvent}/>
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
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, {validator: this.validatorComponents}]}>
                <SelectComponent url={item.url} propsKey={item.propsKey} name={item.name} initValue={this.props.formConfig.setFieldValue} />
            </Form.Item>
        )
    }
    // UploadComponent
    uploadElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, {validator: this.validatorComponents}]}>
                <UploadComponent name={item.name} request={item.request} initValue={this.props.formConfig.setFieldValue}/>
            </Form.Item>
        )
    }
    // EditorComponent
    editorElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules, {validator: this.validatorComponents}]}>
                <EditorComponent name={item.name} initValue={this.props.formConfig.setFieldValue}/>
            </Form.Item>
        )
    }
    // 插槽
    slotElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                { this.props.children && Array.isArray(this.props.children) ? this.props.children.filter(elem => elem.ref === item.slotName) : this.props.children } 
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
    // date
    dateElem = (item) => {
        const rules = this.rules(item);
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <DatePicker locale={locale} format={item.format} picker={item.mode} />
            </Form.Item>
        )
    }



    // 内联的控件
    formItemInlineElem = (item) => {
        // const rules = this.rules(item);
        return (
            <Row>
                <Col span={item.col_label} className="ant-form-item" style={{textAlign: "right"}}>
                    <div class="ant-form-item-label">
                        <label for="name" class="ant-form-item-required" title="姓名">{item.label}</label>
                    </div>
                </Col>
                <Col span={item.col_control}>
                    <Row>
                        {
                            item.inline_item.map(elem => {
                                return (
                                    <Col span={elem.col} className="form-item-inline-control">{ this.createControl(elem)}</Col>
                                )
                            })
                        }
                        
                    </Row>
                </Col>
            </Row>
        )
    }




    // 栏目
    columnElem = (item) => {
        return (
            <div className="form-column">
                <h4>{item.label}</h4>
            </div>
        )
    }
    
    // 初始化
    initFormItem = () => {
        const { formItem } = this.props;
        // 检测是否存在 formItem
        if(!formItem || (formItem && formItem.length === 0)) { return false; }
        // 循环处理
        let formList = formItem.map(item => this.createControl(item));
        return formList;
    }
    // 创建表单控件
    createControl = (item) => {
        if(item.type === "Input") { return this.inputElem(item); }
        if(item.type === "Select") { return this.selectElem(item); }
        if(item.type === "SelectComponent") { return this.SelectComponent(item); }
        if(item.type === "InputNumber") { return this.inputNumberElem(item); }
        if(item.type === "Radio") { return this.radioElem(item); }
        if(item.type === "Slot") { return this.slotElem(item); }
        if(item.type === "Column") { return this.columnElem(item); }
        if(item.type === "Date") { return this.dateElem(item); }
        if(item.type === "Upload") { return this.uploadElem(item); }
        if(item.type === "Editor") { return this.editorElem(item); }
        if(item.type === "FormItemInline") { return this.formItemInlineElem(item); }
    }

    formatData = (value) => {
        // 请求数据
        const requestData = JSON.parse(JSON.stringify(value));
        // 需要格式化 JOSN 对象的 key
        const { formatFormKey, editKey, setFieldValue } = this.props.formConfig;
        const keyValue = requestData[formatFormKey];
        // 如果是 JSON 对象
        if(Object.prototype.toString.call(keyValue) === "[object Object]") {  // ==匹配数据是否相等， === 匹配数据及数据类型  1 == "1" => true, 1 === "1" => false
            requestData[formatFormKey] = keyValue[formatFormKey]
        }
        // 判断是否存在“编辑”状态指定的key
        if(editKey) {
            requestData[editKey] = setFieldValue[editKey]
        }
        return requestData; 
    }

    onSubmit = (value) => {  // 添加、修改
        // 传入的 submit
        if(this.props.submit) {
            this.props.submit(value);
            return false;
        }
        /**
         * 参数为 JSON 对象时进行处理
         */
        const paramsData = this.formatData(value);
        // 请求参数
        const data = {
            url: requestUrl[this.props.formConfig.url],
            data: paramsData
        }
        this.setState({ loading: true })
        requestData(data).then(response => {
            const responseData = response.data;
            // 提示
            message.info(responseData.message)
            // 取消按钮加载
            this.setState({ loading: false })
            // 清除表单
            this.onReset();
        }).catch(error => {
            // 取消按钮加载
            this.setState({ loading: false })
        })
    }

    onReset = () => {
        this.form.current.resetFields();
    }

    render(){
        const { submitButton, formLayout } = this.props;
        return (
            <Form ref={this.form} onFinish={this.onSubmit} initialValues={this.props.formConfig.initValue} {...this.props.formLayout}>
                { this.initFormItem() }
                <Row>
                    <Col span={formLayout.labelCol.span}></Col>
                    <Col span={formLayout.wrapperCol.span}>
                    { submitButton ? <Button loading={this.state.loading} type="primary" htmlType="submit">确定</Button> : "" }
                    </Col>
                </Row>
            </Form>
        )
    }

}
// 校验数据类型
FormCom.propTypes = {
    formConfig: PropTypes.object,
    submitButton: PropTypes.bool
}
// 默认
FormCom.defaultProps = {
    formConfig: {},
    submitButton: true
}
export default FormCom;