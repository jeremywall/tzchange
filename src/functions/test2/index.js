const _ = require("lodash");

exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World! test2 " + new Date().getTime() + " " + _.VERSION})
    };
}