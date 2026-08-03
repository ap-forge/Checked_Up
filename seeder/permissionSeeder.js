import Permission from "../models/Permission.js";

const MODULES = [
  "DASHBOARD",
  "USER",
  "ROLE",
  "LAB",
  "TEST",
  "PACKAGE",
  "BOOKING",
  "PAYMENT",
  "REPORT",
  "NOTIFICATION",
  "SETTING",
];

const ACTIONS = [
  "CREATE",
  "READ",
  "UPDATE",
  "DELETE",
  "EXPORT",
  "IMPORT",
  "APPROVE",
  "ASSIGN",
];

export const seedPermissions = async () => {
  for (const module of MODULES) {
    for (const action of ACTIONS) {
      const permission = {
        name: `${action} ${module}`,
        module,
        action,
        code: `${module}_${action}`,
        description: `${action} permission for ${module}`,
      };

      await Permission.updateOne(
        { code: permission.code },
        { $set: permission },
        { upsert: true }
      );
    }
  }

  console.log("✅ Permissions Seeded");
};