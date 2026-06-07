const express = require("express")
const auth = require("../middleware/auth")
const isOwner = require("../middleware/isOwner")
const { createProperty, getMyProperties, getPropertyById, updateProperty } = require("../controllers/property")
const upload = require("../middleware/multer")

const router = express.Router()

router.post("/create",upload.single("image"), auth, isOwner, createProperty)
router.get("/my-properties", auth, isOwner, getMyProperties)
router.get("/:id", auth, isOwner, getPropertyById)
router.put(
  "/update/:id",auth, upload.single("image"),
  updateProperty);
module.exports = router