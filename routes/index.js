var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Timezone Change Countdown'
  };
  
  res.render('index', data);
});

module.exports = router;
