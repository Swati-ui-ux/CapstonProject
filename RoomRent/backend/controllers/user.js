const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { uploadOnCloudinary } = require("../utils/cloudinary")
const crypto = require("crypto");
const sendResetEmail = require("../utils/sendResetEmail");
const sendOtpEmail = require("../utils/sendOtpEmail")
const { Property } = require("../models")

const signUpUser = async (req, res) => {
  try {
   

    const { name, email, password, phone, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = "";
    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    
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
    
      const user = await User.findOne({ where: { email } })
     
     
         if (!user) {
        return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" })
        
      }
    ;
      await user.save();
      const token = jwt.sign(
      { id: user.id },
      process.env.SECRET_KEY,
      {expiresIn: "7d"}
    )
      
        return res.status(200).json({
      message:
        "Login Successful",
      email: user.email,
      token
    });
    } catch (error) {
        console.log(error.message)
         res.status(500).json({message:"error in login "})
    }
}

// const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body
    
//     const user = await User.findOne({ where: { email } })
//     console.log("Verifying OTP for user:", user ? user.email : "User not found")
//     if (!user) {
//       return res.status(404).json({ message: "User not found" })
//     }
    
//     if (user.otp !== otp) {
//       return res.status(401).json({ message: "Invalid OTP" })
//     }
//     if (new Date(user.orpExpiry) < new Date()) {
//     return res.status(400).json({
//         message: "OTP Expired",
//       });
//     }
    
//     const token = jwt.sign(
//       { id: user.id },
//       process.env.SECRET_KEY,
//       {expiresIn: "7d"}
//     )
//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();
//     return res.status(200).json({
//       message: "Login successful",
//       token,
//     })
   
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).json({ message: "Error in OTP verification" })
//   }
// }
    
    
    
const getProfile = async(req,res) => {
try {
   
    const user = await User.findByPk(req.userId, {
    
     attributes: {
    exclude: ["password", "resetToken", "resetTokenExpiry"],
  },
    })
   
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

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    
    if (req.body.name) {
      user.name = req.body.name;
    }

  
    if (req.body.phone) {
      user.phone = req.body.phone;
    }

  
    if (req.file) {
      const cloudinaryResponse =
        await uploadOnCloudinary(req.file.path);

      if (cloudinaryResponse) {
        user.image = cloudinaryResponse.secure_url;
      }
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
  
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    user.resetToken = resetToken;

    user.resetTokenExpiry =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    await sendResetEmail(
      user.email,
      resetToken
    );

    return res.status(200).json({
      message: "Reset link sent successfully",
    });

  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};


const resetPassword = async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
      });
    } 
    if (
      new Date(user.resetTokenExpiry) <
      new Date()
    ) {
      return res.status(400).json({
        message: "Token expired",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
    });

  } catch (error) {

    console.log(error.message);

    return res.status(500).json({
      message: "Server Error",
    });
  }
  };
  

const findAllOwners = async (req, res) => {
  try {
    const owners = await User.findAll({
      where: { role: "owner" },
      attributes: ["id", "name", "email", "image","phone"],
     include: [
  {
    model: Property,
    required: false,
    attributes: ["id", "propertyName", "location", "description", "image"],
  },
],
    });
    
    console.log("owners",owners)
    
    return res.status(200).json({
      message: "Success",
      owners,
    });

  } catch (error) {
    console.log("🔥 OWNER API ERROR:", error.message);

    return res.status(500).json({
      message: `Owners api ${error.message}`,
    });
  }
};
module.exports = {
  signUpUser, loginUser, getProfile, getTenants, updateUser, forgotPassword, resetPassword, findAllOwners}
