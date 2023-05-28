const jwt = require("jsonwebtoken");
const config = require("../config/configRoles");

module.exports = {
  verifyToken(req, res, next) {
    let tokenHeader = req.headers["x-access-token"];
    if (!tokenHeader) {
      return res.status(500).send({
        auth: false,
        message: "Error",
        errors: "Login Diperlukan",
      });
    }

    if (tokenHeader.split(" ")[0] !== "Bearer") {
      return res.status(500).send({
        auth: false,
        message: "Error",
        errors: "Format token Salah!",
      });
    }

    const token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(500).send({
        auth: false,
        message: "Error",
        errors: "Token tidak tersedia!",
      });
    }

    jwt.verify(token, config.secret, (err, decode) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: "Error",
          errors: err,
        });
      }
      req.penggunaId = decode.id;
      next();
    });
  },
};
