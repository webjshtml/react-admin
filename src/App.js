import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// 引用组件
import Home from './views/Home';
import About from './views/About';
import News from './views/News';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
      <div class="test">
        <h1>adsfasdf</h1>
        <ul>
          <li>fadsf</li>
          <li>fadsf</li>
          <li>fadsf</li>
          <li>fadsf</li>
        </ul>
        <BrowserRouter>
          <Switch>
            <Route exact component={Home} path="/" />
            <Route component={About} path="/about" />
            <Route component={News} path="/news" />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
