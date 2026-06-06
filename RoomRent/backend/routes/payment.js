const express = require("express");

const router = express.Router();

const {
  getMyPayments,
  createOrder,
  payRent,
  getOwnerPayments
} = require("../controllers/payment");

const auth = require("../middleware/auth");

router.get(
  "/my-payments",
  auth,
  getMyPayments
);
router.get(
  "/owner-payments",
  auth,
  getOwnerPayments
);
router.post("/pay", payRent);
router.post("/create-order", createOrder)

module.exports = router;