import { toast } from "react-toastify";

const initState = {

    currForecast: [],
    cityName: '',
    cityCode: '',
    isMetricUnits: true,
    isOpenSideMenu: false,
    isDarkTheme: true,
    currFavorites: [],
    siteError: '',
    favoriteForecasts: [],
    searchResults: [],
    selectedCity: '',
    isShowDeleteFavoriteBtn: false,
    cityGeoLocationObj: {},
    isDayTime: null,
}

const sitesReducer = (state = initState, action) => {

    switch (action.type) {

        case "SELECT_CITY_FORECAST_FROM_FAVORITE":

            state = {
                ...state,
                cityCode: action.payload
            }

            break;

        case "CHECK_FOR_CITYCODE":

            state = {
                ...state,
                cityCode: action.payload
            }

            break;
        case "CHECK_FOR_FAVORITE":

            let isFavorite = false;
            let isShowDeleteFavoriteBtn = false;
            let favoriteIdInt = action.payload;
            let currFavorites = state.currFavorites;
            let arrCheckIfFavorite = currFavorites.filter(prmItem =>
                prmItem.id === favoriteIdInt
            );

            if (arrCheckIfFavorite.length > 0) {
                isFavorite = true;
                isShowDeleteFavoriteBtn = true;
            }

            return Object.assign({}, state, { isFavorite: isFavorite, isShowDeleteFavoriteBtn: isShowDeleteFavoriteBtn });

        case "GET_CURRENT_WEATHER":

            state = {
                ...state,
                currWeather: action.payload
            }
            break;
        case "GET_CURRENT_FORECAST":

            state = {
                ...state,
                currForecast: action.payload
            }
            break;

        case "SELECT_CITY_FORECAST":

            const cityCode = state.searchResults.filter(prmItem =>
                prmItem.localizedname.toLowerCase().indexOf(action.payload.toLowerCase()) > -1
            );
            let outCityCode = null;
            if (cityCode.length > 0) {
                outCityCode = parseInt(cityCode[0]['key'])
            }

            return Object.assign({}, state, { cityCode: outCityCode, isShowResults: false });

        case "AUTOCOMPLETE_SEARCH":

            state = {
                ...state,
                searchResults: action.payload
            }
            return Object.assign({}, state, { searchResults: action.payload, isShowResults: true });

        case "SET_SIDEMENU_STATE":

            state = {
                ...state,
                isOpenSideMenu: action.payload
            }
            break;
        case "TOGGLE_WEATHER_UNITS":

            state = {
                ...state,
                isMetricUnits: action.payload
            }
            break;

        case "TOGGLE_THEME_TYPE":

            state = {
                ...state,
                isDarkTheme: action.payload
            }
            break;


        case "ADD_TO_FAVORITES":

            let favoriteId = action.payload;

            let arrCheckForDuplicteFavorites = state.currFavorites.filter(prmItem =>
                prmItem.id === favoriteId.id
            );

            if (arrCheckForDuplicteFavorites.length === 0) {

                state = {
                    ...state,
                    currFavorites: [...state.currFavorites, action.payload]
                }
                toast.success("Forecast Addes To Favorites");
                return Object.assign({}, state, { isShowDeleteFavoriteBtn: true });
            }

            break;

        case "DELETE_FROM_FAVORITES":


            let favoriteToDelete = state.currFavorites.filter(prmItem =>
                prmItem.id === action.payload
            )[0];
            let currFavoriteIndex = state.currFavorites.indexOf(favoriteToDelete);

            if (currFavoriteIndex !== -1) {

                state.currFavorites.splice(currFavoriteIndex, 1);

                state = {
                    ...state,
                    currFavorites: [...state.currFavorites]
                }
                toast.success("Forecast Deleted From Favorites");
                return Object.assign({}, state, { isShowDeleteFavoriteBtn: false });
            }

            break;

        case "FETCH_DATA_ERR":
            state = {
                ...state,
                siteError: action.payload
            }
            break;
        default:
            return state;
    }



    return state;
}

export default sitesReducer;