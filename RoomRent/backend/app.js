const express = require("express")

const app = express()
const PORT = 9000
const db = require("./config/db")

require("./models/user")
const cors = require("cors")
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: true ,limit:"50mb"}));
app.use(cors())

const userRoute = require("./routes/user")

app.use("/users",userRoute)


db.sync().then(() => {
console.log("db alter connect")
}).catch((error) => {
console.log("Error in db",error)
})
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})