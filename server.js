const PORT = 1337
const ADDRESS = `http://localhost:${PORT}/parse`

const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')

const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: ADDRESS,
      appId: 'APP_ID',
      masterKey: 'MASTER_KEY',
      appName: 'Random Notes'
    }
  ]
})

const api = new ParseServer({
  databaseURI: 'mongodb://localhost/test' || 'mongodb://localhost:27017/dev',
  appId: 'APP_ID',
  masterKey: 'MASTER_KEY',
  cloud: './cloud/main.js',
  serverURL: ADDRESS,
  clientKey: 'CLIENT_KEY'
})

const app = express()
app.use('/parse', api)
app.use('/dashboard', dashboard)

var httpServer = require('http').createServer(app)
httpServer.listen(PORT, function () {
  console.log('Server running on port ' + PORT + '.')
})
