
exports.redirectlogin = (request, response, next) => {
  console.log(request.session.userId);
  if (!request.session.userId) {
    response.redirect('/login');
  } else {
    next();
  }
};
