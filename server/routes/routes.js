var express = require('express');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
}

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('index', {
    title: 'Members'
  });
});



module.exports = router;
