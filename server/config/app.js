var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  app.listen(config.port || process.env.PORT, function() {
    console.log('App listening on port', config.port);
  });
};