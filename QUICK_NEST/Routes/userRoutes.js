import express from "express";
import UserController from "../controller/UserController.js";


const router = express.Router();

// ADD USER

router.post("/add", UserController.add)


// LOGIN USER

router.post("/login", UserController.login)

export default router