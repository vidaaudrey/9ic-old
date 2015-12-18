"use strict";

import {}
from 'dotenv/config';
import env from './config/env';
import config from './config/config';
import middleware from './middleware/middleware';
import express from 'express';
import favicon from 'serve-favicon';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import restful from 'node-restful';
import request from 'request';
import logger from 'morgan';
// import routes       from './routes/index';
// import users        from './routes/users'

import SchemaFactory from './controller/SchemaFactory';
import DataFaker from './config/DataFaker';

let TMDB = require('moviedb')(env.TMDBKEY);
let app = express();

let schemas = new SchemaFactory(mongoose);

// Log all request in console
app.use(logger('dev'));
// Set app's Favicon
app.use(favicon('./client/favicon.ico'));

// Server the client folder
app.use(express.static('client'));

// Add Middleware necessary for Auth and REST API
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));

// Add routes
// app.use('/', routes);
// app.use('/users', users);


// Connect to mongolab
mongoose.connect(env.MONGOLAB)
  .connection.once('open', () => {
    console.log('Connected to mongolab, and listening on port' + env.PORT);
  });

// Create the Restful middleware and register to app
let User = app.user = restful.model('user', schemas.getUserSchema()).methods(['get', 'post',
  'put', 'delete'
]);

// Register the Restful object to app
User.register(app, '/users');

// Fake some data. Remove this for deployment
// require('./config/datafaker')(User);
let datafaker = new DataFaker(User);

datafaker.createUsers(3);

let router = express.Router();

// get a list of upcoming movies
router.get('/movies/upcoming', function (req, res) {
  let host = config.tmdbBaseUrl + 'upcoming?api_key=' + env.TMDBKEY;

  request(host, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // body will contain the movie data in json format
      res.send(body);
    }
  });
});

// get list of popular movies
router.get('/movies', function (req, res) {
  let host = config.tmdbBaseUrl + 'popular?api_key=' + env.TMDBKEY;

  request(host, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // body will contain the movie data in json format
      res.send(body);
    }
  });
});
app.use('/', router);


// use middleware to setup CORS support,
// handle errors for development, production, and 404
middleware(app, env);

app.listen(env.PORT, (err) => {
  console.log('started listening', env.PORT, err || '');
});

// Example on how to get movie by using  moviedb
// TMDB.searchMovie({
//   query: 'Alien'
// }, function (err, res) {
//   console.log(res);
// });


// Example on how to get movie data from tmdb
// var host = config.tmdbBaseUrl + '550?api_key=' + env.TMDBKEY;
// request(host, function (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     console.log(body); // will out put the json data for movies
//   }
// });
