import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// icon
import { UserOutlined } from '@ant-design/icons';
// antd
import { Menu } from "antd";
// 路由
import Router from "../../router/Index";
const { SubMenu } = Menu;

class AsideMenu extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    // 生命周期，在这里多了一层接口请求，并过滤路由

    // 无子级菜单处理
    renderMenu = ({title, key}) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}><span>{title}</span></Link>
            </Menu.Item>
        )
    }

    // 子级菜单处理
    renderSubMenu = ({title, key, child}) => {
        return (
            <SubMenu key={key} icon={<UserOutlined />} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item);
                    })
                }
            </SubMenu>
        )
    }

    render(){
        return (
            <Fragment>
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Router && Router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem);
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}

export default AsideMenu;