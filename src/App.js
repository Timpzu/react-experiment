import React, { Component } from 'react';
import { Row, Column, Menu, MenuItem, MenuText, TopBar, Button } from 'react-foundation';
import './css/foundation.css';
import './css/App.css';
import firebase from 'firebase';
import Card from './Card.js';



let bodyStyle = {
  background: '#eee',
  minHeight: 'calc(100vh - 54px)'
}
let columnStyle = {
  paddingTop: '0.9375rem'
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      weatherCards: []
    }
  }

  componentDidMount() {
    const observatoriesRef = firebase.database().ref('observatories');
    observatoriesRef.on('value', (snapshot) => {
      let cards = snapshot.val();
      let newState = [];
      for (let i in cards) {
        newState.push({
          id: i,
          location: cards[i].location
        });
      }
      this.setState({
        weatherCards: newState
      });
    });

  }

  render() {
    return (
      <div style={bodyStyle} className="App">
        <TopBar>
          <Menu>
            <MenuText>Weather app</MenuText>
          </Menu>
        </TopBar>
        <main style={{marginTop:'54px'}}>
          <row className="clearfix">
            {this.state.weatherCards.map((observatory) => {
              return(
                <Column style={columnStyle} small={12} medium={6} large={3}>
                  <Card observatory={observatory}/>
                </Column>
              )
            })}
          </row>
        </main>
      </div>
    );
  }
}
export default App;
