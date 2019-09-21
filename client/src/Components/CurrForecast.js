
import React from 'react';
import Helpers from '../helpers/Helpers';
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
        height: '150px',
        color: theme.palette.text.secondary,
        flexDirection: 'column',
        alignContent: 'center',
    },
    forecastDayText: {
        fontSize: '20px',
    }
}));
const CurrForecast = (props) => {
    const classes = useStyles();
    const { currForecast } = props;
    console.log(currForecast)
    const tempIcon = currForecast.isMetricUnits ? '&#8451;' : '&#8457;';
    let inputhtml = tempIcon;
    if (currForecast) {
        let dailyForecastsList = [];
        const dailyForecasts = currForecast['DailyForecasts'];
        if (!!dailyForecasts) {

            dailyForecastsList = dailyForecasts.map(function (prm, index) {
                const dayOfWeek = Helpers.getWeekDay(prm.Date);
                const forecastIcon = Helpers.getWeatherIconByDayTime(prm, currForecast.isDayTime);

                const forecastColor = Helpers.convertTempToRgb(prm);

                return <Grid key={index} item sm={12} xs={12} md lg>
                    <Paper className="weather-forecast-box">
                        {forecastIcon ? <img className="weather-forecast-icon"
                            src={`https://developer.accuweather.com/sites/default/files/${forecastIcon.Icon}-s.png`}
                            alt="Sunny"
                            title={forecastIcon.IconPhrase}></img>
                            : <i className="fa fa-sun"></i>}
                        <div className={classes.forecastDayText}>{dayOfWeek}</div>
                        <div className="forecast-temp">
                            {prm.Temperature.Maximum.Value}&nbsp;<span dangerouslySetInnerHTML={{ __html: inputhtml }}></span>
                        </div>
                    </Paper>
                </Grid>
            })

        }

        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {dailyForecastsList}
                </Grid>
            </div>

        )


    }

};


export default CurrForecast;