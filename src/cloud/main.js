const NoteTableName = "note";

// User section
Parse.Cloud.beforeSave(Parse.User, (request) => {
  const user = request.object;

  const userAcl = new Parse.ACL();
  userAcl.setPublicReadAccess(false);
  userAcl.setPublicWriteAccess(false);

  user.setACL(userAcl);
});

Parse.Cloud.afterSave(Parse.User, (request) => {
  const user = request.object;

  const roleACL = new Parse.ACL();
  roleACL.setPublicReadAccess(false);
  roleACL.setPublicWriteAccess(false);

  const role = new Parse.Role(user.id + "_User", roleACL);
  role.getUsers().add(user);
  role.save(null, {useMasterKey: true});
});

// Note entity section
Parse.Cloud.beforeSave(NoteTableName, async (request) => {
  const roleQuery = new Parse.Query(Parse.Role).equalTo('users', request.user);
  try {
    const noteACL = new Parse.ACL();
    noteACL.setPublicReadAccess(false);
    noteACL.setPublicWriteAccess(false);

    const result = await roleQuery.find({ useMasterKey: true });
    for (var i = 0; i < result.length; i++) {
      noteACL.setRoleReadAccess(result[i], true);
      noteACL.setRoleWriteAccess(result[i], true);
    }

    const note = request.object;
    note.setACL(noteACL);
  } catch(e) {
    console.log(e);
  }
});
