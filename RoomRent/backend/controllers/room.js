const Room = require("../models/room");
const Property = require("../models/property");

const createRooms = async (req, res) => {
  try {
    const {
      propertyId,
      totalFloors,
      roomsPerFloor,
      rent,
    } = req.body;

    const property =
      await Property.findByPk(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const rooms = [];

    for (
      let floor = 1;
      floor <= totalFloors;
      floor++
    ) {
      for (
        let room = 1;
        room <= roomsPerFloor;
        room++
      ) {
        const roomNumber =
          floor * 100 + room;

        rooms.push({
          roomNumber,
          floorNumber: floor,
          rent,
          propertyId,
        });
      }
    }

    const createdRooms =
      await Room.bulkCreate(rooms);

    res.status(201).json({
      message:
        "Rooms created successfully",
      totalRooms:
        createdRooms.length,
      rooms: createdRooms,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error creating rooms",
    });
  }
};


const getPropertyRooms = async (req, res) => {
  try {

    const { propertyId } = req.params;

    const rooms = await Room.findAll({
      where: {
        propertyId
      },
      order: [
        ["floorNumber", "ASC"],
        ["roomNumber", "ASC"]
      ]
    });
   console.log("ROOM API HIT");
   console.log("ROOM ",rooms);
    res.status(200).json({
      rooms
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching rooms"
    });
  }
};

module.exports = {
  createRooms,getPropertyRooms
};