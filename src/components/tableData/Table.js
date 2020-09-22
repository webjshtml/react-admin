import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from 'prop-types';
// antd
import{ Table, Row, Col, Button, Pagination } from "antd";
// connect
import { connect } from "react-redux";
class TableBasis extends Component {
    render(){
        const { thead } = this.props.config;
        return (
            <Fragment>
                <div className="spacing-30"></div>
                <Table rowKey={this.props.rowKey} columns={thead} dataSource={this.props.list} bordered />
                {/* <Row>
                    <Col span={8}>
                        { batchButton && <Button onClick={handlerDelete}>批量删除</Button> }
                    </Col>
                    <Col span={16}>
                        <Pagination
                            onChange={changePageCurrent}
                            onShowSizeChange={changePageSize}
                            className="pull-right"
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                        />
                    </Col>
                </Row> */}
            </Fragment>
        )
    }
}
// 校验数据类型
TableBasis.propTypes = {
    config: PropTypes.object,
    rowKey: PropTypes.string
}
// 默认
TableBasis.defaultProps = {
    config: {},
    rowKey: "id"
}

//把store中的数据映射到这个组件变成props
const mapStateToProps = (state)=> {  // mapState 会将数据映射成 this.props.list
    return {
      list: state.department.departmentList
    }
  }

export default connect(
    mapStateToProps,
    null
)(TableBasis);