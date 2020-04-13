const parse = require('./schema').parse
const Cloud = parse.CLOUD
const Role = parse.ROLE

const cache = require('./cache')

Cloud.beforeSave(Role, () => {
  cache.clear()
})
