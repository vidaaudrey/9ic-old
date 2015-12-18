"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('dotenv/config');

var _configEnv = require('./config/env');

var _configEnv2 = _interopRequireDefault(_configEnv);

var _configConfig = require('./config/config');

var _configConfig2 = _interopRequireDefault(_configConfig);

var _middlewareMiddleware = require('./middleware/middleware');

var _middlewareMiddleware2 = _interopRequireDefault(_middlewareMiddleware);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _nodeRestful = require('node-restful');

var _nodeRestful2 = _interopRequireDefault(_nodeRestful);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _morgan = require('morgan');

// import routes       from './routes/index';
// import users        from './routes/users'

var _morgan2 = _interopRequireDefault(_morgan);

var _controllerSchemaFactory = require('./controller/SchemaFactory');

var _controllerSchemaFactory2 = _interopRequireDefault(_controllerSchemaFactory);

var _configDataFaker = require('./config/DataFaker');

var _configDataFaker2 = _interopRequireDefault(_configDataFaker);

var TMDB = require('moviedb')(_configEnv2['default'].TMDBKEY);
var app = (0, _express2['default'])();

var schemas = new _controllerSchemaFactory2['default'](_mongoose2['default']);

// Log all request in console
app.use((0, _morgan2['default'])('dev'));
// Set app's Favicon
app.use((0, _serveFavicon2['default'])('./client/favicon.ico'));

// Server the client folder
app.use(_express2['default']['static']('client'));

// Add Middleware necessary for Auth and REST API
app.use((0, _cookieParser2['default'])());
app.use(_bodyParser2['default'].json());
app.use(_bodyParser2['default'].urlencoded({
  extended: true
}));
app.use((0, _methodOverride2['default'])('X-HTTP-Method-Override'));

// Add routes
// app.use('/', routes);
// app.use('/users', users);

// Connect to mongolab
_mongoose2['default'].connect(_configEnv2['default'].MONGOLAB).connection.once('open', function () {
  console.log('Connected to mongolab, and listening on port' + _configEnv2['default'].PORT);
});

// Create the Restful middleware and register to app
var User = app.user = _nodeRestful2['default'].model('user', schemas.getUserSchema()).methods(['get', 'post', 'put', 'delete']);

// Register the Restful object to app
User.register(app, '/users');

// Fake some data. Remove this for deployment
// require('./config/datafaker')(User);
var datafaker = new _configDataFaker2['default'](User);

datafaker.createUsers(3);

var router = _express2['default'].Router();

// get a list of upcoming movies
router.get('/movies/upcoming', function (req, res) {
  var host = _configConfig2['default'].tmdbBaseUrl + 'upcoming?api_key=' + _configEnv2['default'].TMDBKEY;

  (0, _request2['default'])(host, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // body will contain the movie data in json format
      res.send(body);
    }
  });
});

// get list of popular movies
router.get('/movies', function (req, res) {
  var host = _configConfig2['default'].tmdbBaseUrl + 'popular?api_key=' + _configEnv2['default'].TMDBKEY;

  (0, _request2['default'])(host, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // body will contain the movie data in json format
      res.send(body);
    }
  });
});
app.use('/', router);

// use middleware to setup CORS support,
// handle errors for development, production, and 404
(0, _middlewareMiddleware2['default'])(app, _configEnv2['default']);

app.listen(_configEnv2['default'].PORT, function (err) {
  console.log('started listening', _configEnv2['default'].PORT, err || '');
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