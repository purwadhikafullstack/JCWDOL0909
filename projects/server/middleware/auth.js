const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Access Denied");
    }

    token = token.split(" ")[1];
    if (token == "null" || !token) {
      return res.status(401).send("Access Denied");
    }

    let verifiedUser = jwt.verify(token, "six6");
    if (!verifiedUser) {
      return res.status(401).send("Access Denied");
    }

    req.user = verifiedUser;
    console.log(verifiedUser);
  } catch (error) {
    console.log(error);
    return;
  }
  next();
};

module.exports = { verifyToken };
