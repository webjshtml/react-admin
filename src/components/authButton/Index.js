import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
// propTypes
import PropTypes from 'prop-types';
// connect
import { connect } from "react-redux";

const authButton = (props) => {
    const { button, role_button, children } = props;
    return (
        role_button.includes(button) ? children : null
    );
}

// 校验数据类型
authButton.propTypes = {
    button: PropTypes.string
}
// 默认
authButton.defaultProps = {
    button: ""
}
// ["user:add", "user:edit", "department:patchDelete", "department:edit", "user:add", "user:edit", "department:patchDelete", "department:edit"]
const mapStateToProps = (state) => ({
    role_button: state.app.button
})

export default connect(
    mapStateToProps,
    null
)(withRouter(authButton));