const PORT = 1337
const ADDRESS = 'IP_ADDRESS'
const SERVER_URL = `http://${ADDRESS}:${PORT}/parse`

const APP_ID = ''
const MASTER_KEY = ''
const CLIENT_KEY = ''

const DATABASE_URL = ''

const APP_NAME = 'Random Notes'

const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')

const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: SERVER_URL,
      appId: APP_ID,
      masterKey: MASTER_KEY,
      appName: APP_NAME
    }
  ]
})

const api = new ParseServer({
  databaseURI: `mongodb://${DATABASE_URL}/dev`,
  appId: APP_ID,
  masterKey: MASTER_KEY,
  cloud: './src/cloud/main.js',
  serverURL: SERVER_URL,
  clientKey: CLIENT_KEY
})

const app = express()
app.use('/parse', api)
app.use('/dashboard', dashboard)

const serverLogo = require('./src/utils/logo')
console.log(serverLogo('1.0.0', new Date()))

var httpServer = require('http').createServer(app)
httpServer.listen(PORT, function () {
  console.log('Server running on port ' + PORT + '.')
})
