const { Sequelize } = require("sequelize")
require("dotenv").config()
const sequelize = new Sequelize(
    process.env.APP_NAME,
    process.env.ROOT,
    process.env.PASSWORD, {
    host: "localhost",
    dialect: "mysql"

})
    ; (async() => {
        try {
            await sequelize.authenticate()
            console.log("db connected")
        } catch (error) {
            console.log('error in db',error)
        }
    })()

module.exports = sequelize