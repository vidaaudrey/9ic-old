require('dotenv').load();
var env = require('./config/env.js');
var config = require('./config/config.js');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var restful = require('node-restful');
var Schema = mongoose.Schema;
var http = require('http');
var request = require('request');

// Create the application.
var app = express();
// Serve static html from client folder
app.use(express.static('client'));

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Connect to mongolab
mongoose.connect(env.MONGOLAB)
	.connection.once('open', function() {
		console.log('Connected to mongolab, and listening on port' + env.PORT);
		app.listen(env.PORT || 3000);
	});

// Create User schemas for Mongodb
var UserSchema = new Schema({
	username: String,
	password: String,
	avatar: String
});

// Create the Restful middleware and register to app 
var User = app.user = restful.model('user', UserSchema).methods(['get', 'post', 'put', 'delete']);
User.register(app, '/users');

// Fake some data. Remove this for deployment 
require('./config/datafaker')(User);


// Example on how to get movie data from tmdb 
var host = config.tmdbBaseUrl + '550?api_key=' + env.TMDBKEY;
request(host, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);  // will out put the json data for movies
  }
});
var key = env.TMDBKEY;
var db = env.MONGOLAB;
console.log(key,db );

