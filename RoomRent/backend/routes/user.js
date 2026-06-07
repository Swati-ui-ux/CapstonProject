const express = require("express")
const { signUpUser, loginUser,getProfile, getTenants, updateUser, forgotPassword, resetPassword } = require("../controllers/user")
const upload = require("../middleware/multer")
const auth = require("../middleware/auth")
const router = express.Router()

router.post("/signup",upload.single("image"), signUpUser)
router.post("/login", loginUser)
router.get("/profile", auth, getProfile)
router.get("/tenants", auth, getTenants)
router.put("/update", auth, upload.single("image"), updateUser)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

module.exports = router