const NoteTableName = "note";

// User section
Parse.Cloud.beforeSave(Parse.User, (request) => {
  var user = request.object;

  var userAcl = new Parse.ACL();
  userAcl.setPublicReadAccess(false);
  userAcl.setPublicWriteAccess(false);

  user.setACL(userAcl);
});

Parse.Cloud.afterSave(Parse.User, (request) => {
  var user = request.object;

  var roleACL = new Parse.ACL();
  roleACL.setPublicReadAccess(false);
  roleACL.setPublicWriteAccess(false);

  var role = new Parse.Role(user.id + "_User", roleACL);
  role.getUsers().add(user);
  role.save(null, {
    useMasterKey: true
  });
});

// Note entity section
Parse.Cloud.beforeSave(NoteTableName, async (request) => {
  var roleQuery = new Parse.Query(Parse.Role).equalTo('users', request.user);
  try {
    var noteACL = new Parse.ACL();
    noteACL.setPublicReadAccess(false);
    noteACL.setPublicWriteAccess(false);

    var rolesForUser = await roleQuery.find({
      useMasterKey: true
    });
    for (var i = 0; i < rolesForUser.length; i++) {
      noteACL.setRoleReadAccess(rolesForUser[i], true);
      noteACL.setRoleWriteAccess(rolesForUser[i], true);
    }

    var note = request.object;
    note.setACL(noteACL);
  } catch(e) {
    console.log(e);
  }
});

Parse.Cloud.define("invite", async (request) => {
  var inviteEmail = request.params.email;
  var inviteUserQuery = new Parse.Query(Parse.User).equalTo('email', inviteEmail);
  var user = await inviteUserQuery.first({
    useMasterKey: true
  });

  if (user == null) {
    return false;
  } else {
    var rolesQuery = new Parse.Query(Parse.Role).equalTo('users', request.user);
    var ownerRoles = await rolesQuery.find({
      useMasterKey: true
    });

    for (var i = 0; i < ownerRoles.length; i++) {
      ownerRoles[i].getUsers().add(result);
      ownerRoles[i].save(null, {
        useMasterKey: true
      });
    }

    return true;
  }
});
