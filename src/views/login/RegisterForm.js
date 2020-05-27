import React, { Component, Fragment } from "react";
// ANTD
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
class RetisterForm extends Component{
    constructor(){
        super();
        this.state = {};
    }

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    toogleForm = () => {
        // 调父级的方法
        this.props.switchForm("login");
    }
    render(){
        return (
            <Fragment>
                <div className="form-header">
                    <h4 className="column">注册</h4>
                    <span onClick={this.toogleForm}>登录</span>
                </div>
                <div className="form-content">
                    <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={() => this.onFinish}
                    >
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]} >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]} >
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="passwords" rules={[{ required: true, message: 'Please input your Password!' }]} >
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="code" rules={[{ required: true, message: 'Please input your Password!' }]} >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Button type="danger" block>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block> 注册 </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        )
    }
}

export default RetisterForm;