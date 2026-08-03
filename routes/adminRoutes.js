// import express from 'express'

// import protect from '../middleware/authMiddleware.js'

// import authorizeRoles from '../middleware/roleMiddleware.js'

// import {
//   createLabAssistant,
//   createLabOwner,
//   getLabOwners
// } from '../controllers/adminController.js'

// const router = express.Router()

// router.post(
//   '/create-lab-assistant',
//   protect,
//   authorizeRoles('lab_owner'),
//   createLabAssistant
// )

// router.post(

//   '/create-lab-owner',

//   protect,

//   authorizeRoles('admin'),

//   createLabOwner
// )
// router.get(

//   '/lab-owners',

//   protect,

//   authorizeRoles('admin'),

//   getLabOwners
// )

// export default router

import express from "express";

import protect from "../middleware/authMiddleware.js";
import hasPermission from "../middleware/permissionMiddleware.js";

import {
  createLabAssistant,
  createLabOwner,
  getLabOwners,
} from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/create-lab-assistant",
  protect,
  hasPermission("USER_CREATE"),
  createLabAssistant
);

router.post(
  "/create-lab-owner",
  protect,
  hasPermission("USER_CREATE"),
  createLabOwner
);

router.get(
  "/lab-owners",
  protect,
  hasPermission("LAB_OWNER_READ"),
  getLabOwners
);

export default router;