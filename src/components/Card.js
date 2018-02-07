import React, { Component } from 'react';
import { Button } from 'react-foundation';
import firebase from 'firebase';
import { firebaseConfig } from '../configure/firebase.js';

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();

let cardStyle = {
  width: '100%',
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getImage(image) {
    storageRef.child(image + '.svg').getDownloadURL().then((url) => {
      this.setState({
        landmark: url
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const observatoriesRef = firebase.database().ref('observatories').child(this.props.observatory.id);
    const entriesRef = observatoriesRef.child('entries');
    const currentWeather = {
      weather: this.state.weather,
      temperature: this.state.temperature
    }
    entriesRef.push(currentWeather);
    this.setState({
      weather: '',
      temperature: ''
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
              <span style={{fontSize: '52px', fontWeight: 'bold'}}>{weather.temperature}°</span>
              <span>{weather.weather}</span>
            </div>
          )
        })}
        <img style={{width: '80%', position:'relative', left:'0'}} src={this.state.landmark} />
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="weather" placeholder="Weather description" onChange={this.handleChange} value={this.state.weather} />
          <input type="number" name="temperature" placeholder="Weather in Celsius" onChange={this.handleChange} value={this.state.temperature} />
          <Button>Update</Button>
        </form>
        <Button>Route</Button>
      </article>
    );
  }
}
