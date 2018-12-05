const authenticationMiddleware = () => {
  return (req, res, next) => {
    if (!req.isAuthenticated() && req.path !== '/users/user') {
      res.redirect('/');
    } else {
      return next();
    }
  };
};

module.exports = authenticationMiddleware;

