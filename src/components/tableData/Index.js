import React, { Component } from "react";
// antd
import { Table } from "antd";
// api
import { TableList } from "@api/common";
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
            loadingTable: false
        }
    }

    componentDidMount(){
        this.loadDada();
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
                    data: responseData.data
                })
            }
            this.setState({loadingTable: false})
        }).catch(error => {
            this.setState({loadingTable: false})
        })
    }
    /** 复选框 */
    onCheckebox = (value) => {
        console.log(value)
    }


    render(){
        const { loadingTable } = this.state;
        const { thead, checkbox, rowkey } = this.props.config;
        const rowSelection = {
            onChange: this.onCheckebox
        }
        return <Table loading={loadingTable} rowKey={rowkey || "id"} rowSelection={checkbox ? rowSelection : null} columns={thead} dataSource={this.state.data} bordered />
    }
}

export default TableComponent;