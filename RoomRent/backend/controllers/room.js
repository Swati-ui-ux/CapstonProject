const Room = require("../models/room");
const Property = require("../models/property");
const { User } = require("../models")
const Payment = require("../models/payment")

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
      ],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "image"],
        },
      ],
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

const assignTenant = async (req,res) => {
try {
  const { roomId, tenantId } = req.body
  const room = await Room.findByPk(roomId)
  if (!room) {
  return res.status(404).json({message:"Room not found"})
  }
  if (room.status === "occupied") {
    return res.status(400).json({message:"Room already occupied"})
  }
    room.tenantId = tenantId
    room.status = "occupied"
    const assignedDate = new Date();

    const dueDate = new Date(assignedDate);

    dueDate.setMonth(
      dueDate.getMonth() + 1
    );

    room.assignedDate = assignedDate;
    room.dueDate = dueDate;

  await room.save();
  
  await Payment.create({
    roomId: room.id,
    tenantId,
    amount: room.rent,
    month: "June 2026",
    status: "pending",
  });
   res.status(200).json({
      message: "Tenant assigned successfully",
      room
    });
} catch (error) {
  console.log(error.message);

    res.status(500).json({
      message: "Error assigning tenant"
    });
}
}

const getMyRoom = async (req,res) => {
try {
  const room = await Room.findAll({
    where: {
    tenantId:req.userId
    },
    include: [
      {
        model: Property
      }
    ]
  })
  if (!room) {
    return res.status(404).json({
    message:"No rrom assignd"
    })
  }
  res.status(200).json({
  room
  })
  console.log("Rooms",room)
} catch (error) {
  console.log(error.message);

    res.status(500).json({
      message: "Error fetching room"
    });
}
}

module.exports = {
  createRooms,getPropertyRooms,assignTenant,getMyRoom
};