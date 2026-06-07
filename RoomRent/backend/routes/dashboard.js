const express = require("express");
const auth = require("../middleware/auth");
const getDashBoardStats = require("../controllers/dashboard")
const router = express.Router();


router.get("/stats",auth, getDashBoardStats);

module.exports = router;