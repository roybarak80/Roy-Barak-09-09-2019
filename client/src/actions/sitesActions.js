
import { toast } from "react-toastify";
import helpers from '../helpers/Helpers';
import axios from 'axios';

export const checkForCityCode = (cityCodeObj) => {

    return async dispatch => {

        axios
            .get(
                `/getCityKeyByGeoPosition/${cityCodeObj.latitude}/${cityCodeObj.longitude}`
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
 * Checks if selected city is favorite
 *
 * @param {number} cityCode
 */
export const checkForFavorite = (cityCode) => {

    return {
        type: "CHECK_FOR_FAVORITE",
        payload: cityCode
    };
}

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

export const toggleWeatherUnits = (isMetricUnits) => {

    isMetricUnits = !isMetricUnits
    return {
        type: "TOGGLE_WEATHER_UNITS",
        payload: isMetricUnits
    };
}

export const onSelectCity = (textFeldValue) => {

    return {
        type: "SELECT_CITY_FORECAST",
        payload: textFeldValue
    };
}

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

export const deleteForecastFromFavorites = (favoriteID) => {

    return {
        type: "DELETE_FROM_FAVORITES",
        payload: favoriteID
    };
}

export const toggleSideMenu = (currSideMenuState) => {

    currSideMenuState = !currSideMenuState;
    return {
        type: "SET_SIDEMENU_STATE",
        payload: currSideMenuState
    };
}

export const toggleThemeType = (currThemeType) => {

    currThemeType = !currThemeType;
    return {
        type: "TOGGLE_THEME_TYPE",
        payload: currThemeType
    };
}

export const getForecastByCityCode = (favoriteCitiesNames) => {

    return {
        type: "FETCHING_DATA",
        payload: favoriteCitiesNames
    };

}



