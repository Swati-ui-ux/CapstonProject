const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define("Payment", {
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  paymentDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM(
      "pending",
      "paid"
    ),
    defaultValue: "pending",
  },
});

module.exports = Payment;