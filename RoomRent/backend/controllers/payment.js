const instance = require("../config/razorpay")
const { Property, Room ,User} = require("../models")
const Payment = require("../models/payment");

const getMyPayments = async (req,res) => {

  try {
   console.log("USER ID:", req.userId);
    const payments = await Payment.findAll({
      where:{
        tenantId:req.userId
      },
        include: [
            {
                model: Room,
                include:[Property]
            }
        ],
      order:[
        ["createdAt","DESC"]
        ],
    });

    res.status(200).json({
      payments
    });

  } catch (error) {

    console.log("Errorn",error.message)

    res.status(500).json({
      message:"Error fetching payments"
    });

  }

};

const payRent = async (req, res) => {
  try {
    const { paymentId } = req.body;
   console.log("payment",paymentId)
    const payment = await Payment.findByPk(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = "paid";
    payment.paymentDate = new Date();

    await payment.save();
     const room = await Room.findByPk(payment.roomId);

    if (room) {
      room.dueDate = new Date(room.dueDate);
      room.dueDate.setMonth(room.dueDate.getMonth() + 1);

      await room.save();
    }

    res.status(200).json({
      message: "Payment successful",
      payment,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Payment failed",
    });
  }
};


const createOrder = async (req,res) => {
   try {
       const options = {
           amount: req.body.amount * 100,
           currency: "INR",
           receipt:"receipt_"+Date.now(),
       }
       const order = await instance.orders.create(options);
       res.json(order)
   } catch (error) {
       console.log(error.message);
       res.status(500).json({ message: "Order creation failed" });
   }
}
const getOwnerPayments = async (req, res) => {
  try {

    const payments = await Payment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email",'phone'],
        },
        {
          model: Room,
          attributes: [
            "id",
            "roomNumber",
            "rent",
            "floorNumber",
          ],
          include: [
            {
              model: Property,
              where: {
                ownerId: req.userId,
              },
              attributes: [
                "id",
                "propertyName",
                "location",
              ],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      payments,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching payments",
    });
  }
};
module.exports = {
  getMyPayments,
  payRent,
  createOrder,
  getOwnerPayments,
  
    
};