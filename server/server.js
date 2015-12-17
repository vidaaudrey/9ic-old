var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var restful = require('node-restful');
var Schema = mongoose.Schema;

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
mongoose.connect('mongodb://9ic:ilove9ic@ds033125.mongolab.com:33125/movtinder')
  .connection.once('open', function() {
    console.log('Connected to mongolab, and listening on port' + process.env.PORT);
    app.listen(process.env.PORT || 3000);
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
require('./utils/datafaker')(User);


