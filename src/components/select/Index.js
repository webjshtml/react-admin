import React, { Component } from "react";
// propTypes
import PropTypes from 'prop-types';
// url
import requestUrl from "@api/requestUrl";
// API
import { requestData } from "@api/common";
// antd
import { Select } from "antd";
const { Option } = Select;

class SelectComponent extends Component {
    constructor(props){
        super();
        this.state = {
            props: props.propsKey,
            options: [],
            // change value
            name: props.name,
            value: ""
        }
    }  

    componentDidMount(){
        this.getSelectList();
    }
    // 请求数据
    getSelectList = () => {
        const url = this.props.url;
        const data = {
            url: requestUrl[url],
            data: {}
        }
        // 不存在 url 时，阻止
        if(!data.url) { return false; }
        // 接口
        requestData(data).then(response => {
            this.setState({
                options: response.data.data.data
            })
        })
    }
    // select onchang
    onChange = (value) => {
        this.setState({ value })
        this.triggerChange(value);
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
          onChange({[this.state.name]: changedValue});
        }
    };
    

    render(){
        const { value, label } = this.state.props;
        return (
            <Select value={this.state.value} onChange={this.onChange}>
                {
                    this.state.options && this.state.options.map(elem => {
                        return <Option value={elem[value]} key={Number(elem[value])}>{elem[label]}</Option>
                    })
                }
            </Select>
        )
    }

}
// 校验数据类型
SelectComponent.propTypes = {
    formConfig: PropTypes.object
}
// 默认
SelectComponent.defaultProps = {
    formConfig: {}
}
export default SelectComponent;