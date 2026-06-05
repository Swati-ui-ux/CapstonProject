const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isOwner = require("../middleware/isOwner");

const {
  createRooms,
  getPropertyRooms,
  assignTenant,
} = require("../controllers/room");


router.post(
  "/create",
  auth,
  isOwner,
  createRooms
);
router.get("/property/:propertyId",auth,isOwner,getPropertyRooms)
router.put('/assign-tenant',auth,isOwner,assignTenant)
module.exports = router;