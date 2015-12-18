'use strict';

require('dotenv').load();
var env = require('./config/env.js');
import ENV from '/config/env';
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restful = require('node-restful');
var Schema = mongoose.Schema;
var TMDB = require('moviedb')(env.TMDBKEY);
// var moviesRoutes = require('./routes/movies');
// var router = express.Router();
// var config = require('./config/config.js');
// var _ = require('lodash');
// var request = require('request');


TMDB.searchMovie({
  query: 'Alien'
}, function (err, res) {
  console.log(res);
});

// Create the application.
var app = express();

// Serve static html from client folder
app.use(express.static('client'));

// app.use('/movies', moviesRoutes);

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to mongolab
mongoose.connect(env.MONGOLAB)
  .connection.once('open', function () {
    app.listen(env.PORT || 3000);
    console.log('Connected to mongolab, and listening on port' + env.PORT);
  });

// Create User schemas for Mongodb
var UserSchema = new Schema({
  username: String,
  password: String,
  avatar: String
});

// Create the Restful middleware and register to app
var User = app.user = restful.model('user', UserSchema).methods(['get', 'post',
  'put', 'delete'
]);

User.register(app, '/users');

// Fake some data. Remove this for deployment
require('./config/datafaker')(User);

// Example on how to get movie data from tmdb
// var host = config.tmdbBaseUrl + '550?api_key=' + env.TMDBKEY;

// request(host, function (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     console.log(body); // will out put the json data for movies
//   }
// });
