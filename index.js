const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
const path = require('path')
require('dotenv').config();
const dotenv = require('dotenv');
const axios = require('axios');
//const env = dotenv.config();
// Create the server
const app = express()
const moviesApi = require('./client/server/api/weatherApi');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/images/:term', cors(), async (req, res, next) => {
  try {
    let term = req.params.term;

    //let url = `https://jsonplaceholder.typicode.com/todos/${query}`;
    let url = process.env.apiUrl;
    //&client_id=${process.env.apiKey}
    axios({
      method: 'get',
      url,
      params: { query: term },
      headers: {
        Authorization: process.env.apiKey

      }

    })
      .then(function (response) {
        console.log(response);
        res.send(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    next(err)
  }
})


// Serve our api route /cow that returns a custom talking text cow



// app.get('/api/cow/:say', cors(), async (req, res, next) => {
//   try {
//     console.log(process.env.FOO)
//     const text = req.params.say
//     const moo = cowsay.say({ text })
//     res.json({ moo })
//   } catch (err) {
//     next(err)
//   }
// })

// Serve our base route that returns a Hellow World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    const moo = cowsay.say({ text: 'Hello World!' })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
