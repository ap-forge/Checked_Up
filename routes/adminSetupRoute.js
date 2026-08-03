// import express from 'express'

// import bcrypt from 'bcryptjs'

// import User from '../models/User.js'

// const router = express.Router()

// router.get(
//   '/create-admin',
//   async (req, res) => {

//     try {

//       const adminExists =
//         await User.findOne({

//           email: 'admin@gmail.com'

//         })

//       if (adminExists) {

//         return res.json({

//           message:
//             'Admin already exists'

//         })
//       }

//       const hashedPassword =
//         await bcrypt.hash(
//           'admin123',
//           10
//         )

//       await User.create({

//         name: 'Super Admin',

//         email: 'admin@gmail.com',

//         password:
//           hashedPassword,

//         role: 'admin'

//       })

//       res.json({

//         message:
//           'Admin Created'

//       })

//     } catch (error) {

//       res.status(500).json({

//         message:
//           error.message

//       })
//     }
//   }
// )

// export default router


import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Role from "../models/Role.js";

const router = express.Router();

router.get("/create-admin", async (req, res) => {
  try {
    // Check if Super Admin already exists
    const adminExists = await User.findOne({
      email: "admin@gmail.com",
    });

    if (adminExists) {
      return res.status(200).json({
        success: true,
        message: "Super Admin already exists",
      });
    }

    // Find Super Admin role
    const superAdminRole = await Role.findOne({
      code: "SUPER_ADMIN",
    });

    if (!superAdminRole) {
      return res.status(400).json({
        success: false,
        message:
          "SUPER_ADMIN role not found. Please run roleSeeder first.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create Super Admin
    const admin = await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: superAdminRole._id,
    });

    res.status(201).json({
      success: true,
      message: "Super Admin created successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;