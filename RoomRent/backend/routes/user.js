const express = require("express")
const { signUpUser, loginUser,getProfile, getTenants } = require("../controllers/user")
const upload = require("../middleware/multer")
const auth = require("../middleware/auth")
const router = express.Router()

router.post("/signup",upload.single("image"), signUpUser)
router.post("/login", loginUser)
router.get("/profile", auth, getProfile)
router.get("/tenants",getTenants)
module.exports = router