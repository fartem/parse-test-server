const Cloud = Parse.Cloud
const User = Parse.User
const ACL = Parse.ACL
const Role = Parse.Role

const asRoot = require('../tools/tools').asRoot

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
