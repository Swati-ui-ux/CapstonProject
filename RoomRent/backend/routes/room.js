const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isOwner = require("../middleware/isOwner");

const {
  createRooms,
  getPropertyRooms,
  assignTenant,
  getMyRoom,
} = require("../controllers/room");


router.post(
  "/create",
  auth,
  isOwner,
  createRooms
);
router.get("/property/:propertyId",auth,isOwner,getPropertyRooms)
router.put('/assign-tenant', auth, isOwner, assignTenant)
router.get("/my-room",auth,getMyRoom)
module.exports = router;