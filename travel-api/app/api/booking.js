const Booking = require("../models").Booking;

module.exports = {
  getById(req, res) {
    return Booking.findByPk(req.params.id, {
      include: [],
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            status_response: "Not Found",
            errors: "Status Not Found",
          });
        }
        const status = {
          status_response: "OK",
          status: doc,
          errors: null,
        };
        return res.status(200).send(status);
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },
  list(req, res) {
    return Booking.findAll({
      limit: 10,
      include: [],
      order: [["createdAt", "DESC"]],
    })
      .then((docs) => {
        const booking = {
          status_response: "OK",
          count: docs.length,
          statuses: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(booking);
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  listBookingUser(req, res) {
    return Booking.findAll({
      limit: 10,
      include: [],
      where: {
        pengguna_id: req.penggunaId,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((docs) => {
        const booking = {
          status_response: "OK",
          count: docs.length,
          statuses: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(booking);
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  add(req, res) {
    const { jadwal, kendaraan, tujuan } = req.body;
    if (!jadwal || !kendaraan || !tujuan) {
      return res.status(400).send({
        status_response: "field harus diisi",
        booking: null,
        errors: null,
      });
    }
    return Booking.create({
      jadwal: jadwal,
      kendaraan: kendaraan,
      tujuan: tujuan,
      pengguna_id: req.penggunaId,
    })
      .then((doc) => {
        const booking = {
          status_response: "Created",
          booking: doc,
          errors: null,
        };
        return res.status(201).send(booking);
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  update(req, res) {
    return Booking.findByPk(req.params.id, {})
      .then((booking) => {
        if (!booking) {
          return res.status(404).send({
            status_response: "Bad Request",
            errors: "Booking tidak di temukan",
          });
        }
        if (parseInt(booking.pengguna_id) !== parseInt(req.penggunaId)) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different User Id",
          });
        }

        booking
          .update({
            jadwal: req.body.jadwal || booking.jadwal,
            kendaraan: req.body.kendaraan || booking.kendaraan,
            tujuan: req.body.tujuan,
          })
          .then((doc) => {
            const booking = {
              status_response: "OK",
              status: doc,
              errors: null,
            };
            return res.status(200).send(booking);
          })
          .catch((err) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: err,
            });
          });
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },

  delete(req, res) {
    return Booking.findByPk(req.params.id)
      .then((booking) => {
        if (!booking) {
          return res.status(400).send({
            status_response: "Bad Request",
            errors: "Status Not Found",
          });
        }

        if (parseInt(booking.pengguna_id) !== parseInt(req.penggunaId)) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different User Id",
          });
        }

        return booking
          .destroy()
          .then(() =>
            res.status(204).send({
              status_response: "No Content",
              errors: null,
            })
          )
          .catch((error) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: error,
            });
          });
      })
      .catch((err) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: err,
        });
      });
  },
};
