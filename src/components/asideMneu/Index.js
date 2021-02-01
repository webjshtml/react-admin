import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// icon
import { UserOutlined } from '@ant-design/icons';
// antd
import { Menu } from "antd";
// 路由
import Router from "../../router/index";
const { SubMenu } = Menu;

class AsideMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            router: [],
            selectedKeys: [],
            openKeys: []
        };
    }
    // 组件挂载完成之前
    UNSAFE_componentWillMount(){
        const role = sessionStorage.getItem("role").split(",");
        // 存储路由
        let routerArray = [];
        routerArray = Router.filter((item) => {
            // 第一层
            if(this.hasPermission(role, item)) {
                if(item.child && item.child.length > 0) {
                    item.child = item.child.filter((child) => {
                        if(this.hasPermission(role, child)) {
                            return child;
                        }
                    })
                    return item;
                }
                return item;
            }
        })
        this.setState({
            router: routerArray
        })
    }
    hasPermission = (role, router) => {
        if(router.role && router.role.length > 0) {
            return role.some(elem => router.role.indexOf(elem) >= 0);
        }
    }
    // 生命周期，在这里多了一层接口请求，并过滤路由
    componentDidMount(){
        const pathname = this.props.location.pathname;
        const menuKey = pathname.split("/").slice(0, 3).join('/');
        const menuHigh = {
            selectedKeys: pathname,
            openKeys: menuKey
        }
        this.selectMenuHigh(menuHigh);
    }

    /** 选择菜单  */
    selectMenu = ({ item, key, keyPath, domEvent }) => {
        const menuHigh = {
            selectedKeys: key,
            openKeys: keyPath[keyPath.length - 1]// 数组的长度减1，即是数组的最后一项
        }
        this.selectMenuHigh(menuHigh);
    }
    openMenu = (openKeys) => {
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }

    /** 菜单高光 */
    selectMenuHigh = ({selectedKeys, openKeys}) => {
        this.setState({
            selectedKeys: [selectedKeys],
            openKeys: [openKeys]
        })
    }


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
        const { selectedKeys, openKeys, router } = this.state;
        return (
            <Fragment>
                <Menu
                onOpenChange={this.openMenu}
                onClick={this.selectMenu}
                theme="dark"
                mode="inline"
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        router && router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem);
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}

export default withRouter(AsideMenu);