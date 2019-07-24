Parse.Cloud.beforeSave("note", (request) => {
  var currentUser = request.user;
  if (currentUser != null) {
    var note = request.object;
    var acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(currentUser, true);
    acl.setWriteAccess(currentUser, true);
    note.setACL(acl);
  }
});

Parse.Cloud.define("invite", (data) => {
  var user = data.user;

  var newRole = new Parse.Role("fdsdfsdf", user.getACL());

  newRole.save(null, {useMasterKey: true});

  return true;
});
