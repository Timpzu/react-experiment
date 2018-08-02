import React, { Component } from 'react';
import { Row, Column, Button } from 'react-foundation';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { firebaseConfig } from '../configure/firebase';
import { styles } from './styles';
import { bgSource } from '../img/images.js';

let headerBackground = '';
let headerHeadingColor = '';

export default class observatory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      weather: '',
      temperature: '',
      entries: [],
      lastWeather: '',
      lastTemperature: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    this.setState({ weather: '', temperature: '' });
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
      let keys = Object.keys(currentWeather);
      let last = keys[keys.length-1];
      for (let i in currentWeather) {
        if (i === last) {
          this.state.lastTemperature = currentWeather[i].temperature;
          this.state.lastWeather = currentWeather[i].weather;
        }
      }
      switch (this.state.lastWeather) {
        case 'Snowy':
          headerBackground = bgSource.snowyImg;
          headerHeadingColor = '#2e2e2e';
          break;
        case 'Sunny':
          headerBackground = bgSource.sunnyImg;
          headerHeadingColor = '#2e2e2e';
          break;
        case 'Cloudy':
          headerBackground = bgSource.cloudyImg;
          headerHeadingColor = '#fff';
          break;
        case 'Rainy':
          headerBackground = bgSource.rainyImg;
          headerHeadingColor = '#fff';
          break;
        case 'Windy':
          headerBackground = bgSource.windyImg;
          headerHeadingColor = '#fff';
          break;
        default:
          headerBackground = 'blue';
      }

      let newState = [];
      for (let i in currentWeather) {
        newState.push({
          id: i,
          weather: currentWeather[i].weather,
          temperature: currentWeather[i].temperature
        });
      }
      this.setState({ entries: newState });
    });
  }

  render() {
    const arr = this.state.entries;
    let slicer = (arr, q, r) => {
      return arr.slice(Math.max(arr.length - q, 1), r)
    };
    return (
      <main>
        <Row className="clearfix">
          <Column style={styles.columnStyle} small={12} large={8} centerOnSmall>
            <div className="observatoryCard" style={{...styles.cardStyle,...styles.observatoryCard}}>
              <div style={{...styles.locationHeader, backgroundImage: 'url(' + headerBackground + ')', color: headerHeadingColor}}>
                <Row>
                  <Column>
                    <span style={styles.locationHeaderCelcius}>{this.state.lastTemperature}°</span>
                    <h4><span className="uppercase"> It is {this.state.lastWeather} today in <strong>{this.state.location}</strong></span></h4>
                  </Column>
                </Row>
              </div>
              <div style={styles.locationInputArea}>
                <Row className="clearfix">
                  <Column small={12} large={6}>
                    <h5>Past recordings</h5>
                    {slicer(arr, 5, -1).reverse().map((weather) => {
                      return (
                        <ul>
                          <li>{weather.temperature}°</li>
                          <li>{weather.weather}</li>
                        </ul>
                      )
                    })}
                  </Column>
                  <Column small={12} large={6}>
                    <form onSubmit={this.handleSubmit}>
                      <input type="number" min="-99" max="99" name="temperature" placeholder="Weather in Celsius" onChange={this.handleChange} value={this.state.temperature} required/>
                      <select name="weather" value={this.state.weather} onChange={this.handleChange} required>
                        <option value="" disabled hidden selected>Weather description</option>
                        <option value="Sunny">Sunny</option>
                        <option value="Rainy">Rainy</option>
                        <option value="Windy">Windy</option>
                        <option value="Cloudy">Cloudy</option>
                        <option value="Snowy">Snowy</option>
                      </select>
                      <Button>Update</Button>
                    </form>
                  </Column>
                </Row>
              </div>
            </div>
          </Column>
        </Row>
      </main>
    )
  }
}
