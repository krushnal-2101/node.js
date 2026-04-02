import express from "express";

import userController from "../controller/UserController.js";
import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import uploads from "../middleware/upload.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validation/userSchema.js";

const router = express.Router();

router.post(
  "/add",
  validate(createUserSchema),
  uploads.single("profilePic"),
  userController.add,
);

router.post("/login", userController.login);

router.get("/authLogin", auth, userController.authLogin);

router.post("/logOut", auth, userController.logOut);

router.post("/logOutAll", auth, userController.logOutAll);

router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  userController.allUser,
);

router.patch(
  "/update",
  auth,
  validate(updateUserSchema),
  userController.update,
);

router.delete("/delete", auth, userController.deleteUser);

export default router;