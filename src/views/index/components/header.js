import React, { Component, Fragment } from "react";
//css 
import "./aside.scss";
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <Fragment>
                <h1 className="logo"><span>LOGO</span></h1>
            </Fragment>
        )
    }
}

export default Index;