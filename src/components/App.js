import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu, MenuItem, MenuText, TopBar } from 'react-foundation';
import Dashboard from './Dashboard.js';
import Observatory from './Observatory.js';
import '../css/foundation.css';
import '../css/App.css';

let bodyStyle = {
  background: '#eee',
  minHeight: 'calc(100vh - 54px)'
}

class App extends Component {
  render() {
    return(
      <div style={bodyStyle} className="App">
        <TopBar>
          <Menu>
            <MenuText>Weather app</MenuText>
          </Menu>
        </TopBar>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/observatories/:id" component={Observatory}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;
