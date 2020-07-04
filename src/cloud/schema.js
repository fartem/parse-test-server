const asRoot = {
  useMasterKey: true
}

/* eslint no-undef: 0 */
const parse = {
  ACL: Parse.ACL,
  CLOUD: Parse.Cloud,
  QUERY: Parse.Query,
  USER: Parse.User,
  ROLE: Parse.Role,
  OBJECT: Parse.Object,
  SESSION: Parse.Session
}

const entities = {
  NOTE: 'note',
  INVITE: 'invite'
}

module.exports = {
  asRoot,
  parse,
  entities
}
