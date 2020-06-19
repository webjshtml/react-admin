import React, { Component } from "react";
// layout组件
import LayoutAside from "./components/aside";
import LayoutHeader from "./components/header";
// css
import "./layout.scss";
// antd
import { Layout } from 'antd';
const { Sider, Header, Content }  = Layout;
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header"><LayoutHeader/></Header>
                <Layout>
                    <Sider width="250px"><LayoutAside/></Sider>
                    <Content className="layout-main">内容</Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index;