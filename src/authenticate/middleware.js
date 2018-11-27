const authenticationMiddleware = () => {
  return (req, res, next) => {
    console.log(req.isAuthenticated());
    return next();
  };
};

module.exports = authenticationMiddleware;

