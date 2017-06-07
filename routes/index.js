var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Timezone Change Countdown'
  };
  
  data.zones = moment.tz.names();
  
  res.render('index', data);
});

module.exports = router;
