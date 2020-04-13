require('dotenv').config()

const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')
const LruCache = require('lru-cache')
const cache = require('./src/cloud/cache')

const api = new ParseServer({
  databaseURI: process.env.DATABASE_URL,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  cloud: './src/cloud/main.js',
  serverURL: process.env.SERVER_URL,
  clientKey: process.env.CLIENT_KEY,
  liveQuery: {
    classNames: [
      'note',
    ]
  },
})

const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: process.env.SERVER_URL,
      appId: process.env.APP_ID,
      masterKey: process.env.MASTER_KEY,
      appName: process.env.APP_NAME
    }
  ],
  users: [
    {
      user: process.env.ADMIN_USER,
      pass: process.env.ADMIN_PASSWORD,
      apps: [
        {
          appId: process.env.APP_ID
        }
      ]
    }
  ]

}, { allowInsecureHTTP: true })

const app = express()
app.use('/parse', api)
app.use('/dashboard', dashboard)

const serverLogo = require('./src/utils/logo')
console.log(serverLogo('1.2.0', new Date()))

var httpServer = require('http').createServer(app)
httpServer.listen(process.env.PORT, function () {
  console.log('Info: Server running on port ' + process.env.PORT + '.')
})

const liveQueryServer = ParseServer.createLiveQueryServer(
  httpServer,
  { verbose: false }
)

const parseServerCache = new LruCache({
  max: 500,
  maxAge: 100
})
liveQueryServer.authCache = parseServerCache
cache.set(parseServerCache)
