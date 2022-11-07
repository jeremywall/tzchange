const _ = require("lodash");
const tzdata = require('tzdata');
const tc = require("timezonecomplete");
const fs = require('fs');

exports.handler = async function(event, context) {
  var dirs = fs.readdirSync('node_modules');
  var versions = {};
  dirs.forEach(function(dir) {
      try{
        var file = 'node_modules/' + dir + '/package.json';
        var json = require(file);
        var name = json.name;
        var version = json.version;
        versions[name] = version;
      }catch(err){

      }
  });
//  versions = {};

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: JSON.stringify(versions)
  };
}