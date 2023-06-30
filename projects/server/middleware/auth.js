const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Access Denied");
    }

    token = token.split(" ")[1];
    if (!token || token === "null") {
      return res.status(401).send("Access Denied");
    }

    let verified;
    try {
      verified = jwt.verify(token, "six6");
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (verified.isAdmin) {
      req.admin = verified;
    } else {
      req.user = verified;
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Access Denied");
  }
};

module.exports = { verifyToken };
