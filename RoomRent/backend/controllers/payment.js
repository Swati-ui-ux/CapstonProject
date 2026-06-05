const Payment = require("../models/payment");

const getMyPayments = async (req,res) => {

  try {

    const payments = await Payment.findAll({
      where:{
        tenantId:req.userId
      },
      order:[
        ["createdAt","DESC"]
      ]
    });

    res.status(200).json({
      payments
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Error fetching payments"
    });

  }

};

module.exports = {
  getMyPayments
};