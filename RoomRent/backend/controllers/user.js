const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { uploadOnCloudinary } = require("../utils/cloudinary")

const signUpUser = async (req, res) => {
  try {
    // console.log("Body:", req.body);
    // console.log("File:", req.file);

    const { name, email, password, phone, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = "";

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

      if (!cloudinaryResponse) {
        return res.status(400).json({
          message: "Image upload failed",
        });
      }

      imageUrl = cloudinaryResponse.secure_url;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      image: imageUrl,
    });
console.log("User ---->",user)
    return res.status(201).json({
      message: "User signup successfully",
      user,
    });
  } catch (error) {
    console.log("Error:", error.message);

    return res.status(500).json({
      message: "Error when user signup",
      error: error.message,
    });
  }
};

  

const loginUser = async (req,res) => {
    
    try {
      const { email, password } = req.body
      console.log("password",password)
      const user = await User.findOne({ where: { email } })
      console.log("User =>", user);
         if (!user) {
        return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" })
        
      }
      console.log("Password Match =>", isMatch);
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

const getProfile = async(req,res) => {
try {
    console.log("user id", req.userId)
    const user = await User.findByPk(req.userId, {
    
     attributes: {
    exclude: ["password", "resetToken", "resetTokenExpiry"],
  },
    })
    console.log(user)
    res.status(200).json({user,message:"get user success",user})
} catch (error) {
    console.log("Error",error.message)
    res.status(500).json({message:"server error"})
}
}

const getTenants = async(req,res) => {
try {
  const tenants = await User.findAll({
    where: {
    role:"tenant"
    },
    attributes:['id','name','email']
  })
  if (!tenants) {
  res.status(404).json({message:"Tenants not found"})
  }
  res.status(200).json({message:"Success",tenants})
} catch (error) {
  res.status(500).json({message:"server error"})
}
}

module.exports = {signUpUser,loginUser,getProfile,getTenants}
