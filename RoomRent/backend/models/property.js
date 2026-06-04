const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Property = sequelize.define("Property", {
  propertyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    },
    image: {
    type:DataTypes.STRING,
    }
});

module.exports = Property;