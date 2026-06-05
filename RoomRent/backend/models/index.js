const User = require("./user")
const Property = require("./property")
const Room = require("./room")
const Payment = require("./payment")

User.hasMany(Property,{foreignKey:"ownerId"})
Property.belongsTo(User, { foreignKey: "ownerId" })

Property.hasMany(Room, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});

Room.belongsTo(Property, {
  foreignKey: "propertyId",
});

User.hasMany(Room, { foreignKey: "tenantId" })
Room.belongsTo(User, { foreignKey: "tenantId" })
Room.hasMany(Payment, { foreignKey: "roomId" })
Payment.belongsTo(Room, { foreignKey: "roomId" })
User.hasMany(Payment, { foreignKey: "tenantId" })
Payment.belongsTo(User, { foreignKey: "tenantId" })
module.exports = { User, Property }