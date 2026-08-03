import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";

/* -----------------------------------------
   CREATE LAB ASSISTANT
------------------------------------------ */
export const createLabAssistant = async (req, res) => {
  try {
    const { name, email, password, phone, documents } = req.body;

    // Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const assistantRole = await Role.findOne({
      code: "LAB_ASSISTANT",
    });

    if (!assistantRole) {
      return res.status(404).json({
        success: false,
        message: "LAB_ASSISTANT role not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const assistant = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      documents,
      role: assistantRole._id,

      // Owner creating this assistant
      labOwner: req.user._id,
    });

    const result = await User.findById(assistant._id)
      .populate("role", "name code")
      .select("-password");

    return res.status(201).json({
      success: true,
      message: "Lab Assistant created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -----------------------------------------
   CREATE LAB OWNER
------------------------------------------ */
export const createLabOwner = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      servicePincodes,
      labAddress,
      latitude,
      longitude,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !labAddress ||
      !latitude ||
      !longitude
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const userPhoneExists = await User.findOne({
      phone,
    });
    if (userPhoneExists) {
      return res.status(409).json({
        success: false,
        message: "Phone number already exists",
      });
    }

    const labOwnerRole = await Role.findOne({
      code: "LAB_OWNER",
    });

    if (!labOwnerRole) {
      return res.status(404).json({
        success: false,
        message: "LAB_OWNER role not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,

      role: labOwnerRole._id,

      labAddress,
      latitude,
      longitude,
      servicePincodes,
    });

    const result = await User.findById(owner._id)
      .populate("role", "name code")
      .select("-password");

    return res.status(201).json({
      success: true,
      message: "Lab Owner created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -----------------------------------------
   GET ALL LAB OWNERS
------------------------------------------ */
export const getLabOwners = async (req, res) => {
  try {
    const labOwnerRole = await Role.findOne({
      code: "LAB_OWNER",
    });

    if (!labOwnerRole) {
      return res.status(404).json({
        success: false,
        message: "LAB_OWNER role not found",
      });
    }

    const labOwners = await User.find({
      role: labOwnerRole._id,
    })
      .populate("role", "name code")
      .select("-password");

    return res.status(200).json({
      success: true,
      count: labOwners.length,
      data: labOwners,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};