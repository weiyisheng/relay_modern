require("babel-register")
require("babel-polyfill")

var fs = require('fs')
var path = require('path')
var Config = require("../config")
var introspectionQuery = require('./introspectionQuery')

var request = require('superagent')
console.log("Update schema from endpoint:", Config.ENDPOINT)

request.post(Config.ENDPOINT + "/graphql")
.send({query: introspectionQuery })
.end(function(err, response){
  if(err) {
    console.error("Error occured: ", err)
  } else {
    var result = response.body
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      fs.writeFileSync(
        path.join(__dirname, '../build/schema.json'),
        JSON.stringify(result, null, 2)
      );
    }
  }
})
