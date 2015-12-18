'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (app, env) {
  // CORS Support
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // handle 404
  app.use(function (req, res, next) {
    var err = new Error('Not Found');

    err.status = 404;
    next(err);
  });

  // give the error message to client in development stage
  if (env.NODE_ENV === 'development') {
    app.use(function (err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // error handling for production environment
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};

module.exports = exports['default'];