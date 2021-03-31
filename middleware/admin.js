const jwt = require("jsonwebtoken");
const config = require("config");

function admin(req, res, next) {
  const token = req.header("x-auth-header");

  if (!token) {
    return res.status(401).send("Token not provided");
  }

  try {
    const decodedToken = jwt.verify(token, config.get("secretKey"));
    if (decodedToken.isAdmin) {
      req.user = decodedToken;
      next();
    }
    else{
    res.status(403).send("This is restricted to admins");
  }
  }catch(error){
    res.status(400).send('Bad Request')
  }
}

module.exports = admin;
