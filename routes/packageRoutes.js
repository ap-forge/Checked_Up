// import express from 'express'

// import {
//   createPackage,
//   getAllPackages
// } from '../controllers/packageController.js'

// import protect from '../middleware/authMiddleware.js'

// import authorizeRoles from '../middleware/roleMiddleware.js'

// const router = express.Router()

// router.get('/', getAllPackages)

// router.post(
//   '/',

//   createPackage
// )

// export default router

import express from "express";

import {
  createPackage,
  getAllPackages,
} from "../controllers/packageController.js";

import protect from "../middleware/authMiddleware.js";
import hasPermission from "../middleware/permissionMiddleware.js";

const router = express.Router();

/* Public - View Packages */
router.get(
  "/",
  getAllPackages
);

/* Lab Owner / Super Admin */
router.post(
  "/",
  protect,
  hasPermission("PACKAGE_CREATE"),
  createPackage
);



// router.put(
//   "/:id",
//   protect,
//   hasPermission("PACKAGE_UPDATE"),
//   updatePackage
// );

// router.delete(
//   "/:id",
//   protect,
//   hasPermission("PACKAGE_DELETE"),
//   deletePackage
// );

// router.get(
//   "/:id",
//   protect,
//   hasPermission("PACKAGE_READ"),
//   getPackageById
// );

// router.get(
//   "/admin/all",
//   protect,
//   hasPermission("PACKAGE_READ_ALL"),
//   getAllPackagesAdmin
// );

export default router;