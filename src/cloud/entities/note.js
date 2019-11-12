const NOTE_TABLE_NAME = 'note'

const Cloud = Parse.Cloud
const User = Parse.User
const ACL = Parse.ACL
const Role = Parse.Role
const Query = Parse.Query

const asRoot = require('../tools/tools').asRoot

Cloud.beforeSave(NOTE_TABLE_NAME, async (request) => {
  const roleQuery = new Query(Role).equalTo('users', request.user)
  try {
    const noteACL = new ACL()
    noteACL.setPublicReadAccess(false)
    noteACL.setPublicWriteAccess(false)

    const rolesForUser = await roleQuery.find(asRoot)
    for (var i = 0; i < rolesForUser.length; i++) {
      noteACL.setRoleReadAccess(rolesForUser[i], true)
      noteACL.setRoleWriteAccess(rolesForUser[i], true)
    }

    const note = request.object
    note.setACL(noteACL)
  } catch (e) {
    console.log(e)
  }
})

Cloud.define('invite', async (request) => {
  var inviteEmail = request.params.email
  var inviteUserQuery = new Query(User).equalTo('email', inviteEmail)
  var user = await inviteUserQuery.first(asRoot)

  if (user == null) {
    return false
  } else {
    var rolesQuery = new Query(Role).equalTo('users', request.user)
    var ownerRoles = await rolesQuery.find(asRoot)

    for (var i = 0; i < ownerRoles.length; i++) {
      ownerRoles[i].getUsers().add(user)
      ownerRoles[i].save(null, asRoot)
    }

    return true
  }
})
