const express = require("express")
const auth = require("../middleware/auth")
const isOwner = require("../middleware/isOwner")
const { createProperty, getMyProperties, getPropertyById } = require("../controllers/property")
const upload = require("../middleware/multer")

const router = express.Router()

router.post("/create",upload.single("image"), auth, isOwner, createProperty)
router.get("/my-properties", auth, isOwner, getMyProperties)
router.get("/:id",auth,isOwner,getPropertyById)
module.exports = router