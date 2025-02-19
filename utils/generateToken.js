const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const payload = { name: user.name, email: user.email };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
  return token;
};
