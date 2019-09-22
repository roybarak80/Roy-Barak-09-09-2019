
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },

}));

const FavoritesList = (props) => {

    const classes = useStyles();
    const { currFavorites } = props;



    const forecastList = currFavorites.map(function (item, index) {
        let inputhtml = item.TemperatureUnitsIcon;
        return <Grid key={index} item sm={12} xs={12} md={6} lg={3}>
            <Paper className="weather-forecast-box" onClick={(textFeldValue, event) => {
                props.onSelectCityFromFavorites(item.id);
            }}>

                {item.WeatherIcon ? <img
                    src={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon}-s.png`}
                    alt={item.WeatherText}
                    title={item.WeatherText}></img>
                    : <i className="fa fa-sun"></i>}

                <div className="weather-city-title">{item.name}</div>

                <div className="d-flex flex-column justify-content-center align-items-center">
                    <span className="favorite-tempature-text">{item.Temperature}<span dangerouslySetInnerHTML={{ __html: inputhtml }}></span></span>
                    <span>{item.WeatherText}</span>
                </div>

            </Paper>
        </Grid>
    });

    return (

        <div className={classes.root}>

            <Link to="/">
                <Grid container spacing={3}>
                    {!!forecastList && forecastList.length > 0 ? forecastList : <div className="error">No Selected Favorites</div>}
                </Grid>
            </Link>

        </div>

    )




};


export default FavoritesList;