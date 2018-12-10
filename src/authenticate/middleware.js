/*
* Check if the user requesting data is authenticated
* Does not check if asking for the current user
 */
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

