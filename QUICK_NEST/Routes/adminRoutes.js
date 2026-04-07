import express from "express";

import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

import adminController from "../controller/adminController.js";
import categoryController from "../controller/categoryController.js";
import serviceController from "../controller/serviceController.js";

const router = express.Router();

router.patch(
  "/update/:id",
  auth,
  checkRole("admin", "super_admin"),
  adminController.updateUserData,
);

router.delete(
  "/delete/:id",
  auth,
  checkRole("admin", "super_admin"),
  adminController.deleteUser,
);

router.post(
  "/add",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.add,
);

router.post(
  "/add",
  auth,
  checkRole("admin", "super_admin"),
  serviceController.add,
)


export default router;