const schema = require('./schema')

const parse = schema.parse

const ACL = parse.ACL
const Cloud = parse.CLOUD
const Query = parse.QUERY
const Role = parse.ROLE

const asRoot = schema.asRoot

const checkAuth = require('./auth').checkAuth

const Note = schema.entities.NOTE

Cloud.beforeSave(Note, async (request) => {
  checkAuth()

  const noteACL = new ACL()
  noteACL.setPublicReadAccess(false)
  noteACL.setPublicWriteAccess(false)

  const roleQuery = new Query(Role).equalTo('users', request.user)
  const userRoles = await roleQuery.find(asRoot)
  userRoles.forEach(role => {
    noteACL.setRoleReadAccess(role, true)
    noteACL.setRoleWriteAccess(role, true)
  })

  const note = request.object
  note.setACL(noteACL)
})
