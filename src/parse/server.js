var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var ParseDashboard = require('parse-dashboard');

var databaseUri = 'mongodb://localhost/test';

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
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  appId: "APP_ID",
  masterKey: "MASTER_KEY",
  serverURL: 'http://localhost:1337/parse',
  clientKey: 'CLIENT_KEY',
  liveQuery: {
    classNames: ["note"]
  }
});

var app = express();

var mountPath = '/parse';
app.use(mountPath, api);

app.use('/dashboard', dashboard);

Parse.Cloud.beforeSave("note", (req) => {
  var currentUser = req.user;
  if (currentUser != null) {
    var note = req.object;
    var acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(currentUser, true);
    acl.setWriteAccess(currentUser, true);
    note.setACL(acl);
  }
});

var port = 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('random-notes-server running on port ' + port + '.');
});

ParseServer.createLiveQueryServer(httpServer);
