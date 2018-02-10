import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, MenuItem, MenuText, TopBar } from 'react-foundation';
import Dashboard from './Dashboard';
import Observatory from './Observatory';
import Typekit from 'react-typekit';

let bodyStyle = {
  background: '#eee',
  minHeight: 'calc(100vh - 54px)'
}

class App extends Component {
  render() {
    return(
      <div style={bodyStyle} className="App">
        <Typekit kitId="kmv4zdo" />
        <TopBar>
          <Menu>
            <MenuText>Timpantieteen laitos</MenuText>
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
