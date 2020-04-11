const schema = require('./schema')

const parse = schema.parse

const ACL = parse.ACL
const Cloud = parse.CLOUD
const Query = parse.QUERY
const Role = parse.ROLE

const asRoot = schema.asRoot

const checkAuth = require('./auth').checkAuth

const NoteTableName = schema.entities.NOTE

Cloud.beforeSave(NoteTableName, async (request) => {
  checkAuth()

  const roleQuery = new Query(Role).equalTo('users', request.user)
  try {
    const noteACL = new ACL()
    noteACL.setPublicReadAccess(false)
    noteACL.setPublicWriteAccess(false)

    const rolesForUser = await roleQuery.find(asRoot)
    rolesForUser.forEach(role => {
      noteACL.setRoleReadAccess(role, true)
      noteACL.setRoleWriteAccess(role, true)
    })

    const note = request.object
    note.setACL(noteACL)
  } catch (e) {
    console.log(e)
  }
})
