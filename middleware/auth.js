const jwt = require("jsonwebtoken");
const config = require("config");
const { AUTH_TOKEN } = require("../constants");

function auth(req, res, next) {
  const token = req.header(AUTH_TOKEN);

  if (!token) {
    return res.status(401).send("Token not provided");
  }

  try {
    const decodedToken = jwt.verify(token, config.get("secretKey"));
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).send("Bad Request");
  }
}

module.exports = auth;
