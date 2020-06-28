import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// 组件
import User from "../../views/user/Index";
import UserAdd from "../../views/user/Add";
// 私有路由组件
// 私有组件方法
import PrivateRouter from "../privateRouter/Index";
class ContainerMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
        <Switch>
            <PrivateRouter exact path="/index/user/list" component={User}  />
            <PrivateRouter exact path="/index/user/add" component={UserAdd}  />
        </Switch>
    )
  }
}
export default ContainerMain;
