const express = require("express");

const router = express.Router();

const {
  getMyPayments
} = require("../controllers/payment");

const auth = require("../middleware/auth");

router.get(
  "/my-payments",
  auth,
  getMyPayments
);

module.exports = router;