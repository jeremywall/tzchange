const _ = require("lodash");
const moment = require("moment-timezone");
const tzdata = require('tzdata');
const tc = require("timezonecomplete");

exports.handler = async function(event, context) {
    let data = [];

    var tzdb = tc.TzDatabase.instance();
    var zones = tzdb.zoneNames();

    _.each(zones, function(zoneName) {
      data.push({

        'zone': zoneName
      });
    });

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
}