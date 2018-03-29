var express = require('express');
var _ = require('lodash');
var moment = require('moment-timezone');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Time Zone Change Countdown'
  };
  
  res.render('index', data);
});

/* GET JSON data. */
router.get('/next-change.json', function(req, res, next) {
  var data = [];
  var zones = moment.tz.names();
  var nowMoment = moment();
  _.each(zones, function(zoneName) {
    var zone = moment.tz.zone(zoneName);
    var nextChangeIndex = _.sortedIndex(zone.untils, nowMoment.valueOf());
    var nextChangeEpochMillis = zone.untils[nextChangeIndex];
    if (_.isFinite(nextChangeEpochMillis)) {
      data.push({
        'epoch_of_change': moment.utc(nextChangeEpochMillis).format('X'),
        'zone': zoneName
      });
    }
  });
  data = _.orderBy(data, ['epoch_of_change', 'zone'], ['asc', 'asc']);
  res.json(data);
});

module.exports = router;
