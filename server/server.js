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
    console.log('Connected to mongolab, and listening on port 3000...');
    app.listen(3000);
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

////********** Curl Requests Examples  **********
//*************************************
// 1. get a list of all users
// curl http://localhost:3000/users/

// 2. get a user by id 
// curl http://localhost:3000/users/56730f9c49aa0671817c95b9

// 3. delete a user by id
// curl -X "DELETE" http://localhost:3000/users/56730f9c49aa0671817c95b9

// 4.  create a user 
// curl -d '{"username": "Audrey", "password": "123", "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/LucasPerdidao/128.jpg"}' -H "Content-Type:application/json" http://localhost:3000/users/

// 5. Update a user 
// curl -X PUT -d '{"username": "Audrey-Updated Name"}' -H "Content-Type:application/json"  http://localhost:3000/users/567311f303b9f3fb836e3385
