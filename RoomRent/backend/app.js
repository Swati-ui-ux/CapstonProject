const express = require("express")

const app = express()
const PORT = 9000
const db = require("./config/db")

require("./models/user")
require("./models/index")
const cors = require("cors")
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: true ,limit:"50mb"}));
app.use(cors())

const userRoute = require("./routes/user")
const propertyRoute = require("./routes/property")
app.use("/users",userRoute)
app.use("/property",propertyRoute)

db.sync({alter:true}).then(() => {
console.log("db alter connect")
}).catch((error) => {
console.log("Error in db",error)
})
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})