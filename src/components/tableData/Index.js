import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from 'prop-types';
// antd
import { Table, Pagination, Row, Col, Button, message, Modal } from "antd";
// api
import { TableList, TableDelete } from "@api/common";
import { Delete } from "@api/department";
// url
import requestUrl from "@api/requestUrl";
class TableComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            // 请求参数
            pageNumber: 1,
            pageSize: 10,
            keyWork: "",
            // 数据
            data: [],
            // 加载提示
            loadingTable: false,
            // 页码
            total: 0,
            // 复选框
            checkboxValue: [],
            // 确认弹窗
            modalVisible: false,
            modalconfirmLoading: false
        }
    }

    componentDidMount(){
        this.loadDada();
        // 返回子组件实例
        this.props.onRef(this);  // 子组件调用父组件方法，并把子组件实例传回给父组件
    }

    /** 获取列表数据 */
    loadDada = () => {
        const { pageNumber, pageSize } = this.state;
        const requestData = {
            url: requestUrl[this.props.config.url],
            data: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            }
        }
        TableList(requestData).then(response => {
            const responseData = response.data.data; // 数据
            if(responseData.data) {  // 返回一个 null
                this.setState({
                    data: responseData.data,
                    total: responseData.total
                })
            }
            this.setState({loadingTable: false})
        }).catch(error => {
            this.setState({loadingTable: false})
        })
    }
    /** 删除 */
    onHandlerDelete(id){
        this.setState({ modalVisible: true })
        if(id) { this.setState({ checkboxValue: [id] }); }
    }
    /** 复选框 */
    onCheckebox = (checkboxValue) => {
        this.setState({checkboxValue})
    }
    /** 当前页码 */
    onChangeCurrnePage = (value) => {
        this.setState({
            pageNumber: value
        }, () => {
            this.loadDada();
        })
    }
    /** 下拉页码 */
    onChangeSizePage = (value, page) => {
        this.setState({
            pageNumber: 1,
            pageSize: page
        }, () => {
            this.loadDada();
        })
    }
    /** 确认弹窗 */
    modalThen = () => {
        // 判断是否已选择删除的数据
        if(this.state.checkboxValue.length === 0) {
            message.info("请选择需要删除的数据");
            return false;
        }
        this.setState({ confirmLoading: true })
        const id = this.state.checkboxValue.join();
        const requestData = {
            url: requestUrl[`${this.props.config.url}Delete`],
            data: {
                id
            }
        }
        
        TableDelete(requestData).then(response => {
            message.info(response.data.message);
            this.setState({
                modalVisible: false,
                id: "",
                modalconfirmLoading: false,
                selectedRowKeys: []
            })
            // 重新加载数据
            this.loadDada();
        })
    }
    render(){
        const { loadingTable } = this.state;
        const { thead, checkbox, rowkey } = this.props.config;
        const rowSelection = {
            onChange: this.onCheckebox
        }
        return (
            <Fragment>
                {/* table 组件 */}
                <Table pagination={false} loading={loadingTable} rowKey={rowkey || "id"} rowSelection={checkbox ? rowSelection : null} columns={thead} dataSource={this.state.data} bordered />
                <div className="spacing-30"></div>
                <Row>
                    <Col span={8}>
                        { this.props.batchButton && <Button onClick={() => this.onHandlerDelete()}>批量删除</Button> }
                    </Col>
                    <Col span={16}>
                        <Pagination
                            onChange={this.onChangeCurrnePage}
                            onShowSizeChange={this.onChangeSizePage}
                            className="pull-right"
                            total={this.state.total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                        />
                    </Col>
                </Row>
                {/* 确认弹窗 */}
                <Modal
                    title="提示"
                    visible={this.state.modalVisible}
                    onOk={this.modalThen}
                    onCancel={() => { this.setState({ modalVisible: false})}}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.modalconfirmLoading}
                >
                    <p className="text-center">确定删除此信息？<strong className="color-red">删除后将无法恢复。</strong></p>
                </Modal>
            </Fragment>
        )
    }
}
// 校验数据类型
TableComponent.propTypes = {
    config: PropTypes.object
}
// 默认
TableComponent.defaultProps = {
    batchButton: false
}
export default TableComponent;