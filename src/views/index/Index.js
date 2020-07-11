import React, { Component } from "react";
// layout组件
import LayoutAside from "./components/Aside";
import LayoutHeader from "./components/Header";
import ContainerMain from "../../components/containerMain/Index";
// css
import "./layout.scss";
// antd
import { Layout } from 'antd';
const { Sider, Header, Content }  = Layout;
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false
        };
    }

    componentDidMount(){
        const collapsed = JSON.parse(sessionStorage.getItem("collapsed"));
        this.setState({ collapsed });
    }

    toggleCollapsed = () => {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
        sessionStorage.setItem("collapsed", collapsed);
    }

    render(){
        return (
            <Layout className="layout-wrap">
                <Header className="layout-header"><LayoutHeader toggle={this.toggleCollapsed} collapsed={this.state.collapsed}/></Header>
                <Layout>
                    <Sider width="250px" collapsed={this.state.collapsed}><LayoutAside/></Sider>
                    <Content className="layout-main">
                        <ContainerMain />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index;