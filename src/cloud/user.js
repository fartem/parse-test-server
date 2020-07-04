const schema = require('./schema')

const parse = schema.parse

const ACL = parse.ACL
const Cloud = parse.CLOUD
const User = parse.USER
const Role = parse.ROLE
const Query = parse.QUERY
const Object = parse.OBJECT
const Session = parse.SESSION

const entities = schema.entities

const Note = entities.NOTE
const Invite = entities.INVITE

const asRoot = schema.asRoot

const QUERY_LIMIT_USER_DELETION = 1000

Cloud.beforeSave(User, (request) => {
  const user = request.object

  const userAcl = new ACL()
  userAcl.setPublicReadAccess(false)
  userAcl.setPublicWriteAccess(false)

  user.setACL(userAcl)
})

Cloud.afterSave(User, (request) => {
  const user = request.object

  const roleACL = new ACL()
  roleACL.setPublicReadAccess(false)
  roleACL.setPublicWriteAccess(false)

  const role = new Role(`${user.id}_User`, roleACL)
  role.getUsers().add(user)
  role.save(null, asRoot)
})

Cloud.beforeDelete(User, async (request) => {
  const user = request.object

  const notesQuery = function () {
    return new Query(Note).limit(QUERY_LIMIT_USER_DELETION).equalTo(
      'ownerId',
      user.id
    )
  }

  let notes = []
  do {
    notes = await notesQuery().find(asRoot)
    await Object.destroyAll(notes, asRoot).catch(error => console.log(error))
  } while (notes.length === QUERY_LIMIT_USER_DELETION)

  const invitesQuery = function () {
    return new Query(Invite).limit(QUERY_LIMIT_USER_DELETION).equalTo(
      'ownerId',
      user.id
    )
  }

  let invites = []
  do {
    invites = await invitesQuery().find(asRoot)
    await Object.destroyAll(invites, asRoot).catch(error => console.log(error))
  } while (invites.length === QUERY_LIMIT_USER_DELETION)

  const rolesQuery = function () {
    return new Query(Role).limit(QUERY_LIMIT_USER_DELETION).equalTo(
      'users',
      request.user
    )
  }

  let roles = []
  do {
    roles = await rolesQuery().find(asRoot)
    await Object.destroyAll(roles, asRoot).catch(error => console.log(error))
  } while (roles.length === QUERY_LIMIT_USER_DELETION)

  const sessionsQuery = function () {
    return new Query(Session).limit(QUERY_LIMIT_USER_DELETION).equalTo(
      'user',
      user
    )
  }

  let sessions = []
  do {
    sessions = await sessionsQuery().find(asRoot)
    await Object.destroyAll(sessions, asRoot).catch(error => console.log(error))
  } while (sessions.length === QUERY_LIMIT_USER_DELETION)
})
