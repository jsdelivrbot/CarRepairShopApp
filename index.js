var express = require('express')
var app = express()


app.use(express.static(__dirname + '/statics/'))

app.listen((process.env.PORT || 5000), function() {
  console.log("Node app is running at localhost:" + (process.env.PORT || 5000))
})
