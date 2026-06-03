const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const signUpUser = async (req, res) => {
    try {
    console.log("Body",req.body)
        const { name, email, password,phone,role } = req.body
        const hashedPassword = await bcrypt.hash(password,10)
   
    const user = await User.create({ name, email, password:hashedPassword,phone,role })
    if(!user) return res.status(404).json({messsage:"User not created"})
    res.status(201).json({messsage:"User sign upsuccefully",user})
    
} catch (error) {
    console.log("Errorn in",error)
    res.status(500).json({messsage:"Error when user sign up",error})
}

}

  

const loginUser = async (req,res) => {
    
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
         if (!user) {
        return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" })
        
        }
        const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.SECRET_KEY,
  { expiresIn: "7d" }
)
        res.status(200).json({message:"login success",token,user})
    } catch (error) {
        console.log(error.message)
         res.status(500).json({message:"error in login "})
    }
}


module.exports = {signUpUser,loginUser}
