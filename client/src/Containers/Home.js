import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentForecast, toggleWeatherUnits, getCurrentWeather, checkForCityCode } from '../actions/sitesActions';

import helpers from '../helpers/Helpers';
import Fade from 'react-reveal/Fade';

import AddToFavorites from '../Components/AddToFavorites';
import CurrentWeather from '../Components/CurrentWeather';
import CurrForecast from '../Components/CurrForecast';
import SearchAutocomplete from '../Components/SearchAutocomplete';

class Home extends Component {

    componentWillMount() {

        const { cityCode } = this.props;

        /** Get city code by GeoLocation **/

        if (cityCode === '') {
            let cityGeoLocationObj = {
                latitude: '',
                longitude: ''
            }

            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            const success = (pos) => {
                var crd = pos.coords;
                cityGeoLocationObj.latitude = crd.latitude;
                cityGeoLocationObj.longitude = crd.longitude;

                /** Set the coordinates to the action for retriving the city key and store it **/

                this.props.checkForCityCode(cityGeoLocationObj);
            }

            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }

            navigator.geolocation.getCurrentPosition(success, error, options);
        }

        const { isMetricUnits } = this.props;

        this.props.getCurrentWeather(cityCode);
        this.props.getCurrentForecast(cityCode, isMetricUnits);
    }

    componentDidUpdate(prevProps) {

        const { cityCode } = this.props;
        const { isMetricUnits } = this.props;
        if (prevProps.cityCode !== cityCode) {
            this.props.getCurrentWeather(cityCode);
            this.props.getCurrentForecast(cityCode, isMetricUnits);
        }

        if (prevProps.isMetricUnits !== isMetricUnits) {
            this.props.getCurrentForecast(cityCode, isMetricUnits);

        }
    }

    render() {
        const { cityCode } = this.props;
        const { currForecast } = this.props;
        const { currWeather } = this.props;
        const { isMetricUnits } = this.props;
        const currWeatherObj = currWeather ? helpers.getWeatherFilteredDataObj(currWeather, isMetricUnits) : {};
        const currForecastObj = Object.assign({}, currForecast ? currForecast : {}, { isMetricUnits: isMetricUnits });

        return (
            <div >

                <div className="row ">
                    <div className="col-md-12">
                        <SearchAutocomplete></SearchAutocomplete>
                    </div>
                </div>
                <div className="curr-weather-box direction-column-space-between">


                    <div className="flex-spread-evenly transparent-strip">
                        <Fade top>

                            <CurrentWeather weatherInfo={currWeatherObj} ></CurrentWeather>
                            <AddToFavorites cityCode={cityCode}></AddToFavorites>

                        </Fade>
                    </div>

                    <div className="forecast-panels">

                        <Fade top>
                            <CurrForecast currForecast={currForecastObj}></CurrForecast>
                        </Fade>

                    </div>

                </div>
                <ToastContainer autoClose={2000} />
            </div>



        )
    }
}

const mapStateToProps = state => {

    return {
        currWeather: state.sitesReducer.currWeather,
        currForecast: state.sitesReducer.currForecast,
        cityCode: state.sitesReducer.cityCode,
        isMetricUnits: state.sitesReducer.isMetricUnits
    }
}

const mapDispatchToProps = disaptch => {
    return {

        toggleWeatherUnits() {
            disaptch(toggleWeatherUnits())
        },
        getCurrentWeather(cityCode) {
            disaptch(getCurrentWeather(cityCode))
        },
        getCurrentForecast(cityCode, isMetricUnits) {
            disaptch(getCurrentForecast(cityCode, isMetricUnits))
        },
        checkForCityCode(cityCode) {
            disaptch(checkForCityCode(cityCode))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);