const _ = require("lodash");
const moment = require("moment-timezone");

exports.handler = async function(event, context) {
    let data = [];
    let zones = moment.tz.names();
    let nowMoment = moment();
    _.each(zones, function(zoneName) {
      let zone = moment.tz.zone(zoneName);
      let nextChangeIndex = _.sortedIndex(zone.untils, nowMoment.valueOf());
      let nextChangeEpochMillis = zone.untils[nextChangeIndex];
      if (_.isFinite(nextChangeEpochMillis)) {
        data.push({
          'epoch_of_change': moment.utc(nextChangeEpochMillis).format('X'),
          'zone': zoneName
        });
      }
    });
    data = _.orderBy(data, ['epoch_of_change', 'zone'], ['asc', 'asc']);
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
}