const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Room = sequelize.define("Room", {
  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  floorNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  rent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      "available",
      "occupied"
    ),
    defaultValue: "available",
  },
});

module.exports = Room;