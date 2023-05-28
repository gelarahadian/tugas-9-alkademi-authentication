const { ROLEs } = require("../config/configRoles");

const Pengguna = require("../models").Pengguna;

module.exports = {
  checkDuplicateUserNameOrEmail(req, res, next) {
    Pengguna.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          auth: false,
          email: req.body.email,
          message: "Error",
          errors: "Email Sudah Terdaftar!",
        });
        return;
      }
      next();
    });
  },

  checkRolesExisted(req, res, next) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
        res.status(400).send({
          auth: false,
          id: req.body.id,
          message: "Error",
          errors: "Does NOT exist Role = " + req.body.roles[i],
        });
        return;
      }
    }
    next();
  },
};
