const sequelize = require("../config/db")
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("owner", "tenant"),
      allowNull: false,
      defaultValue: "tenant",
    },

    image: {
  type: DataTypes.STRING,
},

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  },
  {
    timestamps: true,
  }
);

module.exports = User;