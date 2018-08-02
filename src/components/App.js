import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu, MenuItem, MenuText, TopBar } from 'react-foundation';
import Dashboard from './Dashboard';
import Observatory from './Observatory';
import Typekit from 'react-typekit';
import {styles} from './styles';

class App extends Component {
  render() {
    return(
      <Router>
        <div style={styles.mainStyle} className="App">
          <Typekit kitId="kmv4zdo" />
          <TopBar>
            <Menu>
              <Link to="/"><MenuText>Timpantieteen laitos</MenuText></Link>
            </Menu>
          </TopBar>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/observatories/:id" component={Observatory}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;
