import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from 'react-foundation';
import firebase from 'firebase';
import { firebaseConfig } from '../configure/firebase.js';

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();

export let cardStyle = {
  // width: '100%',
  background: '#fff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  borderRadius: '4px',
  padding: '10px',
  textAlign: 'center'
}

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      weather: '',
      temperature: '',
      entries: [],
      landmark: ''
    }

    this.getImage(this.props.observatory.id);
  }

  getImage(image) {
    storageRef.child(image + '.svg').getDownloadURL().then((url) => {
      this.setState({
        landmark: url
      });
    });
  }

  componentDidMount() {
    const observatoriesRef = firebase.database().ref('observatories').child(this.props.observatory.id);
    const entriesRef = observatoriesRef.child('entries');

    entriesRef.limitToLast(1).on('value', (snapshot) => {
      let currentWeather = snapshot.val();
      let newState = [];
      for (let i in currentWeather) {
        newState.push({
          id: i,
          weather: currentWeather[i].weather,
          temperature: currentWeather[i].temperature
        });
      }
      this.setState({
        entries: newState
      });
    });
    this.setState({location: this.props.observatory.location})
  }
  render() {
    return (
      <article style={cardStyle}>
        <h5>{this.state.location}</h5>
        {this.state.entries.map((weather) => {
          return(
            <div>
              <p style={{fontSize: '52px', fontWeight: 'bold'}}>{weather.temperature}°</p>
              <p>{weather.weather}</p>
            </div>
          )
        })}
        <img src={this.state.landmark} />
        <Link to={'observatories/' + this.props.observatory.id}>Input weather information</Link>
      </article>
    );
  }
}
