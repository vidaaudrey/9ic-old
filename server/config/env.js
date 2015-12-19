"use strict";
// all environment related varibles
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