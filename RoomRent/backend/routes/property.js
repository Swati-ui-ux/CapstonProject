const express = require("express")
const auth = require("../middleware/auth")
const isOwner = require("../middleware/isOwner")
const { createProperty, getMyProperties } = require("../controllers/property")
const upload = require("../middleware/multer")

const router = express.Router()

router.post("/create",upload.single("image"), auth, isOwner, createProperty)
router.get("/my-properties",auth,isOwner,getMyProperties)
module.exports = router