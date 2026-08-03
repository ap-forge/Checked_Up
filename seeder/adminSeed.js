import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Role from "../models/Role.js";

export const seedSuperAdmin = async () => {
  try {
    // Find Super Admin role
    const superAdminRole = await Role.findOne({
      code: "SUPER_ADMIN",
    });

    if (!superAdminRole) {
      throw new Error(
        "SUPER_ADMIN role not found. Run roleSeeder first."
      );
    }

    // Check if Super Admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("✅ Super Admin already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create Super Admin
    await User.create({
      name: "Super admin",
      // lastName: "Admin",
      phone: "9999999999",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: superAdminRole._id,
      isActive: true,
    });

    console.log("✅ Super Admin Created Successfully");
  } catch (error) {
    console.error("❌ Super Admin Seeder Error");
    console.error(error.message);
  }
};