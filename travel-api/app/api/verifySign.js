const bcrypt = require("bcryptjs");
const Pengguna = require("../models/").Pengguna;
const Role = require("../models").Role;
const db = require("../models");
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const config = require("../config/configRoles");

module.exports = {
  signup(req, res) {
    return Pengguna.create({
      nama: req.body.nama,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((pengguna) => {
        Role.findAll({
          where: {
            nama: {
              [Op.or]: req.body.roles,
            },
          },
        })
          .then((roles) => {
            pengguna
              .setRoles(roles)
              .then(() => {
                res.status(200).send({
                  auth: true,
                  email: req.body.email,
                  message: "Pengguna berhasil mendaftar",
                  errors: null,
                });
              })
              .catch((err) => {
                res.status(500).send({
                  auth: false,
                  email: req.body.email,
                  message: "Error",
                  errors: err,
                });
              });
          })
          .catch((err) => {
            res.status(500).send({
              auth: false,
              email: req.body.email,
              message: "Error",
              errors: err,
            });
          });
      })
      .catch((err) => {
        return res.status(500).send({
          auth: false,
          email: req.body.email,
          message: "Error",
          errors: err,
        });
      });
  },

  signin(req, res) {
    Pengguna.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((pengguna) => {
        if (!pengguna) {
          return res.status(404).send({
            auth: false,
            email: req.body.email,
            message: "Email tidak di temukan",
            errors: null,
          });
        }

        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          pengguna.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            email: req.body.email,
            message: "Password Salah",
            errors: null,
          });
        }

        const token =
          "Bearer " +
          jwt.sign(
            {
              email: pengguna.email,
              id: pengguna.id,
            },
            config.secret,
            {
              expiresIn: 86400,
            }
          );

        res.status(200).send({
          auth: true,
          email: req.body.email,
          accessToken: token,
          message: "Berhasil",
          errors: null,
        });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          email: req.body.email,
          message: "Error",
          errors: null,
        });
      });
  },
};
