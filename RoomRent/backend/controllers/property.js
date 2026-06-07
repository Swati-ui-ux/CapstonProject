const Property = require("../models/property");
const { uploadOnCloudinary } = require("../utils/cloudinary")

const createProperty = async (req, res) => {
  try {
    const { propertyName, location, description } =
      req.body;

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
    const property = await Property.create({
      propertyName,
      location,
      description,
        ownerId: req.userId,
      image:imageUrl
    });

    res.status(201).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error creating property",
    });
  }
}

const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      where: {
        ownerId: req.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      properties,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching properties",
    });
  }
};

const getPropertyById =
async (req, res) => {
  try {
    const property =
      await Property.findByPk(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        message:
          "Property not found",
      });
    }

    res.json({ property });
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong",
    });
  }
  };

const updateProperty = async (req, res) => {
try {
  const property = await Property.findByPk(req.params.id)
  if (req.file) {
  const cloudinaryResponse =
    await uploadOnCloudinary(
      req.file.path
    );

  if (cloudinaryResponse) {
    property.image =
      cloudinaryResponse.secure_url;
  }
}


await property.save();

   res.status(200).json({
      message: "Property Updated Successfully",
      property,
    });
} catch (error) {
   console.log(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
}

module.exports = {createProperty,getMyProperties,getPropertyById,updateProperty}