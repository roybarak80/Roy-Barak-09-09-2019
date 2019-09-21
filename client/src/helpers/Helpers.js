
import moment from "moment";

const helpers = {

    getUserLocation: async function (prmCItyCode) {

        let cityGeoLocationObj = {
            latitude: '',
            longitude: ''
        }
        if (prmCItyCode === '') {
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                var crd = pos.coords;
                cityGeoLocationObj.latitude = crd.latitude;
                cityGeoLocationObj.longitude = crd.longitude;
            }

            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }

            navigator.geolocation.getCurrentPosition(success, error, options);
            return cityGeoLocationObj;
        }

        

    },

    /**
     * 
     * @param {*} prmDate 
     */
    getWeekDay: function (prmDate) {

        const currDate = new Date(prmDate);
        var weekDayName = moment(currDate).format('dddd');
        return weekDayName;
    },
    /**
     * 
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

        if (!!prmCurrWeatherObj && prmCurrWeatherObj.length > 0) {
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

    // helper3: function(param1, param2){

    // }
}



export default helpers;