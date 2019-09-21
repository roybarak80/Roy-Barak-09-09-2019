
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
    },
}));
const CurrForecast = (props) => {
    const classes = useStyles();
    const { currForecast } = props;
    const tempIcon = currForecast.isMetricUnits ? '&#8451;' : '&#8457;';
    let inputhtml = tempIcon;
    if (currForecast) {
        let dailyForecastsList = [];
        const dailyForecasts = currForecast['DailyForecasts'];
        if (!!dailyForecasts) {

            dailyForecastsList = dailyForecasts.map(function (prm, index) {
                const dayOfWeek = Helpers.getWeekDay(prm.Date);

                return <Grid key={index} item sm={12} xs={12} md lg>
                    <Paper className={classes.paper}>

                        <span className="forecast-day-text">{dayOfWeek}</span>
                        <span className="forecast-temp">

                            {prm.Temperature.Maximum.Value}
                        </span><span dangerouslySetInnerHTML={{ __html: inputhtml }}></span>
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