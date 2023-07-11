// Create Token For FrontEnd
const jwt = require("jsonwebtoken");

module.exports = {
  createTokenF: (payload) => {
    return jwt.sign(payload, "forgotPass123", { expiresIn: "10m" });
  },
};
