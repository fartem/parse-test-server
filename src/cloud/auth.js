const checkAuth = (request) => {
  const user = request.user
  if (typeof (user) === 'undefined' && user === null) {
    throw new Error('Unauthorized access!')
  }
}

module.exports = {
  checkAuth
}
