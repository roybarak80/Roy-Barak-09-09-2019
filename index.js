const express = require('express')
const cors = require('cors')
const path = require('path')
const axios = require('axios');
require('dotenv').config();
// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

//geoposition
app.get('/getCityKeyByGeoPosition/:cityLat/:cityLon', cors(), async (req, res, next) => {
    try {

        let cityLat = req.params.cityLat;
        let cityLon = req.params.cityLon;

        let url = `${process.env.API_URL}locations/v1/cities/geoposition/search?apikey=${process.env.API_KEY}&q=${cityLat},${cityLon}`;

        axios({
            method: 'get',
            url, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then(function (response) {
                res.send(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (err) {
        next(err)
    }
})

app.get('/getCurrentWeather/:cityCode', cors(), async (req, res, next) => {
    try {

        let cityCode = req.params.cityCode;
        if (cityCode.length == 0) {
            console.log(34)
        }
        let url = `${process.env.API_URL}currentconditions/v1/${cityCode}?apikey=${process.env.API_KEY}`;

        axios({
            method: 'get',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then(function (response) {
                res.send(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (err) {
        next(err)
    }
})

app.get('/getCurrentForecast/:CityCode/:IsMetricUnits', cors(), async (req, res, next) => {
    try {
        let CityCode = req.params.CityCode;
        let IsMetricUnits = req.params.IsMetricUnits;
        let url = `${process.env.API_URL}forecasts/v1/daily/5day/${CityCode}?apikey=${process.env.API_KEY}&metric=${IsMetricUnits}`;

        axios({
            method: 'get',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then(function (response) {
                res.send(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (err) {
        next(err)
    }
})

app.get('/searchCityAutoComplete/:term', cors(), async (req, res, next) => {
    try {

        let term = req.params.term;

        let url = `${process.env.API_URL}locations/v1/cities/autocomplete?apikey=${process.env.API_KEY}&q=${term}`
        axios({
            method: 'get',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(function (response) {
                let dataToLower = [];
                for (let index = 0; index < response.data.length; index++) {
                    const element = response.data[index];
                    delete element.Country;
                    delete element.AdministrativeArea;
                    delete element.Rank;
                    delete element.Type;
                    delete element.Version;

                    dataToLower.push(Object.keys(element)
                        .reduce((destination, key) => {
                            destination[key.toLowerCase()] = element[key];
                            return destination;
                        }, {}));

                }

                res.send(JSON.stringify(dataToLower));
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (err) {
        next(err)
    }
})

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})
