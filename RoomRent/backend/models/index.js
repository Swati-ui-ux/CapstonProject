const User = require("./user")
const Property = require("./property")

User.hasMany(Property,{foreignKey:"ownerId"})
Property.belongsTo(User,{foreignKey:"ownerId"})

module.exports = { User, Property }