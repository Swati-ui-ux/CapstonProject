const express = require("express")

const app = express()
const PORT = process.env.PORT || 9000
const db = require("./config/db")

require("./models/user")
require("./models/index")
const cors = require("cors")
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: true ,limit:"50mb"}));
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
}))

const userRoute = require("./routes/user")
const propertyRoute = require("./routes/property")
const roomRoute = require("./routes/room")

const paymentRoute = require("./routes/payment");
const dashboardRoutes = require("./routes/dashboard")
app.use("/dashboard",dashboardRoutes)
app.use("/payment",paymentRoute);

app.use("/users",userRoute)
app.use("/property",propertyRoute)
app.use("/room", roomRoute)
db.sync().then(() => {
console.log("db alter connect")
}).catch((error) => {
console.log("Error in db",error)
})
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})