const User = require("./user")
const Property = require("./property")
const Room = require("./room")

User.hasMany(Property,{foreignKey:"ownerId"})
Property.belongsTo(User, { foreignKey: "ownerId" })

Property.hasMany(Room, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});

Room.belongsTo(Property, {
  foreignKey: "propertyId",
});

module.exports = { User, Property }