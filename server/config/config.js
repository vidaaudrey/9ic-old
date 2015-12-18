// export NODE_ENV=development
var env = process.env.NODE_ENV  || 'development';
module.exports = require('./'+ env + '.json');
module.exports.env = {
  PORT: process.env.PORT,
  
}

