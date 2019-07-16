var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var ParseDashboard = require('parse-dashboard');

var databaseUri = 'mongodb://localhost/test';

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "com.smlnskgmail.jaman.randomnotes",
      "masterKey": "MASTER_KEY",
      "appName": "Random Notes"
    }
  ]
});

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  appId: 'com.smlnskgmail.jaman.randomnotes',
  masterKey: 'MASTER_KEY',
  serverURL: 'http://localhost:1337/parse',
  clientKey: '12321',
  liveQuery: {
    classNames: ["lists", "tasks"]
  }
});

var app = express();

var mountPath = '/parse';
app.use(mountPath, api);

app.use('/dashboard', dashboard);

var port = 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});

ParseServer.createLiveQueryServer(httpServer);