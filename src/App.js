import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import BarLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import "./App.css";

const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: null,
      loading: true,
      city: "",
    };
  }

  getWeather = async (lon, lat, city) => {
    let apikey = process.env.REACT_APP_APIKEY;
    let url;
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    }
    let response = await fetch(url);
    let data = await response.json();
    this.setState({ weatherData: data, loading: false });
    console.log(data);
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.getWeather(pos.coords.longitude, pos.coords.latitude, "");
    });
  };

  componentDidMount = () => {
    this.getLocation();
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <BarLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }
    return (
      <div>
        <div className="header">
          <div className="title">
            <FontAwesomeIcon icon={faCloudSun} color="white" size="3x" /> THE
            WEATHER
          </div>
          <div className="place">
            <input
              type="text"
              onChange={(event) =>
                this.setState({ ...this.state, city: event.target.value })
              }
            />{" "}
            <button onClick={() => this.getWeather("", "", this.state.city)}>
              Search
            </button>{" "}
            &nbsp;
            <button onClick={() => this.getWeather("", "", "paris")}>
              Paris
            </button>
            <button onClick={() => this.getWeather("", "", "tokyo")}>
              Tokyo
            </button>
            <button onClick={() => this.getWeather("", "", "vancouver")}>
              Vancouver
            </button>
          </div>
        </div>
        <div
          className={`weatherBoard ${this.state.weatherData.name.toLowerCase()}`}
        >
          <div className="weatherInfo">
            <h2>{this.state.weatherData.name}</h2>
            <p>
              {this.state.weatherData.main.temp}ºC /
              {Math.round((this.state.weatherData.main.temp * 9) / 5 + 32)}ºF
            </p>
            <div>
              <img
                alt=""
                src={`http://openweathermap.org/img/wn/${this.state.weatherData.weather[0].icon}@2x.png`}
              />
            </div>
            <div>
              {this.state.weatherData.weather[0].description.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
