import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from 'prop-types';
// antd
import { Checkbox } from "antd";
const CheckboxGroup = Checkbox.Group;
// class 组件
class CheckboxAll extends Component {
    constructor(props){
        super(props); // 初始化默认值 
        this.state = {
            checked_default: [],
            checked_length: 0,
            checked_list: [],
            indeterminate: false,
            checkAll: false
        }
    }
    componentDidMount(){
        const checked_list = this.props.data.child_item;
        let checked_value = null;
        if(checked_list && checked_list.length > 0) {
            checked_value = checked_list.map(item => item.value);
        }
        this.setState({
            checked_default: checked_value,
            checked_length: checked_value.length
        })
    }

    // 单个选项
    onChange = (value) => {
        const { checked_length } = this.state;  // 默认值 
        const length = value.length;            // 勾选的
        
        if(checked_length !== length){          // 部分选中
            this.indeterminateStatus(true);
            this.checkAllStatus(false);
        }
        if(checked_length === length) {         // 全部选中：1、打勾；2、部分选中清除
            this.indeterminateStatus(false);
            this.checkAllStatus(true);
        }
        if(length === 0){
            this.indeterminateStatus(false);
            this.checkAllStatus(false);
        }
        
        this.setState({
            checked_list: value
        })
    }

    // 部分选择的状态
    indeterminateStatus = (value) => {
        this.setState({ indeterminate: value })
    }
    // 全选按钮的状态
    checkAllStatus = (value) => {
        this.setState({ checkAll: value })
    }

    // 全选、返选
    onCheckAllChange = (e) => {
        const checked = e.target.checked;
        // 全选、返选
        this.setState({
            checked_list: checked ? this.state.checked_default : []
        })
        this.checkAllStatus(checked);
        this.indeterminateStatus(false);
    }
   
    render(){
        const { label, value, child_item } = this.props.data;
        const { checked_list, indeterminate, checkAll } = this.state;
        return (
            <Fragment>
                <div class="checkbox-wrap">
                    <div class="all">
                        <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={this.onCheckAllChange}>{label}</Checkbox>
                    </div>
                    <div class="item">
                        <CheckboxGroup options={child_item} value={checked_list} onChange={this.onChange} /><br/><br/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

// 校验数据类型
CheckboxAll.propTypes = {
    data: PropTypes.object,
}
// 默认
CheckboxAll.defaultProps = {
    data: {}
}
export default CheckboxAll;