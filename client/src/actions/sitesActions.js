
// import { toast } from "react-toastify";
// import helpers from '../helpers/Helpers';

// export const checkForCityCode = (cityCodeObj) => {

//     return async dispatch => {

//         fetch(`/getCityKeyByGeoPosition/${cityCodeObj.latitude}/${cityCodeObj.longitude}`)
//             .then(function (response) {

//                 return response.json();
//             })
//             .then(function (data) {
//                 return dispatch({
//                     type: "CHECK_FOR_CITYCODE",
//                     payload: data.Key
//                 });
//             });
//     };


// }

// /**
//  * Checks if selected city is favorite
//  *
//  * @param {number} cityCode
//  */
// export const checkForFavorite = (cityCode) => {

//     return {
//         type: "CHECK_FOR_FAVORITE",
//         payload: cityCode
//     };
// }

// export const getCurrentWeather = (prmCityCode) => {

//     return async dispatch => {

//         fetch(`/getCurrentWeather/${prmCityCode}`)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 return dispatch({
//                     type: "GET_CURRENT_WEATHER",
//                     payload: data
//                 });
//             });
//     };
// };

// export const getCurrentForecast = (prmCityCode, prmIsMetricUnits) => {

//     return async dispatch => {

//         fetch(`/getCurrentForecast/${prmCityCode}/${prmIsMetricUnits}`)
//             .then(function (response) {

//                 return response.json();
//             })
//             .then(function (data) {
//                 return dispatch({
//                     type: "GET_CURRENT_FORECAST",
//                     payload: data
//                 });
//             });
//     };
// };

// export const toggleWeatherUnits = (isMetricUnits) => {

//     isMetricUnits = !isMetricUnits
//     return {
//         type: "TOGGLE_WEATHER_UNITS",
//         payload: isMetricUnits
//     };
// }

// export const onSelectCity = (textFeldValue) => {

//     return {
//         type: "SELECT_CITY_FORECAST",
//         payload: textFeldValue
//     };
// }

// export const searchCityAutoComplete = searchText => {

//     var validationReg = /^[A-Za-z\s]*$/;

//     if (!validationReg.test(searchText)) {
//         toast.warn("Only English Letters Are Allowed");
//         return {
//             type: "FETCH_DATA_ERR"
//         };

//     } else {
//         return async dispatch => {

//             fetch(`/searchCityAutoComplete/${searchText}`)
//                 .then(function (response) {

//                     return response.json();
//                 })
//                 .then(function (data) {
//                     return dispatch({
//                         type: "AUTOCOMPLETE_SEARCH",
//                         payload: data
//                     });
//                 });
//         };
//     }

// }
// export const addForecastToFavorites = (currCityCode, currWeather, currTempUnits) => {

//     const currWeatherObj = helpers.getWeatherFilteredDataObj(currWeather, currTempUnits);
//     const newFavoriteObj = Object.assign({}, currWeatherObj, {
//         id: currCityCode,
//         name: currWeatherObj.WeatherCity
//     });

//     delete newFavoriteObj.WeatherCity;

//     return {
//         type: "ADD_TO_FAVORITES",
//         payload: newFavoriteObj
//     };

// }

// export const deleteForecastFromFavorites = (favoriteID) => {

//     return {
//         type: "DELETE_FROM_FAVORITES",
//         payload: favoriteID
//     };
// }

// export const toggleSideMenu = (currSideMenuState) => {

//     currSideMenuState = !currSideMenuState;
//     return {
//         type: "SET_SIDEMENU_STATE",
//         payload: currSideMenuState
//     };
// }

// export const toggleThemeType = (currThemeType) => {

//     currThemeType = !currThemeType;
//     return {
//         type: "TOGGLE_THEME_TYPE",
//         payload: currThemeType
//     };
// }

// export const getForecastByCityCode = (favoriteCitiesNames) => {

//     return {
//         type: "FETCHING_DATA",
//         payload: favoriteCitiesNames
//     };

// }

// // export const updateSearchField = (cityName) => {
// //     // Check if input is OK
// //     var validationReg = /^[A-Za-z\s]*$/;
// //     let isValid = true;
// //     // if it's not OK, update the isNameValid state
// //     if (!validationReg.test(cityName)) {
// //         isValid = false;

// //     }
// //     const data = {
// //         cityName: cityName,
// //         isSearchFieldValid: isValid
// //     };
// //     return {
// //         type: "UPDATE_SEARCH_FIELD",
// //         payload: data
// //     };
// // }


