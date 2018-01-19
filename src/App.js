import React, { Component } from 'react';
import { Row, Column, Menu, MenuItem, MenuText, TopBar } from 'react-foundation';
import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps"
import './foundation.css';
import './App.css';

let defaultStyle = {
  color: '#303030'
};
let mockServerData = {
  user: {
    name: 'Timo',
    lists: [
      {
        name: 'First list',
        items: ['This is the first item','and I am the second one']
      },
      {
        name: 'List number 2',
        items: ['Hello, I am first','Hi I am two']
      }
    ]
  }
};

class NavBar extends Component {
  render() {
    return (
      <TopBar>
        <Menu>
          <MenuText>Weather app</MenuText>
          <MenuItem><a>Valinta 1</a></MenuItem>
          <MenuItem><a>Valinta 2</a></MenuItem>
        </Menu>
      </TopBar>
    )
  }
}
class weatherMap extends Component {
    render() {
      return(
        <span></span>
      )
    }
}

class Card extends Component {
  render() {
    let propsList = this.props.list;
    return(
      <div>
        <h2 style={defaultStyle}>{propsList.name}</h2>
        <ul style={{...defaultStyle, fontStyle: 'italic', listStyle: 'none', padding: '0'}}>
          {propsList.items.map(item =>
            <li>{item}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: mockServerData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        <NavBar/>
        {this.state.serverData.user ?
          <div>
            <h1>{this.state.serverData.user.name}'s App</h1>
            {this.state.serverData.user.lists.map(list =>
              <Card list={list}/>
            )}
          </div> : <h4>Loading content...</h4>
        }
      </div>
    );
  }
}
export default App;
