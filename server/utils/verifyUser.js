
const jwt = require('jsonwebtoken');
module.exports = function verifyUser(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized. Please login to access this resource.',
      error: true
    });
  };
  // verify token
  jwt.verify(token, process.env.SECRET_KEY, (err, userVerify) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid token. Please login again.',
        error: true
      });
    };
    req.user = userVerify;
    next();
  })
}