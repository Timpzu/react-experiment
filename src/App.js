import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Column, Menu, MenuItem, MenuText, TopBar } from 'react-foundation';
import './foundation.css';
import './App.css';

let cityCardStyle = {
  width: '100%',
  background: '#fff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  borderRadius: '4px',
}
let infoWindowStyle = {
  height: '250px',
  width:'100%',
  padding: '10px',
  background: '',
  color: '#fff',
  textAlign: 'center'
}
let columnStyle = {
  paddingTop: '0.9375rem'
}
const night = 'linear-gradient(to bottom, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)';
const morning = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const day = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const evening = 'linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%)';

let mockserverData = {
  cities: [
    {
      name: 'Helsinki',
      latestNotes: [],
      timeZone: 2
    },
    {
      name: 'Tokyo',
      latestNotes: [],
      timeZone: 9
    },
    {
      name: 'New York',
      latestNotes: [],
      timeZone: -5
    },
    {
      name: 'Dubai',
      latestNotes: [],
      timeZone: 4
    },
    {
      name: 'Amsterdam',
      latestNotes: [],
      timeZone: 1
    }
  ]
}

class CityCard extends Component {
  render() {
    const cityProps = this.props.city;
    let date = new Date();
    date.setHours(date.getUTCHours() + cityProps.timeZone);
    let currentHour = date.getHours();

    currentHour >= 22 || currentHour < 6
    ? infoWindowStyle.background = night : infoWindowStyle.background = day;

    return (
      <div style={cityCardStyle}>
        <div style={{...infoWindowStyle}}>
          <h4>{cityProps.name}</h4>
        </div>
        <ul>
          {cityProps.latestNotes.map(info =>
            <li></li>
          )}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: mockserverData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        <TopBar>
          <Menu>
            <MenuText>Weather app</MenuText>
            <MenuItem><a>Valinta 1</a></MenuItem>
            <MenuItem><a>Valinta 2</a></MenuItem>
          </Menu>
        </TopBar>
        <main style={{backgroundColor:'#F4F7F5', marginTop:'54px'}}>
          {this.state.serverData.cities ?
            <row className="clearfix">
              {this.state.serverData.cities.map(city =>
                <Column style={columnStyle} small={12} large={3}>
                  <CityCard city={city}/>
                </Column>
              )}
            </row>: <h4>Loading content...</h4>

          }
        </main>
      </div>
    );
  }
}
export default App;
