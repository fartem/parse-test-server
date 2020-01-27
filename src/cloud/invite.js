const schema = require('./schema')

const parse = schema.parse

const Cloud = parse.CLOUD
const Query = parse.QUERY
const User = parse.USER
const Role = parse.ROLE

const InviteTableName = schema.entities.INVITE

const asRoot = schema.asRoot

Cloud.define(InviteTableName, async (request) => {
  var inviteEmail = request.params.email
  var inviteUserQuery = new Query(User).equalTo('email', inviteEmail)
  var user = await inviteUserQuery.first(asRoot)

  if (user == null) {
    return false
  } else {
    var rolesQuery = new Query(Role).equalTo('users', request.user)
    var ownerRoles = await rolesQuery.find(asRoot)

    ownerRoles.forEach(role => {
      role.getUsers().add(user)
      role.save(null, asRoot)
    })
    return true
  }
})
