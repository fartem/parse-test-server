const schema = require('./schema')

const parse = schema.parse

const ACL = parse.ACL
const Cloud = parse.CLOUD
const User = parse.USER
const Role = parse.ROLE

const asRoot = schema.asRoot

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
