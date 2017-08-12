
import express from 'express'
import path from 'path'
const engine = require('ejs')

const APP_PORT = 3000

var compression = require('compression')

var proxy = require('express-http-proxy');

var app = express()

import { ENDPOINT } from './config'


// compression
app.use(compression())
//set index html
app.set('views', path.resolve(__dirname, 'public', 'dist'))
app.engine('html', engine.renderFile)
app.set('view engine', 'html')
// Serve static resources
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/graphql', proxy(ENDPOINT, {
 forwardPath: function(req, res) {
   return require('url').parse(req.originalUrl).path;
 }
}))

app.use("/", function(req, res, next) {
  res.render('index.html');
})


app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
})
