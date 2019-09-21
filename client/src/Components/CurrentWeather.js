import React from 'react';


// import { connect } from 'react-redux';

const CurrentWeather = (props) => {

    const { weatherInfo } = props;
    if (weatherInfo) {
        let inputhtml = weatherInfo.TemperatureUnitsIcon;
        return (
            <div className="flex-center">
                {weatherInfo.WeatherIcon ? <img className="weather-icon"
                    src={`https://developer.accuweather.com/sites/default/files/${weatherInfo.WeatherIcon}-s.png`}
                    alt="Sunny"
                    title={weatherInfo.WeatherText}></img>
                    : <i className="fa fa-sun"></i>}

                <div className="weather-city-wrapper">
                    <div className="weather-city-title">{weatherInfo.WeatherCity}</div>
                    <div>

                        <span>{weatherInfo.Temperature}</span><span dangerouslySetInnerHTML={{ __html: inputhtml }}></span>
                    </div>
                </div>
            </div>
        )


    }

};


export default CurrentWeather;