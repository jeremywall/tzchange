var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Time Zone Change Countdown'
  };
  
  res.render('index', data);
});

module.exports = router;
