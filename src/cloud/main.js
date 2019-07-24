Parse.Cloud.beforeSave("note", (req) => {
  var currentUser = req.user;
  if (currentUser != null) {
    var note = req.object;
    var acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(currentUser, true);
    acl.setWriteAccess(currentUser, true);
    note.setACL(acl);
  }
});
