import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { firebaseConfig } from '../configure/firebase.js';

const storageRef = firebase.storage().ref();

export let cardStyle = {
  background: '#fff',
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
      landmarkImg: ''
    }

    this.getImage(this.props.observatory.id);
  }

  getImage(image) {
    storageRef.child(image + '.svg').getDownloadURL().then((url) => {
      this.setState({
        landmarkImg: url
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
      <Link to={'observatories/' + this.props.observatory.id}>
        <article className="weatherCard" onMouseEnter={this.toggleHover} style={cardStyle}>
          <h3>{this.state.location}</h3>
          {this.state.entries.map((weather) => {
            return(
              <ul>
                <li>{weather.temperature}°</li>
                <li>{weather.weather}</li>
              </ul>
            )
          })}
          <img src={this.state.landmarkImg} />
        </article>
      </Link>
    );
  }
}
