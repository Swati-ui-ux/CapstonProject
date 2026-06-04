const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {
try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({message:"Token not found"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = decoded.id
    next()
} catch (error) {
     console.log("Auth Error:", error.message);

    return res.status(401).json({
      message: "Invalid Token",
    });
}
}

module.exports = auth