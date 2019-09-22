import moment from "moment";

const helpers = {

    /**
     * Create a weather icon object (icon number and weather description).
     * @param {Object} prmWeatherDayObj - Forecast day.
     */
    setWeatherIconObj: function (prmWeatherDayObj) {
        let weatherIcon = prmWeatherDayObj.Icon.toString();

        let iconObj = {
            Icon: '',
            IconPhrase: ''
        }
        if (weatherIcon.length < 2) {
            weatherIcon = 0 + weatherIcon;
        }
        iconObj.Icon = weatherIcon;
        iconObj.IconPhrase = prmWeatherDayObj.IconPhrase;

        return iconObj;

    },

    /**
     * Create a weather icon object by day time / night / day.
     * @param {Object} prmWeatherDayObj - Forecast day.
     * @param {boolean} prmIsDayTime - If Day time.
     */
    getWeatherIconByDayTime: function (prmDayForecastObj, prmIsDayTime) {

        let currDayTypeObj = {};
        let weatherIconObj = {};


        switch (prmIsDayTime) {
            case false: // Night Time
                currDayTypeObj = prmDayForecastObj.Night;

                weatherIconObj = this.setWeatherIconObj(currDayTypeObj);

                break;

            case true: // Day Time
                currDayTypeObj = prmDayForecastObj.Day;

                weatherIconObj = this.setWeatherIconObj(currDayTypeObj);
                break;
            default:
                break;


        }

        return weatherIconObj;
    },

    /**
     * Return date weekday name
     * @param {string} prmDate - Date.
     */

    getWeekDay: function (prmDate) {

        const currDate = new Date(prmDate);
        var weekDayName = moment(currDate).format('dddd');
        return weekDayName;
    },

    /**
     * Returns location details (country name, city name)
     * @param {string} prmUrlStr - Date.
     */

    getLocationInfo: function (prmUrlStr) {

        let outObj = {
            city: '',
            country: '',
        }

        const arrUrlData = prmUrlStr.split('/');
        outObj.city = arrUrlData[5].replace(/-/g, ' ');
        outObj.country = arrUrlData[4];

        return outObj;

    },

    /**
     * Returns weather object with relevant details
     * @param {object} prmCurrWeatherObj - Weather forecast object.
     * @param {boolean} prmIsMetric - Is Metric mode.
     */

    getWeatherFilteredDataObj: function (prmCurrWeatherObj, prmIsMetric) {

        let weatherDataObj = {
            WeatherIcon: '',
            WeatherText: '',
            WeatherCity: '',
            WeatherCountry: '',
            Temperature: '',
            TemperatureUnitsIcon: '',
            Date: '',
        };

        if (!!prmCurrWeatherObj && prmCurrWeatherObj.length > 0 && Array.isArray(prmCurrWeatherObj)) {
            const currWeatherObj = prmCurrWeatherObj[0];

            let weatherIcon = '';
            let titleDataObj = {};

            weatherIcon = currWeatherObj.WeatherIcon.toString();
            if (weatherIcon.length < 2) {
                weatherIcon = 0 + weatherIcon;
            }

            if (currWeatherObj.hasOwnProperty('Link')) {

                const linkStr = currWeatherObj['Link'].toString();

                titleDataObj = this.getLocationInfo(linkStr);

            }

            weatherDataObj.WeatherIcon = weatherIcon;
            weatherDataObj.WeatherText = currWeatherObj.WeatherText;
            weatherDataObj.Temperature = prmIsMetric ? currWeatherObj.Temperature.Metric.Value : currWeatherObj.Temperature.Imperial.Value;
            weatherDataObj.TemperatureUnitsIcon = prmIsMetric ? '&#8451;' : '&#8457;';
            weatherDataObj.currDate = currWeatherObj.LocalObservationDateTime;
            weatherDataObj.WeatherCity = titleDataObj.city;
            weatherDataObj.WeatherCountry = titleDataObj.country;
        }


        return weatherDataObj;
    },

}



export default helpers;