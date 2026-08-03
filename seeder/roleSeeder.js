import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

export const seedRoles = async () => {

  const allPermissions = await Permission.find();

  const getPermissions = async (prefixes) => {

    return Permission.find({
      code: {
        $regex: `^(${prefixes.join("|")})`
      }
    });

  };

  const roles = [

    {
      name: "Super Admin",
      code: "SUPER_ADMIN",
      hierarchy: 1,
      permissions: allPermissions
    },

    {
      name: "Manager",
      code: "MANAGER",
      hierarchy: 2,
      permissions: await getPermissions([
        "DASHBOARD",
        "BOOKING",
        "REPORT",
        "USER"
      ])
    },

    {
      name: "Lab Owner",
      code: "LAB_OWNER",
      hierarchy: 3,
      permissions: await getPermissions([
        "LAB",
        "TEST",
        "PACKAGE",
        "BOOKING",
        "PAYMENT",
        "REPORT",
        "NOTIFICATION"
      ])
    },

    {
      name: "Lab Assistant",
      code: "LAB_ASSISTANT",
      hierarchy: 4,
      permissions: await getPermissions([
        "BOOKING",
        "REPORT"
      ])
    },

    {
      name: "Customer",
      code: "CUSTOMER",
      hierarchy: 5,
      permissions: await getPermissions([
        "BOOKING",
        "PAYMENT",
        "REPORT"
      ])
    },
     {
      name: "Patient",
      code: "PATIENT",
      hierarchy: 5,
      permissions: await getPermissions([
        "BOOKING",
        "PAYMENT",
        "REPORT"
      ])
    }

  ];

  for (const role of roles) {

    await Role.updateOne(
      {
        code: role.code,
      },
      {
        $set: {
          name: role.name,
          hierarchy: role.hierarchy,
          permissions: role.permissions.map(p => p._id)
        }
      },
      {
        upsert: true
      }
    );

  }

  console.log("✅ Roles Seeded");

};