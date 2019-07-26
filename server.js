var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "APP_ID",
      "masterKey": "MASTER_KEY",
      "appName": "Random Notes"
    }
  ]
});

var api = new ParseServer({
  databaseURI: 'mongodb://localhost/test' || 'mongodb://localhost:27017/dev',
  appId: "APP_ID",
  masterKey: "MASTER_KEY",
  cloud: "./cloud/main.js",
  serverURL: 'http://localhost:1337/parse',
  clientKey: 'CLIENT_KEY'
});

var app = express();
app.use('/parse', api);
app.use('/dashboard', dashboard);

var port = 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('random-notes-server running on port ' + port + '.');
});
