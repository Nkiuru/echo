const authenticationMiddleware = () => {
  return (req, res, next) => {
    console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {
      res.status(403).send();
    }
    return next();
  };
};

module.exports = authenticationMiddleware;

