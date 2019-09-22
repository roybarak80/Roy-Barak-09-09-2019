import {
    toast
} from "react-toastify";
import helpers from '../helpers/Helpers';
import axios from 'axios';


export const onSelectCityFromFavorites = (cityCode) => {

    return {
        type: "SELECT_CITY_FORECAST_FROM_FAVORITE",
        payload: cityCode
    };
}

/**
 * checkForCityCode
 * Get CityCode by Coordinates
 * @param {object} cityCoordinates - Weather forecast object.
 */

export const checkForCityCode = (cityCoordinates) => {

    return async dispatch => {

        axios
            .get(
                `/getCityKeyByGeoPosition/${cityCoordinates.latitude}/${cityCoordinates.longitude}`
            )
            .then(data => {

                return dispatch({
                    type: "CHECK_FOR_CITYCODE",
                    payload: data.data.Key
                });
            })
            .catch(err => {
                console.log('Error happened during fetching!', err);
            });


    };


}

/**
 * checkForFavorite
 * Checks if a city is appears in favorites
 * @param {number} cityCode - City key code.
 */

export const checkForFavorite = (cityCode) => {

    return {
        type: "CHECK_FOR_FAVORITE",
        payload: cityCode
    };
}

/**
 * getCurrentWeather
 * Dispatch weather of current day and city 
 * @param {number} cityCode - City key code.
 */

export const getCurrentWeather = (prmCityCode) => {

    return async dispatch => {
        axios
            .get(
                `/getCurrentWeather/${prmCityCode}`
            )
            .then(data => {

                return dispatch({
                    type: "GET_CURRENT_WEATHER",
                    payload: data.data
                });
            })
            .catch(err => {
                console.log('Error happened during fetching!', err);
            });

    };
};

/**
 * getCurrentForecast
 * Dispatch weekly forecast by city code lry 
 * @param {number} cityCode - City key code.
 * @param {boolean} prmIsMetricUnits - Is Metric Units.
 */

export const getCurrentForecast = (prmCityCode, prmIsMetricUnits) => {

    return async dispatch => {

        axios
            .get(
                `/getCurrentForecast/${prmCityCode}/${prmIsMetricUnits}`
            )
            .then(data => {

                return dispatch({
                    type: "GET_CURRENT_FORECAST",
                    payload: data.data
                });
            })
            .catch(err => {
                console.log('Error happened during fetching!', err);
            });

    };
};

/**
 * toggleWeatherUnits
 * Dispatch selected weather units (celsius \ fahrenheit) 
 * @param {boolean} isMetricUnits - Is Metric Units.
 */

export const toggleWeatherUnits = (isMetricUnits) => {

    isMetricUnits = !isMetricUnits
    return {
        type: "TOGGLE_WEATHER_UNITS",
        payload: isMetricUnits
    };
}

/**
 * onSelectCity
 * Dispatch selected city 
 * @param {string} textFeldValue -Selcted city key code.
 */

export const onSelectCity = (cityCode) => {

    return {
        type: "SELECT_CITY_FORECAST",
        payload: cityCode
    };
}

/**
 * searchCityAutoComplete
 * Dispatch autocomplete results 
 * @param {string} searchText -Selcted city name.
 */

export const searchCityAutoComplete = searchText => {

    var validationReg = /^[A-Za-z\s]*$/;

    if (!validationReg.test(searchText)) {
        toast.warn("Only English Letters Are Allowed");
        return {
            type: "FETCH_DATA_ERR"
        };

    } else {
        return async dispatch => {

            axios
                .get(
                    `/searchCityAutoComplete/${searchText}`
                )
                .then(data => {

                    return dispatch({
                        type: "AUTOCOMPLETE_SEARCH",
                        payload: data.data
                    });
                })
                .catch(err => {
                    console.log('Error happened during fetching!', err);
                });


        };
    }

}

/**
 * addForecastToFavorites
 * Adds city forecast to favorites 
 * @param {number} currCityCode -City key code.
 * @param {object} currWeather - Current city forecast.
 * @param {boolean} currTempUnits -Is Metric Units.
 * 
 */

export const addForecastToFavorites = (currCityCode, currWeather, currTempUnits) => {

    const currWeatherObj = helpers.getWeatherFilteredDataObj(currWeather, currTempUnits);
    const newFavoriteObj = Object.assign({}, currWeatherObj, {
        id: currCityCode,
        name: currWeatherObj.WeatherCity
    });

    delete newFavoriteObj.WeatherCity;

    return {
        type: "ADD_TO_FAVORITES",
        payload: newFavoriteObj
    };

}

/**
 * deleteForecastFromFavorites
 * Delete city forecast from favorites 
 * @param {number} favoriteID -City key code.
 * 
 */

export const deleteForecastFromFavorites = (favoriteID) => {

    return {
        type: "DELETE_FROM_FAVORITES",
        payload: favoriteID
    };
}

/**
 * toggleSideMenu
 * Toggles Side Menu 
 * @param {boolean} currSideMenuState -City key code.
 * 
 */

export const toggleSideMenu = (currSideMenuState) => {

    currSideMenuState = !currSideMenuState;
    return {
        type: "SET_SIDEMENU_STATE",
        payload: currSideMenuState
    };
}

/**
 * toggleThemeType
 * Toggles between Dark and Light Theme
 * @param {boolean} currThemeType - Current theme type.
 * 
 */

export const toggleThemeType = (currThemeType) => {

    currThemeType = !currThemeType;
    return {
        type: "TOGGLE_THEME_TYPE",
        payload: currThemeType
    };
}

/**
 * getForecastByCityCode
 * Dispatches favorite cities
 * @param {object} favoriteCitiesNames - Current favorite cities.
 * 
 */

export const getForecastByCityCode = (favoriteCitiesNames) => {

    return {
        type: "FETCHING_DATA",
        payload: favoriteCitiesNames
    };

}