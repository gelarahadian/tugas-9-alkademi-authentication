"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Pengguna, {
        foreignKey: "pengguna_id",
        as: "pengguna",
      });
    }
  }
  Booking.init(
    {
      kode_booking: DataTypes.UUID,
      kendaraan: DataTypes.STRING,
      tujuan: DataTypes.STRING,
      jadwal: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
