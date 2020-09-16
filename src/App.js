import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
    };
  }

  getWeather = async () => {
    let apikey = process.env.REACT_APP_APIKEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=${apikey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    this.setState({ weather: data });
  };

  componentDidMount = () => {
    this.getWeather();
  };

  render() {
    return <div>{this.state.weather && this.state.weather.main.temp}</div>;
  }
}
