// import express from 'express'

// import protect from '../middleware/authMiddleware.js'

// import authorizeRoles from '../middleware/roleMiddleware.js'

// import {
//   createTest,
//   getAllTests,
//   getSingleTest
// } from '../controllers/testController.js'

// const router = express.Router()

// router.get('/', getAllTests)

// router.get('/:id', getSingleTest)

// router.post(
//   '/',
//   protect,
//   authorizeRoles('admin'),
//   createTest
// )

// export default router

import express from "express";

import protect from "../middleware/authMiddleware.js";
import hasPermission from "../middleware/permissionMiddleware.js";

import {
  createTest,
  getAllTests,
  getSingleTest,
  // updateTest,
  // deleteTest,
} from "../controllers/testController.js";

const router = express.Router();

/* ---------- PUBLIC ROUTES ---------- */

// Get all tests
router.get(
  "/",
  getAllTests
);

// Get single test
router.get(
  "/:id",
  getSingleTest
);

/* ---------- PROTECTED ROUTES ---------- */

// Create Test
router.post(
  "/",
  protect,
  hasPermission("TEST_CREATE"),
  createTest
);

// Update Test (when implemented)
/*
router.put(
  "/:id",
  protect,
  hasPermission("TEST_UPDATE"),
  updateTest
);
*/

// Delete Test (when implemented)
/*
router.delete(
  "/:id",
  protect,
  hasPermission("TEST_DELETE"),
  deleteTest
);
*/

export default router;