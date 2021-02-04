let jwt = require('jsonwebtoken');
var config = require("../config");

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          error: true,
          message: 'Token is not valid'
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.json({ 
      success: false,
      error: true,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken 
}
