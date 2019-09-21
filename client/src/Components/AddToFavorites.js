import React from 'react';
import { connect } from 'react-redux';
import { addForecastToFavorites, deleteForecastFromFavorites, checkForFavorite } from '../actions/sitesActions';

const AddToFavorites = ({
    currCityCode,
    currWeather,
    onAddWeatherToFavorites,
    isShowDeleteFavoriteBtn,
    onDeleteForecastFromFavorites,
    checkForFavorite,
    isFavorite,
    isMetricUnits }) => {

    checkForFavorite(currCityCode)
    return (
        <div className="flex-center">
            {isFavorite && <i className="fa fa-heart favorite-icon"></i>}

            {!isShowDeleteFavoriteBtn ?
                <span className="btn btn-primary"
                    onClick={() => { onAddWeatherToFavorites(currCityCode, currWeather, isMetricUnits) }}>Add To Favorites</span>
                :
                <span className="btn btn-danger"
                    onClick={() => { onDeleteForecastFromFavorites(currCityCode) }}>Remove From Favorites</span>
            }

        </div>
    )
}

const mapStateToProps = state => {

    return {

        currCityCode: state.sitesReducer.cityCode,
        currFavorites: state.sitesReducer.currFavorites,
        currWeather: state.sitesReducer.currWeather,
        isMetricUnits: state.sitesReducer.isMetricUnits,
        isShowDeleteFavoriteBtn: state.sitesReducer.isShowDeleteFavoriteBtn,
        isFavorite: state.sitesReducer.isFavorite,
    }
}

const mapDispatchToProps = dispatch => ({

    onAddWeatherToFavorites: (currCityCode, currWeather, isMetricUnits) => { dispatch(addForecastToFavorites(currCityCode, currWeather, isMetricUnits)) },
    onDeleteForecastFromFavorites: (favoriteID) => { dispatch(deleteForecastFromFavorites(favoriteID)) },
    checkForFavorite: (currCityCode) => { dispatch(checkForFavorite(currCityCode)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToFavorites);

