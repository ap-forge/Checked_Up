// import express from "express";

// import upload from '../middleware/uploadMiddleware.js'

// import {

//   createPaymentSetting,

//   getPaymentSetting,

//   updatePaymentSetting,

//   deletePaymentSetting

// } from "../controllers/paymentSettingController.js";

// const router =
//   express.Router();

// router.post(
//   "/",
//   upload.single("qrImage"),
//   createPaymentSetting
// );

// router.get(
//   "/",
//   getPaymentSetting
// );

// router.put(
//   "/",
//   upload.single("qrImage"),
//   updatePaymentSetting
// );

// router.delete(
//   "/",
//   deletePaymentSetting
// );

// export default router;

import express from "express";

import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import hasPermission from "../middleware/permissionMiddleware.js";

import {
  createPaymentSetting,
  getPaymentSetting,
  updatePaymentSetting,
  deletePaymentSetting,
} from "../controllers/paymentSettingController.js";

const router = express.Router();

/* ---------------- CREATE PAYMENT SETTING ---------------- */

router.post(
  "/",
  protect,
  hasPermission("PAYMENT_SETTING_CREATE"),
  upload.single("qrImage"),
  createPaymentSetting
);

/* ---------------- GET PAYMENT SETTING ---------------- */

router.get(
  "/",
  protect,
  hasPermission("PAYMENT_SETTING_READ"),
  getPaymentSetting
);

/* ---------------- UPDATE PAYMENT SETTING ---------------- */

router.put(
  "/",
  protect,
  hasPermission("PAYMENT_SETTING_UPDATE"),
  upload.single("qrImage"),
  updatePaymentSetting
);

/* ---------------- DELETE PAYMENT SETTING ---------------- */

router.delete(
  "/",
  protect,
  hasPermission("PAYMENT_SETTING_DELETE"),
  deletePaymentSetting
);

export default router;