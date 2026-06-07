const { where } = require('sequelize')
const { Property, Room, Payment } = require('../models')

const getDashBoardStats = async(req,res) => {
    try {
        const totalProperties = await Property.count({
            where: {
                ownerId: req.userId,
            }
        });
        const properties = await Property.findAll({
            where: {
                ownerId: req.userId,
            },
            attributes: ['id']
        });
        const propertyIds = properties.map(property => property.id);
        
        const rooms = await Room.findAll({
            where: {
            propertyId :propertyIds,
            }
        })
        const roomIds = rooms.map(room => room.id);
        const totalRooms =  rooms.length;
        const occupiedRooms  = rooms.filter(room => room.status === 'occupied').length;
        const vacantRooms = rooms.filter(room => room.status === 'available').length;
        const paidPayments = await Payment.findAll({
            where: {
                roomId: roomIds,
                status: "paid"
            }
        });
        const totalRentCollected = paidPayments.reduce((total, payment) => total + payment.amount, 0);
        const pendingPayments = await Payment.findAll({
            where: {
                roomId: roomIds,
                status:"pending"
            }
        })
        const pendingRent = pendingPayments.reduce((total, payment) => total + payment.amount,0);
        
    return res.status(200).json({
        totalProperties,
        totalRooms,
        occupiedRooms,
        vacantRooms,
        totalRentCollected,
        pendingRent,
    });
    } catch (error) {
        console.log(error.message);

    return res.status(500).json({
      message: "Server Error",
    });

    }
}
module.exports = getDashBoardStats