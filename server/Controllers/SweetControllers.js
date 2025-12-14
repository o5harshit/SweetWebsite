import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import UserModel from "../Models/UserModel.js";
import Sweet from "../Models/SweetModel.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, description } = req.body;
    console.log(req.body);
    const addedBy = req.userId; // from verifyToken middleware

    // Validate required fields
    if (!name || !category || !price || !quantity || !req.files?.photo) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Check if user exists
    const user = await UserModel.findById(addedBy);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if sweet with the same name already exists
    const existingSweet = await Sweet.findOne({ name });
    if (existingSweet) {
      return res.status(400).json({
        success: false,
        message: "Sweet with this name already exists",
      });
    }

    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }

      const sweet = await Sweet.create({
        name,
        category,
        price,
        quantity,
        description,
        image: result.secure_url, // Cloudinary URL
        addedBy,
      });

      return res.status(201).json({
        success: true,
        message: "Sweet added successfully",
        sweet,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const GetSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().populate("addedBy", "name email role");
    // populates user info for reference

    if (!sweets.length) {
      return res.status(404).json({
        success: false,
        message: "No sweets found in the database",
      });
    }

    return res.status(200).json({
      success: true,
      count: sweets.length,
      sweets,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const SearchSweets = async (req, res) => {
  try {
    const { query } = req.body || {};
    const { name, category, price } = query || {};

    // Build dynamic search conditions
    const conditions = [];

    if (name?.trim()) {
      conditions.push({ name: { $regex: name.trim(), $options: "i" } });
    }
    if (category?.trim()) {
      conditions.push({ category: { $regex: category.trim(), $options: "i" } });
    }
    if (price?.trim()) {
      const priceNumber = Number(price.trim());
      if (!isNaN(priceNumber)) {
        conditions.push({ price: priceNumber });
      }
    }

    // Find sweets (return empty array if none found)
    const sweets = await Sweet.find(
      conditions.length ? { $or: conditions } : []
    );

    return res.status(200).json({
      success: true,
      count: sweets.length,
      sweets, // empty array if nothing found
    });
  } catch (err) {
    console.error("Error in SearchSweets:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const DeleteSweets = async (req, res) => {
  try {
    const sweetId = req.params.id;
    const userId = req.userId; // from verifyToken middleware

    // ✅ Check if user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can delete sweets",
      });
    }

    // ✅ Check if sweet exists
    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: "Sweet not found",
      });
    }

    // ✅ Delete sweet
    await Sweet.findByIdAndDelete(sweetId);

    return res.status(200).json({
      success: true,
      message: "Sweet deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const GetSweetsById = async (req,res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id || id.length !== 24) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid sweet ID" });
    }

    // Fetch sweet
    const sweet = await Sweet.findById(id);

    if (!sweet) {
      return res
        .status(404)
        .json({ success: false, message: "Sweet not found" });
    }

    res.status(200).json(sweet);
  } catch (error) {
    console.error("Error fetching sweet:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};




// ✅ Update Sweet Controller (with Cloudinary upload)
export const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;

    // Find sweet first
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ success: false, message: "Sweet not found" });
    }

    // Prepare update object dynamically
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.price) updateData.price = req.body.price;
    if (req.body.quantity) updateData.quantity = req.body.quantity;
    if (req.body.description) updateData.description = req.body.description;

    // ✅ Handle image upload (optional)
    if (req.files?.image) {
      const file = req.files.image;

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: "sweet_store" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });

      // Save Cloudinary URL
      updateData.image = result.secure_url;
    }

    // ✅ Update sweet in database
    const updatedSweet = await Sweet.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Sweet updated successfully",
      sweet: updatedSweet,
    });
  } catch (error) {
    console.error("Error updating sweet:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
