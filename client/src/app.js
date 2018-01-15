import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import Chat from './chat';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    var appTemplate =
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Chat Test</h1>
        </header>
        <div>
          <Chat />
        </div>
      </div>

    return appTemplate;
  }
}

export default App;
