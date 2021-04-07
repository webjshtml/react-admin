import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom';
// propTypes
import PropTypes from 'prop-types';
// connect
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// action
import { roleMenuAction } from "@/stroe/action/App";
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

    UNSAFE_componentWillReceiveProps(nextProps){
        this.checkboxInit(nextProps.init);
    }

    componentWillUnmount(){
        this.props.actions.roleMenu({});
    }

    // 初始化
    checkboxInit = (data) => {
        const check_list = data;
        // 过滤值
        const checked = check_list.filter(item => {
            return item.indexOf(this.props.data.value) != -1;
        })
        // 初始值
        this.setState({
            checked_list: checked
        }, () => {
            // 全选状态
            this.isCheckAll();
            // 写入 store
            this.updateRoleMenu();
        })
    }
    // 判断全选状态
    isCheckAll = () => {
        const { checked_length, checked_list } = this.state;  // 默认值 
        // 部分选中
        let indeterminate = false;
        // 全部
        let checkAll = false;
       
        if(checked_length !== checked_list.length){          // 部分选中
            indeterminate = true;
            checkAll = false;
        }
        // 全部
        if(checked_length === checked_list.length) {         // 全部选中：1、打勾；2、部分选中清除
            indeterminate = false;
            checkAll = true;
        }
        // 都没有
        if(checked_list.length === 0){
            indeterminate = false;
            checkAll = false;
        }
        // 更新选中的状态
        this.setState({ 
            indeterminate,
            checkAll
        })
    }
    // 单个选项
    onChange = (value) => {
        this.updateStateCheckedList(value);
    }
    // 全选、返选
    onCheckAllChange = (e) => {
        const checked = e.target.checked;
        // 全选、返选
        this.updateStateCheckedList(checked ? this.state.checked_default : [])
    }

    // 更新值
    updateStateCheckedList = (data) => {
        this.setState({
            checked_list: data
        }, () => {
            // 更新选中状态
            this.isCheckAll();
            // 写入 store
            this.updateRoleMenu();
        })
    }

    /** 
     * 
     * 明确最终要作什么东西
     * 1、明确我们开发的东西是什么（复选框组件）
     * 
     * 2、统一数据格式
     * {
     *      user: [
     *          { labeh: "", value: ""},
     *          { labeh: "", value: ""},
     *      ]
     *      dep: ["add", "list"]
     * }
     * 
     * Object.keys()
     * 
     * user: {
     *      "/user/list" : {
     *          label: "用户列表",
     *          value: "/user/list"
     *      }
     * }
     * 3、写函数，就是 funciton ，一个 funciton 只做一件事
     * 
     * 
     **/
    updateRoleMenu = () => {
        // checked_list
        const checked = this.state.checked_list;
        // 第一层
        const first = this.props.data;  // child_item
        // store
        let StoreChecked = this.props.menu;  // {}
        // 判断是否存在对象
        if(!StoreChecked[first.value]) { StoreChecked[first.value] = {}; }
        // 存储数据
        if(checked.length > 0) {
            // 第一种：需要取文本
            // 匹配
            // const object = {};
            // checked.forEach(item => {
            //     let options = first.child_item.filter(child => child.value === item);  // 过滤的结果是数组，无论是否匹配成功都是数组
            //     if(options.length > 0) {
            //         object[item] = options[0];
            //     }
            // })
            
            // 第二种：不需要文本
            // 更新
            let checked_value = JSON.parse(JSON.stringify(checked));
            if(this.props.saveAllKey) {
                checked_value.unshift(first.value);
            }
            StoreChecked[first.value] = checked_value;

        }
        // 删除数据
        if(checked.length === 0) {
            delete StoreChecked[first.value];
        }
        this.props.actions.roleMenu(StoreChecked);
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
    init: PropTypes.array,
    saveAllKey: PropTypes.bool
}
// 默认
CheckboxAll.defaultProps = {
    data: {},
    init: [],
    saveAllKey: false
}

const mapStateToProps = (state) => ({
    menu: state.app.checked_all,
})

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            roleMenu: roleMenuAction
        }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CheckboxAll));