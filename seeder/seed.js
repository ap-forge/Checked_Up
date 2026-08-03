import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";

import { seedPermissions } from "./permissionSeeder.js";
import { seedRoles } from "./roleSeeder.js";
import { seedSuperAdmin } from "./adminSeed.js";

dotenv.config();

await connectDB();

try {
  console.log("🚀 Starting RBAC Seeding...\n");

  await seedPermissions();

  await seedRoles();

  await seedSuperAdmin();

  console.log("\n🎉 Seeding Completed Successfully");

  await mongoose.connection.close();
} catch (error) {
  console.error(error);

  await mongoose.connection.close();
}