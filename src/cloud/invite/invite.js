const schema = require('./schema')

const parse = schema.parse

const Cloud = parse.CLOUD
const Query = parse.QUERY
const User = parse.USER
const Role = parse.ROLE

const asRoot = schema.asRoot

const checkAuth = require('../auth').checkAuth

const emailSender = require('./email')

Cloud.define('invite', async (request) => {
  checkAuth()

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

    const emailData = {
      from: '"App Random Notes"',
      to: inviteEmail,
      subject: 'Invite',
      text: `Your "Random Notes" account was linked with ${request.user.email}.`
    }
    emailSender.sendNoReply(emailData).catch(console.error)
    return true
  }
})
