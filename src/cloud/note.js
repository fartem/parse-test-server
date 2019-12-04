const schema = require('./schema')

const parse = schema.parse

const ACL = parse.ACL
const Cloud = parse.CLOUD
const Query = parse.QUERY
const Role = parse.ROLE

const asRoot = schema.asRoot

const NoteTableName = schema.entities.NOTE

Cloud.beforeSave(NoteTableName, async (request) => {
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
