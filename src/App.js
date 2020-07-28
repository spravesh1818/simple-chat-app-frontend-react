import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import LoginComponent from './components/loginComponent/LoginComponent';
import './App.css';
import ChatScreenComponent from "./components/chatScreenComponent/ChatScreenComponent";
class App extends Component{


  render(){
    return (<>
      <Switch>
      <Redirect exact path="/" to="/login" />
          <Route path="/login" component={LoginComponent} />
          <Route path="/chat" component={ChatScreenComponent} />
      </Switch>
    </>);
  }
}

export default App;
