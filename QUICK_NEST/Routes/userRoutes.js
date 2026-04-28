import express from "express";
import userController from "../controller/userController.js";
import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import uploads from "../middleware/upload.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/userSchema.js";

import { authlimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.post(
  "/add",
  validate(createUserSchema),
  uploads.single("profilePic"),
  userController.add,
);

router.post("/login",authlimiter, userController.login);

router.get("/authLogin",authlimiter, auth, userController.authLogin);

router.post("/logOut", auth, userController.logOut);

router.post("/logOutAll", auth, userController.logOutAll);

router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  userController.allUser,
);

router.patch(
  "/updateUser",
  auth,
  validate(updateUserSchema),
  userController.updateUser,
);

router.delete("/delete", auth, userController.deleteUser);

router.post("/forget-password", userController.forgotPassword)

router.post("/reset-password/:token", userController.resetPassword)

export default router;