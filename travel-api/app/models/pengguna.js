"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pengguna extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pengguna.belongsToMany(models.Role, {
        through: "pengguna_role",
        foreignKey: "penggunaId",
      });

      Pengguna.hasMany(models.Booking, {
        foreignKey: "pengguna_id",
        as: "bookings",
      });
    }
  }
  Pengguna.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pengguna",
    }
  );
  return Pengguna;
};
