import React, { Component } from 'react';
import { Row, Column, Button } from 'react-foundation';
import firebase from 'firebase';
import Card from './Card';
import {styles} from './styles';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { weatherCards: [] }
  }

  componentDidMount() {
    const observatoriesRef = firebase.database().ref('observatories');
    observatoriesRef.on('value', (snapshot) => {
      let cards = snapshot.val();
      let newState = [];
      for (let i in cards) {
        newState.push({ id: i, location: cards[i].location });
      }
      this.setState({ weatherCards: newState });
    });
  }

  render() {
    return (
      <main>
        <row className="clearfix">
          {this.state.weatherCards.map((observatory) => {
            return(
              <Column style={styles.columnStyle} small={12} medium={6} large={3}>
                <Card className="weatherCard" observatory={observatory}/>
              </Column>
            )
          })}
        </row>
      </main>
    );
  }
}
