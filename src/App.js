import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Card extends Component {
  render() {
    return(
      <div>
        <h2>Name</h2>
        <p>Arvosana</p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Title</h1>
        <Card/>
        <Card/>
      </div>
    );
  }
}

export default App;
