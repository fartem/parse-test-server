const asRoot = {
  useMasterKey: true
}

const parse = {
  ACL: Parse.ACL,
  CLOUD: Parse.Cloud,
  QUERY: Parse.Query,
  USER: Parse.User,
  ROLE: Parse.Role
}

const entities = {
  NOTE: 'note'
}

module.exports = {
  asRoot,
  parse,
  entities
}
