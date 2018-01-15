import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import Chat from './chat';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    }
  }

  setUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  render() {
    let usernameBlock = null;
    if (this.state.username) usernameBlock =
      <div>
        <div>You are chatting as</div>
        <div>{this.state.username}</div>
      </div>
    else usernameBlock =
      <div>
        <div>Enter Your Name To Start Chatting</div>
        <input placeholder='Your name' onBlur={this.setUsername}></input>
        <input type='submit' value='Chat!'></input>
      </div>

    let chatBlock = null;
    if (this.state.username) chatBlock =
      <div>
        <Chat username = {this.state.username}/>
      </div>
    else chatBlock =
      <div>Sign in to chat!</div>


    var appTemplate =
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Chat Test</h1>
          {usernameBlock}
        </header>
        <div className="App-body">
          {chatBlock}
        </div>
      </div>

    return appTemplate;
  }
}

export default App;
