const _ = require("lodash");
const pug = require('pug');
const tzdata = require('tzdata');
const tc = require("timezonecomplete");

exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html"
        },
        body: JSON.stringify(data)
    };
}