// import User from '../models/User.js'

// export const getMyAssistants =
//   async (req, res) => {

//     try {

//       const assistants =
//         await User.find({

//           role:
//             'lab_assistant',

//           labOwner:
//             req.user._id

//         }).select('-password')

//       res.status(200)
//         .json(assistants)

//     } catch (error) {

//       res.status(500).json({

//         message:
//           error.message

//       })
//     }
//   }

import User from "../models/User.js";
import Role from "../models/Role.js";

export const getMyAssistants = async (req, res) => {
  try {
    // Find Lab Assistant Role
    const labAssistantRole = await Role.findOne({
      code: "LAB_ASSISTANT",
    });

    if (!labAssistantRole) {
      return res.status(404).json({
        success: false,
        message: "Lab Assistant role not found",
      });
    }

    const assistants = await User.find({
      role: labAssistantRole._id,
      labOwner: req.user._id,
      isActive: true,
    })
      .populate("role", "name code")
      .select("-password");

    return res.status(200).json({
      success: true,
      count: assistants.length,
      data: assistants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};