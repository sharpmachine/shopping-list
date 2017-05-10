const express = require('express');
const jsonServer = require('json-server');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
app.use(jsonServer.router('db/db.json'));
// Start the app by listening on the default
// Heroku port
// app.listen(process.env.PORT || 8080);
app.listen(process.env.PORT || 3000);
