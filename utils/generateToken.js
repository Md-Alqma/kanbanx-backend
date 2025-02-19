const jwt = require("jsonwebtoken");

exports.generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};
