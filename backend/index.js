// Import express
const express = require('express')
var bodyParser = require('body-parser')
const apiRoutes = require('./api-routes')
const morgan = require('morgan')

// Initialize the app
let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
app.use(morgan('short'))
app.use('/', apiRoutes)
// Setup server port
var port = process.env.PORT || 8081
// Send message for default URL
app.listen(port, function() {
  console.log('Running API on port ' + port)
})
