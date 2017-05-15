const express = require('express');
const jsonServer = require('json-server');
const app = express();

app.use(express.static(__dirname + '/dist'));
app.use(jsonServer.router('db/prod-db.json'));
app.listen(process.env.PORT || 3000);
