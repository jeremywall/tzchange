const _ = require("lodash");
const moment = require("moment-timezone");
const tzdata = require('tzdata');
const tc = require("timezonecomplete");

exports.handler = async function(event, context) {
    let data = [];

    let tzdb = tc.TzDatabase.instance();
    let zones = tzdb.zoneNames();

    let tsMillis = Date.now();

    _.each(zones, function(zoneName) {
      try {
        var nextChangeEpochMillis = tzdb.nextDstChange(zoneName, tsMillis);
        if (_.isFinite(nextChangeEpochMillis)) {
          //console.log('next change for ' + zoneName + ' is ' + nextChangeEpochMillis);
          data.push({
            epoch_of_change: nextChangeEpochMillis,
            zone: zoneName
          });
        } else {
          //console.log("Excluding zone: " + zoneName + " as it has no future DST change");
        }
      } catch(error) {
        console.log("Error with zone: " + zoneName);
        console.log(error)
      }
    });

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
}