const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");

//  JWT Secret
const jwtKey = "devankit01";

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "Must be Logged In" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwtKey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "Must be Logged In" });
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
