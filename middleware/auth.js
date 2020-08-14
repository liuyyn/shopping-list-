const config = require("config");
const jwt = require("jsonwebtoken");

// purpose of func: get the token from frontend and return it
function auth(req, res, next) {
  // fetch token from the header
  const token = req.header("x-auth-token");

  // check for token ( if there is not token that is of form x-auth-token then :)
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" }); // 401 status: user is unauthorized
  }

  try {
    // verify token if there is a token
    const decoded = jwt.verify(token, config.get("jwtSecret")); // get the decoded token i.e. decoded = {token: {...} , user: {...}}
    // add user from payload
    req.user = decoded;

    // call next piece of middleware
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid " });
  }
}

module.exports = auth;
