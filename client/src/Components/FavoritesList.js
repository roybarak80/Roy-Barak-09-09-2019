
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        color: theme.palette.text.secondary,
    },
}));

const FavoritesList = (props) => {
    const classes = useStyles();
    const { currFavorites } = props;
    let inputhtml = currFavorites.TemperatureUnitsIcon;
    const forecastList = currFavorites.map(function (item, index) {
        return <Grid key={index} item sm={12} xs={12} md={6} lg={3}>
            <Paper className="weather-forecast-box">
                {item.WeatherIcon ? <img className="weather-forecast-icon"
                    src={`https://developer.accuweather.com/sites/default/files/${item.WeatherIcon}-s.png`}
                    alt={item.WeatherText}
                    title={item.WeatherText}></img>
                    : <i className="fa fa-sun"></i>}

                <div className="weather-city-title">{item.name}</div>
                <div>
                    <span>{item.WeatherText}</span>
                    <span>{item.Temperature}</span><span dangerouslySetInnerHTML={{ __html: inputhtml }}></span>
                </div>

            </Paper>
        </Grid>
    });

    return (

        <div className={classes.root}>
            <Grid container spacing={3}>
                {!!forecastList && forecastList.length > 0 ? forecastList : <div className="error">No Selected Favorites</div>}
            </Grid>
        </div>

    )




};


export default FavoritesList;