const User = require("../models/user")

const isOwner = async(req,res,next) => {
try {
    const user = await User.findByPk(req.userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "owner") {
        return res.status(403).json({message:"Only owner can perform this action"})
    }
    next()
} catch (error) {
        console.log(error.message);

    return res.status(500).json({
      message: "Server Error",
    });

}
}

module.exports = isOwner