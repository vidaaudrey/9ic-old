// all environment related varibles
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var env = {
  PORT: process.env.PORT,
  TMDBKEY: process.env.TMDBKEY,
  MONGOLAB: process.env.MONGOLAB,
  NODE_ENV: process.env.NODE_ENV
};

exports["default"] = env;
module.exports = exports["default"];