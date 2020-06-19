import React, { Component } from "react";

// css
import "./index.scss";
// 组件
import LoginForm from "./LoginForm";
import RetisterForm from "./RegisterForm";
class Login extends Component{
    constructor(){
        super();
        this.state = {
            formType: "login"
        };
    }


    switchForm = (value) => {
        this.setState({
            formType: value
        })
    }

    render(){
        return (
            <div className="form-wrap">
                <div>
                    {
                    this.state.formType === 'login' 
                    ? <LoginForm switchForm={this.switchForm}></LoginForm> 
                    : <RetisterForm switchForm={this.switchForm}></RetisterForm>
                    }
                </div>
            </div>
        )
    }
}

export default Login;