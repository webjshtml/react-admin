import React, { Component } from "react";
// propTypes
import PropTypes from 'prop-types';
// antd
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
// connect
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// action
import { addDepartmentList, updateDepartmentList } from "@/stroe/action/Department"
// url
import requestUrl from "@api/requestUrl";
// api
import { TableList } from "@api/common";
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

    componentDidMount(){
        this.onSubmit()
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
                item.options = this.props.config[item.optionsKey];
                formList.push(this.selectElem(item));
            }
            if(item.type === "InputNumber") { formList.push(this.inputNumberElem(item)); }
            if(item.type === "Radio") { formList.push(this.radioElem(item)); }
        })
        return formList;
    }

    search = (params) => {
        const requestData = {
            url: requestUrl[params.url],
            data: {
                pageNumber: 1,
                pageSize: 10
            }
        }
        // 筛选项的参数拼接
        if(Object.keys(params.searchData).length !== 0) {
            for(let key in params.searchData) {
                requestData.data[key] = params.searchData[key]
            }
        }
        // 请求接口
        TableList(requestData).then(response => {
            const responseData = response.data.data; // 数据
            this.props.actions.addDate(responseData)
        }).catch(error => {
        })
    }

    onSubmit = (value) => {  // 添加、修改
        const searchData = {};
        for(let key in value) {
            if(value[key] !== undefined && value[key] !== "") {
                searchData[key] = value[key]
            }
        }
        this.search({
            url: "departmentList",
            searchData
        })
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

const mapStateToProps = (state) => ({
    config: state.config
})
const mapDispatchToProps = (dispatch) => {
    return {
        // addDate: bindActionCreators(addDepartmentList, dispatch)  // 单个action做处理
        // updateDate: bindActionCreators(updateDepartmentList, dispatch)  // 单个action做处理
        actions: bindActionCreators({
            addDate: addDepartmentList,
            updateDate: updateDepartmentList
        }, dispatch)

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormSearch);