import React, { Component } from 'react';
import { Row, Column, Button } from 'react-foundation';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { firebaseConfig } from '../configure/firebase';
import {cardStyle} from './Card';
import {columnStyle} from './Dashboard';

export default class observatory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      weather: '',
      temperature: '',
      entries: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const observatoriesRef = firebase.database().ref('observatories').child(this.props.match.params.id);
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
    const observatoriesRef = firebase.database().ref('observatories').child(this.props.match.params.id);
    const locationRef = observatoriesRef.child('location');
    const entriesRef = observatoriesRef.child('entries');

    locationRef.on('value', (snapshot) => {
      this.setState({location: snapshot.val()});
    })
    entriesRef.on('value', (snapshot) => {
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
  }
  render() {
    return (
      <main>
        <row className="clearfix">
          <Column style={columnStyle} small={12} large={9} centerOnSmall>
            <div className="observatoryCard" style={{...cardStyle, textAlign:'left'}}>
              <Link to="/">Back to listing</Link>
              <h2>{this.state.location}</h2>
              {this.state.entries.map((weather) => {
                return (
                  <ul>
                    <li>{weather.temperature}°</li>
                    <li>{weather.weather}</li>
                  </ul>
                )
              })}
              <form onSubmit={this.handleSubmit}>
                <input type="number" name="temperature" placeholder="Weather in Celsius" onChange={this.handleChange} value={this.state.temperature} />
                <input type="text" name="weather" placeholder="Weather description" onChange={this.handleChange} value={this.state.weather} />
                <Button>Update</Button>
              </form>
            </div>
          </Column>
        </row>
      </main>
    )
  }
}
